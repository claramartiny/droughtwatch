import os
import sys
import argparse
import math
import pandas as pd
import numpy as np

import tensorflow.compat.v1 as tf
from tensorflow.keras import optimizers
from tensorflow.keras import layers, initializers
from tensorflow.keras import models
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.layers.experimental.preprocessing import Resizing
from tensorflow.keras.applications import EfficientNetB3

from termcolor import colored
from google.cloud import storage
from keras.models import model_from_json

from droughtwatch.get_data import get_data
from droughtwatch.clean_data import clean_data
from droughtwatch.utils import dataset_select_channels, save_model, holdout, export_to_csv, save_csv
from droughtwatch.params import IMG_DIM, NUM_CLASSES, SIZE, SIZE_TRAIN, SIZE_VAL, TOTAL_TRAIN, TOTAL_VAL

# Set up for GCP
BUCKET_NAME = 'tfrecords_data'
MODEL_NAME = 'model_cnn'
MODEL_VERSION = 'model_cnn_vfinal'

tf.enable_eager_execution()

# Final model: fine-tuned CNN model
##------------------------------------------------------------------------------------------------
def final_model():
    '''Final model (CNN) that takes X_train with ['B2','B3','B4','B5','B6','B7','B8']'''  
    
    model = tf.keras.Sequential()

    model.add(tf.keras.layers.InputLayer(input_shape=(65, 65, 7), name='image'))
    
    model.add(layers.Conv2D(32, kernel_size=(2, 2), activation='relu'))
    model.add(layers.Conv2D(32, kernel_size=(2, 2), activation='relu'))
    model.add(layers.MaxPooling2D(pool_size=(2, 2)))
    
    model.add(layers.Conv2D(64, kernel_size=(2, 2), activation='relu'))
    model.add(layers.Conv2D(64, kernel_size=(2, 2), activation='relu'))
    model.add(layers.MaxPooling2D(pool_size=(2, 2)))
    model.add(layers.Dropout(0.18))
    
    model.add(layers.Conv2D(128, kernel_size=(2, 2), activation='relu'))
    model.add(layers.Conv2D(128, kernel_size=(2, 2), activation='relu'))
    model.add(layers.MaxPooling2D(pool_size=(2, 2)))
    model.add(layers.Dropout(0.18))
    
    model.add(layers.Flatten())
    
    model.add(layers.Dense(64, activation='relu'))
    model.add(layers.Dense(64, activation='relu'))
    
    model.add(layers.Dense(4, activation='softmax'))

    model.compile(loss=tf.keras.losses.categorical_crossentropy,
              optimizer=tf.keras.optimizers.Adam(lr=0.00005),
              metrics=['accuracy'])

    return model

# ----------------------------------
#      Training models
# ----------------------------------

# Model 1: baseline model
##------------------------------------------------------------------------------------------------

def baseline_model():
    '''Inspired from the baseline model from W&B. We changed kernel size from (3,3) to (2,2), takes X_train with ['B2','B3','B4','B5','B6','B7','B8'] '''
    
    model = tf.keras.Sequential()
    
    model.add(tf.keras.layers.InputLayer(input_shape=(65, 65, 7), name='image'))
    
    model.add(layers.Conv2D(32, kernel_size=(2, 2), activation='relu'))
    model.add(layers.MaxPooling2D(pool_size=(2, 2)))
    
    model.add(layers.Conv2D(64, kernel_size=(2, 2), activation='relu'))
    model.add(layers.Conv2D(64, kernel_size=(2, 2), activation='relu'))
    model.add(layers.MaxPooling2D(pool_size=(2, 2)))
    model.add(layers.Dropout(0.2))
    
    model.add(layers.Conv2D(filters=128, kernel_size=(2, 2), activation='relu'))
    model.add(layers.Conv2D(filters=128, kernel_size=(2, 2), activation='relu'))
    model.add(layers.MaxPooling2D(pool_size=(2, 2)))
    model.add(layers.Dropout(0.2))
    
    model.add(layers.Flatten())
    
    model.add(layers.Dense(64, activation='relu'))
    model.add(layers.Dense(64, activation='relu'))
    
    model.add(layers.Dense(4, activation='softmax'))
    
    model.compile(loss=tf.keras.losses.categorical_crossentropy,
              optimizer='adam',
              metrics=['accuracy'])
    
    return model


# Model 2: VGG16 model
##------------------------------------------------------------------------------------------------
### Convert images to RGB format first using dataset_select_channels ###

# def vgg16_model(X_train):
#      '''Transfer learning model that takes X_train with ['B4','B3','B2']'''
    
#     model = VGG16(weights="imagenet", 
#                 include_top=False, 
#                 input_shape=X_train[0].shape)

#     model.compile(loss='categorical_crossentropy',
#                 optimizer='adam',
#                 metrics=['accuracy'])

#     return model


# Model 3: EfficientNetB3 model
##------------------------------------------------------------------------------------------------

def efficientnet_model():
    ''' Transfer learning model that takes X_train with ['B7','B6','B5']'''
    
    IMG_SIZE = 300
    inputs = layers.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    
    x = inputs
    x = Resizing(300, 300)(x)
    
    activationnetB3 = EfficientNetB3(include_top=False, weights = "imagenet")(x)
    
    outputsflatten = layers.Flatten()(activationnetB3)
    
    outputsdense1 = layers.Dense(64, activation = "relu")(outputsflatten)
    outputsdense2 = layers.Dense(64, activation = "relu")(outputsdense1)
    
    outputsdense3 = layers.Dense(4, activation = "softmax")(outputsdense2)
    
    model = tf.keras.Model(inputs, outputsdense3)
    
    model.compile(optimizer="adam", 
                loss="categorical_crossentropy", 
                metrics=["accuracy"])
    
    return model


# Train functions
##------------------------------------------------------------------------------------------------

def train_model():
    '''Function to fit models (except EfficientNet)'''

    es = EarlyStopping(patience=20, verbose=1, restore_best_weights=True)

    history = model.fit(X_train, y_train,
                        batch_size=32,
                        epochs=1,
                        validation_data=(X_val, y_val),
                        callbacks=[es],
                        verbose=1)

    return history


def train_efficient_net(X_train, X_val, y_train, y_val):
    '''Function to fit Efficient Net model'''

    es = EarlyStopping(monitor='val_loss', patience=20, verbose=1, restore_best_weights=True)

    datagen = tf.keras.preprocessing.image.ImageDataGenerator()
    datagen.fit(X_train)
 
    X_val = Resizing(300, 300, interpolation="bilinear")(X_val)

    history = model.fit(datagen.flow(X_train, y_train, batch_size=32),
                        epochs=1000,
                        validation_data = (X_val, y_val),
                        verbose = 1,
                        callbacks=[es])
    
    return history



# MAIN
##------------------------------------------------------------------------------------------------

if __name__ == "__main__":

    # Load data
    X_train_total, X_val_total, y_train_total, y_val_total = get_data(SIZE_TRAIN, SIZE_VAL, local = True)
    print(colored(f"------ Data loaded ------", "green"))

    # Hold out
    X_train, y_train, X_val, y_val, X_test, y_test = holdout(X_train_total, X_val_total, y_train_total, y_val_total)

    del X_train_total, y_train_total, X_val_total, y_val_total

    # Clean data
    X_train, y_train = clean_data(X_train, y_train)
    X_val, y_val = clean_data(X_val, y_val)
    X_test, y_test = clean_data(X_test, y_test)

    # Select features
    list_of_channels = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8'] # Modify this for each model, full_list_of_channels = ['B1','B4', 'B3', 'B2', 'B5', 'B6', 'B7','B8','B9','B10','B11']
    X_train = dataset_select_channels(X_train, list_of_channels)
    X_val = dataset_select_channels(X_val, list_of_channels)
    X_test = dataset_select_channels(X_test, list_of_channels)

    # Instanciate model 
    model = final_model() #Modify when changing models

    # Train model  
    history = train_model()
    print(colored(f"------ Model Trained ------", "green"))

    # Evaluate model    
    results = model.evaluate(X_test,y_test,verbose=1)
    print(f'The accuracy of the model is:{results[1]}')

    # Save model
    save_model(model)

    # Export history in csv
    df = export_to_csv(history)
    save_csv(df)















### Other version of efficientnet_mdeol

# def efficientnet_model():

#     sys.setrecursionlimit(sys.getrecursionlimit() * 1500)
    
#     IMG_SIZE = 300

#     inputs = layers.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
#     x = Resizing(300, 300, interpolation="bilinear")(inputs)
#     model = EfficientNetB3(include_top=False, input_tensor=x, weights="imagenet")

#     # Freeze the pretrained weights
#     model.trainable = False

#     # Rebuild top
#     x = layers.GlobalAveragePooling2D(name="avg_pool")(model.output)
#     x = layers.BatchNormalization()(x)

#     top_dropout_rate = 0.2
#     x = layers.Dropout(top_dropout_rate, name="top_dropout")(x)
#     outputs = layers.Dense(4, activation="softmax", name="pred")(x)

#     # Compile
#     model = tf.keras.Model(inputs, outputs, name="EfficientNet")
#     optimizer = tf.keras.optimizers.Adam(learning_rate=1e-2)
#     model.compile(
#         optimizer=optimizer, loss="categorical_crossentropy", metrics=["accuracy"]
#     )

#     return model




# def load_model_from_gcp(modeljson_from_gcp, X_testrgb,):
#     ''' not finished'''
#     # load json and create model
#     json_file = open(modeljson_from_gcp, 'r')
#     loaded_model_json = json_file.read()
#     json_file.close()
#     loaded_model = model_from_json(loaded_model_json)
#     # load weights into new model
#     loaded_model.load_weights("model.h5")
#     print("Loaded model from disk")

#     # evaluate loaded model on test data
#     loaded_model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
#     score = loaded_model.evaluate(X_testrgb, y_test, verbose=1)
#     print("%s: %.2f%%" % (loaded_model.metrics_names[1], score[1]*100))
import os
import numpy as np
import tensorflow.compat.v1 as tf
import argparse
import math
import numpy as np
from tensorflow.keras import optimizers
from tensorflow.keras import layers, initializers
from tensorflow.keras import models
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.layers.experimental.preprocessing import Resizing
from tensorflow.keras.applications import EfficientNetB3
import joblib
from termcolor import colored
from google.cloud import storage
from keras.models import model_from_json

from droughtwatch.get_data import get_data
from droughtwatch.clean_data import clean_data
from droughtwatch.utils import dataset_select_channels

from droughtwatch.params import IMG_DIM, NUM_CLASSES, SIZE, SIZE_TRAIN, SIZE_VAL, TOTAL_TRAIN, TOTAL_VAL

BUCKET_NAME = 'tfrecords_data'
MODEL_NAME = 'efficientnet_model'
MODEL_VERSION = 'v1_CM'


tf.enable_eager_execution()

# Features selection

#model 1: baseline model
##------------------------------------------------------------------------------------------------

def baseline_model():
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
    # set up optimizer
    model.compile(loss=tf.keras.losses.categorical_crossentropy,
              optimizer='adam',
              metrics=['accuracy'])
    return model


#model 2: VGG16 model 
##------------------------------------------------------------------------------------------------
### Convert images to RGB format first using dataset_select_channels ###

def vgg16_model():
    model = VGG16(weights="imagenet", include_top=False, input_shape=X_trrgb[0].shape)
    
    model.compile(loss='categorical_crossentropy',
                  optimizer='adam',
                  metrics=['accuracy'])
    return model


#model 3: EfficientNetB3 model 
##------------------------------------------------------------------------------------------------
def efficientnet_model():
    ''' Modèle efficientnet B3'''
    IMG_SIZE = 300
    inputs = layers.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    x = inputs
    x = Resizing(300, 300)(x)
    activationnetB3 = EfficientNetB3(include_top=False, weights = "imagenet")(x)
    outputsflatten = layers.Flatten()(activationnetB3)
    outputsdense1 = layers.Dense(64, activation = "relu")(outputsflatten)
    outputsdense2 = layers.Dense(4, activation = "softmax")(outputsdense1)
    model = tf.keras.Model(inputs, outputsdense2)
    model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
    return model

def train_efficient_net(X_train, X_val, y_train, y_val):
    #----- Train model ------
    # We only need B2,B3 and B4
    es = EarlyStopping(monitor='val_accuracy', mode='max', patience=20, verbose=1, restore_best_weights=True)
    datagen = tf.keras.preprocessing.image.ImageDataGenerator()
    datagen2 = tf.keras.preprocessing.image.ImageDataGenerator()
    datagen.fit(X_train)
    datagen2.fit(X_val)

    history = model.fit(datagen.flow(X_train, y_train, batch_size=32),\
         epochs=1000, validation_data = datagen2.flow(X_val, y_val, batch_size = 32), verbose = 1,\
             callbacks=[es])

    return history  

def save_model(model, upload=True, auto_remove=True):
    """Save the model into 2 versions: a .json and .h5 and upload them on Google Storage /models folder"""
    model_json = model.to_json()
    local_model_name = 'model.json'
    local_weights_name = 'model.h5'
    with open(local_model_name, "w") as json_file:
        json_file.write(model_json)
        #Serialize weights to HDF5
    model.save_weights("model.h5")
    print(colored("model.json saved locally", "green"))

    # Add upload of model.json to storage here
    client = storage.Client().bucket(BUCKET_NAME)

    storage_location = '{}/{}/{}/{}'.format(
         'models',
         MODEL_NAME,
         MODEL_VERSION,
         local_model_name)
    blob = client.blob(storage_location)
    blob.upload_from_filename(local_model_name)
    print("uploaded model.json to gcp cloud storage under \n => {}".format(storage_location))

    storage_location = '{}/{}/{}/{}'.format(
         'models',
         MODEL_NAME,
         MODEL_VERSION,
         local_weights_name)
    blob = client.blob(storage_location)
    blob.upload_from_filename(local_weights_name)
    print("uploaded model.h5 to gcp cloud storage under \n => {}".format(storage_location))


def load_model_from_gcp(model_from_gcp):
    ''' not finished'''
    # load json and create model
    json_file = open(modeljson_from_gcp, 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights("model.h5")
    print("Loaded model from disk")

    # evaluate loaded model on test data
    loaded_model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    score = loaded_model.evaluate(X_testrgb, y_test, verbose=1)
    print("%s: %.2f%%" % (loaded_model.metrics_names[1], score[1]*100))




# MAIN
##------------------------------------------------------------------------------------------------

if __name__ == "__main__":

    X_train, X_val_total, y_train, y_val_total = get_data(SIZE_TRAIN, SIZE_VAL)

    #Divide the data in a train set, a validation set, and a test set and store it in variables as tensors
    k = int(0.5 * SIZE_VAL)

    X_train = X_train["image"]
    X_val = X_val_total["image"][:k]
    y_val = y_val_total[:k]
    X_test = X_val_total["image"][k:]
    y_test = y_val_total[k:]

    #Clean data 
    X_train,y_train = clean_data(X_train,y_train)
    X_val,y_val = clean_data(X_val,y_val)
    X_test,y_test = clean_data(X_test,y_test)

    # Select features 
    #list_of_channels = ['B1','B4', 'B3', 'B2', 'B5', 'B6', 'B7']
    #LIST OF CHANNELS FOR EFFICIENTNETB3 MODEL
    list_of_channels = ['B4', 'B3', 'B2']
    
    X_train = dataset_select_channels(X_train,list_of_channels)
    X_val = dataset_select_channels(X_val,list_of_channels)
    X_test = dataset_select_channels(X_test,list_of_channels)

    # Model to run:
    #----- Instanciate model ------
    model = efficientnet_model()

    #----- Train model ------
    train_efficient_net(X_train, X_val, y_train, y_val)
    #----- Evaluate model ------
    print(colored("############  Evaluating model ############", "blue"))
    results = model.evaluate(X_test,y_test,verbose=1)
    print(f'Accuracy:{results[1]}')
    
    #----- Save model ------
    print(colored("############   Saving model    ############", "green"))
    save_model(model)













## if name = main


#Step 1 : Load & parse data
#Step 2 : Pipeline: Data cleaning + Channel selection
#Step 3 : Split X_train, X_test, y_train, y_test
#Step 4 :

## Class Trainer

#Step 1 : setup MLFLOW
#Step 2 : get pipeline




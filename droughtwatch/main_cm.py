import os
import pandas as pd
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
MODEL_NAME = 'CM_test_csv'
MODEL_VERSION = 'CM_test_csv_V1'


tf.enable_eager_execution()

# Features selection

#model 1: baseline model (modified by Ludo)
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

def train_baseline(X_train, X_val, y_train, y_val):
    es = EarlyStopping(patience=20, verbose=1, restore_best_weights=True)

    history = model.fit(X_train, y_train,
            batch_size=32,
            epochs=5,
            validation_data=(X_val, y_val),
            callbacks=[es],
            verbose=1)
    return history

#model 2: Regression baseline model
##------------------------------------------------------------------------------------------------
def build_regression_model():
  # initial regression model
  model = tf.keras.Sequential()
  model.add(tf.keras.layers.InputLayer(input_shape=(65, 65, 7), name='image'))
  model.add(layers.Conv2D(filters=64, kernel_size=(5, 5), activation='relu'))
  model.add(layers.MaxPooling2D(pool_size=(2, 2)))
  model.add(layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu'))
  model.add(layers.MaxPooling2D(pool_size=(2, 2)))
  model.add(layers.Flatten())

  model.add(layers.Dense(units=64, activation='relu'))
  model.add(layers.Dense(units=1, activation = 'sigmoid'))
  model.compile(loss=tf.keras.losses.mean_squared_error, 
              optimizer=tf.keras.optimizers.Adam(), 
              metrics=['mse'])
  return model

#model 3: classification baseline model
##------------------------------------------------------------------------------------------------
def build_classification_model():
  # simple CNN for classifcation (default)
  model = tf.keras.Sequential()

  model.add(tf.keras.layers.InputLayer(input_shape=(65, 65, 7), name='image'))
  model.add(layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu'))
  model.add(layers.MaxPooling2D(pool_size=(2, 2)))

  model.add(layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu'))
  model.add(layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu'))
  model.add(layers.MaxPooling2D(pool_size=(2, 2)))
  model.add(layers.Dropout(0.2))
  
  model.add(layers.Conv2D(filters=128, kernel_size=(3, 3), activation='relu'))
  model.add(layers.Conv2D(filters=128, kernel_size=(3, 3), activation='relu'))
  model.add(layers.MaxPooling2D(pool_size=(2, 2)))
  model.add(layers.Dropout(rate=0.2))
  model.add(layers.Flatten())

  model.add(layers.Dense(units=32, activation='relu'))
  model.add(layers.Dense(units=32, activation='relu'))
  model.add(layers.Dense(4, activation='softmax'))
  # set up optimizer
  model.compile(loss=tf.keras.losses.categorical_crossentropy,
              optimizer='adam',
              metrics=['accuracy'])
  return model

#model : VGG16 model
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
    outputsdense2 = layers.Dense(64, activation = "relu")(outputsdense1)
    outputsdense3 = layers.Dense(4, activation = "softmax")(outputsdense2)
    model = tf.keras.Model(inputs, outputsdense3)
    model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
    return model

def train_efficient_net(X_train, X_val, y_train, y_val):
    # We only need B2,B3 and B4
    es = EarlyStopping(monitor='val_loss', patience=20, verbose=1, restore_best_weights=True)

    datagen = tf.keras.preprocessing.image.ImageDataGenerator()
    datagen2 = tf.keras.preprocessing.image.ImageDataGenerator()
    datagen.fit(X_train)
    datagen2.fit(X_val)

    history = model.fit(datagen.flow(X_train, y_train, batch_size=32),
                        epochs=10,
                        validation_data = datagen2.flow(X_val, y_val, batch_size = 32),
                        verbose = 1,
                        callbacks=[es])

    return history




def save_model(model, upload=True, auto_remove=True):
    """Save the model into 2 versions: a .json and .h5 and upload them on Google Storage /models folder"""
    model_json = model.to_json()
    local_model_name = f'{MODEL_VERSION}.json'
    local_weights_name = f'{MODEL_VERSION}.h5'
    with open(local_model_name, "w") as json_file:
        json_file.write(model_json)
        #Serialize weights to HDF5
    model.save_weights(f"{MODEL_VERSION}.h5")
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


def load_model_from_gcp(modeljson_from_gcp, X_testrgb,):
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

def export_to_csv(model_history):
    adict = {}
    adict["accuracy"]=model_history.history["accuracy"]
    adict["val_accuracy"]=model_history.history["val_accuracy"]
    adict["test_accuracy"]= results[1]
    df = pd.DataFrame(adict)
    df = df.to_csv(f"historyandtest_accuracy_{MODEL_VERSION}.csv")
    return df

def save_csv(df):
    client = storage.Client().bucket(BUCKET_NAME)

    storage_location = '{}/{}/{}/{}'.format(
         'models',
         MODEL_NAME,
         MODEL_VERSION,
         df)
    blob = client.blob(storage_location)
    blob.upload_from_filename(df)
    print("uploaded model.json to gcp cloud storage under \n => {}".format(storage_location))

# MAIN
##------------------------------------------------------------------------------------------------

if __name__ == "__main__":
    print(colored("############  loading data ############", "blue"))
    X_train, X_val_total, y_train, y_val_total = get_data(SIZE_TRAIN, SIZE_VAL, local=False)
    print(colored(f"############  data is loaded ############", "green"))

    #Divide the data in a train set, a validation set, and a test set and store it in variables as tensors
    k = int(2/3 * SIZE_TRAIN)
    print(colored("############  Proceding to Hold-Out ############", "blue"))
    X_tr, y_tr = X_train["image"][:k], y_train[:k]
    X_val, y_val = X_train["image"][k:], y_train[k:]
    X_test, y_test = X_val_total["image"], y_val_total
    print(colored(f"############  Hold-Out OK ############", "green"))

    del X_train,y_train,X_val_total,y_val_total

    #Clean data
    print(colored("############  Cleaning Data ############", "blue"))
    X_tr,y_tr = clean_data(X_tr,y_tr)
    X_val,y_val = clean_data(X_val,y_val)
    X_test,y_test = clean_data(X_test,y_test)
    print(colored(f"############  Data-Cleaned ############", "green"))

    # Select features
    #Total list of channels: ['B1', 'B4', 'B3', 'B2', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11']
    list_of_channels = ['B1','B4', 'B3', 'B2', 'B5', 'B6', 'B7'] # Modify this for each model
    print(colored("############  Selecting color channels for this model ############", "blue"))
    X_tr = dataset_select_channels(X_tr,list_of_channels)
    X_val = dataset_select_channels(X_val,list_of_channels)
    X_test = dataset_select_channels(X_test,list_of_channels)
    print(colored(f"############ channels selection done ############", "green"))

    # Model to run:
    #----- Instanciate model ------
    model = build_regression_model()

    #----- Train model ------
    print(colored("############  Training Model ############", "blue"))
    history = train_baseline(X_tr, X_val, y_tr, y_val)
    print(colored(f"############  Model Trained ############", "green"))

    #----- Evaluate model ------
    print(colored("############  Evaluating model ############", "blue"))
    results = model.evaluate(X_test,y_test,verbose=1)
    print(f'Accuracy:{results[1]}')
    
    #----- Save model ------
    print(colored("############   Saving model    ############", "blue"))
    save_model(model)
    print(colored("############   Model Saved    ############", "green"))

    #----- Exporting history.csv ------
    print(colored("############  Exporting history as CSV ############", "blue"))
    #df = export_to_csv(history)
    #save(df)
    print(colored("############ history.csv exported ############", "blue"))











## if name = main


#Step 1 : Load & parse data
#Step 2 : Pipeline: Data cleaning + Channel selection
#Step 3 : Split X_train, X_test, y_train, y_test
#Step 4 :


#Step 1 : setup MLFLOW
#Step 2 : get pipeline



    #list_of_channels = ['B1','B4', 'B3', 'B2', 'B5', 'B6', 'B7']
    #list_of_channels = ['B4', 'B3', 'B2'] # Modify this for each model
    #print(colored("############  Selecting color channels for this model ############", "blue"))
    #X_tr = dataset_select_channels(X_tr,list_of_channels)
    #X_val = dataset_select_channels(X_val,list_of_channels)
    #X_test = dataset_select_channels(X_test,list_of_channels)
    #print(colored(f"############ channels selection done ############", "green"))


    # adict["test_accuracy"]= results[1]
    # df = pd.DataFrame(adict)
    # df.to_csv("historyandtest_accuracy.csv")
    # print(df)
    # print(colored("############ history.csv exported ############", "blue"))

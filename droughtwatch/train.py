import os
import matplotlib.pyplot as plt
import numpy as np
import tensorflow.compat.v1 as tf
import argparse
import math
import numpy as np
import os
from tensorflow.keras import optimizers
from tensorflow.keras import layers, initializers
from tensorflow.keras import models
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
from keras.models import model_from_json
from tensorflow.keras.applications import EfficientNetB3
from tensorflow.keras.layers.experimental import preprocessing
from tensorflow.keras.models import Sequential
from tensorflow.keras import layers

tf.enable_eager_execution()

NUM_TRAIN = 16000
NUM_VAL = 3200
IMG_DIM = 65
NUM_CLASSES = 4
TOTAL_TRAIN = 5000
TOTAL_VAL = 10778
TOTAL_TRAIN2 = 86317
TOTAL_VAL2 = 10778

def file_list_from_folder(folder, data_path):
    folderpath = os.path.join(data_path, folder)
    filelist = []
    for filename in os.listdir(folderpath):
        if filename.startswith('part-') and not filename.endswith('gstmp'):
            filelist.append(os.path.join(folderpath, filename))
    return filelist

def load_data(data_path):
    train = file_list_from_folder("train", data_path)
    val = file_list_from_folder("val", data_path)
    return train, val

features = {
  'B1': tf.io.FixedLenFeature([], tf.string),
  'B2': tf.io.FixedLenFeature([], tf.string),
  'B3': tf.io.FixedLenFeature([], tf.string),
  'B4': tf.io.FixedLenFeature([], tf.string),
  'B5': tf.io.FixedLenFeature([], tf.string),
  'B6': tf.io.FixedLenFeature([], tf.string),
  'B7': tf.io.FixedLenFeature([], tf.string),
  'B8': tf.io.FixedLenFeature([], tf.string),
  'B9': tf.io.FixedLenFeature([], tf.string),
  'B10': tf.io.FixedLenFeature([], tf.string),
  'B11': tf.io.FixedLenFeature([], tf.string),
  'label': tf.io.FixedLenFeature([], tf.int64),
}

def parse_tfrecords(filelist, batch_size, buffer_size, include_viz=False):
    # try a subset of possible bands
    def _parse_(serialized_example, keylist=['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8']):
        example = tf.io.parse_single_example(serialized_example, features)

        def getband(example_key):
            img = tf.io.decode_raw(example_key, tf.uint8)
            return tf.reshape(img[:IMG_DIM**2], shape=(IMG_DIM, IMG_DIM, 1))

        bandlist = [getband(example[key]) for key in keylist]
        # combine bands into tensor
        image = tf.concat(bandlist, -1)

        # one-hot encode ground truth labels
        label = tf.cast(example['label'], tf.int32)
        label = tf.one_hot(label, NUM_CLASSES)

        return {'image': image}, label

    tfrecord_dataset = tf.data.TFRecordDataset(filelist)
    tfrecord_dataset = tfrecord_dataset.map(lambda x:_parse_(x)).shuffle(buffer_size).repeat(-1).batch(batch_size)
    tfrecord_iterator = tfrecord_dataset.make_one_shot_iterator()
    image, label = tfrecord_iterator.get_next()
    return image, label

def initialize_model():
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

def load_model(X_trrgb):
    model = VGG16(weights="imagenet", include_top=False, input_shape=X_trrgb[0].shape)
    return model

def compile_model(model):
    model.compile(loss='categorical_crossentropy',
                  optimizer='adam',
                  metrics=['accuracy'])
    return model

def build_model(X_trrgb):

    model = load_model(X_trrgb)
    model = add_last_layers(model)
    model = compile_model(model)
    return model

def set_nontrainable_layers(model):
    # Set the first layers to be untrainable
    model.trainable = False

    return model
def add_last_layers(model):
    base_model = set_nontrainable_layers(model)
    flatten_layer = layers.Flatten()
    dense_layer = layers.Dense(500, activation='relu')
    prediction_layer = layers.Dense(4, activation='softmax')

    model = models.Sequential([
        model,
        flatten_layer,
        dense_layer,
        prediction_layer
    ])

    return model

def plot_hist(hist):
    plt.plot(hist.history["accuracy"])
    plt.plot(hist.history["val_accuracy"])
    plt.title("model accuracy")
    plt.ylabel("accuracy")
    plt.xlabel("epoch")
    plt.legend(["train", "validation"], loc="upper left")
    plt.show()




# One-hot / categorical encoding
def input_preprocess(image, label):
    label = tf.one_hot(label, NUM_CLASSES)
    return image, label


if __name__ == "__main__":

    #Get data from directories
    print("loading data")
    train_tfrecords, val_tfrecords = load_data("data/")
    train_images, train_labels = parse_tfrecords(train_tfrecords, TOTAL_TRAIN, TOTAL_TRAIN)
    val_images, val_labels = parse_tfrecords(val_tfrecords, TOTAL_VAL, TOTAL_VAL)
    print("Finished loading data!")
    print("Preparing hold out...")
    # #Divide the data in a train set, a validation set, and a test set and store it in variables as tensors
    k = int((2/3)*TOTAL_TRAIN)
    X_tr = train_images["image"][:k]
    y_tr = train_labels[:k]
    X_val = train_images["image"][k:]
    y_val = train_labels[k:]
    X_test = val_images["image"]
    y_test = val_labels

    print("deleting unused variables...")
    del train_tfrecords
    del val_tfrecords
    del val_images
    del val_labels

    # #Keep only images that are not all blank nor all black and convert the tensors as np arrays
    print("Filtering blank and black images")
    indices = np.where([i[i.std() >= 10].all() for i in X_tr.numpy()])
    X_tr, y_tr = X_tr.numpy(), y_tr.numpy()
    X_tr, y_tr = X_tr[indices], y_tr[indices]

    indices = np.where([i[i.std() >= 10].all() for i in X_val.numpy()])
    X_val, y_val = X_val.numpy(), y_val.numpy()
    X_val, y_val = X_val[indices], y_val[indices]

    indices = np.where([i[i.std() >= 10].all() for i in X_test.numpy()])
    X_test, y_test = X_test.numpy(), y_test.numpy()
    X_test, y_test = X_test[indices], y_test[indices]
    print("finished filtering blank and black images")
    # #Keep only rgb channels for the vgg16 model
    print("converting images to rgb ...")
    X_trrgb = X_tr[:,:,:,1:4]
    X_valrgb = X_val[:,:,:,1:4]
    X_testrgb = X_test[:,:,:,1:4]
    print("finished converting images to rgb")

    print("deleting unused variables")
    del X_tr
    del X_val
    del X_test

    # #Preprocess the data for the vgg16 model
    # X_train = preprocess_input(X_trrgb)
    # X_val = preprocess_input(X_valrgb)
    # X_test = preprocess_input(X_testrgb)

    #Build VGG16 model, fit it and evaluate
    # model = build_model(X_trrgb)

    #es = EarlyStopping(monitor='val_accuracy', mode='max', patience=20, verbose=1, restore_best_weights=True)

    # history = model.fit(X_train, y_tr,
    #                     validation_data=(X_val, y_val),
    #                     epochs=1000,
    #                     batch_size=32,
    #                     callbacks=[es],verbose = 1)

    # plot_history(history)
    # plt.show()

    # res = model.evaluate(X_test, y_test, verbose=1)

    # print(f'The accuracy is of {res[1]*100:.3f}%')

    #Build EfficientnetB3 model
    model = EfficientNetB3(weights='imagenet', drop_connect_rate=0.4)
    IMG_SIZE = 300
    #ds_train, train_labels = parse_tfrecords(train_tfrecords, TOTAL_TRAIN, TOTAL_TRAIN)
    #ds_test, test_labels = parse_tfrecords(val_tfrecords, TOTAL_VAL, TOTAL_VAL)
    datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    featurewise_center=True,
    featurewise_std_normalization=True,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True)
    # compute quantities required for featurewise normalization
    # (std, mean, and principal components if ZCA whitening is applied)
    datagen.fit(X_trrgb)
    inputs = layers.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    img_augmentation = Sequential(
    [
    preprocessing.RandomRotation(factor=0.15),
    preprocessing.RandomTranslation(height_factor=0.1, width_factor=0.1),
    preprocessing.RandomFlip(),
    preprocessing.RandomContrast(factor=0.1),
    ],
    name="img_augmentation",
    )
    x = img_augmentation(inputs)
    outputs = EfficientNetB3(include_top=True, weights=None, classes=4)(x)

    model = tf.keras.Model(inputs, outputs)
    model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
    # fits the model on batches with real-time data augmentation:
    # model.fit(datagen.flow(x_train, y_train, batch_size=32),
    #         steps_per_epoch=len(x_train) / 32, epochs=epochs)
    # here's a more "manual" example
    for e in range(1000):
        print('Epoch', e)
        batches = 0
        for x_batch, y_batch in datagen.flow(X_trrgb, y_tr, batch_size=16):
            x_batch = tf.image.resize(x_batch,(300,300))
            model.fit(x_batch, y_batch, verbose = 1)
            batches += 1
            if batches >= len(X_trrgb) / 16:
                # we need to break the loop by hand because
                # the generator loops indefinitely
                break
    #print("resizing images...")
    # ds_train = tf.image.resize(X_trrgb, (300,300))
    # ds_val = tf.image.resize(X_valrgb, (300,300))
    #print("finished resizing images!")
    del X_trrgb
    del X_valrgb
    # ds_train = ds_train.batch(batch_size=32, drop_remainder=True)
    # ds_train = ds_train.prefetch(tf.data.experimental.AUTOTUNE)
    # ds_test = ds_test.map(input_preprocess)
    # ds_test = ds_test.batch(batch_size=32, drop_remainder=True)
    # size = (IMG_SIZE, IMG_SIZE)

 


    # inputs = layers.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    # x = img_augmentation(inputs)
    # outputs = EfficientNetB3(include_top=True, weights=None, classes=4)(x)

    # model = tf.keras.Model(inputs, outputs)
    # model.compile(
    # optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
    # )

    # model.summary()
    # es = EarlyStopping(mode='max', patience=50, verbose=1, restore_best_weights=True)
    # hist = model.fit(ds_train, y_tr,  epochs=1000, validation_data=(ds_val,y_val), verbose=1, callbacks=[es], batch_size=16)
    # plot_hist(hist)
    #Serialize model to JSON
    model_json = model.to_json()
    with open("model.json", "w") as json_file:
        json_file.write(model_json)

    #Serialize weights to HDF5
    model.save_weights("model.h5")
    print("Saved model to disk")

    # load json and create model
    json_file = open('model.json', 'r')
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

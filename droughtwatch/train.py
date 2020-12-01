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

tf.enable_eager_execution()

NUM_TRAIN = 16000
NUM_VAL = 3200
IMG_DIM = 65
NUM_CLASSES = 4
TOTAL_TRAIN = 40000
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

def plot_history(history, title='', axs=None, exp_name=""):
    if axs is not None:
        ax1, ax2 = axs
    else:
        f, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
    
    if len(exp_name) > 0 and exp_name[0] != '_':
        exp_name = '_' + exp_name
    ax1.plot(history.history['loss'], label='train' + exp_name)
    ax1.plot(history.history['val_loss'], label='val' + exp_name)
    ax1.set_ylim(0., 2.2)
    ax1.set_title('loss')
    ax1.legend()

    ax2.plot(history.history['accuracy'], label='train accuracy'  + exp_name)
    ax2.plot(history.history['val_accuracy'], label='val accuracy'  + exp_name)
    ax2.set_ylim(0.25, 1.)
    ax2.set_title('Accuracy')
    ax2.legend()
    return (ax1, ax2)

if __name__ == "__main__":

    #Get data from directories
    dirlist = lambda di: [os.path.join(di, file) for file in os.listdir(di) if 'part-' in file]
    training_files = dirlist('data/val/')
    train = file_list_from_folder("train", "data/")
    val = file_list_from_folder("val", 'data/')
    train_tfrecords, val_tfrecords = load_data("data/")
    train_images, train_labels = parse_tfrecords(train_tfrecords, TOTAL_TRAIN, TOTAL_TRAIN)
    val_images, val_labels = parse_tfrecords(val_tfrecords, TOTAL_VAL, TOTAL_VAL)
   
    #Divide the data in a train set, a validation set, and a test set and store it in variables as tensors
    X_tr = train_images["image"][:30000]
    y_tr = train_labels[:30000]
    X_val = train_images["image"][30000:]
    y_val = train_labels[30000:]
    X_test = val_images["image"]
    y_test = val_labels

    #Keep only images that are not all blank nor all black and convert the tensors as np arrays
    indices = np.where([i[i.std() >= 10].all() for i in X_tr.numpy()])
    X_tr, y_tr = X_tr.numpy(), y_tr.numpy()
    X_tr, y_tr = X_tr[indices], y_tr[indices]

    indices = np.where([i[i.std() >= 10].all() for i in X_val.numpy()])
    X_val, y_val = X_val.numpy(), y_val.numpy()
    X_val, y_val = X_val[indices], y_val[indices]

    indices = np.where([i[i.std() >= 10].all() for i in X_test.numpy()])
    X_test, y_test = X_test.numpy(), y_test.numpy()
    X_test, y_test = X_test[indices], y_test[indices]

    #Keep only rgb channels for the vgg16 model
    X_trrgb = X_tr[:,:,:,2:5]
    X_valrgb = X_val[:,:,:,2:5]
    X_testrgb = X_test[:,:,:,2:5]

    #Preprocess the data for the vgg16 model
    X_train = preprocess_input(X_trrgb) 
    X_val = preprocess_input(X_valrgb)
    X_test = preprocess_input(X_testrgb)

    #Build VGG16 model, fit it and evaluate
    model = build_model(X_trrgb)

    es = EarlyStopping(monitor='val_accuracy', mode='max', patience=20, verbose=1, restore_best_weights=True)

    history = model.fit(X_train, y_tr, 
                        validation_data=(X_val, y_val), 
                        epochs=1000, 
                        batch_size=32, 
                        callbacks=[es],verbose = 1)

    plot_history(history)
    plt.show()

    res = model.evaluate(X_test, y_test, verbose=1)

    print(f'The accuracy is of {res[1]*100:.3f}%')

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

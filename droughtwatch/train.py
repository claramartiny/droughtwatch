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
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.applications.vgg16 import preprocess_input
from keras.models import model_from_json

tf.enable_eager_execution()

dirlist = lambda di: [os.path.join(di, file) for file in os.listdir(di) if 'part-' in file]
training_files = dirlist('data/val/')

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

train = file_list_from_folder("train", "data/")
val = file_list_from_folder("val", 'data/')

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

    def load_data(data_path):
        train = file_list_from_folder("train", data_path)
        val = file_list_from_folder("val", data_path)
        return train, val

train_tfrecords, val_tfrecords = load_data("data/")

train_images, train_labels = parse_tfrecords(train_tfrecords, TOTAL_TRAIN, TOTAL_TRAIN)
val_images, val_labels = parse_tfrecords(val_tfrecords, TOTAL_VAL, TOTAL_VAL)

def initialize_model4():
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

def compile_model(model):
    model.compile(loss='categorical_crossentropy',
                  optimizer='adam',
                  metrics=['accuracy'])
    return model

def build_model():
    
    model = load_model()
    model = add_last_layers(model)
    model = compile_model(model)
    
    return model

model2 = build_model()

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

# The data generator
X_tr = train_images["image"][:30000]
y_tr = train_labels[:30000]
X_val = train_images["image"][30000:]
y_val = train_labels[30000:]

indices = np.where([i[i.std() >= 10].all() for i in X_tr.numpy()])
X_tr, y_tr = X_tr.numpy(), y_tr.numpy()
X_tr, y_tr = X_tr[indices], y_tr[indices]

indices = np.where([i[i.std() >= 10].all() for i in X_val.numpy()])
X_val, y_val = X_val.numpy(), y_val.numpy()
X_val, y_val = X_val[indices], y_val[indices]

indices = np.where([i[i.std() >= 10].all() for i in X_val.numpy()])
X_val, y_val = X_val.numpy(), y_val.numpy()
X_val, y_val = X_val[indices], y_val[indices]

es = EarlyStopping(monitor='val_accuracy', mode='max', patience=20, verbose=1, restore_best_weights=True)

history = model2.fit(X_train, y_tr, 
                     validation_data=(X_val, y_val), 
                     epochs=1000, 
                     batch_size=32, 
                     callbacks=[es],verbose = 1)

plot_history(history)
plt.show()

X_trrgb = X_tr[:,:,:,2:5]
X_valrgb = X_val[:,:,:,2:5]
X_testrgb = X_test[:,:,:,2:5]
X_train = preprocess_input(X_trrgb) 
X_val = preprocess_input(X_valrgb)
X_test = preprocess_input(X_testrgb)

res = model2.evaluate(X_test, y_test, verbose=1)

print(f'The accuracy is of {res[1]*100:.3f}%')

from keras.preprocessing.image import ImageDataGenerator

datagen = ImageDataGenerator(
    featurewise_center=False,
    featurewise_std_normalization=False,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    brightness_range=(0.5, 1.),
    zoom_range=(0.5, 1.2))


# compute quantities required for featurewise normalization
# (std, mean, and principal components if ZCA whitening is applied)
datagen.fit(X_trrgb)

model_data_aug = build_model()

train_flow = datagen.flow(X_trrgb, y_tr, batch_size=16)
val_flow = datagen.flow(X_valrgb, y_val, batch_size=16)
es = EarlyStopping(monitor='val_accuracy', mode='max', patience=20, verbose=1, restore_best_weights=True)
history_data_aug = model_data_aug.fit_generator(train_flow, epochs=1000, validation_data=val_flow, callbacks=[es])

res = model_data_aug.evaluate(X_testrgb, y_test, verbose=1)

print(f'The accuracy is of {res[1]*100:.3f}%')

plot_history(history_data_aug)

# serialize model to JSON
model_json = model_data_aug.to_json()
with open("model.json", "w") as json_file:
    json_file.write(model_json)
# serialize weights to HDF5
model_data_aug.save_weights("model.h5")
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


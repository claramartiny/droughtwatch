from droughtwatch.params import IMG_DIM, NUM_CLASSES, SIZE, SIZE_TRAIN, SIZE_VAL, TOTAL_TRAIN, TOTAL_VAL
import os
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
from google.cloud import storage

#from keras.models import model_from_json

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

BUCKET_NAME = 'tfrecords_data'
BUCKET_DATA_PATH = 'data'

# B1  30 meters   0.43 - 0.45 µm  Coastal aerosol
# B2  30 meters   0.45 - 0.51 µm  Blue
# B3  30 meters   0.53 - 0.59 µm  Green
# B4  30 meters   0.64 - 0.67 µm  Red
# B5  30 meters   0.85 - 0.88 µm  Near infrared
# B6  30 meters   1.57 - 1.65 µm  Shortwave infrared 1
# B7  30 meters   2.11 - 2.29 µm  Shortwave infrared 2
# B8  15 meters   0.52 - 0.90 µm  Band 8 Panchromatic
# B9  15 meters   1.36 - 1.38 µm  Cirrus
# B10 30 meters   10.60 - 11.19 µm Thermal infrared 1, resampled from 100m to 30m
# B11 30 meters   11.50 - 12.51 µm Thermal infrared 2, resampled from 100m to 30m

def get_data(train_data_size, val_data_size, local=False):

  def load_data_local(data_path):
    train = file_list_from_folder("train", data_path)
    val = file_list_from_folder("val", data_path)
    return train, val

  def file_list_from_folder(folder, data_path):
    folderpath = os.path.join(data_path, folder)
    filelist = []
    for filename in os.listdir(folderpath):
        if filename.startswith('part-') and not filename.endswith('gstmp'):
            filelist.append(os.path.join(folderpath, filename))
    return filelist


  def load_data_gcp():
    client = storage.Client()
    bucket = client.get_bucket(BUCKET_NAME)
    train = file_list_from_gcp("train", bucket) #listes de paths train
    val = file_list_from_gcp("val", bucket) #listes de paths val
    return train, val

  def file_list_from_gcp(folder, bucket):
      filelist = []
      os.mkdir(f'data/{folder}')
      for filename in list(client.list_blobs(bucket)):
          if str(filename).startswith("<Blob: tfrecords_data, data/"+folder+'/part-'):
              name = str(filename)
              name = name[:-19]
              name = name.replace('<Blob: tfrecords_data, ', '')
              filelist.append(name)
      print(len(filelist))
      for items in filelist:
          print('it"s working',items)
          blob = bucket.get_blob(items)
          with open(items, "wb") as file_obj:
              blob.download_to_file(file_obj)
      return filelist # liste de path

  # appelle une liste de paths
  def parse_tfrecords(filelist, batch_size, buffer_size, include_viz=False):
  # try a subset of possible bands
    def _parse_(serialized_example, keylist=['B1', 'B4', 'B3', 'B2', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11']):
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


  if local:
    path = "droughtwatch/data/"
    train_tfrecords, val_tfrecords = load_data_local(path)

  else:
    os.mkdir('data')
    client = storage.Client()
    #path = "gs://{}/{}/".format(BUCKET_NAME, BUCKET_DATA_PATH)
    train_tfrecords, val_tfrecords = load_data_gcp() #listes de paths

  X_train, y_train = parse_tfrecords(train_tfrecords, train_data_size, train_data_size)
  X_val, y_val = parse_tfrecords(val_tfrecords, val_data_size, val_data_size)

  return X_train, X_val, y_train, y_val



    #training_files = dirlist('data/train/')

    #train = file_list_from_folder("train", "data/")
    #val = file_list_from_folder("val", 'data/')


      # Merge folders containing parts of the dataset into one folder
      #dirlist = lambda di: [os.path.join(di, file)\
      #for file in os.listdir(di) if 'part-' in file]

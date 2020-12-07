import os
import matplotlib.pyplot as plt
import numpy as np
import tensorflow.compat.v1 as tf
import argparse
import math

tf.enable_eager_execution()

dirlist = lambda di: [os.path.join(di, file) for file in os.listdir(di)]
training_files = dirlist('earthengine/testimages/')

def parse_visual(data):
    '''function to transform a tfrecord file into a parsed example'''
    dataset = tf.data.TFRecordDataset(data)
    # pattern for one part file
    # dataset = tf.data.TFRecordDataset('part-r-00099')
    iterator = dataset.make_one_shot_iterator()

    features = {
        'B1': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B2': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B3': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B4': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B5': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B6': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B7': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B8': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B9': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B10': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B11': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True)
    }

    parsed_examples = [tf.parse_single_example(data, features) for data in iterator]
    return parsed_examples

def get_rgb_img_to_plot(parsed_example, intensify=True):
    '''function to convert a parsed_example file into a RGB array that can be plotted'''
    rgbArray = np.zeros((65,65,3), 'int64')
    for i, band in enumerate(['B5', 'B3', 'B2']):
        band_data = parsed_example[band].numpy()
        if intensify:
            band_data = band_data/np.max(band_data)*255
        else:
            band_data = band_data*255
        rgbArray[..., i] = band_data
    return rgbArray

def get_X_test_all_bands(parsed_example, intensify=True):
    '''function to convert a parsed_example file into a 11-band-array that can be used in our models'''
    elevenArray = np.zeros((65,65,11), 'int64')
    for i, band in enumerate(['B1','B4', 'B3', 'B2','B5','B6','B7','B8','B9','B10','B11']):
        band_data = parsed_example[band].numpy()
        if intensify:
            band_data = band_data/np.max(band_data)*255
        else:
            band_data = band_data*255
        elevenArray[..., i] = band_data
    return elevenArray

def clean_ee_borders(img, number_of_features):
    '''function to clean black pixels of a satellite picture'''
    for i in range(number_of_features):
        img[:,:,i][img[:,:,i]==0] = img[:,:,i].mean()
    return img

def main(i):
    parsed_examples = parse_visual(training_files[i])
    img= get_img_from_example(parsed_examples[i])
    plt.imshow(img)


main(0)

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
    dataset = tf.data.TFRecordDataset(data)
    # pattern for one part file
    # dataset = tf.data.TFRecordDataset('part-r-00099')
    iterator = dataset.make_one_shot_iterator()

    features = {
        'B2': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B3': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B4': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True),
        'B5': tf.FixedLenSequenceFeature([65], tf.int64,allow_missing=True)

    }

    parsed_examples = [tf.parse_single_example(data, features) for data in iterator]
    return parsed_examples

def get_img_from_example(parsed_example, intensify=True):
    rgbArray = np.zeros((65,65,3), 'int64')
    for i, band in enumerate(['B5', 'B3', 'B2']):
        band_data = parsed_example[band].numpy()
        if intensify:
            band_data = band_data/np.max(band_data)*255
        else:
            band_data = band_data*255
        rgbArray[..., i] = band_data
    return rgbArray

def main(i):
    parsed_examples = parse_visual(training_files[i])
    img= get_img_from_example(parsed_examples[i])
    plt.imshow(img)


main(0)
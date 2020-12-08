import streamlit as st
#from torchvision import transforms as T
from PIL import Image
from keras.models import model_from_json
import torch
import os
import tensorflow.compat.v1 as tf
import numpy as np
import argparse
import math
import streamlit.components.v1 as components


# ----------------------------------
#      !Functions!
# ----------------------------------
def parse_visual(data):
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
def get_img_from_example(parsed_example, feature, intensify=True):
    rgbArray = np.zeros((65,65,3), 'int64')
    for i, band in enumerate(feature):
        band_data = parsed_example[band].numpy()
        band_data = ((band_data - np.min(band_data)) / ((np.max(band_data)-np.min(band_data)))) * 255
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


# --------------------------------------------------------------------------
#                              STREAMLIT CODE
# --------------------------------------------------------------------------

# Display text on a browser
st.title("Drought Watch :sunglasses: :satellite: :crystal_ball:")
st.header("Drought detection using satelite images")
st.text("Upload a satelite tfrecord for image classification of drought detection:")



# Upload a TFrecord file
upload_file = st.file_uploader("Choose a satelite TFrecord file", type = ["tfrecord"])

if upload_file is not None:
    #transform tfrecord to byte
    bytes_data = upload_file.read()
    type(bytes_data)
    ba = bytearray(bytes_data)
    with open("img.tfrecord","wb") as file:
        file.write(ba)
    #parse the bytes
    parsed_examples = parse_visual("img.tfrecord")
# ----------------------------------
#      Feature Radio Button
# ----------------------------------
    # _radio_button = components.declare_component(
    # "radio_button", url="http://localhost:3000",)

    # def custom_radio_button(label, options, default, key=None):
    #     return _radio_button(label=label, options=options, default=default, key=key)

    result = st.radio(
        "Select bands:",
        ("Red, Green, Blue", "Shortwave infrared 2, Near infrared, Green", "Near infrared, Green, Blue"))
    if result == "Red, Green, Blue":
        feature = ["B4","B3","B2"]
    elif result == "Shortwave infrared 2, Near infrared, Green":
        feature = ["B7","B5","B3"]
    elif result == "Near infrared, Green, Blue":
        feature = ["B5","B3","B2"]
    # else:
    #     feature = ['B1','B4', 'B3', 'B2','B5','B6','B7','B8','B9','B10','B11']

# ----------------------------------
#      Visualize Image
# ----------------------------------
    img= get_img_from_example(parsed_examples[0], feature)
    imageLocation = st.empty()
    imageLocation.image(img, use_column_width = True)
# ----------------------------------
#      Load Model
# ----------------------------------
    #Load JSON
    ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
    head, tail = os.path.split(ROOT_DIR)
    print(ROOT_DIR)
    json_file = open(head + '/droughtwatch/models/Baseline_model_Acc76_lr_00005_100k_B1toB11/baseline_improved_Acc76_70K_v3_TS.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights(head + '/droughtwatch/models/Baseline_model_Acc76_lr_00005_100k_B1toB11/baseline_improved_Acc76_70K_v3_TS.h5')

    loaded_model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# ----------------------------------
#      Prediction
# ----------------------------------
    X_test = get_X_test_all_bands(parsed_examples[0])
    X_test = X_test.reshape(1,65,65,11)
    y_pred = loaded_model.predict(X_test)

    st.sidebar.header('Drought Prediction')
    # st.write(":desert: :cactus:")
    # st.write(":deciduous_tree: :ear_of_rice:")
    st.text(y_pred)
    # probability = "{:.3f}".format(float(prediction*100))
    if y_pred[0][0] == max(y_pred[0]):
        st.sidebar.error("This satelite image is classified as 0;\nThere is a drought in the region :desert: :cactus:")
        # st.error('Let\'s keep positive, this might be pretty close to a success!')
    elif y_pred[0][1] == max(y_pred[0]):
        st.sidebar.warning("This satelite image is classified as 1;\nThe region is close to encounter a drought, feeds ~ 1 cow :cow: :warning:")
    elif y_pred[0][2] == max(y_pred[0]):
        st.sidebar.info("This satelite image is classified as 2;\nThere is no droughts in the region although it can only feed ~ 2 cows :cow2:")
    elif y_pred[0][3] == max(y_pred[0]):
        st.sidebar.success("This satelite image is classified as 3;\nIt is most likely that there is no droughts in the region, it can feed +3 cows :deciduous_tree: :ear_of_rice:")
        # st.success('This is a success!')



#     output = loaded_model.predict(parsed_examples)
#     boxes, scores = post_process(output)
#     img = plot_op(img, boxes, scores)
#     imageLocation.image(img, use_column_width= True)


#     #slider or input box
#     #nms = st.sidebar.slider('nms', 0.0,1.0, 0.1)
#     #boxes, scores = post_process(output, nms_thres= nms)

# # @st.cache
# # def post_process(outputs, nms_thres=0.3):
# #     boxes = outputs['boxes'].data



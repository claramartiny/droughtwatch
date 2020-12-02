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
from keras.models import model_from_json

from get_data import get_data
from clean_data import clean_data

from params import IMG_DIM, NUM_CLASSES, SIZE, SIZE_TRAIN, SIZE_VAL, TOTAL_TRAIN, TOTAL_VAL

tf.enable_eager_execution()






if __name__ == "__main__":

X_train, X_val_total, y_train, y_val_total = get_data(SIZE_TRAIN, SIZE_VAL)

#Divide the data in a train set, a validation set, and a test set and store it in variables as tensors
k = 0.5 * SIZE_VAL

X_val = X_val_total["image"][:k]
y_val = y_val_total[:k]
X_test = X_val_total["image"][k:]
y_test = y_val_total[k:]

X_train = clean_data(X)









## if name = main


#Step 1 : Load & parse data
#Step 2 : Pipeline: Data cleaning + Channel selection
#Step 3 : Split X_train, X_test, y_train, y_test
#Step 4 :

## Class Trainer

#Step 1 : setup MLFLOW
#Step 2 : get pipeline




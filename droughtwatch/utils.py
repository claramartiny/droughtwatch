import numpy as np
import pandas as pd
from keras.models import model_from_json
from google.cloud import storage

features_list = [ 'B1', 'B4', 'B3', 'B2', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11']

def dataset_select_channels(train_images,list_of_channels):
    ''' Input a dataset and a list of channels as a list:
    Example: dataset_select_channels(train_images,['B4','B3','B2']) to convert
    images to RGB.
    '''
    channels_index = [features_list.index(i) for i in list_of_channels]
    data = np.array(train_images)
    return data[:,:,:,channels_index]

def intensify(X):
    ''' Scaling of satellite images'''
    number_of_channels = X.shape[-1]
    number_of_images = X.shape[0]
    X = np.array(X)
    for j in range(number_of_images):
        img = X[j]
        for i in range(number_of_channels):
            img_band = img[:,:,i]
            img_band = img_band.reshape(65,65)
            img_band = img_band / np.max(img_band) * 255
            img[...,i] = img_band
        X[j] = img
    return X

def holdout(X_train_total, X_val_total, y_train_total, y_val_total, proportion=(2/3)):
    '''Hold out function'''
    
    k = int(proportion * SIZE_TRAIN) # Modify this only

    X_train, y_train = X_train_total["image"][:k], y_train_total[:k]
    X_val, y_val = X_train_total["image"][k:], y_train_total[k:]
    X_test, y_test = X_val_total["image"], y_val_total
    
    return X_train, y_train, X_val, y_val, X_test, y_test

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

def export_to_csv(model_history):
    '''Export accuracy, val_acc and test_acc of a model into a csv file'''
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

def simple_time_tracker(method):
    '''decorator to track time'''
    def timed(*args, **kw):
        ts = time.time()
        result = method(*args, **kw)
        te = time.time()
        if 'log_time' in kw:
            name = kw.get('log_name', method.__name__.upper())
            kw['log_time'][name] = int(te - ts)
        else:
            print(method.__name__, round(te - ts, 2))
        return result
    return timed


# To add in other files

# from mypackage.utils import simple_time_tracker
# @simple_time_tracker

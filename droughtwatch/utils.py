import numpy as np

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

##################################
#  DECORATOR TO ADD IN utils.py
#################################
def simple_time_tracker(method):
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

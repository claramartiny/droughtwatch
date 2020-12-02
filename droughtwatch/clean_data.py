import numpy as np

def clean_data(X,y):
    ''' Delete empty images (std < 10) '''
    def find_empty_images(X):
        empty_images = []
        X = np.array(X)
        for i in range(X.shape[0]):
            if data[i].std() < 10:
                empty_images.append(i)
        return empty_images
    X = np.array(X)
    y = np.array(y)
    empty_imgs = find_empty_images(X)
    new_index = [i for i in range(X.shape[0]) if i not in empty_imgs]
    X = np.take(X,new_index,axis=0)
    y = np.take(y,new_index,axis=0)
    return X,y





#### OLD VERSIONS ####



# def clean_data3(X,y):
#     X, y = X.numpy(), y.numpy()
#     indices = np.where([i[i.std() >= 10].all() for i in X])
#     X, y = X[indices], y[indices]
#     return X,y


# def clean_data2(train_images):
#     ''' Delete empty images (std < 10) '''

#     def find_empty_images(train_images):
#         empty_images = []
#         data = np.array(train_images['image'])
#         for i in range(len(train_images['image'])):
#             if data[i].std() < 10:
#                 empty_images.append(i)
#         return empty_images

#     empty_imgs = find_empty_images(train_images)
#     new_index = [i for i in range(len(train_images['image'])) if i not in empty_imgs]
#     return np.take(a,new_index,axis=0)
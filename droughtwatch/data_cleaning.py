import numpy as np


def find_empty_images(train_images):
    empty_images = []
    data = np.array(train_images['image'])
    for i in range(len(train_images['image'])):
        if data[i].std() < 10:
            empty_images.append(i)
    return empty_images

def delete_empty_images(train_images):
    empty_imgs = find_empty_images(train_images)
    new_index = [i for i in range(len(train_images['image'])) if i not in empty_imgs]
    return np.take(a,new_index,axis=0)

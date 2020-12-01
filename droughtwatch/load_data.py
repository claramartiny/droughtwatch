
def file_list_from_folder(folder, data_path):
    folderpath = os.path.join(data_path, folder)
    filelist = []
    for filename in os.listdir(folderpath):
        if filename.startswith('part-') and not filename.endswith('gstmp'):
            filelist.append(os.path.join(folderpath, filename))
    return filelist

def load_data(data_path):
    train = file_list_from_folder("train", data_path)
    val = file_list_from_folder("val", data_path)
    return train, val

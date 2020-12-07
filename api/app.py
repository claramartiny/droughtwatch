import streamlit as st
from torchvision import transforms as T
from PIL import Image
import torch

# Display text on a browser
st.title("Drought Watch")
st.header("Drought detection using satelite images")
st.text("Upload a satelite Image for image classification as drought detection:")

#CODE to upload a file
upload_file = st.file_uploader("Choose an image file", type = ["jpg", "png"])

if upload_file is not None:
    img = Image.open(upload_file).convert("RGB")
    imageLocation = st.empty()
    imageLocation.image(img, use_column_width = True)

    img = T.ToTensor()(img)
    model = torch.load('droughtwatch/models/VGG16_B753_Acc74/VGG16model.h5', map_location = 'cpu')
    model.eval()
    output = get_prediction(model, img)
    boxes, scores = post_process(output)
    img = plot_op(img, boxes, scores)
    imageLocation.image(img, use_column_width= True)


    #slider or input box
    nms = st.sidebar.slider('nms', 0.0,1.0, 0.1)
    boxes, scores = post_process(output, nms_thres= nms)

@st.cache
def post_process(outputs, nms_thres=0.3):
    boxes = outputs['boxes'].data



# import cv2
# from PIL import Image, ImageOps
# import numpy as np
# def import_and_predict(image_data, model):

#         size = (150,150)
#         image = ImageOps.fit(image_data, size, Image.ANTIALIAS)
#         image = np.asarray(image)
#         img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#         img_resize = (cv2.resize(img, dsize=(75, 75),    interpolation=cv2.INTER_CUBIC))/255.

#         img_reshape = img_resize[np.newaxis,...]

#         prediction = model.predict(img_reshape)

#         return prediction
# if file is None:
#     st.text("Please upload an image file")
# else:
#     image = Image.open(file)
#     st.image(image, use_column_width=True)
#     prediction = import_and_predict(image, model)

#     if np.argmax(prediction) == 0:
#         st.write("It is a paper!")
#     elif np.argmax(prediction) == 1:
#         st.write("It is a rock!")
#     else:
#         st.write("It is a scissor!")

#     st.text("Probability (0: Drought, 1: Rock, 2: Scissor")
#     st.write(prediction)


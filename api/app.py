import streamlit as st
from torchvision import transforms as T
from PIL import Image


# Display text on a browser
st.write("# Testing streamlit")

#CODE to upload a file

upload_file = st.file_uploader("Choose an image file", type = ["jpg", "png"])
if upload_file is not None:
    img = Image.open(upload_file).convert("RGB")
    imageLocation = st.empty()
    imageLocation.image(img, use_column_width = True)

    img = T.ToTensor()(img)
    model = torch.load('models/VGG16_B753_Acc74/VGG16model.h5', map_location = 'cpu')
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


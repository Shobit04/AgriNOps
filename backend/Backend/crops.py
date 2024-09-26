import numpy as np
import tensorflow as tf

# Load the model from the .h5 file
model = tf.keras.models.load_model('wheatDiseaseModel.h5')

# Load and preprocess the image
def preprocess_image(img_path):
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=(64, 64))  # Resize image to (64, 64)
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    #img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array /= 255.0  # Normalize to [0,1] range if required
    return img_array

# Define the class names
class_names = ['Wheat_crown_root_rot', 'Wheat_healthy', 'Wheat_Leaf_Rust', 'Wheat_Loose_smut']

# List of image paths to predict
# image_paths = ['/content/00051.jpg', '/content/00041.jpg', '/content/00011.jpg', 
#                '/content/00021.jpg', '/content/00041.jpg', 
#                 ]
img='sentinel_map_zoomed_satellite.jpg'


input_image = preprocess_image(img)
predictions = model.predict(input_image)
    
    # Get the index of the class with the highest probability
predicted_class_index = np.argmax(predictions, axis=-1)[0]
    
    # Get the predicted class name
predicted_class_name = class_names[predicted_class_index]
    
print(predicted_class_name)
from fastapi import FastAPI,Form,Response
from pydantic import BaseModel
import joblib
import tensorflow as tf
import numpy as np
from fastapi.responses import JSONResponse
#from xgboost import XGBClassifier
from Resnet import ResNet9
import cv2  # Import OpenCV
import numpy as np
from PIL import Image
import mss
import torchvision.transforms as transforms
import torch
import google.generativeai as genai
from PIL import Image
import imgkit
import os      
import requests                
import numpy as np            
import pandas as pd             
import torch                    
import matplotlib.pyplot as plt 
import torch.nn as nn          
from torch.utils.data import DataLoader # for dataloaders 
from PIL import Image
import torch.nn.functional as F
import torchvision.transforms as transforms
from torchvision.utils import make_grid     
from torchvision.datasets import ImageFolder  
import torchaudio
import geocoder
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import google.generativeai as genai
from PIL import Image
import base64
import io
from io import BytesIO
# Define the FastAPI a
app = FastAPI()
genai.configure(api_key='AIzaSyDmizkFBUkjIwDMj8C_up7t5SrsquMtE2s')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),         
])
import google.generativeai as genai
from PIL import Image
model_flash = genai.GenerativeModel('gemini-1.5-flash')
whtml=r"C:\Program Files\wkhtmltopdf\bin\wkhtmltoimage.exe"
config = imgkit.config(wkhtmltoimage=whtml)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
classes = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
           'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
           'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
           'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
           'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
           'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
           'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
           'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
           'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot',
           'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
           'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
           'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']
model_resnet = ResNet9(3, 38)
model_resnet.load_state_dict(torch.load('Plant_Disease_Predictor.pth'))
model_resnet= model_resnet.to(device)
model_resnet.eval()
# Load the model from the .joblib file
model_filename = 'FERTILITY.joblib'
model = joblib.load(model_filename)

# Define the data model for the input
class SoilFertilityFeatures(BaseModel):
    N: float
    P: float
    K: float
    pH: float
    EC: float
    OC: float
    S: float
    Zn: float
    Fe: float
    Cu: float
    Mn: float
    B: float

# # Define the prediction endpoint
@app.post('/predict/')
def predict(features: SoilFertilityFeatures):
    # Convert the input data to a numpy array
    input_data = np.array([[
        features.N, features.P, features.K, features.pH, features.EC,
        features.OC, features.S, features.Zn, features.Fe, features.Cu,
        features.Mn, features.B
    ]])
    
    # Make a prediction using the loaded model
    prediction = model.predict(input_data)[0]
    
    # Map the prediction to fertility levels
    fertility_mapping = {0: 'Low Fertility', 1: 'Medium Fertility', 2: 'High Fertility'}

    fertility_level = fertility_mapping.get(prediction, "Unknown")
#     input="""
# You will be given soil fertility mapping: {fertility_mapping} and corresponding input data, give recommendations for improving these soil conditions, for example fertilizers, (include the input parameters which can be improved) and the types of crops that can be grown well in the soil.
# the fertility level :{fertility_level} 
# """
    input=f"""
Input Parameters:

Nitrogen (N): {features.N} ppm
Phosphorus (P): {features.P} ppm
Potassium (K): {features.K} ppm
pH Level: {features.pH}
Electrical Conductivity (EC): {features.EC} dS/m
Organic Carbon (OC): {features.OC}%
Sulfur (S): {features.S} ppm
Zinc (Zn): {features.Zn} ppm
Iron (Fe): {features.Fe} ppm
Copper (Cu): {features.Cu} ppm
Manganese (Mn): {features.Mn} ppm
Boron (B): {features.B} ppm
Fertility Type:

Based on the above parameters, your soil fertility is classified as {fertility_level}.

Recommend what changes in input parameter can increase fertility level.
    """
    print(input)
    response=model_flash.generate_content(input)
    

    # Return the prediction result
    return {"prediction": fertility_level+" Summary "+response.text}

@app.post('/Automatic_Coordinates')
async def predict():
    try:
        g = geocoder.ip('me')
        if g.ok:
           return g.latlng
        else:
            print("Could not retrieve latitude and longitude.")
            return None
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Define prediction endpoint
@app.post("/Disease_predict/")
async def predict(file: UploadFile = File(...)):
    try:
        img_bytes = await file.read()
        img = Image.open(BytesIO(img_bytes)).convert('RGB')
        img_tensor = transform(img).unsqueeze(0).to(device)
        
        with torch.no_grad():
            output = model_resnet(img_tensor)
            _, predicted = torch.max(output, 1)
            predicted_class = classes[predicted.item()]
        
        return {"prediction": predicted_class}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
import folium
def get_city_from_lat_lon_opencage(latitude, longitude, api_key):
    url = f"https://api.opencagedata.com/geocode/v1/json?q={latitude}+{longitude}&key={api_key}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        if data['results']:
            return data['results'][0]['components'].get('city', 'City not found')
        else:
            return 'City not found'
    except requests.exceptions.RequestException as e:
        print(f"Error during the API request: {e}")
        return None

def create_farm_map(latitude, longitude, zoom_level, wms_url, wms_layer_name, output_file):
    """
    Creates an interactive map centered on the given latitude and longitude, with layers
    including Stamen Terrain, Google Satellite, and Sentinel-1 WMS.
    
    Args:
        latitude (float): Latitude of the map center.
        longitude (float): Longitude of the map center.
        zoom_level (int): Initial zoom level for the map.
        wms_url (str): URL of the WMS service to overlay on the map.
        wms_layer_name (str): Name of the WMS layer to be added.
        output_file (str): The filename where the HTML map will be saved.

    Returns:
        None
    """
    # Define the map center and create a map object
    map_center = [latitude, longitude]
    my_map = folium.Map(location=map_center, zoom_start=zoom_level)

    # Add a Stamen Terrain layer
    folium.TileLayer('Stamen Terrain', attr="Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.").add_to(my_map)

    # Add Google Satellite tiles with attribution
    folium.TileLayer(
        tiles='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        max_zoom=500,
        subdomains=['mt0', 'mt1', 'mt2', 'mt3'],
        attr='Map data ©2023 Google',
        name='Google Satellite'
    ).add_to(my_map)

    # Add a Sentinel-1 WMS layer
    folium.WmsTileLayer(
        url=wms_url,
        layers=wms_layer_name,
        name='Sentinel-1',
        attr='Sentinel-1',
        overlay=True,
        control=True,
        transparent=True,
        fmt='image/png'
    ).add_to(my_map)

    # Add layer control to toggle between layers
    folium.LayerControl().add_to(my_map)

    # Save the map to an HTML file
    my_map.save(output_file)



def analyze_satellite_image(api_key, image_path, input_prompt):
    # Configure the generative model
    genai.configure(api_key=api_key)
    
    # Load the image
    img = Image.open(image_path)
    
    # Initialize the model
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
    
    # Generate content
    response = model.generate_content([input_prompt, img])
    
    # Return the response text
    return response.text

@app.post("/Recommendations")
async def predict(lat: float = Form(...), long: float = Form(...)):
    try:
        # Create the farm map
        create_farm_map(
            latitude=lat,
            longitude=long,
            zoom_level=500,
            wms_url='https://services.sentinel-hub.com/ogc/wms/3a85cdf9-8af8-4326-92f8-7774c50db6b9',
            wms_layer_name='S1-IW-VVVH',
            output_file='sentinel_map_zoomed_satellite.html'
        )
        output_file = 'sentinel_map_zoomed_satellite.html'
        # Check if the output file exists
        if not os.path.exists(output_file):
            raise HTTPException(status_code=500, detail="Failed to create map HTML file.")

        # Read and return the HTML content
        with open(output_file, 'r') as file:
            html_content = file.read()
        return HTMLResponse(content=html_content, status_code=200)

    except Exception as e:
        # Return an error response with the exception details
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")  
from pyppeteer import launch
@app.get("/screenshot")
async def take_screenshot():
    # Launch a headless browser
    browser = await launch(headless=True)
    page = await browser.newPage()
    await page.setViewport({"width": 1920, "height": 1080})
    
    # Load the webpage
    await page.goto('http://localhost:5175/maps')
    
    # Capture the screenshot
    screenshot = await page.screenshot({'fullPage': True})
    
    # Close the browser
    await browser.close()
    
    # Convert the screenshot to a PIL image
    img = Image.open(io.BytesIO(screenshot))
    
    # Save the image to a BytesIO object
    img_bytes = io.BytesIO()
    img.save(img_bytes, format="PNG")
    img_bytes.seek(0)
    
    # Return the image as a response
    return Response(content=img_bytes.read(), media_type="image/png")
class Coordinates(BaseModel):
    lat: float
    long: float
    screenshot: str

@app.post('/dash_board')
def predict(coordinates: Coordinates):
    try:
        lat = coordinates.lat
        long = coordinates.long
        screenshot=coordinates.screenshot
        image_data = base64.b64decode(screenshot.split(",")[1])
        image = Image.open(io.BytesIO(image_data))
        image.save("screenshot.png")
        city = get_city_from_lat_lon_opencage(lat, long,'0c0ad68899db40b2970be7f5be534fda')
        if not city:
            raise HTTPException(status_code=404, detail="City not found")

        api_key = "74da35c7f83b434589491719242908"
        url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}"
        response = requests.get(url)
        response.raise_for_status()  # Raises an error for bad responses
        data_current = response.json()
        api_key = "4524dfbee7654734869215050242908"
        city_name = city

        base_url = f"https://api.weatherapi.com/v1/forecast.json?key={api_key}&q={city_name}&days=5"

# Sending GET request
        response = requests.get(base_url)

# Initializing a list to store the forecast data
        forecast_data = []

# Checking the response
        if response.status_code == 200:
            data = response.json()
    # Store the forecast for the next 5 days
            for day in data['forecast']['forecastday']:
                    forecast_data.append({
            "Date": day['date'],
            "Max Temp": f"{day['day']['maxtemp_c']}°C",
            "Min Temp": f"{day['day']['mintemp_c']}°C",
            "Condition": day['day']['condition']['text']})
        input=f"""
Given the following weather data for {city}:

Current Conditions:

{data}

Forecast for the next 5 days:
{forecast_data}


Task: Based on the current and upcoming weather conditions, provide recommendations on the following:

Farming Strategies:

Crop Selection:

Fertilization:

Precautions and Things to Avoid:

Don't Give Response like I cannot recommend and Strictly Response in the contenx of time forecasted and current data strictly in every response you should justify based on current parameter and next 5 days parameters.
"""
        model_flash = genai.GenerativeModel('gemini-1.5-flash')
        response_1=model_flash.generate_content(input)
        img=Image.open('screenshot.png')
        model_flash_1 = genai.GenerativeModel('gemini-1.5-flash-latest')
        input = """
You will be given a satellite image of farmland. Your task is to identify any abnormalities, such as irregular plant growth, soil degradation, or pest infestations. Additionally, based on the visible landscape, provide detailed recommendations on how to optimize the farm's productivity, including suggestions on irrigation, crop rotation, and soil treatment. Highlight any areas that may require immediate attention to prevent potential issues from worsening. Consider the proximity to water sources, the pattern of crop growth, and any signs of stress in the vegetation.Please Don't Respond the that i cannot recommned please.
"""
        input_prompt='Please assist me'
        response = model_flash_1.generate_content([input_prompt,img, input])
        
        return {
            "Map_Analysis": response.text,
            "Weather based Analysis":response_1.text,
            "prediction": "Your predicted result here"
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Weather API request failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
model_keras=tf.keras.models.load_model('wheatDiseaseModel.h5')
def preprocess_image(image):
    image = image.resize((64, 64))  # Resize the image to the expected input size
    img_array = np.array(image)  # Convert the image to a NumPy array
    img_array = img_array / 255.0  # Normalize to [0,1] range
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension: (1, 64, 64, 3)
    return img_array

@app.post("/Crops")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the file contents
        contents = await file.read()
        image = Image.open(BytesIO(contents))
        # Define the class names
        class_names = ['Wheat_crown_root_rot', 'Wheat_healthy', 'Wheat_Leaf_Rust', 'Wheat_Loose_smut']


        # Preprocess the image
        input_image = preprocess_image(image)

        # Make predictions
        predictions = model_keras.predict(input_image)
        
        # Get the index of the class with the highest probability
        predicted_class_index = np.argmax(predictions, axis=-1)[0]
        
        # Get the predicted class name
        predicted_class_name = class_names[predicted_class_index]
        
        return JSONResponse(content={"predicted_class": predicted_class_name})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
@app.get("/")
def read_root():
    return {"message": "Welcome to the Soil Fertility Prediction API"}




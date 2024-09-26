import requests

# Replace 'YOUR_API_KEY' with your actual API key
api_key = "4524dfbee7654734869215050242908"
city_name = "Mumbai"

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
            "Condition": day['day']['condition']['text']
        })
else:
    print(f"Error: {response.status_code}, {response.text}")

# Now `forecast_data` contains all the forecast details
#print(forecast_data)

url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city_name}"

response = requests.get(url)
data = response.json()
#print(data)
import google.generativeai as genai
from PIL import Image
genai.configure(api_key='AIzaSyDmizkFBUkjIwDMj8C_up7t5SrsquMtE2s')
model = genai.GenerativeModel('gemini-1.5-flash')
input=f"""
Given the following weather data for Mumbai, India:

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
#print(input)
response = model.generate_content(input)
print(response.text)

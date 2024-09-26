import requests

api_key = "74da35c7f83b434589491719242908"

import geocoder
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError

def get_lat_lon_from_ip():
    g = geocoder.ip('me')
    if g.ok:
        return g.latlng
    else:
        print("Could not retrieve latitude and longitude.")
        return None

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

lat_lon = get_lat_lon_from_ip()
    
if lat_lon:
    print(f"Latitude: {lat_lon[0]}, Longitude: {lat_lon[1]}")
        
    city = get_city_from_lat_lon_opencage(lat_lon[0], lat_lon[1],'0c0ad68899db40b2970be7f5be534fda')
    if city:
        print(f"The city for the given coordinates is: {city}")
 
url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}"

response = requests.get(url)
data = response.json()
print(data)

# print(data['current'])
# print(data['location'])

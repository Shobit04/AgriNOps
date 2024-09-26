import folium

# Latitude and Longitude of the farm area
latitude = 20.006606
longitude = 73.688460

# Define the map center and a realistic zoom level
map_center = [latitude, longitude]
map_zoom = 16  # Zoom level set to 16 for better visibility

# Create a map object with a Satellite imagery base map
my_map = folium.Map(location=map_center, zoom_start=map_zoom)

# Add a Stamen Terrain layer
folium.TileLayer('Stamen Terrain', attr="Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.").add_to(my_map)

# Alternatively, add Google Satellite tiles with attribution
folium.TileLayer(
    tiles='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    max_zoom=20,  # Set max zoom to a realistic level
    subdomains=['mt0', 'mt1', 'mt2', 'mt3'],
    attr='Map data ©2023 Google',
    name='Google Satellite'
).add_to(my_map)

# Add a Sentinel-1 WMS layer (customize the URL as needed)
wms_url = 'https://services.sentinel-hub.com/ogc/wms/3a85cdf9-8af8-4326-92f8-7774c50db6b9'
wms_layer = folium.WmsTileLayer(
    url=wms_url,
    layers='S1-IW-VVVH',
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
my_map.save('sentinel_map_zoomed_satellite.html')

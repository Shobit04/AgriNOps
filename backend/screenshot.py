from html2image import Html2Image

# Initialize Html2Image
hti = Html2Image()

# Convert the HTML file to an image
hti.screenshot(html_file='sentinel_map_zoomed_satellite.html', save_as='sentinel_map_image.png')

print("Image saved as sentinel_map_image.png")

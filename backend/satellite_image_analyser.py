import google.generativeai as genai
from PIL import Image
genai.configure(api_key='AIzaSyDmizkFBUkjIwDMj8C_up7t5SrsquMtE2s')
img=Image.open('image.png')
model = genai.GenerativeModel('gemini-1.5-flash-latest')
input="""
You will be given top view of satellite you role is to find any abornamality in the farm if there is any and also based on surrounding suggest the precuations that can be taken..
"""
input_prompt='Please assist me'
response = model.generate_content([input_prompt, img, input])
print(response.text)
models=genai.list_models()
for model in models:
    print(model.name)
import cv2  # Import OpenCV
import numpy as np
from PIL import Image
import torchvision.transforms as transforms
import torch
import os                      
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
def ConvBlock(in_channels, out_channels, pool=False):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
             nn.BatchNorm2d(out_channels),
             nn.ReLU(inplace=True)]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)
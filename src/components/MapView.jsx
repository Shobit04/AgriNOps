import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const MapView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const { lat, long } = location.state || { lat: 19.0760, long: 72.8777 }; // Default to Mumbai coordinates if not provided
  const position = [lat, long];

  // Ensure the coordinates are valid
//   if (typeof lat !== 'number' || typeof long !== 'number') {
//     console.error('Invalid latitude or longitude values');
//     return <div>Error: Invalid coordinates provided</div>;
//   }

  const handleNext = async () => {
    try {
      // Select only the map area to screenshot
      const mapElement = document.querySelector('.leaflet-container');

      if (mapElement) {
        // Use html2canvas to capture the map area as a canvas
        const canvas = await html2canvas(mapElement, {
          useCORS: true, // Use this option to handle cross-origin images
          backgroundColor: null, // Ensure the background is transparent
        });

        const dataUrl = canvas.toDataURL('image/jpeg');
        
        // Store the screenshot URL in state
        setScreenshotUrl(dataUrl);

        // Navigate to the next page and pass the screenshot URL as state
        navigate('/next-page', { state: { screenshotUrl: dataUrl,lat:lat,long:long } });

        console.log('Screenshot captured and navigating to next page');
      } else {
        console.error('Map element not found');
      }
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg items-center map-container">
        <h3 className="text-2xl font-bold mb-4 text-center">Generated Map</h3>

        <MapContainer center={position} zoom={200} scrollWheelZoom={false} style={{ height: '450px', width: '100%' }}>
          <TileLayer
            url="http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://maps.google.com">Google Maps</a> contributors'
          />
          <Marker position={position}></Marker>
        </MapContainer>

        <button 
          onClick={handleNext} 
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MapView;

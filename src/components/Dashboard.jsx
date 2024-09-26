import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SoilHealth = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const navigate = useNavigate();

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/Recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          lat: latitude,
          long: longitude,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.text(); // Retrieve the HTML content as text
      setHtmlContent(data); // Update the state with the HTML content
      console.log('HTML Content:', data);

      // Navigate to /maps and pass the HTML content
      navigate('/maps', { state: { lat: latitude, long: longitude } });
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }
  };

  const handleAutoGenerate = async () => {
    try {
      const response = await fetch('http://localhost:8000/Automatic_Coordinates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
      }

      const data = await response.json();
      setLatitude(data[0]);
      setLongitude(data[1]);
      console.log('Automatic Coordinates:', { latitude: data[0], longitude: data[1] });
    } catch (error) {
      console.error('Error generating coordinates:', error);
    }
  };

  return (
    <div id="soil" className="relative w-full h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="/20.jpg" // Path relative to the public directory
          alt="Overlay"
          className="w-full h-full object-cover z-0"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Manual User Entry Coordinates</h2>
          <form onSubmit={handleManualSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Latitude:</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter latitude"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Longitude:</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter longitude"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Automatic Generate Coordinates</h2>
          <button
            onClick={handleAutoGenerate}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Generate Coordinates
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoilHealth;

import React, { useRef, useEffect, useState } from 'react';

const CropHealth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState('');  // State to hold the prediction
  const [isPredicting, setIsPredicting] = useState(false); // State to control real-time prediction

  const blockyTextStyle = {
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)", // Keeps the 3D shadow effect
    transition: "transform 0.3s ease", // Smooth transition for scaling effect
  };

  useEffect(() => {
    console.log("Attempting to access the camera...");
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        console.log("Camera accessed successfully.");
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Error accessing camera: ", err));
  }, []);

  const captureFrame = () => {
    if (!isPredicting) {
      console.log("Starting real-time predictions...");
      setIsPredicting(true);
    }
  };

  useEffect(() => {
    if (isPredicting) {
      const intervalId = setInterval(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (!videoRef.current) {
          console.error("Video element is not available.");
          return;
        }
    
        if (!canvas || !context) {
          console.error("Canvas or context is not available.");
          return;
        }
    
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        console.log("Frame captured from video and drawn on canvas.");

        canvas.toBlob(async (blob) => {
          console.log("Frame converted to Blob.");
          const formData = new FormData();
          formData.append('file', blob, 'frame.jpg');
          console.log("Blob appended to FormData.");

          try {
            console.log("Sending frame to FastAPI backend for prediction...");
            const response = await fetch('http://localhost:8000/Disease_predict/', {
              method: 'POST',
              body: formData,
            });

            const data = await response.json();
            console.log("Response received from backend:", data);
            setPrediction(data.prediction);  // Update the state with the prediction
            console.log("Prediction state updated:", data.prediction);
          } catch (error) {
            console.error("Error predicting disease: ", error);
          }
        }, 'image/jpeg');
      }, 3000); // Fetch prediction every 3 seconds

      return () => clearInterval(intervalId);
    }
  }, [isPredicting]);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)] pt-5 pb-5">
      <video
        autoPlay
        loop
        muted
        className="fixed inset-0 w-full h-full object-cover"
      >
        <source src="/background_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col items-center mb-5 z-10">
        <video
          ref={videoRef}
          autoPlay
          className="w-full max-w-lg h-auto border-2 border-black rounded-lg mb-2 "
        />
        <button
          className="mt-3 px-4 py-2 text-lg font-semibold text-white bg-black bg-opacity-35 rounded-lg hover:scale-110"
          style={blockyTextStyle}
          onClick={captureFrame}
        >
          Start Live Prediction
        </button>
        <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
      </div>
      {prediction && (
        <div className="mt-5 p-5 bg-gray-100 rounded-lg shadow-lg text-center w-full max-w-lg z-[100]">
          <h3 className="text-lg font-bold">Prediction: {prediction}</h3>
        </div>
      )}
    </div>
  );
};

export default CropHealth;


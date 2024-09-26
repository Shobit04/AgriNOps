import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const CropsssHealth = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const [prediction, setPrediction] = useState(null); // State to hold the prediction result
  const [error, setError] = useState(null); // State to hold any errors

  const blockyTextStyle = {
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease", // Keeps the 3D shadow effect
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // Append the selected file to the form data

    try {
      const response = await fetch("http://localhost:8000/Crops", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("API Response:", data); // Log the API response for debugging

      if (response.ok) {
        setPrediction(data.predicted_class); // Set the prediction result
        setError(null); // Clear any previous errors
      } else {
        setError(data.error || "An error occurred during prediction.");
        setPrediction(null); // Clear the prediction result
      }
    } catch (err) {
      console.error("Request error:", err); // Log the error for debugging
      setError("An error occurred while making the request.");
      setPrediction(null); // Clear the prediction result
    }
  };

  return (
    <div id="sign-in" className="w-full h-screen relative">
      <video
        autoPlay
        loop
        muted
        className="fixed inset-0 w-full h-full object-cover"
      >
        <source src="/background_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="relative z-10 flex justify-center items-center w-full h-full flex-col"
        style={blockyTextStyle}
      >
        <h1 className="text-5xl font-extrabold text-white mb-10">Crop Analysis</h1>
        <form
          onSubmit={handleSubmit} // Add the submit handler here
          className="flex flex-col border-2 border-black rounded-lg p-5"
        >
          <input
            type="file"
            accept="image/*" // Only accept image files
            onChange={handleFileChange} // Handle file selection
            className="w-96 h-12 px-4 border-2 border-black rounded-lg mb-5"
          />
          <button
            type="submit" // Set type to "submit"
            className="border-2 border-black rounded-lg m-auto px-2 bg-black bg-opacity-25 py-2 text-white hover:scale-110"
            style={blockyTextStyle}
          >
            Submit
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {prediction && (
          <div className="mt-10 p-5 border-2 border-green-500 rounded-lg bg-white bg-opacity-25">
            <h2 className="text-3xl font-bold text-white">Prediction Result</h2>
            <p className="text-xl text-green-500 mt-4">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropsssHealth;

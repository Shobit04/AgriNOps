import React, { useState } from "react";

const SoilHealth = () => {
  const [soilData, setSoilData] = useState({
    N: "",
    P: "",
    K: "",
    pH: "",
    EC: "",
    OC: "",
    S: "",
    Zn: "",
    Fe: "",
    Cu: "",
    Mn: "",
    B: "",
  });

  const [prediction, setPrediction] = useState(null);

  const blockyTextStyle = {
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)", // Keeps the 3D shadow effect
    transition: "transform 0.3s ease", // Smooth transition for scaling effect
  };
  const cleanText = (text) => {
    if (!text) return '';
    return text.replace(/[**##$$]/g, '').trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSoilData((prevData) => ({
      ...prevData,
      [name]: value, // Store the value as a string to prevent issues with float parsing
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert soilData values to floats
    const formattedData = Object.fromEntries(
      Object.entries(soilData).map(([key, value]) => [key, parseFloat(value)])
    );

    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();
      const a=cleanText(data.prediction)

      setPrediction(a);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="soil" className="w-full h-screen relative">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <img
          src="/20.jpg"
          alt="Overlay"
          className="w-full h-full object-cover z-10"
        />
      </div>
      <div className="h-screen flex flex-col items-center justify-center text-center relative z-10">
        <h1 className="text-5xl text-white" style={blockyTextStyle}>
          Manual Soil Health Analysis
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {Object.keys(soilData).map((key) => (
              <div key={key} className="grid grid-rows-2" style={blockyTextStyle}>
                <label htmlFor={key} className="block text-white text-left pl-1">
                  {key}:
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={soilData[key]}
                  onChange={handleChange}
                  className="p-2 rounded w-full"
                  required
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-black bg-opacity-35 text-white my-4 px-4 py-2 border-2 border-black rounded-lg"
              style={blockyTextStyle}
            >
              Predict Soil Fertility
            </button>
          </div>
        </form>
        {prediction && (
          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="bg-white text-black p-4 rounded shadow-md">
              <h2 className="text-xl font-bold">Prediction Result</h2>
              <p className="mt-2">Fertility Level: {prediction}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilHealth;


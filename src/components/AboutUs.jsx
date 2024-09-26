import React from "react";

const AboutUs = () => {
  const blockyTextStyle = {
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)", // Keeps the 3D shadow effect
    transition: "transform 0.3s ease", // Smooth transition for scaling effect
  };

  const buttonHoverStyle = {
    transform: "scale(1.2)", // Scale up to 120% on hover
  };

  return (
    <div id="about-us" className="w-full h-screen relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center" // Place image behind content
      >
        <img
          src="/image.jpg" // Path relative to the public directory
          alt="Overlay"
          className="w-full h-full object-cover z-10"
        />
      </div>
      <div
        id="about"
        className="h-screen flex flex-col items-center justify-center text-center relative z-10" // Ensure content is above the image and video
      >
        <button
          className="text-5xl font-extrabold text-white mb-20 hover:scale-110 cursor-default"
          style={blockyTextStyle}
          aria-label="About Us"
        >
          About Us
        </button>

        <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full px-4">
          <div className="border border-white p-6 rounded-lg bg-black bg-opacity-45 hover:scale-[1.2]" style={blockyTextStyle}>
            <button
              className="text-3xl font-bold text-white py-10 w-full"
              style={{ ...blockyTextStyle, ...buttonHoverStyle }}
              aria-label="Our Mission"
            >
              Our Mission
            </button>
            <p className="text-white mt-4">
              We are dedicated to empowering farmers through advanced
              technology, providing them with the tools they need to succeed and
              sustain their practices.
            </p>
          </div>
          <div className="border border-white p-6 rounded-lg  bg-black bg-opacity-45 hover:scale-[1.2]" style={blockyTextStyle}>
            <button
              className="text-3xl font-bold  text-white  py-10 w-full"
              style={{ ...blockyTextStyle, ...buttonHoverStyle }}
              aria-label="Our Vision"
            >
              Our Vision
            </button>
            <p className="text-white mt-4 ">
              Our vision is a future where agriculture is fully supported by
              cutting-edge innovations, driving efficiency and sustainability
              across the globe.
            </p>
          </div>
          <div className="border border-white p-6 rounded-lg  bg-black bg-opacity-45 hover:scale-[1.2]" style={blockyTextStyle}>
            <button
              className="text-3xl font-bold  text-white  py-10 w-full"
              style={{ ...blockyTextStyle, ...buttonHoverStyle }}
              aria-label="Our Values"
            >
              Our Values
            </button>
            <p className="text-white mt-4">
              Integrity, innovation, and sustainability are at the core of
              everything we do. We strive to create lasting positive impacts on
              the agricultural community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

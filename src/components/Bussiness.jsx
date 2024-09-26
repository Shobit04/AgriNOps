import React from "react";

const Bussiness = () => {
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
          src="/Scene-7.jpg" // Path relative to the public directory
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
          Our Subscription!
        </button>

        <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full px-4">
          <div className="border border-white p-6 rounded-lg bg-black bg-opacity-45 hover:scale-[1.2]">
            <button
              className="text-3xl font-bold text-white py-10 w-full"
              style={{ ...blockyTextStyle, ...buttonHoverStyle }}
              aria-label="Our Mission"
            >
              Free Plan (Basic)
            </button>
            <p className="text-white mt-4 text-left text-lg">
            - Basic AI tools<br/>
            - Limited educational content<br/>
            - 3 disease scans/month<br/>
            - Community forum access<br/>
            - Farming tips updates<br/>
            </p>
          </div>
          <div className="border border-white p-6 rounded-lg  bg-black bg-opacity-45 hover:scale-[1.2]">
            <button
              className="text-3xl font-bold  text-white  py-10 w-full"
              style={{ ...blockyTextStyle, ...buttonHoverStyle }}
              aria-label="Our Vision"
            >
              Low-Cost Plan (Essential)
            </button>
            <p className="text-white mt-4 text-left text-lg">
            - Enhanced AI tools<br/>
            - 20 disease scans/month<br/>
            - Video tutorials<br/>
            - Market insights (limited)<br/>
            - Early access to new tools<br/>
            </p>
          </div>
          <div className="border border-white p-6 rounded-lg  bg-black bg-opacity-45 hover:scale-[1.2]">
            <button
              className="text-3xl font-bold  text-white  py-10 w-full"
              style={{ ...blockyTextStyle, ...buttonHoverStyle }}
              aria-label="Our Values"
            >
              Paid Plan (Premium)
            </button>
            <p className="text-white mt-4 text-left text-lg">
            - Unlimited AI tools<br/>
            - Unlimited disease scans<br/>
            - Full educational content<br/>
            - AI decision support <br/>
            - Market insights (full)<br/>
            - Priority support<br/>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bussiness;

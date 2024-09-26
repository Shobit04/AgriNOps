import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import NewSection from "./NewSection";
import Bussiness from "./Bussiness";
import AboutUs from "./AboutUs";


const Home = () => {
  const blockyTextStyle = {
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)", // Keeps the 3D shadow effect
  };

  return (
    <div id="home" className="w-full h-screen relative">
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
        <h1 className="text-8xl font-extrabold text-white py-10">AgriHelp</h1>
        <button
          className="text-xl font-extrabold text-white py-10 flex items-center space-x-2 animate-bounceCustom"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span>Check It Out!</span>
          <FontAwesomeIcon icon={faArrowDown} size="lg" />
        </button>
      </div>

      <NewSection />
      <Bussiness/>
      <AboutUs />
    </div>
  );
};

export default Home;

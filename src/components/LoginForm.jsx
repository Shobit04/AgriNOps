import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const blockyTextStyle = {
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease", // Keeps the 3D shadow effect
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    navigate("/"); // Navigate to the homepage

    // Wait for the navigation to complete, then scroll to the new section
    setTimeout(() => {
      document.getElementById("new-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Adjust the timeout as needed
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
        <h1 className="text-5xl font-extrabold text-white mb-10">Sign In</h1>
        <form
          onSubmit={handleSubmit} // Add the submit handler here
          className="flex flex-col border-2 border-black rounded-lg p-5"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-96 h-12 px-4 border-2 border-black rounded-lg mb-5"
          />
          <input
            type="password" // Changed to "password" input type for security
            placeholder="Password"
            className="w-96 h-12 px-4 border-2 border-black rounded-lg mb-10"
          />
          <button className="mb-4 hover:scale-110" style={blockyTextStyle}>
            Forgot Password?
          </button>
          <button
            type="submit" // Set type to "submit"
            className="border-2 border-black rounded-lg m-auto px-2 bg-black bg-opacity-25 py-2 text-white hover:scale-110"
            style={blockyTextStyle}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

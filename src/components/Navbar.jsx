import React from "react";
import { Link } from "react-scroll"; // Import Link from react-scroll

const Navbar = () => {
  const blockyTextStyle = {
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.2)", // Keeps the 3D shadow effect
  };

  return (
    <nav className="flex justify-between items-center p-5 text-blue-900 fixed top-0 w-full z-20">
      <div className="flex items-center" style={blockyTextStyle}>
        <Link 
        className="px-5 font-extrabold text-4xl transition-transform duration-200 hover:scale-110 cursor-pointer"
          to="home"
          smooth={true}
          duration={500}
          style={blockyTextStyle}
        >NOps</Link>
        <a
          href="/sign-in"
          className="px-5 text-xl transition-transform duration-200 hover:scale-110"
          style={blockyTextStyle}
        >
          Sign In
        </a>
      </div>
      <div className="inline-flex text-xl space-x-5" style={blockyTextStyle}>
        <a
          href="/"
          className="transition-transform duration-200 hover:scale-110 cursor-pointer"
          style={blockyTextStyle}
        >
          Home
        </a>
        <Link
          style={blockyTextStyle}
          to="about-us"
          smooth={true}
          duration={500}
          className="transition-transform duration-200 hover:scale-110 cursor-pointer"
        >
          About Us
        </Link>
        <a
          className="transition-transform duration-200 hover:scale-110 cursor-pointer"
          style={blockyTextStyle}
        >
          Contact Us
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

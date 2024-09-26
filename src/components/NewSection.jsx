import React, { useRef, useEffect } from "react";

const NewSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current.parentElement); // Observe the section container
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current.parentElement);
      }
    };
  }, []);

  const blockyTextStyle = {
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "2.25px 2.25px 0px rgba(0, 0, 0, 0.3)", // Keeps the 3D shadow effect
  };

  return (
    <div id="new-section" className="w-full h-screen relative">
      <video
        ref={videoRef}
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/foreground_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex justify-start items-center w-full h-full px-20">
        <div className="grid gap-8">
          <a
            className="text-3xl font-bold text-blue-900 py-10 hover:scale-125 transition-transform duration-300"
            style={blockyTextStyle}
            href="/soil"
          >
            Soil Health Analysis
          </a>
          <a
            className="text-3xl font-bold text-blue-900 py-10 hover:scale-125 transition-transform duration-300"
            style={blockyTextStyle}
            href="/crop"
          >
            Leaf Health Monitoring
          </a>
          <a
            className="text-3xl font-bold text-blue-900 py-10 hover:scale-125 transition-transform duration-300"
            style={blockyTextStyle}
            href="/cropsss"
          >
            Crop Health Monitoring
          </a>
          <a
            className="text-3xl font-bold text-blue-900 py-10 hover:scale-125 transition-transform duration-300"
            style={blockyTextStyle}
            href="/dashboard"
          >
            Location Based Monitoring
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewSection;

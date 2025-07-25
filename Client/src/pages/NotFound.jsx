import React from "react";
import { Link } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButtons";

const NotFound = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover z-0"
      >
        <source
          //src="https://cdn.pixabay.com/video/2021/07/30/83274-581386222_large.mp4"
          src="https://cdn.pixabay.com/video/2019/10/19/28067-367411324_large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content with blur and transparency */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 backdrop-blur-[1px] bg-black/70">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-6 text-center max-w-md">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <AnimatedButton
            text="Back to Home"
            className="bg-white text-gray-900 px-6 py-2 rounded-md hover:bg-blue-950 hover:text-white transition duration-100"
          />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

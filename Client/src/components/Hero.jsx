import React, { useRef } from 'react';
import { useSearch } from '../contexts/SearchContext';
import BookHeroVideo from '../assets/Book(HeroSection).mp4';

const Hero = () => {
  const { setSearch } = useSearch();
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current && videoRef.current.pause();
  };

  const handleMouseLeave = () => {
    videoRef.current && videoRef.current.play();
  };

  return (
    <section className="text-white h-[80vh] grid grid-cols-1 md:grid-cols-2 px-6 shadow-md">
      {/* Left Content */}
      <div className="flex justify-center items-center text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-400">BookVerse</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl text-gray-300">
            Discover and share your favorite books with the world. Read. Bookmark. Upload.
          </p>
          <button
            className="bg-white text-gray-900 px-6 py-2 rounded-md hover:bg-blue-950 hover:text-white transition duration-300"
            onClick={() => {
              setSearch(true);
            }}
          >
            Explore Books
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex justify-center items-center">
        <div
          className="relative w-full max-w-md aspect-video"
          onMouseEnter={handleMouseLeave}
          onMouseLeave={handleMouseEnter}
        >
          <div className="absolute inset-0 rounded-full blur-md opacity-30 z-0"></div>
          <video
            ref={videoRef}
            className="w-full h-full rounded-md object-cover relative z-1 opacity-70"
            src={BookHeroVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

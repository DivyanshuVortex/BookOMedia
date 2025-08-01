import React, { useState } from "react";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu on navigation
  };

  return (
    <div>
      <nav className="bg-[#0e0e20a6] text-white px-6 py-4 shadow-md flex justify-between items-center w-full">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          BookVerse
        </div>

        {/* Hamburger Button for Small Screens */}
        <div className="sm:hidden">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Navigation + Search - Desktop */}
        <div className="hidden sm:flex gap-8 items-center">
          <ul className="flex gap-6 text-lg">
            <li>
              <a
                onClick={() => handleNavigation("/")}
                className="relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/upload")}
                className="relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Upload
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/bookmarks")}
                className="relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Bookmarks
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/profile")}
                className="relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Profile
              </a>
            </li>
          </ul>

          {/* Search Button */}
          {search ? (
            <button
              onClick={() => setSearch(false)}
              className="ml-4 px-4 py-2 bg-white text-black rounded-md hover:bg-blue-950 hover:text-white border hover:border-white transition-all duration-300"
            >
              Close
            </button>
          ) : (
            <button
              onClick={() => setSearch(true)}
              className="ml-4 px-4 py-2 bg-white text-black rounded-md hover:bg-blue-950 hover:text-white border hover:border-white transition-all duration-300"
            >
              Search
            </button>
          )}
        </div>
      </nav>

    {menuOpen && (
  <div
    className="sm:hidden bg-[#0e0e20] text-white px-6 py-6 shadow-lg space-y-4"
    style={{
      perspective: "800px", // This gives the 3D effect
    }}
  >
    {[
      { label: "Home", path: "/" },
      { label: "Upload", path: "/upload" },
      { label: "Bookmarks", path: "/bookmarks" },
      { label: "Profile", path: "/profile" },
    ].map((item, i) => (
      <div
        key={item.label}
        onClick={() => handleNavigation(item.path)}
        className="text-lg cursor-pointer px-2 py-2 rounded-md hover:bg-white hover:text-black transition-all duration-300"
        style={{
          animation: "slideIn 0.6s ease-out forwards",
          animationDelay: `${i * 120}ms`,
          transformStyle: "preserve-3d",
        }}
      >
        {item.label}
      </div>
    ))}

    <div
      style={{
        animation: "slideIn 0.6s ease-out forwards",
        animationDelay: "500ms",
        transformStyle: "preserve-3d",
      }}
    >
      {search ? (
        <button
          onClick={() => setSearch(false)}
          className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-blue-950 hover:text-white border hover:border-white transition-all duration-300"
        >
          Close
        </button>
      ) : (
        <button
          onClick={() => setSearch(true)}
          className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-blue-950 hover:text-white border hover:border-white transition-all duration-300"
        >
          Search
        </button>
      )}
    </div>
  </div>
)}


      <SearchBar />
    </div>
  );
};

export default Navbar;

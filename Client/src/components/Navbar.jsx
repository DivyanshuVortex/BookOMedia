import React from "react";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
   <div>
     <nav className="bg-[#0e0e20a6] text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold cursor-pointer" onClick={() => handleNavigation("/")}>
        BookVerse
      </div>

      {/* Navigation Links + Search */}
      <div className="flex gap-4 items-center">
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

        {/* Conditionally Render Search */}
        {search ? (
          <div onClick={() => setSearch(false)}
          className="ml-4 text-center px-4 w-[7vw] py-2 bg-white text-black rounded-md hover:bg-blue-950 hover:text-white border hover:border-white transition-all duration-300 scale-95 hover:scale-100"
          >
            Close
          </div>
        ) : (
          <button
            onClick={() => setSearch(true)}
            className="ml-4 px-4 w-[7vw] py-2 bg-white text-black rounded-md hover:bg-blue-950 hover:text-white border hover:border-white transition-all duration-300 scale-95 hover:scale-100"
          >
            Search
          </button>
        )}
      </div>
    </nav>

    <SearchBar />
   </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu on nav
  };

  const navLinkClass =
    "relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className="w-full py-4 px-4">
      <nav className="bg-[#0e0e20a6] text-white shadow-md flex justify-between items-center w-full relative z-50">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          BOOKOMDEIA
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 items-center">
          <ul className="flex gap-4 text-lg">
            <li>
              <a onClick={() => handleNavigation("/")} className={navLinkClass}>
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/upload")}
                className={navLinkClass}
              >
                Upload
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/bookmarks")}
                className={navLinkClass}
              >
                Bookmarks
              </a>
            </li>
            <li>
              <a
                onClick={() => handleNavigation("/profile")}
                className={navLinkClass}
              >
                Profile
              </a>
            </li>
          </ul>

          {/* Search Toggle */}
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

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            className="flex flex-col justify-center items-center w-10 h-10 relative group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`block w-6 h-[2px] bg-white transition-transform duration-300 ease-in-out origin-center ${
                isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-[2px] bg-white my-[6px] transition-opacity duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-[2px] bg-white transition-transform duration-300 ease-in-out origin-center ${
                isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-[#0e0e20] z-40 px-6 py-4 flex flex-col gap-4 transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {["Home", "Upload", "Bookmarks", "Profile"].map((label, index) => {
            const paths = {
              Home: "/",
              Upload: "/upload",
              Bookmarks: "/bookmarks",
              Profile: "/profile",
            };

            return (
              <a
                key={label}
                onClick={() => handleNavigation(paths[label])}
                className={`
                  ${navLinkClass}
                  transition-all transform duration-500 ease-in-out
                  ${
                    isMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-4"
                  }
                  ${["delay-100", "delay-200", "delay-300", "delay-400"][index]}
                `}
              >
                {label}
              </a>
            );
          })}

          <button
            onClick={() => {
              setSearch(!search);
              setIsMenuOpen(false);
            }}
            className="mt-4 px-4 py-2 bg-white text-black rounded-md hover:bg-blue-950 hover:text-white border hover:border-white transition-all duration-300 delay-500"
          >
            {search ? "Close" : "Search"}
          </button>
        </div>
      </nav>

      <SearchBar />
    </div>
  );
};

export default Navbar;

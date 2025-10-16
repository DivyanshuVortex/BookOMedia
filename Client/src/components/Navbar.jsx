import React, { useState, useEffect } from "react";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Menu, X, Search, Home, UploadCloud, Bookmark, User } from "lucide-react";

const Navbar = () => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Upload", path: "/upload", icon: UploadCloud },
    { label: "Bookmarks", path: "/bookmarks", icon: Bookmark },
    { label: "Profile", path: "/profile", icon: User },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <header className="relative top-0 left-0 right-0 z-50">
      <nav
        className={`px-4 sm:px-8 py-3 flex justify-between items-center w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? "backdrop-blur-lg bg-[#0e0e20]/90 shadow-xl text-white border-b border-gray-700"
            : "bg-[#0e0e20] text-white"
        }`}
      >
        <div
          className="text-2xl font-extrabold cursor-pointer tracking-wider text-white/90 hover:text-white transition-colors"
          onClick={() => handleNavigation("/")}
        >
          BookOMedia
        </div>

        <div className="sm:hidden flex items-center gap-3">
          <button
            onClick={() => setSearch(!search)}
            aria-label={search ? "Close search" : "Open search"}
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Search size={22} />
          </button>
          <button
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden sm:flex gap-8 items-center">
          <ul className="flex gap-6 text-base font-medium">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  onClick={() => handleNavigation(item.path)}
                  className="relative cursor-pointer py-1 text-gray-300 hover:text-white transition-colors duration-200 
                  after:absolute after:left-0 after:-bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setSearch(!search)}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-all duration-300 shadow-md border-2 ${
              search
                ? "bg-white text-[#0e0e20] hover:bg-gray-200 border-white"
                : "bg-transparent text-white border-gray-400 hover:border-white"
            }`}
          >
            {search ? (
              <>
                <X size={18} /> Close
              </>
            ) : (
              <>
                <Search size={18} /> Search
              </>
            )}
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full ml-1 hidden lg:inline text-gray-400">
              Ctrl/Cmd+S
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-black/50 backdrop-blur-sm sm:hidden transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="bg-[#0e0e20] text-white shadow-xl space-y-2 p-4 transition-transform duration-300 ease-out transform origin-top w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <div
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className="flex items-center gap-3 text-lg cursor-pointer px-4 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-all duration-200"
              >
                <item.icon size={20} /> {item.label}
              </div>
            ))}

            <div className="pt-4">
              <button
                onClick={() => {
                  setSearch(!search);
                  setMenuOpen(false);
                }}
                className={`w-full flex justify-center items-center gap-2 px-4 py-3 text-base rounded-lg transition-all duration-300 shadow-md ${
                  search
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                {search ? <X size={20} /> : <Search size={20} />}
                {search ? "Close Search" : "Open Search"}
              </button>
            </div>
          </div>
        </div>
      )}

      <SearchBar />
    </header>
  );
};

export default Navbar;

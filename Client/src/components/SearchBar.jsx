import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";

const SearchBar = () => {
  const { search, setSearch, setSearchData } = useSearch();
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { searchData: urlSearchParam } = useParams();

 
  useEffect(() => {
    if (urlSearchParam) {
      setInput(urlSearchParam);
      setSearchData(urlSearchParam);
    }
  }, [urlSearchParam, setSearchData]);

  // Keyboard shortcuts: Ctrl+S / Cmd+S to open, Esc to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setSearch(true);
        setTimeout(() => inputRef.current?.focus(), 150);
      }
      if (e.key === "Escape") setSearch(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearch]);

  const toggleSearch = () => setSearch((prev) => !prev);

  const handleSearch = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setSearchData(trimmed);
      navigate(`/search/${trimmed}`);
      toggleSearch();
    }
  };

  if (!search) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-start pt-24 bg-blue-950/20 backdrop-blur-[1px]"
      onClick={() => setSearch(false)} 
    >
      <div
        className="w-full max-w-3xl mx-auto bg-blue-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/30 text-white"
        onClick={(e) => e.stopPropagation()} 
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search books..."
            className="w-full sm:flex-1 px-5 py-3 rounded-xl bg-white text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-950 shadow-inner transition-all"
          />
          <button
            type="submit"
            className="text-white px-6 py-2 rounded-xl hover:bg-white hover:text-blue-950 border-2 border-blue-950 transition-all"
          >
            Search
          </button>
          <button
            type="button"
            onClick={toggleSearch}
            className="text-white text-2xl hover:scale-110 transition-all duration-200"
            title="Close"
          >
            ❌
          </button>
        </form>
        <p className="text-center text-gray-100 text-sm mt-3">
          Press <kbd className="px-1 bg-blue-900/40 rounded">Esc</kbd> to close
        </p>
      </div>
    </div>
  );
};

export default SearchBar;

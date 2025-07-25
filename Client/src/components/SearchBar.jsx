import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";

const SearchBar = () => {
  const { search, setSearch, setSearchData } = useSearch();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { searchData: urlSearchParam } = useParams();

  useEffect(() => {
    // Autofill input from URL param when present
    if (urlSearchParam) {
      setInput(urlSearchParam);
      setSearchData(urlSearchParam);
    }
  }, [urlSearchParam, setSearchData]);

  const toggleSearch = () => setSearch((prev) => !prev);

  const handleSearch = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setSearchData(trimmed); // Set in context
      navigate(`/search/${trimmed}`);
    }
  };

  if (!search) return null;

  return (
    <div className="w-full px-4 mt-5 py-8 backdrop-blur-[3px] rounded-2xl shadow-2xl transition-all duration-800 border-b border-b-white border-t border-t-white">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search books..."
          className="w-full sm:flex-1 px-5 py-3 rounded-xl bg-white text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-950 shadow-inner transition-all"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleSearch}
            className="text-white px-6 py-2 rounded-xl hover:bg-white hover:text-blue-950 border-2 border-blue-950 transition-all"
          >
            Search
          </button>
          <button
            onClick={toggleSearch}
            className="text-white text-2xl blur-[1.5px] hover:blur-none hover:scale-110 transition-all duration-200"
            title="Close"
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState("");
  const [search, setSearch] = useState(false);
  const [bookId, setBookId] = useState("");

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        searchData,
        setSearchData,
        bookId,
        setBookId,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

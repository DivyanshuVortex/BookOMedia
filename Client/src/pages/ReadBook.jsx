import React, { useEffect, useState } from "react";
import { useSearch } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";

const ReadBook = () => {
  const { bookId: contextBookId } = useSearch();
  const { bookId: routeBookId } = useParams();
  const finalBookId = routeBookId || contextBookId;

  const [nightMode, setNightMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    if (!finalBookId) return;

    const url = `https://books.google.co.in/books?id=${finalBookId}&pg=PA0&output=embed`;
    setEmbedUrl(url);

    const fallbackTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(fallbackTimeout);
  }, [finalBookId]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!finalBookId) {
    return (
      <div>
        <div className="text-center text-red-500 mt-10 text-xl">
          ❌ Error: No book ID provided. Please go back and try again.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-white animate-spin" />
            <div className="absolute inset-3 rounded-full border-4 border-double border-white animate-spin opacity-5" />
            <div className="absolute inset-9 rounded-full border-4 border-dashed border-white animate-ping opacity-50" />
            <div className="absolute inset-9 rounded-full border-4 border-dashed border-white animate-spin opacity-30" />
          </div>
          <p className="pt-10 text-white text-xl font-semibold tracking-wide animate-pulse">
            Loading Book Details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center gap-4 py-4">
  <button
    onClick={() => setNightMode((prev) => !prev)}
    className={`px-5 py-2 rounded-md font-semibold shadow transition duration-300 ${
      nightMode
        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
        : "bg-gray-800 text-white hover:bg-gray-700"
    }`}
  >
    {nightMode ? "☀️ Light Mode" : "🌙 Night Mode"}
  </button>
</div>


      <div className="w-full h-screen rounded-2xl bg-gradient-to-b from-black via-gray-900 to-gray-400 flex justify-center items-center">
        <iframe
          title="Google Book Preview"
          src={embedUrl}
          onLoad={handleIframeLoad}
          loading="lazy"
          width="90%"
          height="80%"
          className="transition-all duration-1000"
          style={{
            border: 0,
            zIndex: 5,
            filter: nightMode ? "invert(95%) hue-rotate(180deg)" : "none",
            transition: "all 0.4s ease",
          }}
        />
      </div>
    </div>
  );
};

export default ReadBook;

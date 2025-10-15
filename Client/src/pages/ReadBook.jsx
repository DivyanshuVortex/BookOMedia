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
  const [showShareOption, setShowShareOptions] = useState(false);

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("URL copied to clipboard!");
  };

  useEffect(() => {
    if (!finalBookId) return;

    const fetchEmbedUrl = async () => {
      let url = `https://books.google.co.in/books?id=${finalBookId}&pg=PA0&output=embed`;

      // 1️⃣ Attempt backend fallback if Google Books fails
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/bookreads/${finalBookId}`
        );
        const data = await res.json();
        console.log("📚 Backend book data:", data);

        if (data?.pdfUrl) {
          url = `https://docs.google.com/gview?url=${encodeURIComponent(
            data.pdfUrl
          )}&embedded=true`;
        }

        console.log("✅ Using backend PDF URL:", url);
      } catch (err) {
        console.error("Error fetching book from backend:", err);
      }

      setEmbedUrl(url);
      setIsLoading(false);
    };

    fetchEmbedUrl();
  }, [finalBookId]);

  if (!finalBookId) {
    return (
      <div className="text-center text-red-500 mt-10 text-xl">
        ❌ Error: No book ID provided. Please go back and try again.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center cursor-none w-full h-screen bg-gray-900">
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
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Top buttons */}
      <div className="flex justify-center gap-4 py-4 relative">
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

        <button
          onClick={() => setShowShareOptions((prev) => !prev)}
          className="inline-block px-5 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700"
        >
          Share
        </button>
      </div>

      {/* Share options */}
      {showShareOption && (
        <div className="absolute m-5 sm:right-[20%] sm:top-[22%] z-50 bg-gray-300 border border-gray-200 rounded-lg shadow-xl p-4 w-72 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={currentUrl}
              readOnly
              className="flex-1 px-3 py-2 text-sm border rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
          <button
            className="bg-black w-full rounded-2xl m-1 mt-5 p-2 hover:bg-gray-400 hover:text-black hover:underline transition duration-300"
            onClick={() => setShowShareOptions(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Iframe to show book */}
      <div className="flex-1 flex justify-center items-center bg-gradient-to-b from-black via-gray-900 to-gray-400 rounded-2xl">
        <iframe
          title="Book Preview"
          src={embedUrl}
          loading="lazy"
          width="90%"
          height="90%"
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

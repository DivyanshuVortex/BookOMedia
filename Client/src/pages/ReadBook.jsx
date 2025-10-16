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
  const [showShareOptions, setShowShareOptions] = useState(false);

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("URL copied to clipboard!");
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!finalBookId) return;

    const fetchEmbedUrl = async () => {
      // Default Google Books embed
      let url = `https://books.google.co.in/books?id=${finalBookId}&pg=PA0&output=embed`;

      try {
        // Backend fallback
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/bookreads/${finalBookId}`
        );
        const data = await res.json();

        if (data?.pdfUrl) {
          url = `https://docs.google.com/gview?url=${encodeURIComponent(
            data.pdfUrl
          )}&embedded=true`;
        }
      } catch (err) {
        console.warn("Backend fetch failed, using Google Books embed:", err);
      }

      setEmbedUrl(url);

      // Ensure loading is cleared after short delay if iframe fails to load
      const fallbackTimeout = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(fallbackTimeout);
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
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Top Buttons */}
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

      {/* Share Options Overlay */}
      {showShareOptions && (
        <div className="absolute m-5 sm:right-[20%] sm:top-[22%] z-50 bg-gray-400 border border-gray-200 rounded-lg shadow-xl p-4 w-72 transition-all ease-in-out duration-300">
          {/* URL + Copy */}
          <div className="flex items-center gap-2 mb-4 text-black">
            <input
              type="text"
              value={currentUrl}
              readOnly
              className="flex-1 px-2 py-1 border rounded"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Copy
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-between px-4">
            {["twitter", "facebook", "whatsapp", "telegram"].map((platform) => (
              <a
                key={platform}
                href={
                  platform === "twitter"
                    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        currentUrl
                      )}`
                    : platform === "facebook"
                    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        currentUrl
                      )}`
                    : platform === "whatsapp"
                    ? `https://api.whatsapp.com/send?text=${encodeURIComponent(
                        currentUrl
                      )}`
                    : `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-150 duration-500"
                title={platform.charAt(0).toUpperCase() + platform.slice(1)}
              >
                <img
                  src={`https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${platform}.svg`}
                  alt={platform}
                  className="w-6 h-6"
                />
              </a>
            ))}
          </div>

          <button
            className="bg-black w-full rounded-2xl m-1 mt-5 p-2 hover:bg-blue-700 hover:text-white hover:underline transition duration-300"
            onClick={() => setShowShareOptions(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Iframe */}
      <div className="w-full h-screen rounded-2xl bg-gradient-to-b from-black via-gray-900 to-gray-400 flex justify-center items-center">
        <iframe
          title="Book Preview"
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

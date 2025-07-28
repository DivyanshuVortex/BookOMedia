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
  const [showshareoption, setShowShareOptions] = useState(false);

  const currentUrl = window.location.href;
  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("URL copied to clipboard!");
  };
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="inline ml-2"
            viewBox="0 0 16 16"
          >
            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
          </svg>
        </button>
      </div>
      {showshareoption && (
        <div className="absolute right-[20%] top-[22%] z-50 bg-gray-300 border border-gray-200 rounded-lg shadow-xl p-4 w-72 transition-all ease-in-out duration-300 delay-75">
          {/* URL + Copy Button */}
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

          {/* Icons only */}
          <div className="flex justify-between px-4">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
              title="Twitter"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg"
                alt="Twitter"
                className="w-6 h-6"
              />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
              title="Facebook"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
                alt="Facebook"
                className="w-6 h-6"
              />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
              title="WhatsApp"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
                alt="WhatsApp"
                className="w-6 h-6"
              />
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
              title="Telegram"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg"
                alt="Telegram"
                className="w-6 h-6"
              />
            </a>
          </div>
          <button className="bg-black w-full rounded-2xl m-1 mt-5 p-2 hover:bg-gray-400 hover:text-black hover:underline transition duration-300"
          onClick={()=>{
            setShowShareOptions(false);
          }}
          > Close </button>
        </div>
      )}

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

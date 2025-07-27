import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import AnimatedButtons from "../components/AnimatedButtons";
import BackGround from "../assets/BackGround(hero).mp4";
import { useAuth } from "../contexts/LoginContext";

const Book = () => {
  const { bookId: contextBookId, setBookId } = useSearch();
  const { setBookIds, bookIds } = useAuth();
  const { bookId: urlBookId } = useParams();

  const navigate = useNavigate();
  const bookId = urlBookId || contextBookId;
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) return;

    const fetchBookData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/book/${bookId}`);
        const data = await res.json();
        setBookData(data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handlebookmark = () => {
    setBookIds((prev) => {
      if (prev.includes(bookId)) return prev; 
      return [...prev, bookId];
    });
  };

  if (!bookId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
        <p className="text-lg">No book selected.</p>
      </div>
    );
  }

  if (loading) {
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

  const title = bookData?.title || "Unknown Title";
  const authors = Array.isArray(bookData?.authors)
    ? bookData.authors.join(", ")
    : bookData?.authors || "Unknown Author";
  const desc = bookData?.description || "No description available.";
  const rawThumbnail = bookData?.thumbnail || "https://via.placeholder.com/150";
  const image = rawThumbnail.includes("books.google.com")
    ? rawThumbnail.replace(/zoom=\d+/, "zoom=0.5") +
      (rawThumbnail.includes("zoom=") ? "" : "&zoom=0")
    : rawThumbnail;

  return (
    <div className="relative min-h-screen text-white">
      <video
        src={BackGround}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10"
      />

      <div className="w-auto mx-auto px-4 pt-16 pb-20">
        <div className="flex flex-col md:flex-row gap-6 justify-evenly bg-[#0e0e20a6] border border-gray-700 rounded-xl shadow-lg p-6">
          {/* Book Cover */}
          <div className="flex justify-center md:justify-start">
            <img
              src={image}
              alt={`${title} cover`}
              loading="lazy"
              className="w-60 h-90 object-cover rounded-md shadow-md scale-95 opacity-80 hover:scale-105 hover:opacity-100 transition-all duration-300"
            />
          </div>

          {/* Book Info */}
          <div className="flex flex-row sm:flex-col justify-start space-y-2 max-w-2xl">
            <h2 className="text-2xl ml-4 md:text-3xl font-bold">
              {title}
              <span
                className=" inline-block opacity-50 scale-95 hover:opacity-100 hover:scale-105 border border-amber-50 h-auto ml-5 w-fit px-2 py-1 text-sm rounded transition duration-200"
                onClick={handlebookmark}
              >
                BOOKMARK IT!!!
              </span>
            </h2>

            <p className="text-md ml-4.5 text-gray-300">{authors}</p>
            <div
              className="text-base text-gray-500 leading-relaxed tracking-wide prose prose-sm prose-p:my-2 prose-i:text-gray-700 prose-i:not-italic scale-95"
              dangerouslySetInnerHTML={{ __html: desc }} // Cause XSS error/attack bcoz desc is coming in html
            ></div>

            <hr />
            <div className="flex justify-center mt-6 gap-4">
              <AnimatedButtons
                className="hover:bg-black hover:text-white border hover:border-b-white"
                text="Read Preview"
                onClick={() => {
                  setBookId(bookId);
                  navigate(`/ReadBook/${bookId}`);
                }}
              />

              <AnimatedButtons
                text="Download"
                className="hover:bg-black hover:text-white border hover:border-b-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;

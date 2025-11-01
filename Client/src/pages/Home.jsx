import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import Hero from "../components/Hero";
import BackGround from "../assets/BackGround.mp4";

import B1 from "../assets/B1.jpeg";
import B2 from "../assets/B2.jpeg";
import B3 from "../assets/B3.jpeg";
import B4 from "../assets/B4.jpeg";
import B5 from "../assets/B5.jpeg";
import B6 from "../assets/B6.jpeg";

const books = [
  {
    id: "pOu_DwAAQBAJ",
    title: "She's Hard to Get",
    author: "Zi MengXiaoCao",
    pageCount: 836,
    thumbnail: B1,
  },
  {
    id: "FzVjBgAAQBAJ",
    title: "The Alchemist",
    author: "Paulo Coelho",
    pageCount: 208,
    thumbnail: B2,
  },
  {
    id: "VxVr0lf1raQC",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    pageCount: 631,
    thumbnail: B3,
  },
  {
    id: "_l-PjpBOv9gC",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    pageCount: 238,
    thumbnail: B4,
  },
  {
    id: "7p6xDwAAQBAJ",
    title: "You Should See Me in a Crown",
    author: "Leah Johnson",
    pageCount: 336,
    thumbnail: B5,
  },
  {
    id: "RfauDgAAQBAJ",
    title: "Long Way Down (Verse Novel)",
    author: "Jason Reynolds",
    pageCount: 320,
    thumbnail: B6,
  },
];

const Home = () => {
  const { setBookId } = useSearch();
   const [waker, setWaker] = useState(true);
  const [counter, setCounter] = useState(0);

 // 🕒 Ping backend every 2 seconds for up to 10 times
useEffect(() => {
  let count = 0;
  const maxCalls = 10;
  const interval = setInterval(async () => {
    count += 1;
    setCounter(count);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/waker`);

      if (res.ok) {
        console.log("✅ Backend is awake!");
        setWaker(false);
        clearInterval(interval);
        return;
      } else {
        console.warn(`⚠️ Backend responded with status ${res.status}`);
      }
    } catch (err) {
      console.warn("⚠️ Backend still sleeping");
    }

    if (count >= maxCalls) {
      clearInterval(interval);
      setWaker(false);
    }
  }, 2000);

  return () => clearInterval(interval);
}, []);



  return (
    <div className="relative min-h-screen text-white cursor-none">
      {/* Background Video */}
      <video
        src={BackGround}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10"
      />

      <Hero />

      {/* 🔴 Be waker */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div
          className={`h-4 w-4 rounded-full border transition-all duration-300 ${
            waker
              ? "bg-red-500 border-red-700 animate-pulse"
              : "bg-green-500 border-green-700"
          }`}
        ></div>
        <p className="text-sm font-medium opacity-80">
          {waker ? "Backend waking ..." : "Live & Ready"}
        </p>
      </div>

      {/* Recommended Reads */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold mb-6 text-white">
          Recommended Reads
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              onClick={() => setBookId(book.id)}
              className="border-2 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-200 p-4 cursor-pointer"
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-64 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold truncate">{book.title}</h3>
              <p className="text-gray-400 text-sm">
                by {book.author}{" "}
                <span className="italic text-gray-500">
                  ({book.pageCount} pages)
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* UX Improvement: Suggestion Text */}
      <section className="px-6 pb-16">
        <h3 className="text-lg text-gray-400 italic mt-6 border-t border-gray-800 pt-6">
          Looking for something specific? Try searching by title!
        </h3>
      </section>
    </div>
  );
};

export default Home;

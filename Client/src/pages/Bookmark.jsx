import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/LoginContext";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const { bookIds, setBookId, token, setBookIds, login } = useAuth();
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const beURL = import.meta.env.VITE_BASE_BE_URL || "http://localhost:3000/";
  // 🔐 Fetch user's bookmarked bookIds from backend
  useEffect(() => {
    if (!token) return;

    const fetchUserBookmarks = async () => {
      try {
        const res = await fetch(
          `${beURL}api/user/bookmarks`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch bookmarks");

        const data = await res.json();
        setBookIds(data.bookmarks);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchUserBookmarks();
  }, [token, setBookIds]);

  // 📚 Fetch book data from Google API
  useEffect(() => {
    const fetchBooksFromAPI = async () => {
      if (!bookIds || bookIds.length === 0) {
        setFetchedBooks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const books = await Promise.all(
        bookIds.filter(Boolean).map(async (id) => {
          try {
            const res = await fetch(
              `https://www.googleapis.com/books/v1/volumes/${id}`
            );
            const data = await res.json();

            const thumbnailRaw = data.volumeInfo.imageLinks?.thumbnail;
            const thumbnailimg = thumbnailRaw;
            return {
              id: data.id,
              title: data.volumeInfo.title,
              author: data.volumeInfo.authors?.[0] || "Unknown",
              thumbnail: thumbnailimg,
              pageCount: data.volumeInfo.pageCount || "N/A",
              publishedYear:
                data.volumeInfo.publishedDate?.slice(0, 4) || "N/A",
            };
          } catch (err) {
            console.error("Failed to fetch book with ID:", id);
            return null;
          }
        })
      );

      setFetchedBooks(books.filter((book) => book !== null));
      setLoading(false);
    };

    fetchBooksFromAPI();
  }, [bookIds]);

  return (
    <div className="p-4 min-h-screen bg-transparent">
      <div className="max-w-6xl mx-auto bg-transparent rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-400">
          My Bookmarks
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading bookmarks...</p>
        ) : fetchedBooks.length === 0 ? (
          <p className="text-center text-gray-500">
            {login
              ? "No books are bookmarked."
              : "Sign in to hold the bookmarks."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {fetchedBooks.map((book, index) => (
              <Link
                key={book.id || index}
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
                  by {book.author} in <span>{book.publishedYear}</span>
                </p>
                <p className="text-blue-600 text-sm mt-2">
                  Total pages: {book.pageCount}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/LoginContext";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const { token, setBookId, login } = useAuth();
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!login || !token) {
        setFetchedBooks([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/bookmarks`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch bookmarks");
        const data = await res.json();

        const { mongoBooks, googleBooks } = data.bookmarks;

        // Format MongoDB books
        const mongoBooksFormatted = mongoBooks.map((book) => ({
          id: book._id,
          title: book.title,
          author: book.authors?.[0] || "Unknown",
          thumbnail: book.thumbnailUrl,
          publishedYear: "N/A",
        }));

        // Fetch Google Books in parallel
        const googleBooksFormatted = await Promise.all(
          googleBooks.map(async (id) => {
            try {
              const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
              if (!res.ok) throw new Error("Google book not found");
              const data = await res.json();
              return {
                id: data.id,
                title: data.volumeInfo.title,
                author: data.volumeInfo.authors?.[0] || "Unknown",
                thumbnail: data.volumeInfo.imageLinks?.thumbnail,
                pageCount: data.volumeInfo.pageCount || "N/A",
                publishedYear: data.volumeInfo.publishedDate?.slice(0, 4) || "N/A",
              };
            } catch (err) {
              console.error("Failed to fetch Google book:", id, err);
              return null;
            }
          })
        );

        // Merge and remove nulls
        setFetchedBooks([...mongoBooksFormatted, ...googleBooksFormatted.filter(Boolean)]);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
        setFetchedBooks([]);
      }

      setLoading(false);
    };

    fetchBookmarks();
  }, [login, token]);

  if (!login) {
    return (
      <div className="p-4 min-h-screen flex justify-center items-center text-gray-500">
        Sign in to view your bookmarks.
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-transparent">
      <div className="max-w-6xl mx-auto bg-transparent rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-400">
          My Bookmarks
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading bookmarks...</p>
        ) : fetchedBooks.length === 0 ? (
          <p className="text-center text-gray-500">No books are bookmarked.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {fetchedBooks.map((book) => (
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
                  by {book.author} in <span>{book.publishedYear === "N/A" ? "2025" : book.publishedYear}</span>
                </p>
                <span className="text-blue-600 text-sm">Quick View</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;

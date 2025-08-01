import React, { useEffect, useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListofBook = () => {
  const { searchData, setBookId } = useSearch();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  
  const handler = (bookid) => {
    setBookId(bookid);
    navigate(`/book/${bookid}`);
  };

  useEffect(() => {
    if (!searchData) return;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://bookomedia.onrender.com/search?title=${searchData}`);
        setBooks(res.data); // Assumes it's an array of books
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchData]);

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

  return (
    <div className="min-h-screen">
      <div className="p-6 mt-10">
        {books.length === 0 ? (
          <p className="text-center text-white text-lg">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-blue-950 rounded-xl shadow-lg overflow-hidden hover:shadow-black flex hover:shadow-2xl transition duration-300 border scale-95 hover:scale-100 hover:bg-black border-blue-800 cursor-pointer"
                onClick={() => handler(book.id)}
              >
                {book.thumbnail && (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-32 h-auto object-contain"
                  />
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-white text-lg mb-1 truncate">
                    {book.title || "Untitled"}
                  </h2>
                  <span>Language : <strong>{book.language}</strong> </span>
                  <p className="text-sm text-gray-400 mb-2">
                    {book.authors?.join(', ') || "Unknown Author"}
                  </p>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {book.description || "No description available."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListofBook;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/LoginContext';
const Profile = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const user = {
    name: 'Divyanshu',
    email: 'divyanshu@example.com',
    bookmarkedBooks: [
      {
        id: 1,
        title: 'Atomic Habits',
        author: 'James Clear',
        thumbnail: 'https://covers.openlibrary.org/b/id/10523383-L.jpg',
        link: 'https://openlibrary.org/works/OL18918138W/Atomic_Habits',
      },
      {
        id: 2,
        title: 'Deep Work',
        author: 'Cal Newport',
        thumbnail: 'https://covers.openlibrary.org/b/id/11113971-L.jpg',
        link: 'https://openlibrary.org/works/OL17371713W/Deep_Work',
      },
      {
        id: 3,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        thumbnail: 'https://covers.openlibrary.org/b/id/8231856-L.jpg',
        link: 'https://openlibrary.org/works/OL262758W/The_Alchemist',
      },
    ]
  };

  const handleSignIn = () => navigate('/signin');
  const handleSignUp = () => navigate('/signup');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-gray-950 bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-6">
          <h2 className="text-3xl font-bold mb-6 text-center">👤 Profile</h2>

          { login ? (
            <div className="mb-8 text-center">
              <img
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ) : (
            <div className="text-center text-gray-400 mb-6">You are not signed in.</div>
          )}

          {!login && (
            <>
              <div className="flex gap-4 justify-center mb-10">
                <button
                  className="bg-blue-800 px-4 py-2 rounded-xl hover:bg-blue-500 transition"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
                <button
                  className="bg-blue-800 px-4 py-2 rounded-xl hover:bg-blue-500 transition"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>

              {/* Blurred dummy book preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {[1, 2].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-gray-900 rounded-xl p-4 shadow-md filter blur-sm opacity-60 pointer-events-none"
                  >
                    <div className="w-16 h-24 bg-gray-700 rounded animate-pulse" />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {login && (
            <>
              <h3 className="text-xl font-semibold mb-4">📌 Bookmarked Books</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.bookmarkedBooks.map((book) => (
                  <a
                    href={book.link}
                    key={book.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-gray-900 hover:bg-gray-800 transition rounded-xl p-4 shadow-md"
                  >
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <h4 className="font-bold text-lg">{book.title}</h4>
                      <p className="text-sm text-gray-400">by {book.author}</p>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

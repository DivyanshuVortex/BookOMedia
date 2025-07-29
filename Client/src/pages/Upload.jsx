import React, { useState } from 'react';

const UploadBook = () => {
  const [preview, setPreview] = useState(null);

  const handleThumbnailPreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-lg border border-gray-700">
        <h2 className="text-3xl font-semibold text-center mb-6">📚 Upload Your Book</h2>
        
        <form className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Book Title</label>
            <input
              type="text"
              placeholder="Enter book title"
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
          
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Description</label>
            <textarea
              placeholder="Write a short description"
              rows="3"
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-700"
             
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">PDF File</label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full text-sm text-gray-400 file:bg-blue-900 file:text-white file:rounded-md file:px-4 file:py-1 file:border-none hover:file:bg-blue-800"
          
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailPreview}
              className="w-full text-sm text-gray-400 file:bg-blue-900 file:text-white file:rounded-md file:px-4 file:py-1 file:border-none hover:file:bg-blue-800"
             
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 rounded-lg shadow-lg border border-gray-600 h-40 object-cover mx-auto"
              />
            )}
          </div>

          <a href='THIS_FEATURE_IS_NOT_LIVE'
            type="submit"
           className="w-full block text-center bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 transition-all duration-300 text-white font-semibold py-2 rounded-xl shadow-lg"
          >
            Upload Book
          </a>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;

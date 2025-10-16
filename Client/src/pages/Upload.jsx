import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [desc, setDesc] = useState("");
  const [pdf, setPdf] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [lang, setLang] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadedData, setUploadedData] = useState(null);
  const [slowNetwork, setSlowNetwork] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleThumbnailPreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !authors || !pdf || !thumbnail || !desc || !lang ) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setSlowNetwork(false);
      setSuccess(false);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("authors", authors);
      formData.append("description", desc);
      formData.append("pdf", pdf);
      formData.append("thumbnail", thumbnail);
      formData.append("language", lang);

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
          if (percent < 10 && event.timeStamp > 3000) setSlowNetwork(true);
        },
      });

      setUploadedData(res.data);
      setSuccess(true);
   

      setTimeout(() => {
        setUploading(false);
        setProgress(0);
        setSuccess(false);
        navigate("/"); 
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed! Check your backend or network.");
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-gray-900 text-white flex items-center justify-center px-4 relative">
      {uploading && (
        <div className="absolute inset-0 bg-black/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="bg-gray-800/90 rounded-2xl p-6 w-72 flex flex-col items-center">
            {!success ? (
              <>
                <div className="mb-4 animate-spin border-4 border-blue-500 border-t-transparent w-12 h-12 rounded-full"></div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-4 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm mb-1">{progress}%</p>
                {slowNetwork && (
                  <p className="text-xs text-yellow-400 text-center mt-2 animate-pulse">
                    ⚠️ Slow network detected. Upload may take longer.
                  </p>
                )}
                <p className="text-gray-300 text-xs mt-2">Uploading your book...</p>
              </>
            ) : (
              <>
                <div className="mb-2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white text-3xl font-bold">✔️</span>
                </div>
                <p className="text-green-400 font-semibold">Upload Successful!</p>
              </>
            )}
          </div>
        </div>
      )}

      <div
        className={`bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl p-9 w-full max-w-lg border border-gray-700 relative z-10 ${
          uploading ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <h2 className="text-3xl font-semibold text-center mb-6">📚 Upload Your Book</h2>

        <form className="space-y-5" onSubmit={handleUpload}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Book Title *</label>
            <input
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Author(s) *</label>
            <input
              type="text"
              placeholder="Enter author names"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              required
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Language *</label>
            <select name="language" id="language" value={lang} onChange={(e) => setLang(e.target.value)} required className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700">
              <option value="">Select a language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Description</label>
            <textarea
              placeholder="Write a short description"
              rows="3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">PDF File *</label>
            <input
              type="file"
              accept="application/pdf"
              required
              onChange={(e) => setPdf(e.target.files[0])}
              className="w-full text-sm text-gray-400 file:bg-blue-900 file:text-white file:rounded-md file:px-4 file:py-1 file:border-none hover:file:bg-blue-800"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Thumbnail Image *</label>
            <input
              type="file"
              accept="image/*"
              required
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

          <button
            type="submit"
            disabled={uploading}
            className="w-full block text-center bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 transition-all duration-300 text-white font-semibold py-2 rounded-xl shadow-lg"
          >
            {uploading ? "Uploading..." : "Upload Book"}
          </button>
        </form>

        {uploadedData && !uploading && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">✅ Upload Successful!</h3>
            <p className="text-sm text-gray-300">Title: {uploadedData.title}</p>
            <p className="text-sm text-gray-300">Authors: {uploadedData.authors}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadBook;

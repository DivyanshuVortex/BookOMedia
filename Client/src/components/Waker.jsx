import React, { useEffect, useState } from "react";

const Waker = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("Free Tier - waking up backend...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wakeBackend = async () => {
      setShow(true);
      setLoading(true);

      const url = `${import.meta.env.VITE_API_BASE_URL}/wake-me-up`;
      const retries = 3;
      const delay = 4000; 

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Server status: ${response.status}`);
          const data = await response.text();
          setMessage(data || "Backend is awake!");
          setLoading(false);
          setTimeout(() => setShow(false), 1500); // close popup shortly after success
          break; // exit loop on success
        } catch (error) {
          console.error(`Attempt ${attempt} failed:`, error);
          if (attempt === retries) {
            setMessage("Failed to wake up backend 😅");
            setLoading(false);
            setTimeout(() => setShow(false), 5000);
          } else {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }
    };

    wakeBackend();
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition duration-500 scale-100 border-b-4 border-indigo-500">
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-4">Hello There!</h2>
        <p className="text-gray-700 mb-6 text-base font-medium">{message}</p>

        {loading && (
          <div className="w-12 h-12 mx-auto border-4 border-dashed border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
};

export default Waker;

import React from "react";
import Navbar from "../components/Navbar";
import AnimatedButton from "../components/AnimatedButtons";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Left Section - Info and Form */}
        <div>
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-6">
            <p className="text-lg mb-6">
              Have questions, suggestions, or want to collaborate? <br /> <br />
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AnimatedButton text={"GitHub"} />
              </a>
            </p>

            <span className="block mt-2 font-semibold text-blue-400">
              divyanshuchandra9027@example.com
            </span>
            <span className="block text-sm text-gray-400">+91 9027832361</span>
          </p>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm text-gray-300"
              >
                Name (optional)
              </label>
              <input
                type="text"
                id="name"
                placeholder="eg. John Show "
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="suggestion"
                className="block mb-1 text-sm text-gray-300"
              >
                Suggestion
              </label>
              <textarea
                id="suggestion"
                placeholder="Write your suggestion..."
                rows="4"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="flex items-center justify-center">
          <img
            src="https://www.svgrepo.com/show/415825/contact-headset-communication.svg"
            alt="Contact Vector"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;

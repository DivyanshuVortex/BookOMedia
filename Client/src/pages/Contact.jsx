import AnimatedButton from "../components/AnimatedButtons";
import BGV from '../assets/ContactBE.mp4'

const Contact = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 🔁 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source
          src={BGV}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* 🔳 Overlay with blur */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-[2px] z-0"></div>

      {/* 📦 Main Content */}
      <div className="relative z-10 flex justify-center items-center p-8">
        {/* Left Section */}
        <div>
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-6">
            Have questions, suggestions, or want to collaborate? <br /> <br />
            <a
              href="https://github.com/DivyanshuVortex/BookOMedia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AnimatedButton text={"GitHub"} />
            </a>
            <span className="block mt-4 font-semibold text-blue-400">
              divyanshuchandra9027@example.com
            </span>
            <span className="block text-sm text-gray-300">+91 9027832361</span>
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
                placeholder="eg. John Show"
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
              className="px-6 py-2 bg-blue-800 hover:bg-blue-500 rounded-lg text-white font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

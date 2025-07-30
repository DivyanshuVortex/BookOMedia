import React, { useEffect, useState } from "react";
import AnimatedButton from "../components/AnimatedButtons";
import BGV from "../assets/ContactBE.mp4";
import { Link } from "react-router-dom";

// 🔁 Just for fun
const quotes = [
  { name: "Tony Stark", quote: "Part of the journey is the end. Everyone wants a happy ending. But it doesn’t always roll that way." },
  { name: "Thanos", quote: "I know what it’s like to lose. To feel so desperately that you're right, yet to fail nonetheless." },
  { name: "Bruce Wayne", quote: "It's not who I am underneath, but what I do that defines me." },
  { name: "The Joker", quote: "Madness, as you know, is like gravity. All it takes is a little push." },
  { name: "Murph (Interstellar)", quote: "Time is relative, okay? It can stretch and it can squeeze, but it can't run backwards. Just can't." },
  { name: "Cooper (Interstellar)", quote: "We used to look up at the sky and wonder at our place in the stars. Now we just look down and worry about our place in the dirt." },
  { name: "Dom Cobb (Inception)", quote: "An idea is like a virus, resilient, highly contagious. And even the smallest seed of an idea can grow..." },
  { name: "Captain America", quote: "The price of freedom is high, and it's a price I'm willing to pay." },
  { name: "Tyrion Lannister", quote: "Never forget what you are. The rest of the world will not. Wear it like armor, and it can never be used to hurt you." },
  { name: "Jon Snow", quote: "The things I do for love. I never wanted a crown. I only wanted to protect the North." },
  { name: "Albus Dumbledore", quote: "It does not do to dwell on dreams and forget to live. Remember that." },
  { name: "Gandalf", quote: "All we have to decide is what to do with the time that is given us." },
  { name: "Spider-Man (No Way Home)", quote: "With great power, there must also come great responsibility." },
  { name: "Dr. Strange", quote: "We're in the endgame now." },
  { name: "Rocky Balboa", quote: "It ain’t about how hard you hit. It’s about how hard you can get hit and keep moving forward." },
  { name: "Thanos", quote: "The hardest choices require the strongest wills." },
  { name: "Peaky Blinders (Tommy)", quote: "You can change what you do, but you can’t change what you want." },
  { name: "Jack Sparrow", quote: "The problem is not the problem. The problem is your attitude about the problem." },
  { name: "Walter White", quote: "I have nothing to lose. I am the danger. A guy opens his door and gets shot and you think that of me? No. I am the one who knocks!" },
  { name: "Arya Stark", quote: "Leave one wolf alive, and the sheep are never safe." },
  { name: "Yoda", quote: "Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering." },
  { name: "Neo", quote: "I know you're out there. I can feel you now. I know that you're afraid... you're afraid of us." },
  { name: "Buzz Lightyear", quote: "To infinity — and beyond!" },
  { name: "Iron Man", quote: "If we can't protect the Earth, you can be damn sure we'll avenge it." }
];

const Contact = () => {
  const [currentQuote, setCurrentQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(random);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const suggestion = e.target.suggestion.value;

    try {
      const res = await fetch("http://localhost:3000/api/user/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, suggestion }),
      });

      if (res.ok) {
        alert("✅ Suggestion sent successfully!");
        e.target.reset();
      } else {
        alert("❌ Failed to send suggestion.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error while sending.");
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 🔁 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={BGV} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔳 Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-[2px] z-0"></div>

      {/* 📦 Content */}
      <div className="relative z-10 flex justify-center items-center p-8">
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
            <Link to={"/"}>
  <div className="ml-4 mb-1 p-2 inline-block px-[22vw] py-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-white/20 transition-all ease-in-out duration-600 rounded-lg font-medium text-sm shadow-sm hover:px-5 w-2xl">
    ← Go to Home
  </div>
</Link>
            <span className="block mt-4 font-semibold text-blue-400">
              divyanshuchandra9027@example.com
            </span>
            <span className="block text-sm text-gray-300">+91 9027832361</span>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-1 text-sm text-gray-300">
                Name (optional)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={`e.g. ${currentQuote.name}`}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="suggestion" className="block mb-1 text-sm text-gray-300">
                Suggestion
              </label>
              <textarea
                id="suggestion"
                name="suggestion"
                placeholder={currentQuote.quote}
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


import { useSearch } from '../contexts/SearchContext';
import AnimatedButton from './AnimatedButtons';

const Hero = () => {
  const { setSearch } = useSearch();

  return (
    <section className="text-white h-[80vh] p-6 flex justify-center items-center shadow-md">
      {/* Left Content */}
      <div className="flex justify-center items-center text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-400">BookVerse</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl text-gray-300">
            Discover and share your favorite books with the world. Read. Bookmark. Upload.
          </p>
          <AnimatedButton text={"Explore Books"}
            className="bg-white text-gray-900 px-6 py-2 rounded-md hover:bg-blue-950 hover:text-white transition duration-100"
            onClick={() => {
              setSearch(true);
            }}
          />

        </div>
      </div>
    </section>
  );
};

export default Hero;

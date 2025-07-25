import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 w-full px-4">
      <div className="px-2 mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
        <p className="mb-2 sm:mb-0">&copy; {new Date().getFullYear()} BookVerse. All rights reserved.</p>

        <div className="flex gap-6 text-sm">
          <a
            href="../Contact"
            className="relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-500 hover:after:w-full"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

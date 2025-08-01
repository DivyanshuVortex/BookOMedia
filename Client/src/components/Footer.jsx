import React from "react";
import { useAuth } from "../contexts/LoginContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { user, login } = useAuth();
  return (
    <footer className="bg-gray-900 text-white py-6 w-full px-4">
      <div className="px-2 mx-auto flex flex-row justify-between items-center text-sm">
        <p className="mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm items-center">
          {login ? (
             <Link to="/profile">
              <img
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
                alt="Profile"
                className="w-10 h-10 bg-amber-50 rounded-full opacity-0 sm:opacity-100"
              />
            </Link>
          ) : (
            <div className="w-10 h-10 blur-sm bg-amber-50 rounded-full opacity-0 sm:opacity-100">
              {" "}
            </div>
          )}

          <Link
            to="/contact"
            className="relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-500 hover:after:w-full"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

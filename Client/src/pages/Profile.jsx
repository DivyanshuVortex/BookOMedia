import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/LoginContext";
import AnimatedButton from "../components/AnimatedButtons";

const Profile = () => {
  const navigate = useNavigate();
  const { login, setLogin, user: BEuser } = useAuth();

  const user = {
    name: BEuser?.name ?? "Guest User",
    email: BEuser?.email ?? "No Email",
    verified: BEuser?.isVerified ?? false,
  };

  const handleSignIn = () => navigate("/signin");
  const handleSignUp = () => navigate("/signup");
  // const handleVerify = () => navigate("/verify");
  const handleLogout = () => {
    setLogin(false);
    localStorage.removeItem("token");
  };

  const goToBookmarks = () => navigate("/bookmarks");

  return (
    <div className="min-h-screen cursor-none bg-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-950 bg-opacity-90 rounded-2xl shadow-xl p-6">
          <h2 className="text-3xl font-bold mb-6 text-center">👤 Profile</h2>

          {login ? (
            <div className="bg-gray-900/70 rounded-xl p-6 shadow-md text-center mb-10">
              <img
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-4 ring-2 ring-blue-500"
              />
              <p className="text-lg font-semibold">
                {user.name}
                <span className="ml-3 text-sm align-middle">
                  {user.verified ? (
                    <span className="text-green-400 bg-green-900/40 px-2 py-1 rounded-full">
                      ✅ Verified
                    </span>
                  ) : (
                    <span
                      // onClick={handleVerify}
                      className="text-red-400 cursor-pointer hover:underline"
                    >
                      
                    </span>
                  )}
                </span>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                <strong>Email:</strong> {user.email}
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <AnimatedButton
                  text="📚 My Bookmarks"
                  className="w-full sm:w-[250px] mx-auto hover:bg-blue-950 hover:text-amber-100 hover:border-2 hover:border-blue-400"
                  onClick={goToBookmarks}
                />
                <AnimatedButton
                  text="🚪 Logout"
                  className="w-full sm:w-[250px] mx-auto hover:bg-blue-950 hover:text-amber-100 hover:border-2 hover:border-blue-400"
                  onClick={handleLogout}
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 mb-6">
              You are not signed in.
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleSignIn}
                  className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-2 rounded-3xl shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  🔐 Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-2 rounded-3xl shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  📝 Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

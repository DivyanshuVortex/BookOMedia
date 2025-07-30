import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/LoginContext";
import AnimatedButton from "../components/AnimatedButtons";
import { BarChart3, Upload, Timer, UserCheck } from "lucide-react";

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
  const handleVerify = () => navigate("/verify");
  const handleLogout = () => {
    setLogin(false);
    localStorage.removeItem("token");
  };

  const stats = [
    {
      icon: <Upload className="text-blue-400" size={28} />,
      label: "Books Uploaded",
      value: "0 (Coming Soon)",
    },
    {
      icon: <Timer className="text-green-400" size={28} />,
      label: "Total Reading Time",
      value: "06h 40m 16s",
    },
    {
      icon: <BarChart3 className="text-purple-400" size={28} />,
      label: "Profile Views",
      value: "756",
    },
    {
      icon: <UserCheck className="text-yellow-400" size={28} />,
      label: "Verified Status",
      value: user.verified ? "✅ Verified" : "🔒 Not Verified",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
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
                      onClick={handleVerify}
                      className="text-red-400 cursor-pointer hover:underline"
                    >
                      🔒 Verify Account
                    </span>
                  )}
                </span>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                <strong>Email:</strong> {user.email}
              </p>

              <div className="mt-6 border-t border-gray-800 pt-4">
                <AnimatedButton
                  text="🚪 Logout"
                  className="w-full sm:w-[300px] mx-auto"
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
    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-2 rounded-b-3xl hover:rounded-t-3xl hover:rounded-b-none shadow-lg hover:shadow-blue-500/50 hover:text-amber-100 transform hover:scale-105 transition-all duration-300 ease-in-out"
  >
    🔐 Sign In
  </button>
  <button
    onClick={handleSignUp}
    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-2 rounded-b-3xl hover:rounded-t-3xl hover:rounded-b-none shadow-lg hover:shadow-blue-500/50 hover:text-amber-100 transform hover:scale-105 transition-all duration-300 ease-in-out"
  >
    📝 Sign Up
  </button>
</div>

            </div>
          )}

          {/* Cool Dashboard */}
          {login && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-800 to-gray-900/80 rounded-xl p-6 shadow-md flex items-center gap-4 hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="bg-gray-700/50 p-3 rounded-full">
                    {stat.icon}
                  </div>
                  <div>
                    <h4 className="text-gray-300 text-sm mb-1">{stat.label}</h4>
                    <p className="text-xl font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2 text-center text-sm text-gray-500 mt-2 italic">
                ⚠️ All values above are placeholder stats and will be updated soon.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

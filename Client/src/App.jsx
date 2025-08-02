import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Suspense, lazy } from "react";

import { AuthProvider } from "./contexts/LoginContext";
import { SearchProvider } from "./contexts/SearchContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Snaketail from "./components/Snaketail";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Book = lazy(() => import("./pages/Book"));
const ListofBook = lazy(() => import("./pages/ListofBook"));
const ReadBook = lazy(() => import("./pages/ReadBook"));
const Contact = lazy(() => import("./pages/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Bookmark = lazy(() => import("./pages/Bookmark"));
const Upload = lazy(() => import("./pages/Upload"));
const Verifyemail = lazy(() => import("./utils/Verifyemail"));

// Layout wrapper
function LayoutWrapper({ children }) {
  const { pathname } = useLocation();

  const noLayoutPaths = ["/contact", "/signin", "/signup", "/404"];
  const shouldHideLayout = noLayoutPaths.includes(pathname.toLowerCase());

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <div>
      <Snaketail />
      <AuthProvider>
        <SearchProvider>
          <Router>
            <LayoutWrapper>
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 rounded-full border-4 border-dashed border-white animate-spin" />

                      <div className="absolute inset-3 rounded-full border-4 border-double border-white animate-spin opacity-5" />
                      <div className="absolute inset-9 rounded-full border-4 border-dashed border-white animate-ping opacity-50" />
                      <div className="absolute inset-9 rounded-full border-4 border-dashed border-white animate-spin opacity-30" />
                    </div>
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search/:searchData" element={<ListofBook />} />
                  <Route path="/book/:bookId" element={<Book />} />
                  <Route path="/ReadBook/:bookId" element={<ReadBook />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/bookmarks" element={<Bookmark />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/verify" element={<Verifyemail />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
              </Suspense>
            </LayoutWrapper>
          </Router>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
}

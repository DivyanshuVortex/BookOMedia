import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import { AuthProvider } from "./contexts/LoginContext";
import { SearchProvider } from "./contexts/SearchContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Snaketail from "./components/Snaketail";

import Home from "./pages/Home";
import Book from "./pages/Book";
import ListofBook from "./pages/ListofBook";
import ReadBook from "./pages/ReadBook";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Bookmark from "./pages/Bookmark";
import Upload from "./pages/Upload";

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
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </LayoutWrapper>
          </Router>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
}

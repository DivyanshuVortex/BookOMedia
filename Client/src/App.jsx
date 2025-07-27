import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { SearchProvider } from './contexts/SearchContext';

import Home from './pages/Home';
import Book from './pages/Book';
import ListofBook from './pages/ListofBook';
import Snaketail from './components/Snaketail';
import ReadBook from './pages/ReadBook';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { AuthProvider } from './contexts/LoginContext';
import NotFound from './pages/NotFound';
import Bookmark from './pages/Bookmark';

export default function App() {
  return (
   <div>
    <Snaketail />
    <AuthProvider>
     <SearchProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path='/search/:searchData' element={<ListofBook />} />
          <Route path="/book/:bookId" element={<Book />} />
          <Route path='/ReadBook/:bookId' element = { <ReadBook /> }/>
          <Route path='/Contact' element = { <Contact /> } />
          <Route path='/profile' element= { <Profile />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/bookmarks' element={<Bookmark />}/>
        </Routes>

        <Footer />
      </Router>
    </SearchProvider>
    </AuthProvider>
   </div>
  );
}

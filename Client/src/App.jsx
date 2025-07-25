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

export default function App() {
  return (
   <div>
    <Snaketail / >
     <SearchProvider>
      <Router>
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path='/search/:searchData' element={<ListofBook />} />
          <Route path="/book/:bookId" element={<Book />} />
          <Route path='/ReadBook/:bookId' element = { <ReadBook /> }/>
          <Route path='/Contact' element = { <Contact /> } />
        </Routes>

        <Footer />
      </Router>
    </SearchProvider>
   </div>
  );
}

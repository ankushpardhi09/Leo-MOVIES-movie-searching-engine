import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import WatchlistPage from './pages/WatchlistPage';
import SignInPage from './pages/SignInPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app bg-dark-900 min-h-screen">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

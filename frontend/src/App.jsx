import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
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
          </Routes>
        </main>
        <footer className="text-center py-6 text-gray-600 text-sm border-t border-dark-700 mt-12">
          <p>🎬 Movie Search Engine &mdash; Powered by OMDB API</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

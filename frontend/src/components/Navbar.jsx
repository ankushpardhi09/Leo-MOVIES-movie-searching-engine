import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Film, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-800 border-b border-dark-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-xl hover:text-accent-primary transition-colors"
          >
            <span className="text-2xl">
              <Film />
            </span>
            <span className="hidden sm:block">
              Leo<span className="text-accent-primary"> MOVIES</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/watchlist"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Watchlist
            </Link>
            <button
              onClick={() => navigate("/")}
              className="btn-primary text-sm"
            >
              Search Movies
            </button>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm text-gray-300">{user?.name?.split(' ')[0]}</span>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-600 rounded-lg shadow-lg py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-dark-600">
                      <p className="text-sm text-gray-300">
                        <strong>{user?.name}</strong>
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="btn-secondary text-sm"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="btn-primary text-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-dark-600 animate-fade-in">
            <Link
              to="/"
              className="block px-2 py-2 text-gray-300 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/watchlist"
              className="block px-2 py-2 text-gray-300 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Watchlist
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="px-2 py-3 border-t border-dark-600 my-2">
                  <p className="text-sm text-gray-400">
                    <strong>{user?.name}</strong>
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="mt-2 w-full text-left px-2 py-2 text-gray-300 hover:text-white flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/signin");
                    setMenuOpen(false);
                  }}
                  className="mt-2 w-full text-left px-2 py-2 text-gray-300 hover:text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-2 text-gray-300 hover:text-white"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

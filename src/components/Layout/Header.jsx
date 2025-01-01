import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navigation from './Navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-paper border-b-2 border-pencil-dark/20 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-sketch text-3xl text-pencil-dark">
            Sketch It!
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden sketch-button p-2"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Navigation />
            {user && (
              <div className="flex items-center gap-4">
                <span className="font-sketch text-xl text-pencil-dark">
                  {user.username}
                </span>
                <button
                  onClick={signOut}
                  className="sketch-button text-sm px-4 py-2"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-pencil-dark/20">
            <div className="flex flex-col gap-4">
              <Navigation mobile />
              {user && (
                <div className="flex flex-col gap-2 items-center pt-4 border-t border-pencil-dark/20">
                  <span className="font-sketch text-xl text-pencil-dark">
                    {user.username}
                  </span>
                  <button
                    onClick={signOut}
                    className="sketch-button text-sm px-4 py-2 w-full"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
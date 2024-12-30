import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex items-center gap-4">
      <Link
        to="/leaderboard"
        className={`font-sketch text-lg ${
          isActive('/leaderboard')
            ? 'text-pencil-dark'
            : 'text-pencil-dark/70 hover:text-pencil-dark'
        }`}
      >
        Leaderboard
      </Link>
      <Link
        to="/profile"
        className={`font-sketch text-lg ${
          isActive('/profile')
            ? 'text-pencil-dark'
            : 'text-pencil-dark/70 hover:text-pencil-dark'
        }`}
      >
        Profile
      </Link>
      <Link
        to="/gallery"
        className={`font-sketch text-lg ${
          isActive('/gallery')
            ? 'text-pencil-dark'
            : 'text-pencil-dark/70 hover:text-pencil-dark'
        }`}
      >
        Gallery
      </Link>
    </nav>
  );
};

export default Navigation
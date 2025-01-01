import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = ({ mobile }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const links = [
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/profile', label: 'Profile' },
    { path: '/gallery', label: 'Gallery' },
  ];

  return (
    <nav className={mobile ? "flex flex-col gap-4" : "flex items-center gap-4"}>
      {links.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`font-sketch text-lg transition-colors ${
            isActive(path)
              ? 'text-pencil-dark'
              : 'text-pencil-dark/70 hover:text-pencil-dark'
          } ${mobile ? 'text-center w-full py-2' : ''}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
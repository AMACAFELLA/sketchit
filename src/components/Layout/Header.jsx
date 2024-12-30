import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import Navigation from './Navigation';

const Header = () => {
  const { score } = useGame();
  const { user, signOut } = useAuth();

  return (
    <header className="w-full bg-paper border-b-2 border-pencil-dark/20 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-sketch text-3xl text-pencil-dark">
          Sketch It!
        </Link>
        <div className="flex items-center gap-6">
          <Navigation />
          <div className="font-sketch text-xl text-pencil-dark">
            Score: {score}
          </div>
          {user && (
            <>
              <span className="font-sketch text-xl text-pencil-dark">
                {user.username}
              </span>
              <button
                onClick={signOut}
                className="sketch-button text-sm px-4 py-2"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
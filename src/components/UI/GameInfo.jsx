import React from 'react';
import { useGame } from '../../context/GameContext';

const GameInfo = () => {
  const { score, timeLeft, currentCategory, revealLetter } = useGame();

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div className="flex justify-between w-full max-w-md">
        <div className="font-sketch text-xl">Score: {score}</div>
        <div className="font-sketch text-xl">Time: {timeLeft}s</div>
      </div>
      <div className="font-sketch text-lg">
        Category: <span className="capitalize">{currentCategory}</span>
      </div>
      <button 
        onClick={revealLetter}
        disabled={score < 10}
        className={`sketch-button ${score < 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Reveal Letter (-10 points)
      </button>
    </div>
  );
};

export default GameInfo;
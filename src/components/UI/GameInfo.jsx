import React from 'react';
import { useGame } from '../../context/GameContext';

const formatCategory = (category) => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const GameInfo = () => {
  const {
    score,
    hintPoints,
    highScore,
    timeLeft,
    currentCategory,
    currentDifficulty,
    revealLetter
  } = useGame();

  const getHintButtonText = () => {
    if (hintPoints >= 10) {
      return `Reveal Letter (${hintPoints} hint points left)`;
    }
    return `Reveal Letter (-10 score points)`;
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div className="flex justify-between w-full max-w-md">
        <div className="font-sketch text-xl">Score: {score}</div>
        <div className="font-sketch text-xl">High Score: {highScore}</div>
        <div className="font-sketch text-xl">Time: {timeLeft}s</div>
      </div>
      <div className="flex justify-between w-full max-w-md">
        <div className="font-sketch text-lg">
          Category: <span className="capitalize">{formatCategory(currentCategory)}</span>
        </div>
        <div className="font-sketch text-lg">
          Difficulty: <span className="capitalize">{currentDifficulty.toLowerCase()}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={revealLetter}
          disabled={hintPoints < 10 && score < 10}
          className={`sketch-button ${hintPoints < 10 && score < 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {getHintButtonText()}
        </button>
      </div>
    </div>
  );
};

export default GameInfo;
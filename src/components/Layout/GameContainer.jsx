import React from 'react';
import Header from '../Layout/Header'

const GameContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default GameContainer;
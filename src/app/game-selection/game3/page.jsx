'use client';

import { useState, useEffect } from 'react';

// Helper function to generate random numbers deterministically
const generateNumbers = (count, max, seed) => {
  const random = (seedValue) => {
    const x = Math.sin(seedValue) * 10000;
    return x - Math.floor(x);
  };

  const numbers = new Set();
  let currentSeed = seed || 0;
  while (numbers.size < count) {
    numbers.add(Math.floor(random(currentSeed++) * max) + 1);
  }
  return Array.from(numbers);
};

export default function LuckyGrid() {
  const [gridNumbers, setGridNumbers] = useState([]);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Generate grid numbers on the client side
    const seed = Date.now();
    const generatedNumbers = generateNumbers(25, 50, seed);
    setGridNumbers(generatedNumbers);
  }, []);

  const handleNumberClick = (number) => {
    if (!selectedNumbers.includes(number) && selectedNumbers.length < 5) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const drawNumber = () => {
    if (drawnNumbers.length < 50) {
      const newNumber = generateNumbers(1, 50, drawnNumbers.length + 1)[0];
      setDrawnNumbers([...drawnNumbers, newNumber]);
    }
  };

  useEffect(() => {
    if (selectedNumbers.length === 5) {
      const matched = selectedNumbers.filter((num) => drawnNumbers.includes(num));
      if (matched.length === selectedNumbers.length) {
        setGameOver(true);
      }
    }
  }, [drawnNumbers, selectedNumbers]);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Lucky Grid</h1>
      <p className="text-center text-gray-600">Select 5 numbers and see if you win!</p>
      
      {/* Grid */}
      <div className="grid grid-cols-5 gap-4">
        {gridNumbers.map((number) => (
          <button
            key={number}
            className={`p-4 text-lg font-bold border rounded-lg ${
              selectedNumbers.includes(number) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => handleNumberClick(number)}
            disabled={selectedNumbers.includes(number) || gameOver}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Drawn Numbers */}
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-semibold">Drawn Numbers</h2>
        <div className="flex justify-center space-x-2">
          {drawnNumbers.map((num, index) => (
            <span
              key={index}
              className="inline-block px-3 py-2 bg-blue-500 text-white rounded-full text-sm"
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* Draw Button */}
      <div className="text-center">
        <button
          onClick={drawNumber}
          className="px-6 py-2 text-lg font-bold bg-green-600 text-white rounded-lg disabled:bg-gray-300"
          disabled={gameOver || drawnNumbers.length >= 50}
        >
          {gameOver ? 'Game Over' : 'Draw Number'}
        </button>
      </div>

      {/* Game Over Message */}
      {gameOver && (
        <div className="text-center text-green-600 font-bold text-xl mt-4">
          Congratulations! You've matched all your numbers!
        </div>
      )}
    </div>
  );
}

'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/ProgressBar"

const cards = [
  { id: 1, value: '🍎' },
  { id: 2, value: '🍌' },
  { id: 3, value: '🍇' },
  { id: 4, value: '🍓' },
  { id: 5, value: '🍒' },
  { id: 6, value: '🥝' },
]

export default function MemoryMatchGame() {
  const [shuffledCards, setShuffledCards] = useState([])
  const [selectedCards, setSelectedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    // Shuffle and double the cards to create pairs
    const doubledCards = [...cards, ...cards]
    setShuffledCards(doubledCards.sort(() => Math.random() - 0.5))
  }, [])

  useEffect(() => {
    if (matchedCards.length === shuffledCards.length && shuffledCards.length > 0) {
      setGameOver(true)
    }
  }, [matchedCards, shuffledCards])

  const handleCardClick = (card, index) => {
    if (selectedCards.length < 2 && !matchedCards.includes(card.id) && !selectedCards.some(c => c.index === index)) {
      setSelectedCards(prev => [...prev, { ...card, index }])
      if (selectedCards.length === 1) {
        setMoves(prev => prev + 1)
        if (selectedCards[0].value === card.value) {
          setMatchedCards(prev => [...prev, selectedCards[0].id, card.id])
        }
        setTimeout(() => setSelectedCards([]), 1000)
      }
    }
  }

  const handleRestart = () => {
    setShuffledCards(shuffledCards.sort(() => Math.random() - 0.5))
    setSelectedCards([])
    setMatchedCards([])
    setMoves(0)
    setGameOver(false)
  }

  return (
    <div className="space-y-6 pt-36 text-white">
      <ProgressBar currentStep={3} totalSteps={6} />
      <h1 className="text-3xl font-bold text-center text-white">Memory Match Game</h1>
      <p className="text-center text-white">Match all pairs with the least moves!</p>
      <p className="text-center text-lg font-semibold">Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
        {shuffledCards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card, index)}
            className={`w-16 h-16 flex justify-center items-center border-2 rounded-lg cursor-pointer transition-transform ${
              matchedCards.includes(card.id) || selectedCards.some(c => c.index === index)
                ? 'bg-blue-200'
                : 'bg-gray-200'
            }`}
          >
            {matchedCards.includes(card.id) || selectedCards.some(c => c.index === index) ? (
              <span className="text-2xl">{card.value}</span>
            ) : null}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-green-600">You Won!</h2>
          <p className="text-gray-600">You matched all pairs in {moves} moves.</p>
          <Button
            onClick={handleRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Restart Game
          </Button>
        </div>
      )}
    </div>
  )
}

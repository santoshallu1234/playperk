'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/ProgressBar"

const GAME_DURATION = 30000 // 30 seconds

export default function PlayGame() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [activeMole, setActiveMole] = useState(-1)
  const [gameStarted, setGameStarted] = useState(false)
  const router = useRouter()

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(GAME_DURATION)
  }

  const endGame = useCallback(() => {
    setGameStarted(false)
    router.push(`/congratulations?score=${score}`)
  }, [router, score])

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(time => time - 1000), 1000)
      return () => clearTimeout(timer)
    } else if (gameStarted && timeLeft <= 0) {
      endGame()
    }
  }, [gameStarted, timeLeft, endGame])

  useEffect(() => {
    if (gameStarted) {
      const moleTimer = setInterval(() => {
        setActiveMole(Math.floor(Math.random() * 9))
      }, 1000)
      return () => clearInterval(moleTimer)
    }
  }, [gameStarted])

  const whackMole = (moleIndex: number) => {
    if (moleIndex === activeMole) {
      setScore(score => score + 1)
      setActiveMole(-1)
    }
  }

  return (
    <div className="space-y-6 w-[100%] h-[100%] p-16">
      <ProgressBar currentStep={5} totalSteps={6} />
      <h1 className="text-3xl font-bold text-center text-gray-800">Whack-a-Mole</h1>
      <div className="text-center space-y-2">
        <p className="text-xl font-semibold">Score: {score}</p>
        <p className="text-lg">Time Left: {timeLeft / 1000}s</p>
      </div>
      {!gameStarted ? (
        <Button onClick={startGame} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Start Game
        </Button>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, index) => (
            <Button
              key={index}
              onClick={() => whackMole(index)}
              className={`w-full h-24 ${
                activeMole === index
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white font-bold rounded-lg transition-colors`}
            >
              {activeMole === index ? 'Mole!' : ''}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}


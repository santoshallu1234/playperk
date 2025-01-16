'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ProgressBar } from "@/components/ProgressBar"
import { VideoPreview } from "@/components/VideoPreview"

const games = [
  { 
    id: 'game1', 
    name: 'Treasure Hunt', 
    description: 'Find hidden treasures in your shop!'
  },
  { 
    id: 'game2', 
    name: 'Puzzle Master', 
    description: 'Solve challenging puzzles related to your products.'
  },
  { 
    id: 'game3', 
    name: 'Trivia Challenge', 
    description: 'Test your knowledge about your shop and industry.'
  },
]

// List of random video URLs (replace these with actual video URLs you have permission to use)
const randomVideos = [
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4',
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4'
]

export default function GameSelection() {
  const [selectedGame, setSelectedGame] = useState('')
  const [gameVideos, setGameVideos] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    // Assign random videos to games
    const shuffled = [...randomVideos].sort(() => 0.5 - Math.random())
    setGameVideos(shuffled.slice(0, games.length))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedGame) {
      router.push('/playgame')
    }
  }

  return (
    <div className="space-y-6">
      <ProgressBar currentStep={4} totalSteps={6} />
      <h1 className="text-3xl font-bold text-center text-gray-800">Choose a Game</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <RadioGroup value={selectedGame} onValueChange={setSelectedGame} className="space-y-4">
          {games.map((game, index) => (
            <div key={game.id} className="flex flex-col space-y-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={game.id} id={game.id} className="mt-1" />
                <div>
                  <Label htmlFor={game.id} className="text-lg font-semibold">{game.name}</Label>
                  <p className="text-gray-600">{game.description}</p>
                </div>
              </div>
              {gameVideos[index] && <VideoPreview src={gameVideos[index]} />}
            </div>
          ))}
        </RadioGroup>
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors" 
          disabled={!selectedGame}
        >
          Play Game
        </Button>
      </form>
    </div>
  )
}


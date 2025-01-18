import HighScore from '../../components/HighScore'
import GamePreview from '../../components/GamePreview'
import ScratchCard from '../../components/ScratchCard'

export default function PremiumGamePage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] text-gray-800 pt-28">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-16 text-[#003472] font-serif">Epic Game Challenge</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            <HighScore />
            <GamePreview />
          </div>
          <div>
            <ScratchCard />
          </div>
        </div>
      </div>
    </div>
  )
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GamePreview() {
  return (
    <Card className="bg-white shadow-lg border-[#003472] border-2">
      <CardHeader>
        <CardTitle className="text-2xl text-[#003472] font-serif">Game Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-16 aspect-h-9">
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-person-playing-a-game-on-a-smartphone-6008-large.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full rounded-lg shadow-md object-cover"
          />
        </div>
      </CardContent>
    </Card>
  )
}


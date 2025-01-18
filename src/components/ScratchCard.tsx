"use client"

import { useRef, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const discounts = ['10% OFF', '25% OFF', '50% OFF', 'FREE GAME', '5% OFF']

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scratched, setScratched] = useState(false)
  const [discount, setDiscount] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#003472'
      ctx.fillRect(0, 0, 300, 150)
      
      ctx.font = 'bold 24px var(--font-sans)'
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.fillText('Scratch here!', 150, 80)
    }
  }, [])

  useEffect(() => {
    if (!scratched) {
      const randomDiscount = discounts[Math.floor(Math.random() * discounts.length)]
      setDiscount(randomDiscount)
    }
  }, [scratched])

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const rect = canvas?.getBoundingClientRect()
    const x = (e as React.TouchEvent<HTMLCanvasElement>).touches
      ? (e as React.TouchEvent<HTMLCanvasElement>).touches[0].clientX - rect!.left
      : (e as React.MouseEvent<HTMLCanvasElement>).clientX - rect!.left
    const y = (e as React.TouchEvent<HTMLCanvasElement>).touches
      ? (e as React.TouchEvent<HTMLCanvasElement>).touches[0].clientY - rect!.top
      : (e as React.MouseEvent<HTMLCanvasElement>).clientY - rect!.top

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 15, 0, Math.PI * 2, false)
    ctx.fill()

    const imageData = ctx.getImageData(0, 0, 300, 150)
    const pixelsScratched = imageData.data.filter((_, i) => i % 4 === 3 && imageData.data[i] === 0).length
    const percentScratched = (pixelsScratched / (300 * 150)) * 100

    if (percentScratched > 50 && !scratched) {
      setScratched(true)
    }
  }

  const handleRedeem = () => {
    alert(`Congratulations! You've redeemed your ${discount} discount!`)
    // Here you would typically make an API call to apply the discount
  }

  return (
    <Card className="bg-white shadow-lg border-[#003472] border-2">
      <CardHeader>
        <CardTitle className="text-2xl text-[#003472] font-serif">Scratch & Win</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-[300px] h-[150px] mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[#003472] to-[#0056b3] flex items-center justify-center rounded-lg">
            <p className="text-2xl font-bold text-white font-sans">{discount}</p>
          </div>
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            className="absolute inset-0 cursor-pointer rounded-lg"
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseMove={(e) => isDrawing && handleScratch(e)}
            onTouchStart={() => setIsDrawing(true)}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchMove={handleScratch}
          />
        </div>
        <Button 
          onClick={handleRedeem} 
          disabled={!scratched}
          className="bg-[#003472] text-white hover:bg-[#0056b3] transition-colors font-sans"
        >
          Redeem Discount
        </Button>
      </CardContent>
    </Card>
  )
}


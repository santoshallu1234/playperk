"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HighScore() {
  const [score, setScore] = useState(0)
  const targetScore = 9850 // This would typically come from a database or API

  useEffect(() => {
    const timer = setInterval(() => {
      setScore(prevScore => {
        if (prevScore < targetScore) {
          return Math.min(prevScore + Math.ceil(targetScore / 100), targetScore)
        }
        clearInterval(timer)
        return targetScore
      })
    }, 20)

    return () => clearInterval(timer)
  }, [targetScore])

  return (
    <Card className="bg-white shadow-lg border-[#003472] border-2">
      <CardHeader>
        <CardTitle className="text-2xl text-[#003472] font-serif">Your High Score</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-5xl font-bold text-[#003472] font-sans">{score.toLocaleString()}</p>
      </CardContent>
    </Card>
  )
}


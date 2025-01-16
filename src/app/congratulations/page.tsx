'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProgressBar } from "@/components/ProgressBar"

export default function Congratulations() {
  const searchParams = useSearchParams()
  const score = searchParams.get('score')

  return (
    <div className="space-y-6 text-center">
      <ProgressBar currentStep={6} totalSteps={6} />
      <h1 className="text-3xl font-bold text-gray-800">Congratulations!</h1>
      <p className="text-xl text-gray-600">You've successfully completed the game setup process.</p>
      {score && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded" role="alert">
          <p className="font-bold">Your High Score</p>
          <p>{score} points</p>
        </div>
      )}
      <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
        <Link href="/">Start Over</Link>
      </Button>
    </div>
  )
}


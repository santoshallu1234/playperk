'use client'

import { useState, useRef, useEffect } from 'react'

interface VideoPreviewProps {
  src: string
}

export function VideoPreview({ src }: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsPlaying(true)
          videoRef.current?.play().catch(() => setError(true))
        } else {
          setIsPlaying(false)
          videoRef.current?.pause()
        }
      })
    }, options)

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  if (error) {
    return (
      <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Video unavailable</p>
      </div>
    )
  }

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden relative">
      <video 
        ref={videoRef}
        src={src} 
        className="w-full h-full object-cover"
        loop 
        muted 
        playsInline
      >
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )}
    </div>
  )
}


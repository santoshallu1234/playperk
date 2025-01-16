'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProgressBar } from '@/components/ProgressBar'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from 'lucide-react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '200px'
}

export default function Location() {
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const getLocation = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation(`${latitude}, ${longitude}`)
        setCoordinates({ lat: latitude, lng: longitude })
        setIsLoading(false)
      },
      () => {
        setError('Unable to retrieve your location')
        setIsLoading(false)
      }
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location) {
      router.push('/discount-selection')
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <div className="space-y-6">
      <ProgressBar currentStep={2} totalSteps={5} />
      <h1 className="text-3xl font-bold text-center text-gray-800">Shop Location</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-lg">Your shop location</Label>
          <Input 
            id="location" 
            name="location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Latitude, Longitude" 
            required 
            className="border-2 border-gray-300 focus:border-blue-500 transition-colors"
          />
        </div>
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Detecting location...</span>
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {coordinates.lat !== 0 && coordinates.lng !== 0 && (
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={coordinates}
                zoom={15}
              >
                <Marker position={coordinates} />
              </GoogleMap>
            </LoadScript>
          </div>
        )}
        <div className="space-y-2">
          <Button 
            type="button" 
            onClick={getLocation} 
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Detect Location Again
          </Button>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            disabled={!location}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  )
}


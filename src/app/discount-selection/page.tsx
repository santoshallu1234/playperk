'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ProgressBar } from "@/components/ProgressBar"

const discounts = [
  { id: 'discount1', name: '10% Off', description: 'Get 10% off on your first purchase' },
  { id: 'discount2', name: '20% Off', description: 'Get 20% off on orders over $100' },
  { id: 'discount3', name: 'Free Shipping', description: 'Free shipping on all orders' },
]

export default function DiscountSelection() {
  const [selectedDiscount, setSelectedDiscount] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDiscount) {
      router.push('/game-selection')
    }
  }

  return (
    <div className="space-y-6 w-[100%] py-[8rem] px-[3rem] text-white">
  
      <form onSubmit={handleSubmit} className="space-y-4">
      <ProgressBar currentStep={3} totalSteps={5} />
      <h1 className="text-3xl font-bold text-center text-white">Choose a Discount</h1>
        <RadioGroup value={selectedDiscount} onValueChange={setSelectedDiscount} className="space-y-4">
          {discounts.map((discount) => (
            <div key={discount.id} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
              <RadioGroupItem value={discount.id} id={discount.id} />
              <div>
                <Label htmlFor={discount.id} className="text-lg font-semibold">{discount.name}</Label>
                <p className="text-white">{discount.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors" 
          disabled={!selectedDiscount}
        >
          Next
        </Button>
      </form>
    </div>
  )
}


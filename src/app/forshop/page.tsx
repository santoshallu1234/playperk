import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProgressBar } from "@/components/ProgressBar"

export default function Home() {
  return (
    <div className="space-y-6">
      <ProgressBar currentStep={1} totalSteps={4} />
      <h1 className="text-3xl font-bold text-center text-gray-800">Welcome to Shop Game</h1>
      <form action="/location" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shopName" className="text-lg">Enter your shop name</Label>
          <Input 
            id="shopName" 
            name="shopName" 
            placeholder="My Awesome Shop" 
            required 
            className="border-2 border-gray-300 focus:border-blue-500 transition-colors"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Next
        </Button>
      </form>
    </div>
  )
}


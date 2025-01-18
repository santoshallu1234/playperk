import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProgressBar } from "@/components/ProgressBar"

export default function Home() {
  return (
    <div className="py-[8rem] px-[3rem] w-[100%] text-[white">
    
      <form action="/location" className="space-y-4  h-[100%] w-[100%]">
      <ProgressBar currentStep={1} totalSteps={4} />
      <h1 className="text-3xl font-bold text-center text-white">Welcome to Shop Game</h1>
        <div className="space-y-2 w-[100%]">
          <Label htmlFor="shopName" className="text-lg   text-white">Enter your shop name</Label>
          <Input 
            id="shopName" 
            name="shopName" 
            placeholder="My Awesome Shop" 
            required 
            className="border-2 w-[100%] border-white focus:border-blue-500 transition-colors"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Next
        </Button>
      </form>
    </div>
  )
}


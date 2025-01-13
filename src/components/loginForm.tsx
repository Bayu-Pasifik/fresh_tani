'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Icons } from "@/components/ui/icons"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="name@example.com" required type="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" required type="password" />
      </div>
      <Button className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
        {/* {isLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )} */}
        Sign In
      </Button>
      <div className="text-center text-sm">
        <a href="#" className="text-green-600 hover:underline">
          Forgot password?
        </a>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="#" className="text-green-600 hover:underline">
          Sign up
        </a>
      </div>
    </form>
  )
}


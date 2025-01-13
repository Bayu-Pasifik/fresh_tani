// RegisterForm.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Simulasi proses register
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" required type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="name@example.com" required type="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" required type="password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" required type="password" />
      </div>

      {/* Kondisi untuk menentukan tombol yang ditampilkan */}
      <Button className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
        {isRegistering ? 'Sign Up' : 'Sign Up'}
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-600 hover:underline"
        >
          Sign In
        </Link>
      </div>
    </form>
  )
}

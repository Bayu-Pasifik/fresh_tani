'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/hooks/use-auth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Menggunakan custom hook untuk login
  const { mutate: login, isPending } = useLoginMutation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
      </div>
      <Button
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isPending}
      >
        {isPending ? "Signing In..." : "Sign In"}
      </Button>
      <div className="text-center text-sm">
        <a href="#" className="text-green-600 hover:underline">
          Forgot password?
        </a>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="/register" className="text-green-600 hover:underline">
          Sign up
        </a>
      </div>
    </form>
  );
}

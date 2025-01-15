'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "@/hooks/use-auth";
import Swal from "sweetalert2";

export function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: register, isPending, error } = useRegisterMutation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // Validasi password
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
      });
      return;
    }

    // Panggil register dengan fullName
    register({ email, password, fullName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          required
          type="text"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
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
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          type="password"
        />
      </div>

      <Button
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isPending}
      >
        {isPending ? "Registering..." : "Sign Up"}
      </Button>

      {error && <p className="text-red-600">{error.message}</p>}

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-green-600 hover:underline">
          Sign In
        </Link>
      </div>
    </form>
  );
}

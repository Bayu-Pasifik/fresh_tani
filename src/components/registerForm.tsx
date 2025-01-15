'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "@/hooks/use-auth";
import Swal from "sweetalert2";

export function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("buyer"); // Default role

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

    // Validasi role
    if (!role) {
      Swal.fire({
        icon: "warning",
        title: "Select Role",
        text: "Please select a role before proceeding.",
      });
      return;
    }

    // Panggil register dengan data tambahan (role)
    register({ email, password, fullName, roles: [role] }); // Roles dikirim sebagai array
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-screen overflow-hidden">
      <div className="space-y-2 overflow-hidden">
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
      <div className="space-y-2">
        <Label htmlFor="role">Select Role</Label>
        <Select onValueChange={(value) => setRole(value)} value={role}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent className="max-h-none overflow-visible"> {/* Tambahkan kelas ini */}
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="farmer">Farmer</SelectItem>
          </SelectContent>
        </Select>
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

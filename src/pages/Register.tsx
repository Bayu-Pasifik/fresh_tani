import { RegisterForm } from "../components/registerForm"; // Buat komponen form register

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-green-50">
      {/* Left side - Image */}
      <div className="relative md:w-1/2 h-64 md:h-auto flex-shrink-0">
        <img
          src="/assets/background/background-1.jpg"
          alt="Fresh produce"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            Fresh Tani
          </h1>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-sm md:max-w-md">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6 text-green-800">
            Create an Account
          </h2>
          <p className="text-sm md:text-base text-center mb-6 md:mb-8 text-gray-600">
            Sign up to start selling or buying fresh produce
          </p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { RegisterForm } from "../components/registerForm"; // Buat komponen form register

export default function RegisterPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const images = [
    "/assets/background/background-1.jpg",
    "/assets/background/background-2.jpg",
    "/assets/background/background-3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      // Atur fade-out sebelum mengganti gambar
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false); // Fade-in setelah gambar berganti
      }, 1000); // Durasi fade-out sama dengan CSS transition
    }, 10000); // Ganti gambar setiap 10 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, [images.length]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-green-50">
      {/* Left side - Image and Text */}
      <div
        className={`relative md:w-1/2 h-[calc(100vh)] flex-shrink-0 overflow-hidden transition-opacity duration-500 ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <img
          src={images[currentImageIndex]}
          alt="Fresh produce"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center">
            Fresh Tani
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-center mt-4">
            Solusi Belanja Sayur Langsung dari Petani
          </p>
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

import ProductList from "@/components/productList";
import { Leaf, ShoppingCart } from "lucide-react";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
          <header className="bg-green-600 text-white shadow-lg">
            <div className="container mx-auto p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Leaf size={24} className="animate-bounce" />
                <h1 className="text-3xl font-bold">Toko Sayur FreshTani</h1>
              </div>
              <button className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-full transition duration-300 transform hover:scale-105 active:scale-95">
                <ShoppingCart size={20} />
                <span>Cart</span>
              </button>
            </div>
          </header>
    
          <main className="container mx-auto p-4 mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 animate-fade-in-up">Our Fresh Products</h2>
            <ProductList />
          </main>
    
          <footer className="bg-green-800 text-white mt-12">
            <div className="container mx-auto p-4 text-center">
              <p>&copy; 2023 Toko Sayur FreshTani. All rights reserved.</p>
            </div>
          </footer>
        </div>
      );
}

export default HomePage
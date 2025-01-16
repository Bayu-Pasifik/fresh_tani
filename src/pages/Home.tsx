import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProductList from "@/components/productList";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4 mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 animate-fade-in-up">
          Our Fresh Products
        </h2>
        <ProductList />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

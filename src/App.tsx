import React from "react";
import ProductList from "./components/productList"; // Sesuaikan dengan path

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Toko Sayur FreshTani</h1>
      <ProductList />
    </div>
  );
};

export default App;

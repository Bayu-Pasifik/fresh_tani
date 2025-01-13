import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../config/firebase-config"; // Sesuaikan path

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  farmerId: string;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, "products");
        const productSnapshot = await getDocs(productCollection);
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(productList);
      } catch (error) {
        setError("Gagal mengambil produk dari Firestore.");
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;

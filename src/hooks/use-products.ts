import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import db from "../config/firebase-config"; // Sesuaikan path

// Interface untuk produk
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

// Fungsi untuk mengambil data produk dari Firestore
const fetchProducts = async (): Promise<Product[]> => {
  const productCollection = collection(db, "products");
  const productSnapshot = await getDocs(productCollection);
  const productList = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];

  return productList;
};

// Hook untuk mendapatkan produk dengan `useQuery`
const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"], // Key unik untuk query
    queryFn: fetchProducts, // Fungsi pengambil data
    staleTime: 1000 * 60 * 5, // Data dianggap segar selama 5 menit
  });
};

export default useProducts;

import { collection, doc, setDoc } from "firebase/firestore";

import  db  from "../config/firebase-config";
import products from "../data/dummy-product.json";


const uploadProductsToFirestore = async () => {
    try {
      const productCollection = collection(db, "products"); // Ganti "products" dengan nama koleksi yang diinginkan
  
      for (const product of products) {
        const productRef = doc(productCollection, product.id); // Menggunakan "id" dari data JSON sebagai ID dokumen
        await setDoc(productRef, {
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: product.quantity,
          image: product.image, // Path lokal ke image
          description: product.description,
          farmerId: product.farmerId,
        });
        console.log(`Berhasil menambahkan produk: ${product.name}`);
      }
  
      console.log("Semua produk berhasil diunggah ke Firestore.");
    } catch (error) {
      console.error("Gagal mengunggah produk ke Firestore:", error);
    }
  };
  
  
  export default uploadProductsToFirestore;
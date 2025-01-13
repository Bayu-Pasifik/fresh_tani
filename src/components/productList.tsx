
import useProducts from "../hooks/use-products"; // Sesuaikan dengan path

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        // console.log(import.meta.env.PUBLIC_URL + product.image)
        <div key={product.id} className="border p-4 rounded">
          <img
            src={product.image} // Menambahkan process.env.PUBLIC_URL
            alt={product.name}
            className="w-full h-48 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p>{product.category}</p>
          <p className="text-green-600">Rp {product.price}</p>
          <p>{product.description}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
            Beli
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

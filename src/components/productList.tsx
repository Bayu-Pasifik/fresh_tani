
import useProducts from "../hooks/use-products"; // Sesuaikan dengan path
import VegetableProductCard from "./producCard";

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <VegetableProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
          image={product.image}
          category={product.category}
        />
      ))}
    </div>
  );
};

export default ProductList;

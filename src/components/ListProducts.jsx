import ProductCard from "./ProductCard";

const ListProducts = ({ products, handleEliminar }) => {

  return (
    <div className="container mx-auto p-4">
      <div className="mb-3 flex justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products ? (
            products.map((prod) => <ProductCard key={prod.id} product={prod} handleEliminar={handleEliminar}/>)
          ) : (
            <p> no productos </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProducts

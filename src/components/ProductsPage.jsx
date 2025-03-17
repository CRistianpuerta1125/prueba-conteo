import { useState } from 'react';
import ProductList from './ProductList';
import ProductModal from './ProductModal';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (codigo) => {
    setProducts(products.filter(product => product.codigo !== codigo));
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Gestión de Productos</h1>
        <button 
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Agregar Producto
        </button>
      </div>
      
      <ProductList 
        products={products} 
        onDelete={handleDeleteProduct}
      />
      
      {isModalOpen && (
        <ProductModal 
          onSubmit={handleAddProduct} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
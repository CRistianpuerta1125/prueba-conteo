import { useState } from 'react';

export default function ProductForm({ onSubmit }) {
  const [product, setProduct] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    cantidad: '',
    creacion: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...product,
      codigo: Number(product.codigo),
      cantidad: Number(product.cantidad),
      creacion: new Date(product.creacion)
    });
    setProduct({
      codigo: '',
      nombre: '',
      descripcion: '',
      cantidad: '',
      creacion: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border border-gray-200 rounded-lg shadow-sm max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Agregar Nuevo Producto</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.codigo}
            onChange={(e) => setProduct({...product, codigo: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.nombre}
            onChange={(e) => setProduct({...product, nombre: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            value={product.descripcion}
            onChange={(e) => setProduct({...product, descripcion: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.cantidad}
            onChange={(e) => setProduct({...product, cantidad: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Creación</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.creacion}
            onChange={(e) => setProduct({...product, creacion: e.target.value})}
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Agregar Producto
        </button>
      </div>
    </form>
  );
}
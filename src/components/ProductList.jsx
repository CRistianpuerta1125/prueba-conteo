import { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaTrash } from 'react-icons/fa';

export default function ProductList({ products, onDelete }) {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <FaSort className="inline ml-1" />;
    return sortDirection === 'asc' ? 
      <FaSortUp className="inline ml-1" /> : 
      <FaSortDown className="inline ml-1" />;
  };

  return (
    <div className="card mt-8">
      <h2 className="text-2xl font-bold mb-6">Lista de Productos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th 
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => handleSort('codigo')}
              >
                Código <SortIcon field="codigo" />
              </th>
              <th 
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => handleSort('nombre')}
              >
                Nombre <SortIcon field="nombre" />
              </th>
              <th className="px-6 py-3 text-left">Descripción</th>
              <th 
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => handleSort('cantidad')}
              >
                Cantidad <SortIcon field="cantidad" />
              </th>
              <th 
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => handleSort('creacion')}
              >
                Creación <SortIcon field="creacion" />
              </th>
              <th className="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedProducts.map((product) => (
              <tr key={product.codigo} className="hover:bg-gray-50">
                <td className="px-6 py-4">{product.codigo}</td>
                <td className="px-6 py-4">{product.nombre}</td>
                <td className="px-6 py-4">{product.descripcion}</td>
                <td className="px-6 py-4">{product.cantidad}</td>
                <td className="px-6 py-4">
                  {new Date(product.creacion).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDelete(product.codigo)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
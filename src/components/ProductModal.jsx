import { useState } from 'react';

export default function ProductModal({ onSubmit, onClose }) {
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
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Agregar Nuevo Producto</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Código</label>
            <input
              type="number"
              className="input-field"
              value={product.codigo}
              onChange={(e) => setProduct({...product, codigo: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              className="input-field"
              value={product.nombre}
              onChange={(e) => setProduct({...product, nombre: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              className="input-field"
              value={product.descripcion}
              onChange={(e) => setProduct({...product, descripcion: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input
              type="number"
              className="input-field"
              value={product.cantidad}
              onChange={(e) => setProduct({...product, cantidad: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Creación</label>
            <input
              type="date"
              className="input-field"
              value={product.creacion}
              onChange={(e) => setProduct({...product, creacion: e.target.value})}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
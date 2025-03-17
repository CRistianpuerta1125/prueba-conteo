import { FaBoxOpen, FaExclamationTriangle, FaCalendarCheck } from 'react-icons/fa';

export default function ProductStats({ products }) {
  // Calcular estadísticas
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.cantidad < 10).length;
  const recentlyAdded = products.filter(p => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(p.creacion) > oneWeekAgo;
  }).length;
  
  // Calcular porcentajes para las barras de progreso
  const lowStockPercentage = totalProducts ? (lowStock / totalProducts) * 100 : 0;
  const recentPercentage = totalProducts ? (recentlyAdded / totalProducts) * 100 : 0;
  
  return (
    <div className="product-stats">
      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-icon total-icon">
            <FaBoxOpen />
          </div>
          <h3>Total de Productos</h3>
        </div>
        <div className="stat-value">{totalProducts}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-icon warning-icon">
            <FaExclamationTriangle />
          </div>
          <h3>Bajo Stock</h3>
        </div>
        <div className="stat-value">{lowStock}</div>
        <div className="progress-bar">
          <div 
            className="progress-fill warning-fill" 
            style={{ width: `${lowStockPercentage}%` }}
          ></div>
        </div>
        <div className="stat-caption">{lowStockPercentage.toFixed(1)}% del inventario</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-icon success-icon">
            <FaCalendarCheck />
          </div>
          <h3>Agregados Recientemente</h3>
        </div>
        <div className="stat-value">{recentlyAdded}</div>
        <div className="progress-bar">
          <div 
            className="progress-fill success-fill" 
            style={{ width: `${recentPercentage}%` }}
          ></div>
        </div>
        <div className="stat-caption">{recentPercentage.toFixed(1)}% del inventario</div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProductsPage from './ProductsPage';
import ProfilePage from './ProfilePage';
import ThemeToggle from './ThemeToggle';
import Toast from './Toast';
import AdvancedSearch from './AdvancedSearch';
import ProductStats from './ProductStats';
import { FaBell } from 'react-icons/fa';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  useEffect(() => {
    setFilteredProducts(products);
    // Aplicar clase de tema oscuro al body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [products, darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setIsModalOpen(false);
    addToast('Producto agregado correctamente', 'success');
  };
  
  const handleDeleteProduct = (codigo) => {
    setProducts(products.filter(product => product.codigo !== codigo));
    addToast('Producto eliminado', 'info');
  };
  
  const handleSearch = (filters) => {
    let results = [...products];
    
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      results = results.filter(product => 
        product.nombre.toLowerCase().includes(keyword) ||
        product.descripcion.toLowerCase().includes(keyword) ||
        product.codigo.toString().includes(keyword)
      );
    }
    
    if (filters.minQuantity) {
      results = results.filter(product => product.cantidad >= Number(filters.minQuantity));
    }
    
    if (filters.maxQuantity) {
      results = results.filter(product => product.cantidad <= Number(filters.maxQuantity));
    }
    
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      results = results.filter(product => new Date(product.creacion) >= fromDate);
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59);
      results = results.filter(product => new Date(product.creacion) <= toDate);
    }
    
    setFilteredProducts(results);
  };
  
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3300);
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>{activeTab === 'products' ? 'Gestión de Productos' : 'Perfil de Usuario'}</h1>
          
          <div className="header-actions">
            <button className="notification-btn">
              <FaBell />
            </button>
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </header>
        
        {activeTab === 'products' && (
          <>
            <AdvancedSearch onSearch={handleSearch} />
            
            <ProductStats products={products} />
            
            <ProductsPage 
              products={filteredProducts} 
              onDelete={handleDeleteProduct}
              onAddClick={() => setIsModalOpen(true)}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              onAddProduct={handleAddProduct}
            />
          </>
        )}
        
        {activeTab === 'profile' && <ProfilePage />}
        
        <div className="toast-container">
          {toasts.map(toast => (
            <Toast 
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

export default function AdvancedSearch({ onSearch }) {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    minQuantity: '',
    maxQuantity: '',
    dateFrom: '',
    dateTo: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };
  
  const clearFilters = () => {
    setFilters({
      keyword: '',
      minQuantity: '',
      maxQuantity: '',
      dateFrom: '',
      dateTo: ''
    });
    onSearch({});
  };
  
  return (
    <div className="advanced-search">
      <div className="search-header">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            value={filters.keyword}
            onChange={(e) => setFilters({...filters, keyword: e.target.value})}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
        </div>
        <button 
          className="filter-toggle" 
          onClick={() => setExpanded(!expanded)}
          title={expanded ? "Ocultar filtros" : "Mostrar filtros avanzados"}
        >
          <FaFilter />
        </button>
      </div>
      
      {expanded && (
        <form className="filter-panel" onSubmit={handleSubmit}>
          <div className="filter-row">
            <div className="filter-group">
              <label>Cantidad mínima</label>
              <input 
                type="number" 
                value={filters.minQuantity}
                onChange={(e) => setFilters({...filters, minQuantity: e.target.value})}
              />
            </div>
            <div className="filter-group">
              <label>Cantidad máxima</label>
              <input 
                type="number" 
                value={filters.maxQuantity}
                onChange={(e) => setFilters({...filters, maxQuantity: e.target.value})}
              />
            </div>
          </div>
          
          <div className="filter-row">
            <div className="filter-group">
              <label>Desde fecha</label>
              <input 
                type="date" 
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
              />
            </div>
            <div className="filter-group">
              <label>Hasta fecha</label>
              <input 
                type="date" 
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
              />
            </div>
          </div>
          
          <div className="filter-actions">
            <button type="button" className="btn-secondary" onClick={clearFilters}>
              <FaTimes /> Limpiar
            </button>
            <button type="submit" className="btn-primary">
              <FaSearch /> Buscar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
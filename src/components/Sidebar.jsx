import { FaClipboardList, FaUser } from 'react-icons/fa';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Contabilidad SAS</h2>
      </div>
      
      <nav className="sidebar-nav main-nav">
        <ul>
          <li 
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            <FaClipboardList className="nav-icon" />
            <span>Gestión de Productos</span>
          </li>
        </ul>
      </nav>
      
      {/* Este div empuja el perfil hacia abajo */}
      <div className="sidebar-spacer"></div>
      
      {/* Perfil al final */}
      <nav className="sidebar-nav profile-nav">
        <ul>
          <li 
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="nav-icon" />
            <span>Perfil</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button 
      onClick={toggleDarkMode} 
      className="theme-toggle"
      title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}
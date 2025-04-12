import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass = ({ isActive }) =>
    `hover:text-blue-600 transition relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-blue-600 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left ${
      isActive ? 'text-blue-600 after:scale-x-100' : 'text-gray-700'
    }`;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 mb-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-700">
          LibManage<span className="text-gray-700">📚</span>
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/collection" className={linkClass}>Collection</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <NavLink
            to="/admin"
            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition text-sm"
          >
            Admin Panel
          </NavLink>
        </div>

        {/* Icons + Hamburger */}
        <div className="flex items-center gap-4 text-gray-700 text-2xl md:ml-4">
            <button className="hover:text-blue-600 transition"><FaSearch /></button>
            <NavLink to="/login" className="hover:text-blue-600 transition">
                <FaUserCircle />
            </NavLink>
            <NavLink to="/cart" className="hover:text-blue-600 transition">
                <FaShoppingCart />
            </NavLink>

            {/* Hamburger for mobile */}
            <div className="md:hidden ml-2">
                <button onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </div>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
        }`}
      >
        <div className="pt-4 pb-6 space-y-3 font-medium">
          <NavLink to="/" className={linkClass} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/collection" className={linkClass} onClick={toggleMenu}>Collection</NavLink>
          <NavLink to="/about" className={linkClass} onClick={toggleMenu}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={toggleMenu}>Contact</NavLink>
          <NavLink
            to="/admin"
            className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition text-sm"
            onClick={toggleMenu}
          >
            Admin Panel
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

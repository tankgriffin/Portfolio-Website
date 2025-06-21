import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`persona-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <ul>
        <li><Link to="/" onClick={onClose}>MAIN MENU</Link></li>
        <li><Link to="/about" onClick={onClose}>ABOUT</Link></li>
        <li><Link to="/resume" onClick={onClose}>RESUME</Link></li>
        <li><Link to="/portfolio" onClick={onClose}>PORTFOLIO</Link></li>
        <li><Link to="/contact" onClick={onClose}>CONTACT</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;

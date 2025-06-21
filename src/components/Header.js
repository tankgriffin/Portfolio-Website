import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { searchIndex } from '../context/searchIndex';
import Sidebar from './Sidebar';
import './Header.css';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    if (input.trim()) {
      const matches = searchIndex.filter((entry) =>
        entry.text.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (route) => {
    setSuggestions([]);
    navigate(route);
  };

  return (
    <>
      <header className="persona-header">
        <nav className="persona-nav">
          <Link to="/about">PERSONA</Link>
          <Link to="/resume">EQUIP</Link>
          <Link to="/portfolio">SKILL</Link>
          <Link to="/contact">MISSION</Link>
        </nav>

        <div className="persona-search-wrapper">
          <form className="persona-search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="search"
              placeholder="Search Here"
              value={searchTerm}
              onChange={handleChange}
              autoComplete="off"
            />
            <button type="submit">🔍</button>
          </form>

          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((entry, idx) => (
                <li key={idx} onClick={() => handleSelect(entry.route)}>
                  <strong>{entry.title}</strong>
                  <div className="suggestion-snippet">{entry.snippet}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

export default Header;

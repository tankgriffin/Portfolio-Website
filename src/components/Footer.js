// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="persona-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/resume">Resume</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-note">
          &copy; 2025 Teancum Griffin. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

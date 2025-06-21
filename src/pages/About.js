import React, { useContext } from 'react';
import './About.css';
import { SearchContext } from '../context/SearchContext';
import { highlightText } from '../utils/highlightText';

function About() {
  const { searchTerm } = useContext(SearchContext);

  return (
    <div
      className="about-page"
      style={{
        backgroundImage: "url('/about-background.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '60px',
        position: 'relative'
      }}
    >
      <div className="about-text">
        <h1>{highlightText("About Me", searchTerm)}</h1>
        <p>
          {highlightText(
            "I’m Teancum Griffin, a front-end developer and marketing specialist based in Australia. I love combining code and creativity to build unique, immersive digital experiences.",
            searchTerm
          )}
        </p>
        <p>
          {highlightText(
            "This portfolio showcases my work, technical skills, and passion for both design and development. Welcome to my Persona.",
            searchTerm
          )}
        </p>
      </div>

      <div className="profile-image-wrapper">
        <img src="/profile.jpg" alt="Profile" className="profile-image" />
      </div>

      <img
        src="/persona.png"
        alt="Persona"
        className="persona-stamp"
      />
    </div>
  );
}

export default About;

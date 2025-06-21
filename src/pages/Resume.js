import React, { useEffect, useState } from 'react';
import './Resume.css';

function Resume() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    document.body.classList.add('resume');
    return () => document.body.classList.remove('resume');
  }, []);

  useEffect(() => {
    fetch('https://dev.to/api/articles?username=om_shree_0709')
      .then(res => res.json())
      .then(data => setArticles(data.slice(0, 3)))
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  return (
    <div
      className="resume-page"
      style={{
        backgroundImage: "url('/resume-background.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100%',
        color: 'white',
        fontFamily: 'Bungee, sans-serif',
        padding: '40px',
        boxSizing: 'border-box',
        position: 'relative'
      }}
    >
      <div className="resume-header">
        <h1>Teancum Griffin</h1>
        <p>React Developer / Marketing Specialist</p>
      </div>

      <div className="resume-content">
        <div className="resume-section">
          <h2>Summary</h2>
          <p>
            React Developer & Marketing Specialist with 5+ years of experience building front-end interfaces and performance-driven campaigns across multiple industries.
          </p>
        </div>

        <div className="resume-section">
          <h2>Career History</h2>
          <ul>
            <li>Five By Five – PPC Specialist (2024–2025)</li>
            <li>TradieMate – Account Manager (2024)</li>
            <li>Battery World – Marketing Executive (2021–2024)</li>
            <li>Leadist Agency – Account Manager (2019–2021)</li>
          </ul>
        </div>

        <div className="resume-section">
          <h2>Skills</h2>
          <ul>
            <li>React</li>
            <li>API Integration</li>
            <li>SEO</li>
            <li>Campaign Strategy</li>
            <li>Google Analytics</li>
          </ul>
        </div>

        <div className="resume-section">
          <h2>Qualifications</h2>
          <ul>
            <li>Bachelor of Business (Marketing)</li>
            <li>Certified React Developer – Codecademy</li>
            <li>Google Ads Certification</li>
          </ul>
        </div>

        <div className="resume-section">
          <h2>Publications</h2>
          <ul>
            {articles.length > 0 ? (
              articles.map((article) => (
                <li key={article.id}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: 'lightblue' }}>
                    {article.title}
                  </a>
                </li>
              ))
            ) : (
              <li>Loading...</li>
            )}
          </ul>
        </div>
      </div>

      <img
        src="/equip.png"
        alt="Equip"
        className="equip-stamp"
      />
    </div>
  );
}

export default Resume;

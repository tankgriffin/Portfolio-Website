// Enhanced repo card component for Portfolio.js
import React, { useState } from 'react';
import ProjectPreview from './ProjectPreview';

const RepoCard = ({ repo, videoUrl }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setShowPreview(true);
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  return (
    <>
      <div 
        className="repo-card"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <h2>{repo.name}</h2>
        <p>{repo.description || 'No description available.'}</p>
        <div className="repo-stats">
          <span>⭐ {repo.stargazers_count}</span>
          <span>🍴 {repo.forks_count}</span>
          {repo.language && <span>💻 {repo.language}</span>}
        </div>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          View on GitHub →
        </a>
      </div>

      <ProjectPreview
        project={repo}
        videoUrl={videoUrl}
        isVisible={showPreview}
        position={mousePosition}
      />
    </>
  );
};

export default RepoCard;
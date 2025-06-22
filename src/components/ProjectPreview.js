import React from 'react';
import './ProjectPreview.css';

const ProjectPreview = ({ project, videoUrl, isVisible, position }) => {
  if (!isVisible) return null;

  // Safe window dimensions check
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const safeLeft = Math.min(position.x + 20, windowWidth - 620);
  const safeTop = Math.max(position.y - 225, 20);

  return (
    <div 
      className="project-preview-window"
      style={{
        left: safeLeft,
        top: safeTop,
      }}
    >
      <div className="preview-header">
        <h3>{project.name}</h3>
        <span className="preview-close">×</span>
      </div>
      
      <div className="preview-content">
        <div className="video-container">
          <video
            src={videoUrl}
            autoPlay
            loop
            playsInline
            preload="metadata"
            controls
          >
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="preview-details">
          <p className="project-description">{project.description || 'No description available.'}</p>
          <div className="project-tech">
            <span>Tech:</span>
            <div className="tech-tags">
              {project.language && <span className="tech-tag">{project.language}</span>}
              {project.topics?.map(topic => (
                <span key={topic} className="tech-tag">{topic}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
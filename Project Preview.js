// ProjectPreview.js
import React, { useState } from 'react';
import './ProjectPreview.css';

const ProjectPreview = ({ project, videoUrl, isVisible, position }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="project-preview-window"
      style={{
        left: position.x + 20, // Offset from cursor
        top: position.y - 150,  // Position above cursor
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
            muted
            loop
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="preview-details">
          <p className="project-description">{project.description}</p>
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
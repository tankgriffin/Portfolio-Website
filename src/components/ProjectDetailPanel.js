import React, { useState, useEffect } from 'react';
import './ProjectDetailPanel.css';

const ProjectDetailPanel = ({ project, videoUrl, isOpen, onClose }) => {
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && project) {
      fetchReadme();
    }
  }, [isOpen, project]);

  const fetchReadme = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch README.md first, then README.txt, then readme.md
      const readmeOptions = ['README.md', 'readme.md', 'README.txt', 'readme.txt'];
      let readmeContent = null;
      
      for (const filename of readmeOptions) {
        try {
          const response = await fetch(
            `https://api.github.com/repos/${project.owner.login}/${project.name}/contents/${filename}`
          );
          
          if (response.ok) {
            const data = await response.json();
            // Decode base64 content
            readmeContent = atob(data.content);
            break;
          }
        } catch (err) {
          continue; // Try next filename
        }
      }
      
      if (readmeContent) {
        setReadme(readmeContent);
      } else {
        setReadme('No README file found for this project.');
      }
    } catch (err) {
      setError('Failed to load project details.');
      setReadme('Unable to fetch README content.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    let timeoutId;
    
    if (isOpen) {
      // Debounce DOM changes to prevent ResizeObserver issues
      timeoutId = setTimeout(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
      }, 10);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  // Simple markdown-to-HTML conversion for basic formatting
  const formatReadme = (text) => {
    return text
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="project-detail-overlay">
      <div className="project-detail-panel">
        {/* Header */}
        <div className="panel-header">
          <div className="panel-title">
            <h1>{project.name}</h1>
            <div className="project-meta">
              <span>⭐ {project.stargazers_count}</span>
              <span>🍴 {project.forks_count}</span>
              {project.language && <span>💻 {project.language}</span>}
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="panel-content">
          {/* Video Section */}
          <div className="video-section">
            <h2>Project Demo</h2>
            <div className="large-video-container">
              <video
                src={videoUrl}
                controls
                autoPlay
                loop
                playsInline
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="details-section">
            <h2>Project Details</h2>
            
            {/* Basic Info */}
            <div className="info-grid">
              <div className="info-item">
                <strong>Description:</strong>
                <p>{project.description || 'No description available'}</p>
              </div>
              
              {project.homepage && (
                <div className="info-item">
                  <strong>Live Demo:</strong>
                  <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                    View Live Site →
                  </a>
                </div>
              )}
              
              <div className="info-item">
                <strong>GitHub Repository:</strong>
                <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                  View Source Code →
                </a>
              </div>
              
              <div className="info-item">
                <strong>Created:</strong>
                <p>{new Date(project.created_at).toLocaleDateString()}</p>
              </div>
              
              <div className="info-item">
                <strong>Last Updated:</strong>
                <p>{new Date(project.updated_at).toLocaleDateString()}</p>
              </div>
            </div>

            {/* README Section */}
            <div className="readme-section">
              <h3>README</h3>
              {loading ? (
                <div className="loading">Loading project details...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : (
                <div 
                  className="readme-content"
                  dangerouslySetInnerHTML={{ __html: formatReadme(readme) }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPanel;
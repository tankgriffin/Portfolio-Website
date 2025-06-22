// Updated Portfolio.js with video preview integration
import React, { useState, useEffect } from 'react';
import RepoCard from '../components/RepoCard';
import ProjectPreview from '../components/ProjectPreview';
import './Portfolio.css';

const Portfolio = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map project names to their video URLs
  const projectVideos = {
    'scrapper': '/videos/scrapper-demo.mp4',
    'tic-tac-toe': '/videos/tictactoe-demo.mp4',
    'portfolio-site': '/videos/portfolio-demo.mp4',
    // Add more mappings as needed
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/teancumgriffin/repos?sort=updated&per_page=10');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getVideoUrl = (repoName) => {
    // Convert repo name to lowercase and remove special characters for matching
    const cleanName = repoName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return projectVideos[cleanName] || '/videos/default-demo.mp4';
  };

  if (loading) {
    return (
      <div className="portfolio-page">
        <h1 className="portfolio-title">LOADING PROJECTS...</h1>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <h1 className="portfolio-title">MY PROJECTS</h1>
      
      <div className="repo-list">
        {repos.map(repo => (
          <RepoCard
            key={repo.id}
            repo={repo}
            videoUrl={getVideoUrl(repo.name)}
          />
        ))}
      </div>

      {/* Calendar section remains the same */}
      <div className="calendar-section">
        <h2>Activity Calendar</h2>
        <div className="github-calendar">
          {/* Your existing calendar component */}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
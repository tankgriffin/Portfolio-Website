import React, { useEffect, useState, useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { highlightText } from '../utils/highlightText';
import RepoCard from '../components/RepoCard';
import ProjectDetailPanel from '../components/ProjectDetailPanel';
import ErrorBoundary from '../components/ErrorBoundary';
import './Portfolio.css';

function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { searchTerm } = useContext(SearchContext);

  // Map project names to their video URLs
  const projectVideos = {
    'scrapper': '/videos/scrapper-demo.mp4',
    'tic-tac-toe': '/videos/tictactoe-demo.mp4',
    'tictactoe': '/videos/tictactoe-demo.mp4',
    'portfolio-site': '/videos/portfolio-demo.mp4',
    'portfolio': '/videos/portfolio-demo.mp4',
    'portfolio-website': '/videos/portfolio-demo.mp4',
    // Add more project mappings as needed
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/tankgriffin/repos?sort=updated&per_page=10');
        const data = await response.json();
        if (Array.isArray(data)) {
          setRepos(data);
        }
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

  // Filter repos based on search term
  const filteredRepos = repos.filter(repo => 
    !searchTerm || 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedProject(null), 150); // Clear after animation
  };

  if (loading) {
    return (
      <div
        className="portfolio-page"
        style={{
          backgroundImage: "url('portfolio-background.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="portfolio-title">LOADING PROJECTS...</h1>
      </div>
    );
  }

  return (
    <div
      className="portfolio-page"
      style={{
        backgroundImage: "url('portfolio-background.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="portfolio-title">My Projects</h1>

      <ErrorBoundary>
        <div className="repo-list">
          {filteredRepos.map((repo) => (
            <ErrorBoundary key={repo.id}>
              <RepoCard
                repo={{
                  ...repo,
                  name: highlightText(repo.name, searchTerm),
                  description: highlightText(repo.description || 'No description provided.', searchTerm)
                }}
                videoUrl={getVideoUrl(repo.name)}
                onCardClick={handleCardClick}
              />
            </ErrorBoundary>
          ))}
        </div>
      </ErrorBoundary>

      <img src="/skill.png" alt="Skill" className="skill-stamp" />

      {/* Project Detail Panel */}
      <ErrorBoundary>
        <ProjectDetailPanel
          project={selectedProject}
          videoUrl={selectedProject ? getVideoUrl(selectedProject.name) : ''}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
        />
      </ErrorBoundary>
    </div>
  );
}

export default Portfolio;

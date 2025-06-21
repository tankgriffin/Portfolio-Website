import React from 'react';
import './RepoCard.css';

function RepoCard({ repo }) {
  return (
    <div className="repo-card">
      <h3>{repo.name}</h3>
      <p>{repo.description || 'No description'}</p>
      <a href={repo.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
    </div>
  );
}

export default RepoCard;

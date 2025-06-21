import React, { useEffect, useState, useContext } from 'react';
import {
  eachDayOfInterval,
  format,
  subMonths,
  startOfMonth,
  endOfMonth
} from 'date-fns';
import { SearchContext } from '../context/SearchContext';
import { highlightText } from '../utils/highlightText';
import './Portfolio.css';

function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [groupedByMonth, setGroupedByMonth] = useState({});
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    fetch('https://api.github.com/users/tankgriffin/repos')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const today = new Date();
    const start = subMonths(today, 11);
    const days = eachDayOfInterval({ start: startOfMonth(start), end: endOfMonth(today) });

    const dummyData = days.map((day) => ({
      date: format(day, 'yyyy-MM-dd'),
      count: Math.floor(Math.random() * 5),
    }));

    const grouped = dummyData.reduce((acc, item) => {
      const month = format(new Date(item.date), 'MMM yyyy');
      if (!acc[month]) acc[month] = [];
      acc[month].push(item);
      return acc;
    }, {});

    setGroupedByMonth(grouped);
  }, []);

  const monthChunks = Object.entries(groupedByMonth).reduce((acc, entry, idx) => {
    const chunkIndex = Math.floor(idx / 4);
    if (!acc[chunkIndex]) acc[chunkIndex] = [];
    acc[chunkIndex].push(entry);
    return acc;
  }, []);

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

      <div className="repo-list">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-card">
            <h2>{highlightText(repo.name, searchTerm)}</h2>
            <p>{highlightText(repo.description || 'No description provided.', searchTerm)}</p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>

      <div className="calendar-section">
        <h2 className="calendar-heading">Activity</h2>
        {monthChunks.map((chunk, rowIdx) => (
          <div className="calendar-row" key={rowIdx}>
            {chunk.map(([month, days]) => (
              <div className="calendar-month-box" key={month}>
                <h3>{month}</h3>
                <div className="calendar-grid">
                  {days.map((day, idx) => (
                    <div
                      key={idx}
                      className="calendar-day"
                      style={{
                        backgroundColor: day.count > 0 ? '#0f0' : '#333',
                      }}
                      title={`${day.date}: ${day.count} commits`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <img src="/skill.png" alt="Skill" className="skill-stamp" />
    </div>
  );
}

export default Portfolio;

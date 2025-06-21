import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CONTRIBUTIONS = gql`
  query {
    viewer {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

function ContributionCalendar() {
  const { loading, error, data } = useQuery(GET_CONTRIBUTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching contributions.</p>;

  const weeks = data.viewer.contributionsCollection.contributionCalendar.weeks;

  return (
    <div className="calendar">
      {weeks.map((week, i) => (
        <div key={i} className="week">
          {week.contributionDays.map((day, j) => (
            <div
              key={j}
              className="day"
              title={`${day.date}: ${day.contributionCount} contributions`}
              style={{ backgroundColor: day.color }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ContributionCalendar;

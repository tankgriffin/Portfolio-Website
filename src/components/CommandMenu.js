import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CommandMenu.css';

function CommandMenu() {
  const navigate = useNavigate();

  return (
    <div
      className="command-menu"
      style={{
        backgroundImage: "url('/persona-background.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: '#000',
      }}
    >
      <ul className="command-list">
        <li>
          <img
            src="/skill.png"
            alt="SKILL"
            className="command-icon icon-skill"
            onClick={() => navigate('/portfolio')}
          />
        </li>
        <li>
          <img
            src="/equip.png"
            alt="EQUIP"
            className="command-icon icon-equip"
            onClick={() => navigate('/resume')}
          />
        </li>
        <li>
          <img
            src="/persona.png"
            alt="PERSONA"
            className="command-icon icon-persona"
            onClick={() => navigate('/about')}
          />
        </li>
        <li>
          <img
            src="/mission.png"
            alt="MISSION"
            className="command-icon icon-mission"
            onClick={() => navigate('/contact')}
          />
        </li>
      </ul>
    </div>
  );
}

export default CommandMenu;

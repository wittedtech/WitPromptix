import React from 'react';
import { NavLink } from 'react-router-dom';
import { sidebarOptions } from '../config/sidebarOptions';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-secondary-bg text-primary-text p-4 overflow-auto">
      <h2 className="text-lg font-semibold mb-4 text-accent">Prompt Options</h2>
      <ul>
        {sidebarOptions.map((option) => (
          <li key={option} className="mb-2">
            <NavLink
              to={`/${option.toLowerCase().replace(/\s+/g, '-')}`}
              className={({ isActive }) =>
                `block p-2 rounded transition ${
                  isActive
                    ? 'bg-teal-700 text-white'
                    : 'text-primary-text hover:bg-gray-300 dark:hover:bg-teal-600 dark:hover:text-white' 
                }`
              }
            >
              {option}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
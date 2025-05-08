import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/WittedTech',
      svg: (
        <svg className="w-6 h-6 svg-animate" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.71c-2.78.61-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.09 2.94.84.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.564 9.564 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.006 10.006 0 0022 12c0-5.52-4.48-10-10-10z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@WittedTech',
      svg: (
        <svg className="w-6 h-6 svg-animate" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6c-1 .3-1.8 1.1-2.1 2.1C0 8.3 0 12 0 12s0 3.7.5 5.8c.3 1 1.1 1.8 2.1 2.1 2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6c1-.3 1.8-1.1 2.1-2.1.5-2.1.5-5.8.5-5.8s0-3.7-.5-5.8zM9.6 16.4V7.6l6.3 4.4-6.3 4.4z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/WittedTech',
      svg: (
        <svg className="w-6 h-6 svg-animate" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/WittedTech',
      svg: (
        <svg className="w-6 h-6 svg-animate" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 3.668.227 1.981 1.97 1.826 5.332.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.227 3.383 1.97 5.07 5.332 5.226 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c3.383-.227 5.07-1.97 5.226-5.332.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.227-3.383-1.97-5.07-5.332-5.226C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
        </svg>
      ),
    },
    {
      name: 'X',
      url: 'https://x.com/WittedTech',
      svg: (
        <svg className="w-6 h-6 svg-animate" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <header className="bg-secondary-bg p-4 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold text-accent">{"<WitPromptix />"}</div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-text hover:text-accent"
            >
              {link.svg}
            </a>
          ))}
        </div>
        <ThemeToggle />
        <button
          className="md:hidden text-primary-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-secondary-bg p-4 rounded-lg shadow-lg md:hidden">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-primary-text hover:text-accent"
            >
              {link.svg}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
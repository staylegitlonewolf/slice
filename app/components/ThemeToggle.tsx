import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme, default to light if none
    const savedTheme = localStorage.getItem('slice-theme') || 'light';
    const isDarkTheme = savedTheme === 'dark';
    
    setIsDark(isDarkTheme);
    
    // Set theme immediately to prevent flash
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    console.log('=== THEME TOGGLE TRIGGERED ===');
    console.log('Current isDark:', isDark);
    const newTheme = isDark ? 'light' : 'dark';
    console.log('Switching to theme:', newTheme);
    setIsDark(newTheme === 'dark');
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save theme to localStorage for persistence
    localStorage.setItem('slice-theme', newTheme);
    console.log('Theme saved to localStorage:', newTheme);
    console.log('=== THEME TOGGLE COMPLETE ===');
  };

  return (
    <button
      onClick={(e) => {
        console.log('=== THEME TOGGLE BUTTON CLICKED ===');
        console.log('Event target:', e.target);
        console.log('Event currentTarget:', e.currentTarget);
        console.log('Event type:', e.type);
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }}
      className="theme-toggle-btn"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <div className="theme-toggle-content">
        <div className="theme-toggle-icon">
          {isLoaded && (
            isDark ? (
              <svg className="sun-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="moon-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )
          )}
        </div>
        <span className="theme-toggle-text">{isDark ? 'LIGHT' : 'DARK'}</span>
      </div>
    </button>
  );
};

export default ThemeToggle;

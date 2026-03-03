import React from 'react';

/**
 * Header component - displays the application title and navigation
 * @returns {JSX.Element} Header component
 */
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="header-icon">📋</span>
          Task Manager
        </h1>
        <nav className="header-nav">
          <span className="nav-badge">DevOps Project</span>
        </nav>
      </div>
    </header>
  );
}

export default Header;

import React from 'react';

/**
 * Footer component - displays copyright and project info
 * @returns {JSX.Element} Footer component
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {currentYear} DevOps Task Manager. Built with React + Vite.
        </p>
        <p className="footer-credits">
          Created by <strong>Rhythm Jain</strong> — CI/CD Pipeline Enabled
        </p>
      </div>
    </footer>
  );
}

export default Footer;

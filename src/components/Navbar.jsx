import React, { useState, useEffect } from 'react';

const Navbar = ({ onLoginClick, user, onLogout, searchQuery, onSearchChange, onBookingsClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const userName = user ? user.split('@')[0].charAt(0).toUpperCase() + user.split('@')[0].slice(1) : '';

  return (
    <>
      {user && (
        <div className="top-corner-profile">
          Welcome Mr. {userName}
        </div>
      )}
      <nav className={`navbar ${scrolled ? 'glass-card scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="logo">
          <span className="logo-icon">❈</span>
          <span className="logo-text">Aura<span className="text-secondary">Dining</span></span>
        </div>
        
        {/* SEO-friendly semantic search form */}
        <form role="search" className="search-form" onSubmit={handleSearchSubmit}>
          <label htmlFor="site-search" className="sr-only">Search our menu and reserved tables</label>
          <div className="search-input-wrapper">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="search" 
              id="site-search" 
              name="q"
              placeholder="Search dishes..." 
              aria-label="Search through site content"
              className="search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </form>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
          {user ? (
            <>
              <button onClick={onBookingsClick} className="btn-login" aria-label="View your bookings">My Bookings</button>
              <button onClick={onLogout} className="btn-login" aria-label="Logout">Logout</button>
            </>
          ) : (
            <button onClick={onLoginClick} className="btn-login" aria-label="Login to your account">Login</button>
          )}
          <a href="#reservation" className="btn-primary">Book a Table</a>
          </div>
      </div>
      </nav>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: ${scrolled ? '1rem' : '2rem'};
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1200px;
          z-index: 1000;
          padding: 0.8rem 2rem;
          border-radius: ${scrolled ? '12px' : '0'};
          transition: all 0.4s ease;
          border: ${scrolled ? '1px solid var(--glass-border)' : '1px solid transparent'};
          background: ${scrolled ? 'var(--glass)' : 'transparent'};
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0;
          gap: 2rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 1.8rem;
          color: var(--primary);
          white-space: nowrap;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .text-secondary {
          color: var(--text-main);
          font-weight: 400;
        }

        .search-form {
          flex: 0 0 auto;
          width: 170px;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          width: 170px;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-main);
          font-family: inherit;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.1);
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          white-space: nowrap;
        }

        .nav-links a:not(.btn-primary), .btn-login {
          color: var(--text-main);
          text-decoration: none;
          font-family: 'Cinzel', serif;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 1px;
          transition: var(--transition);
          text-transform: uppercase;
          background: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-primary {
          white-space: nowrap;
        }

        .nav-links a:not(.btn-primary):hover, .btn-login:hover {
          color: var(--primary);
        }

        .top-corner-profile {
          position: fixed;
          top: 15px;
          left: 20px;
          z-index: 1100;
          color: var(--primary);
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 1.1rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
          letter-spacing: 0.5px;
        }

        @media (max-width: 900px) {
          .search-form {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, User } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : 'transparent'}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Compass className="logo-icon" size={28} />
          <span>Where's My Spinach</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-links desktop-only">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/destinations" className={location.pathname === '/destinations' ? 'active' : ''}>Explore Europe</Link>
          <Link to="/itineraries" className={location.pathname === '/itineraries' ? 'active' : ''}>Itinerary Library</Link>
          <Link to="/marketplace" className={location.pathname === '/marketplace' ? 'active' : ''}>Bookings</Link>
          <Link to="/deals" className={location.pathname === '/deals' ? 'active' : ''}>Exclusive Deals</Link>
          <Link to="/ask-ai" className={location.pathname === '/ask-ai' ? 'active' : ''} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Ask AI <span className="ai-badge">Premium</span>
          </Link>
          <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin Panel</Link>
          <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>Pricing</Link>
        </div>

        <div className="navbar-actions desktop-only">
          {isAuthenticated ? (
            <Link to="/dashboard" className="flex items-center gap-sm font-bold text-primary">
              <User size={20} /> Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="login-link font-bold">Login</Link>
              <Link to="/signup">
                <Button variant="primary">Start Free Trial</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="mobile-nav glass-dark">
          <Link to="/">Home</Link>
          <Link to="/destinations">Explore Europe</Link>
          <Link to="/itineraries">Itinerary Library</Link>
          <Link to="/marketplace">Bookings</Link>
          <Link to="/deals">Exclusive Deals</Link>
          <Link to="/ask-ai">Ask AI (Premium)</Link>
          <Link to="/admin">Admin Panel</Link>
          <Link to="/pricing">Pricing</Link>
          <hr className="nav-divider" />
          {isAuthenticated ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="mt-sm">
                <Button variant="primary" className="btn-full">Start Free Trial</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Share2, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Compass className="text-primary" size={28} />
              <span>Where's My Spinach</span>
            </Link>
            <p className="footer-desc">
              Travel the world confidently with our curated vegetarian, vegan, and Jain food guides.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><Share2 size={20} /></a>
              <a href="#" className="social-link"><MessageCircle size={20} /></a>
              <a href="#" className="social-link"><Mail size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Platform</h4>
            <Link to="/destinations">Destinations</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/guides">Travel Guides</Link>
            <Link to="/ask-ai">Ask AI Companion</Link>
            <Link to="/login">Login</Link>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Resources</h4>
            <Link to="/#">Veg Safety Score</Link>
            <Link to="/#">Jain Phrases</Link>
            <Link to="/#">NRI Lifestyle Blog</Link>
            <Link to="/#">FAQ</Link>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Legal</h4>
            <Link to="/#">Privacy Policy</Link>
            <Link to="/#">Terms of Service</Link>
            <Link to="/#">Cookie Policy</Link>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Where's My Spinach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

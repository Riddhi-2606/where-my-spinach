import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { CheckCircle2, Plane, Globe, Star } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  return (
    <div className="pricing-page section bg-cream">
      <div className="container">
        <div className="text-center mb-xl">
          <Star size={48} className="mx-auto mb-md text-accent" />
          <h1 className="hero-headline text-primary mb-sm">Choose Your Travel Pass</h1>
          <p className="text-lg text-light max-w-2xl mx-auto">
            Get unrestricted access to all Europe food guides, restaurant maps, and translation cards.
          </p>
        </div>

        <div className="passes-container">
          {/* Explorer Pass */}
          <div className="travel-pass">
            <div className="pass-top bg-primary text-white">
              <Plane size={24} className="mb-sm opacity-80" />
              <h3 className="text-2xl mb-xs">Explorer Pass</h3>
              <p className="text-sm opacity-80 uppercase tracking-wide">Monthly Access</p>
            </div>
            <div className="pass-middle">
              <div className="price-tag">
                <span className="currency">₹</span>
                <span className="amount text-primary">299</span>
                <span className="period">/mo</span>
              </div>
              <ul className="pass-features">
                <li><CheckCircle2 size={18} className="text-primary" /> Full Europe Guide Access</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Veg Safety Maps</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Basic Translation Cards</li>
              </ul>
            </div>
            <div className="pass-bottom">
              <Link to="/signup">
                <Button variant="primary" className="btn-full border-none shadow-md">Select Explorer</Button>
              </Link>
            </div>
          </div>

          {/* Global Traveller Pass */}
          <div className="travel-pass featured">
            <div className="featured-badge bg-accent text-white font-bold text-xs uppercase px-sm py-xs">Best Value</div>
            <div className="pass-top bg-terracotta text-white">
              <Globe size={24} className="mb-sm opacity-80" />
              <h3 className="text-2xl mb-xs">Global Traveller</h3>
              <p className="text-sm opacity-80 uppercase tracking-wide">Yearly Access</p>
            </div>
            <div className="pass-middle">
              <div className="price-tag">
                <span className="currency">₹</span>
                <span className="amount text-terracotta">1999</span>
                <span className="period">/yr</span>
              </div>
              <ul className="pass-features">
                <li><CheckCircle2 size={18} className="text-terracotta" /> All Explorer Features</li>
                <li><CheckCircle2 size={18} className="text-terracotta" /> Offline Guide Downloads</li>
                <li><CheckCircle2 size={18} className="text-terracotta" /> Audio Translation Scripts</li>
                <li><CheckCircle2 size={18} className="text-terracotta" /> NRI Premium Community</li>
              </ul>
            </div>
            <div className="pass-bottom">
              <Link to="/signup">
                <Button variant="primary" className="btn-full bg-terracotta border-none shadow-md">Select Global</Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Free Trial CTA */}
        <div className="text-center mt-xl">
          <p className="text-light mb-md text-lg">Not sure yet? Start with a 7-day free trial. Cancel anytime.</p>
          <Link to="/signup">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">Start Free Trial</Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Pricing;

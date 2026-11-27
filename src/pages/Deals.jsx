import React from 'react';
import { useTravel } from '../context/TravelContext';
import AffiliateCard from '../components/AffiliateCard';
import PromoCodeCard from '../components/PromoCodeCard';
import { Sparkles, Gift, Tag, Percent } from 'lucide-react';
import './Deals.css';

const Deals = () => {
  const { affiliatePartners } = useTravel();

  return (
    <div className="deals-page section">
      <div className="container">
        
        {/* Hero Section */}
        <div className="deals-hero-header text-center mb-xl animate-fade-in">
          <span className="premium-pill flex items-center gap-xs mx-auto">
            <Sparkles size={14} className="text-terracotta" /> Creator-Curated Deals
          </span>
          <h1 className="deals-title mt-xs mb-sm font-heading font-bold">
            Exclusive Travel Deals & Discount Codes
          </h1>
          <p className="deals-subtitle text-light max-w-2xl mx-auto">
            Book your hotels, flights, local transfers, and tours using our exclusive partner discount codes. 
            Always verified, always saving you money on your European adventures.
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="deals-highlight-banner glass mb-xl p-lg flex items-center justify-between flex-wrap gap-md animate-fade-in" style={{
          background: 'linear-gradient(135deg, rgba(94, 125, 106, 0.08) 0%, rgba(217, 122, 84, 0.08) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '2.5rem' }}>🎁</span>
            <div>
              <h3 className="font-heading font-bold text-lg mb-xxs">How to claim your discounts:</h3>
              <p className="text-light text-sm" style={{ margin: 0 }}>
                1. Click the "Copy" button to save the promo code. <br />
                2. Click the booking button to open our official affiliate link. <br />
                3. Paste the code during checkout to unlock your discount!
              </p>
            </div>
          </div>
          <div className="flex gap-sm">
            <span className="food-tag warning-tag"><Tag size={12} /> Verified Today</span>
            <span className="food-tag" style={{ backgroundColor: 'rgba(94, 125, 106, 0.1)', color: 'var(--primary-color)' }}>
              <Percent size={12} /> Live Updates
            </span>
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div className="deals-grid-layout">
          {affiliatePartners.map((partner) => (
            <PromoCodeCard 
              key={partner.id}
              partnerName={partner.name}
              code={partner.code}
              discount={partner.discount}
              description={partner.description}
              expiryDate={partner.expiryDate}
              buttonText={partner.buttonText}
              url={partner.url}
            />
          ))}
        </div>

        {/* Affiliate Disclosure */}
        <div className="deals-disclosure text-center mt-xl p-md glass" style={{
          borderRadius: 'var(--radius-md)',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
          fontSize: '0.8rem',
          color: 'var(--text-light)',
          lineHeight: '1.5'
        }}>
          <h4 className="font-bold mb-xxs" style={{ color: 'var(--text-color)' }}>Affiliate Disclosure & Trust</h4>
          <p style={{ margin: 0 }}>
            We work directly with Klook, GetYourGuide, Booking.com, Viator, and Skyscanner to secure exclusive discounts. 
            When you book through our links, we may earn a small commission at zero extra cost to you. 
            This helps us keep research and guides up-to-date for vegetarian, vegan, and Jain travelers. Thank you for your support!
          </p>
        </div>

      </div>
    </div>
  );
};

export default Deals;

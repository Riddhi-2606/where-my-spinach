import React from 'react';
import { affiliateLinks } from '../data/affiliateLinks';
import { ExternalLink, Compass, Ticket, Car, Globe } from 'lucide-react';
import './AffiliateBookingCard.css';

const AffiliateBookingCard = () => {
  return (
    <section className="booking-experiences-section bg-cream py-xl">
      <div className="container">
        
        <div className="text-center mb-lg">
          <span className="premium-pill flex items-center gap-xs mx-auto">
            <Compass size={14} /> Official Booking Partners
          </span>
          <h2 className="section-title mt-xs mb-xs">Book Trusted Travel Experiences</h2>
          <p className="text-light max-w-2xl mx-auto">
            Get instant confirmation on tours, transport passes, and excursions via our verified partners.
          </p>
        </div>

        <div className="experiences-grid">
          
          {/* KLOOK CARD */}
          <div className="partner-experience-card klook-theme">
            <div className="card-bg-image">
              <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80" alt="Europe Travels" />
              <div className="overlay-grad"></div>
            </div>
            <div className="card-content-overlay flex flex-col justify-between">
              <div className="card-header-brand">
                <div className="brand-logo klook-logo">
                  KLOOK
                </div>
                <span className="partner-verified-badge">Official Partner</span>
              </div>
              
              <div className="card-body-info">
                <h3 className="card-partner-heading">Tours, SIM Cards & Rail Passes</h3>
                <p className="partner-text-desc">
                  Book tours, attractions, transfers, SIM cards, and experiences
                </p>
                <div className="experience-features-row flex gap-md my-sm">
                  <span className="feat-pill"><Ticket size={12} /> Attraction Tickets</span>
                  <span className="feat-pill"><Car size={12} /> Transfers</span>
                  <span className="feat-pill"><Globe size={12} /> eSIMs</span>
                </div>
              </div>

              <div className="card-footer-cta">
                <a 
                  href={affiliateLinks.klook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="affiliate-cta-btn klook-btn flex items-center justify-center gap-xs"
                >
                  Book on Klook <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* GETYOURGUIDE CARD */}
          <div className="partner-experience-card gyg-theme">
            <div className="card-bg-image">
              <img src="https://images.unsplash.com/photo-1516483638261-f40af5a52c17?auto=format&fit=crop&w=600&q=80" alt="Italy Travels" />
              <div className="overlay-grad"></div>
            </div>
            <div className="card-content-overlay flex flex-col justify-between">
              <div className="card-header-brand">
                <div className="brand-logo gyg-logo">
                  GetYourGuide
                </div>
                <span className="partner-verified-badge">Official Partner</span>
              </div>

              <div className="card-body-info">
                <h3 className="card-partner-heading">Local Excursions & Food Tours</h3>
                <p className="partner-text-desc">
                  Book tours, attractions, transfers, SIM cards, and experiences
                </p>
                <div className="experience-features-row flex gap-md my-sm">
                  <span className="feat-pill"><Compass size={12} /> Guided Tours</span>
                  <span className="feat-pill"><Ticket size={12} /> Fast Track</span>
                  <span className="feat-pill">🥐 Veg Food Walks</span>
                </div>
              </div>

              <div className="card-footer-cta">
                <a 
                  href={affiliateLinks.getYourGuide} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="affiliate-cta-btn gyg-btn flex items-center justify-center gap-xs"
                >
                  Book on GetYourGuide <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AffiliateBookingCard;

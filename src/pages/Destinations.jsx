import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import Card from '../components/Card';
import Button from '../components/Button';
import PromoCodeCard from '../components/PromoCodeCard';
import { 
  Search, MapPin, ShieldCheck, ShieldAlert, AlertTriangle, 
  CheckCircle, ExternalLink, Compass, CloudSun, BadgePercent 
} from 'lucide-react';
import AffiliateBookingCard from '../components/AffiliateBookingCard';
import './Destinations.css';

const getScoreIcon = (score) => {
  if (score >= 4.0) return <ShieldCheck className="text-success" size={20} />;
  return <ShieldAlert className="text-warning" size={20} />;
};

const Destinations = () => {
  const { destinations, affiliatePartners } = useTravel();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idParam = searchParams.get('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filters = ['All', 'Vegan friendly', 'Jain friendly', 'Budget friendly'];

  // Handle URL ID query parameter to auto-select a country guide
  useEffect(() => {
    if (idParam && destinations.length > 0) {
      const found = destinations.find(d => d.id === idParam);
      if (found) {
        setSelectedCountry(found);
        // Scroll details panel into view on mobile
        if (window.innerWidth <= 992) {
          const el = document.getElementById('survival-guide-panel');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (destinations.length > 0 && !selectedCountry) {
      setSelectedCountry(destinations[0]); // default select the first destination
    }
  }, [idParam, destinations]);

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
      (dest.tags && dest.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase()));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="destinations-europe section">
      <div className="container">
        
        <div className="text-center mb-xl">
          <span className="premium-pill"><Compass size={14} /> Creator Travel Guides</span>
          <h1 className="hero-headline text-primary mb-xs mt-xs">European Destination Guides</h1>
          <p className="text-lg text-light max-w-2xl mx-auto mb-lg">
            Safety metrics, hidden meat warnings, and verified dining codes for NRI vegetarian, vegan, and Jain travelers.
          </p>
          
          <div className="filters-container glass mx-auto">
            <div className="search-bar">
              <Search className="text-light" />
              <input 
                type="text" 
                placeholder="Search country (e.g. Italy, France...)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-tags">
              {filters.map(filter => (
                <button 
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => {
                    setActiveFilter(filter);
                    setSelectedCountry(null);
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="dest-grid-layout">
          
          {/* Countries Grid */}
          <div className="dest-grid">
            {filteredDestinations.map((dest) => (
              <Card 
                key={dest.id} 
                imageFirst 
                hover 
                bgImage={dest.img} 
                className={`dest-europe-card ${selectedCountry?.id === dest.id ? 'selected-card' : ''}`}
                onClick={() => {
                  setSelectedCountry(dest);
                  navigate(`/destinations?id=${dest.id}`, { replace: true });
                }}
              >
                <div className="card-image-overlay-content absolute top-0 left-0 w-full p-md flex justify-between">
                  <span className="glass px-sm py-xs rounded font-bold flex items-center gap-xs shadow-sm text-sm">
                    {getScoreIcon(dest.score || 4.0)} {dest.score || '4.0'}
                  </span>
                  <span className="bg-accent text-white px-sm py-xs rounded font-bold text-xs uppercase shadow-sm">
                    {dest.bestFor || 'Vegetarian'}
                  </span>
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 className="text-2xl mb-xs mt-sm font-heading font-bold">{dest.name}</h3>
                  <p className="text-sm text-light mb-md line-clamp-3">{dest.description}</p>
                  <div className="mt-auto">
                    <Button 
                      variant={selectedCountry?.id === dest.id ? 'primary' : 'outline'} 
                      className="btn-full border-primary text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCountry(dest);
                        navigate(`/destinations?id=${dest.id}`, { replace: true });
                      }}
                    >
                      View Survival Guide
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Details/Warnings Panel */}
          <div className="dest-details-panel" id="survival-guide-panel">
            {selectedCountry ? (
              <Card className="glass p-lg sticky-panel animate-fade-in" style={{ background: '#FFFFFF' }}>
                <h2 className="text-2xl font-bold font-heading mb-md border-bottom pb-xs text-primary">
                  {selectedCountry.name} Survival Guide
                </h2>
                
                {/* Score indicators */}
                <div className="flex flex-col gap-xs mb-lg bg-cream p-md rounded" style={{ border: '1px solid var(--border-color)' }}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-light font-bold">VEGETARIAN RATING:</span>
                    <span className="font-bold text-primary">{(selectedCountry.vegScore || 4.0).toFixed(1)} / 5.0 ★</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-light font-bold">JAIN DIET COMPLIANCE:</span>
                    <span className="font-bold text-terracotta">{(selectedCountry.jainScore || 4.0).toFixed(1)} / 5.0 ★</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-light font-bold">VEGAN VETTING:</span>
                    <span className="font-bold text-accent">{(selectedCountry.veganScore || 4.0).toFixed(1)} / 5.0 ★</span>
                  </div>
                </div>

                {/* Weather & Budget */}
                {(selectedCountry.weather || selectedCountry.budget) && (
                  <div className="flex gap-md mb-lg text-xs text-light">
                    {selectedCountry.weather && (
                      <span className="flex items-center gap-xxs">
                        <CloudSun size={14} className="text-primary" /> {selectedCountry.weather}
                      </span>
                    )}
                    {selectedCountry.budget && (
                      <span className="flex items-center gap-xxs">
                        <strong>Budget:</strong> {selectedCountry.budget}
                      </span>
                    )}
                  </div>
                )}

                {/* Safe Foods */}
                {selectedCountry.safeFoods && selectedCountry.safeFoods.length > 0 && (
                  <div className="mb-lg">
                    <h3 className="text-md font-bold mb-sm flex items-center gap-xs text-primary font-heading">
                      <CheckCircle size={18} /> Safe Local Foods
                    </h3>
                    <ul className="guide-bullet-list">
                      {selectedCountry.safeFoods.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warnings */}
                {selectedCountry.warningFoods && selectedCountry.warningFoods.length > 0 && (
                  <div className="mb-lg">
                    <h3 className="text-md font-bold mb-sm flex items-center gap-xs text-danger font-heading">
                      <AlertTriangle size={18} /> Hidden Ingredients & Warnings
                    </h3>
                    <ul className="guide-bullet-list warning-list">
                      {selectedCountry.warningFoods.map((f, i) => (
                        <li key={i} style={{ color: 'var(--text-color)' }}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Survival Tips */}
                {selectedCountry.tips && selectedCountry.tips.length > 0 && (
                  <div className="mb-lg border-top pt-md">
                    <h3 className="text-md font-bold mb-sm font-heading text-text-color">Survival & Customization Tips</h3>
                    <ul className="guide-bullet-list" style={{ listStyleType: 'circle' }}>
                      {selectedCountry.tips.map((t, i) => (
                        <li key={i} style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Dynamic Tour Booking via Affiliates */}
                <div className="border-top pt-lg">
                  <h3 className="text-sm font-bold mb-sm font-heading text-terracotta uppercase tracking-wider flex items-center gap-xxs">
                    <BadgePercent size={16} /> Recommended Activity Partners
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {affiliatePartners.slice(0, 2).map((partner) => (
                      <div key={partner.id} className="glass p-md" style={{
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.6)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: '800' }}>
                            {partner.logo} {partner.name}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: '700', textTransform: 'uppercase' }}>
                            {partner.discount} OFF
                          </span>
                        </div>
                        <p className="text-light mt-xs mb-sm" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                          Book tours and entry passes on {partner.name} with code <strong>{partner.code}</strong>.
                        </p>
                        <a 
                          href={partner.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-full"
                          style={{
                            display: 'block',
                            textAlign: 'center',
                            backgroundColor: 'var(--primary-color)',
                            color: '#FFFFFF',
                            padding: '8px 12px',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: '700',
                            fontSize: '0.75rem',
                            textDecoration: 'none'
                          }}
                        >
                          Book via {partner.name} <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

              </Card>
            ) : (
              <div className="select-prompt glass p-xl text-center">
                <MapPin size={48} className="mx-auto mb-sm text-primary opacity-50 animate-bounce" />
                <h3 className="text-xl font-bold font-heading">Select a Country Guide</h3>
                <p className="text-sm text-light mt-xs">Click on any country card to reveal detailed vegetarian/vegan survival warnings, safe food highlights, and food tour bookings.</p>
              </div>
            )}
          </div>

        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center mt-xl p-xl">
            <MapPin size={48} className="mx-auto mb-md text-terracotta opacity-50" />
            <h3 className="text-2xl font-bold">No guides found</h3>
            <p className="text-light">Try adjusting your filters.</p>
          </div>
        )}

      </div>
      <AffiliateBookingCard />
    </div>
  );
};

export default Destinations;

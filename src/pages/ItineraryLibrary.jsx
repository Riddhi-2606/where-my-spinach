import React, { useState, useEffect } from 'react';
import { useTravel } from '../context/TravelContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import DiscountBanner from '../components/DiscountBanner';
import { 
  Search, MapPin, Calendar, Clock, Bookmark, BookmarkCheck, 
  Utensils, Hotel, ExternalLink, ArrowLeft, CheckSquare, Square, 
  HelpCircle, ChevronDown, ChevronUp, FileText, Sparkles, ShoppingBag, 
  Compass, AlertCircle 
} from 'lucide-react';
import './ItineraryLibrary.css';

const ItineraryLibrary = () => {
  const { itineraries, savedItineraryIds, toggleSaveItinerary, affiliatePartners } = useTravel();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchParam = searchParams.get('search') || '';
  const dietParam = searchParams.get('diet') || 'All';
  const idParam = searchParams.get('id');

  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [activeDiet, setActiveDiet] = useState(dietParam);
  const [activeBudget, setActiveBudget] = useState('All');
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  // FAQ open states
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  
  // Interactive Packing list state
  const [packedItems, setPackedItems] = useState({});

  const diets = ['All', 'Vegan', 'Vegetarian', 'Jain'];
  const budgets = ['All', 'Low', 'Medium', 'Luxury'];

  // Update filter states when URL params change (e.g. from Home search)
  useEffect(() => {
    if (searchParam) setSearchTerm(searchParam);
    if (dietParam) setActiveDiet(dietParam);
  }, [searchParam, dietParam]);

  // Handle URL id param to load details view directly
  useEffect(() => {
    if (idParam && itineraries.length > 0) {
      const found = itineraries.find(it => it.id === idParam);
      if (found) {
        setSelectedItinerary(found);
      }
    } else {
      setSelectedItinerary(null);
    }
  }, [idParam, itineraries]);

  const handleBackToLibrary = () => {
    setSearchParams({});
    setSelectedItinerary(null);
    window.scrollTo(0, 0);
  };

  const handleOpenItinerary = (itinerary) => {
    setSearchParams({ id: itinerary.id });
    setSelectedItinerary(itinerary);
    window.scrollTo(0, 0);
  };

  const togglePackingItem = (idx) => {
    setPackedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleFAQ = (idx) => {
    setOpenFAQIndex(openFAQIndex === idx ? null : idx);
  };

  const filteredItineraries = itineraries.filter(it => {
    const matchesSearch = it.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          it.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (it.cities && it.cities.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())));
    
    // Exact diet match or default safe category mapping
    const matchesDiet = activeDiet === 'All' || 
      it.dietary?.toLowerCase() === activeDiet.toLowerCase() ||
      (activeDiet === 'Vegetarian' && it.vegScore >= 8) ||
      (activeDiet === 'Vegan' && it.veganScore >= 8) ||
      (activeDiet === 'Jain' && it.jainScore >= 8);

    const matchesBudget = activeBudget === 'All' || it.budget.toLowerCase() === activeBudget.toLowerCase();
    
    return matchesSearch && matchesDiet && matchesBudget;
  });

  if (selectedItinerary) {
    const isSaved = savedItineraryIds.includes(selectedItinerary.id);
    
    // Find GetYourGuide or Klook partners
    const gygPartner = affiliatePartners.find(p => p.id === 'gyg');
    const klookPartner = affiliatePartners.find(p => p.id === 'klook');

    return (
      <div className="itinerary-detail-page section bg-cream">
        <div className="container" style={{ paddingBottom: '120px' }}>
          
          <button onClick={handleBackToLibrary} className="back-btn flex items-center gap-xs mb-md text-primary font-bold">
            <ArrowLeft size={20} /> Back to Library
          </button>

          <div className="itinerary-detail-header relative mb-xl">
            <div className="itinerary-detail-hero">
              <img src={selectedItinerary.image} alt={selectedItinerary.title} className="img-cover" />
              <div className="hero-overlay"></div>
              <div className="hero-text-content">
                <span className="dietary-badge font-bold bg-accent text-text-color">
                  {selectedItinerary.dietary || 'Vegetarian'} Safe
                </span>
                <h1 className="text-4xl text-white font-heading font-bold mb-xs">{selectedItinerary.title}</h1>
                <p className="text-white opacity-90 flex items-center gap-xs">
                  <MapPin size={16} /> {selectedItinerary.cities.join(' → ')}, {selectedItinerary.country}
                </p>
              </div>
            </div>
            
            <div className="detail-actions-bar glass flex justify-between items-center p-md">
              <div className="flex gap-lg flex-wrap">
                <div className="meta-item">
                  <Clock className="text-primary" size={20} />
                  <div>
                    <span className="meta-label">Duration</span>
                    <span className="meta-value">{selectedItinerary.duration}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <Compass className="text-primary" size={20} />
                  <div>
                    <span className="meta-label">Budget</span>
                    <span className="meta-value">{selectedItinerary.budget}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <Utensils className="text-primary" size={20} />
                  <div>
                    <span className="meta-label">Veg / Jain / Vegan Rating</span>
                    <span className="meta-value" style={{ fontSize: '0.9rem' }}>
                      🟢 {selectedItinerary.vegScore || '9.0'} | 🟡 {selectedItinerary.jainScore || '8.0'} | 🟣 {selectedItinerary.veganScore || '8.0'}
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                variant={isSaved ? 'outline' : 'primary'} 
                className="flex items-center gap-sm border-primary text-primary"
                onClick={() => toggleSaveItinerary(selectedItinerary.id)}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck size={20} className="text-primary" /> Saved to Dashboard
                  </>
                ) : (
                  <>
                    <Bookmark size={20} /> Save Itinerary
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="itinerary-grid">
            <div className="itinerary-left-col">
              
              {/* Day-by-Day Timeline Section */}
              <h2 className="text-2xl font-bold mb-lg font-heading text-primary">Day-by-Day Detailed Plan</h2>
              <div className="timeline-container">
                {selectedItinerary.days.map((day, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-marker">
                      <span className="day-number">{day.day}</span>
                    </div>
                    <div className="timeline-content glass" style={{ background: '#FFFFFF', padding: '24px' }}>
                      <h3 className="text-xl font-bold mb-sm font-heading">{day.title}</h3>
                      <p className="text-light mb-md" style={{ lineHeight: '1.6' }}>{day.description}</p>
                      
                      {/* Detailed Schedule Items */}
                      <div className="day-schedule-details-grid">
                        {day.breakfast && (
                          <div className="schedule-detail-row">
                            <span className="detail-icon">🍳</span>
                            <div>
                              <strong>Breakfast:</strong> <span className="detail-text">{day.breakfast}</span>
                            </div>
                          </div>
                        )}
                        {day.attractions && (
                          <div className="schedule-detail-row">
                            <span className="detail-icon">🏛️</span>
                            <div>
                              <strong>Attractions:</strong> <span className="detail-text">{day.attractions}</span>
                            </div>
                          </div>
                        )}
                        {day.lunch && (
                          <div className="schedule-detail-row">
                            <span className="detail-icon">🥗</span>
                            <div>
                              <strong>Lunch:</strong> <span className="detail-text">{day.lunch}</span>
                            </div>
                          </div>
                        )}
                        {day.activities && (
                          <div className="schedule-detail-row">
                            <span className="detail-icon">🎟️</span>
                            <div>
                              <strong>Activities:</strong> <span className="detail-text">{day.activities}</span>
                            </div>
                          </div>
                        )}
                        {day.dinner && (
                          <div className="schedule-detail-row">
                            <span className="detail-icon">🍝</span>
                            <div>
                              <strong>Dinner:</strong> <span className="detail-text">{day.dinner}</span>
                            </div>
                          </div>
                        )}
                        {day.hotel && (
                          <div className="schedule-detail-row">
                            <span className="detail-icon">🏨</span>
                            <div>
                              <strong>Overnight Hotel:</strong> <span className="detail-text">{day.hotel}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQs Section */}
              {selectedItinerary.faqs && selectedItinerary.faqs.length > 0 && (
                <div className="itinerary-faqs-section mt-xl">
                  <h2 className="text-2xl font-bold mb-lg font-heading text-primary flex items-center gap-xs">
                    <HelpCircle size={24} /> Frequently Asked Questions
                  </h2>
                  <div className="faqs-accordion-wrapper">
                    {selectedItinerary.faqs.map((faq, idx) => (
                      <div key={idx} className="faq-accordion-item glass mb-sm" style={{ background: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <button 
                          className="faq-question-btn p-md w-full flex justify-between items-center font-bold text-sm text-left text-text-color"
                          onClick={() => toggleFAQ(idx)}
                        >
                          <span>{faq.question}</span>
                          {openFAQIndex === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {openFAQIndex === idx && (
                          <div className="faq-answer-content p-md border-top text-xs text-light" style={{ lineHeight: '1.5' }}>
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="itinerary-right-col">
              
              {/* Interactive Map */}
              <div className="sidebar-card glass p-lg mb-xl" style={{ background: '#FFFFFF' }}>
                <h3 className="text-xl font-bold mb-md font-heading text-primary">Interactive Map</h3>
                <div className="map-embed-mock">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80" alt="Map Mock" />
                  <a href={selectedItinerary.mapUrl || 'https://maps.google.com'} target="_blank" rel="noopener noreferrer" className="map-overlay-btn glass">
                    Open in Google Maps <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* PDFs & Cards downloads */}
              {selectedItinerary.pdfs && selectedItinerary.pdfs.length > 0 && (
                <div className="sidebar-card glass p-lg mb-xl" style={{ background: '#FFFFFF' }}>
                  <h3 className="text-xl font-bold mb-md font-heading text-primary flex items-center gap-xxs">
                    <FileText size={18} /> Travel Guides & PDFs
                  </h3>
                  <div className="pdf-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedItinerary.pdfs.map((pdf, idx) => (
                      <a 
                        key={idx} 
                        href={pdf.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="tour-link-item p-sm flex items-center gap-sm"
                        style={{ textDecoration: 'none' }}
                      >
                        <FileText size={20} className="text-primary" />
                        <div>
                          <p className="font-bold text-xs text-text-color" style={{ margin: 0 }}>{pdf.name}</p>
                          <span className="text-xxs text-light">Click to open guide</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Vetted Hotels list */}
              {selectedItinerary.hotels && selectedItinerary.hotels.length > 0 && (
                <div className="sidebar-card glass p-lg mb-xl" style={{ background: '#FFFFFF' }}>
                  <h3 className="text-xl font-bold mb-md flex items-center gap-sm font-heading text-primary">
                    <Hotel size={18} /> Recommended Veg Hotels
                  </h3>
                  <div className="hotel-list">
                    {selectedItinerary.hotels.map((hotel, idx) => (
                      <div key={idx} className="hotel-item mb-md pb-md">
                        <div className="flex justify-between items-start mb-xs">
                          <h4 className="font-bold text-sm text-text-color">{hotel.name}</h4>
                          <span className="hotel-rating text-xxs px-xs py-xxs rounded bg-accent font-bold" style={{ whiteSpace: 'nowrap' }}>
                            {hotel.rating}
                          </span>
                        </div>
                        <p className="text-xs text-light" style={{ lineHeight: '1.4' }}>{hotel.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vetted Restaurants list */}
              {selectedItinerary.restaurants && selectedItinerary.restaurants.length > 0 && (
                <div className="sidebar-card glass p-lg mb-xl" style={{ background: '#FFFFFF' }}>
                  <h3 className="text-xl font-bold mb-md flex items-center gap-sm font-heading text-primary">
                    <Utensils size={18} /> Vetted Veg/Jain Dining
                  </h3>
                  <div className="restaurant-list">
                    {selectedItinerary.restaurants.map((rest, idx) => (
                      <div key={idx} className="restaurant-item mb-md pb-md">
                        <h4 className="font-bold text-sm text-text-color" style={{ marginBottom: '2px' }}>{rest.name}</h4>
                        <p className="text-xxs text-primary font-bold" style={{ marginBottom: '6px' }}>{rest.address}</p>
                        <p className="text-xs text-light" style={{ lineHeight: '1.4' }}>{rest.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive packing checklist */}
              {selectedItinerary.packingList && selectedItinerary.packingList.length > 0 && (
                <div className="sidebar-card glass p-lg mb-xl" style={{ background: '#FFFFFF' }}>
                  <h3 className="text-xl font-bold mb-xs font-heading text-primary flex items-center gap-xxs">
                    <ShoppingBag size={18} /> Packing Checklist
                  </h3>
                  <p className="text-light text-xxs mb-md">Check off essential travel gear for this itinerary:</p>
                  <div className="checklist-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedItinerary.packingList.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-sm cursor-pointer"
                        onClick={() => togglePackingItem(idx)}
                      >
                        {packedItems[idx] ? (
                          <CheckSquare size={18} className="text-primary flex-shrink-0" />
                        ) : (
                          <Square size={18} className="text-light flex-shrink-0" />
                        )}
                        <span className={`text-xs ${packedItems[idx] ? 'line-through text-light' : 'text-text-color'}`} style={{ lineHeight: '1.3' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Travel Tips checklist */}
              {selectedItinerary.tips && selectedItinerary.tips.length > 0 && (
                <div className="sidebar-card glass p-lg mb-xl" style={{ background: '#FFFFFF' }}>
                  <h3 className="text-xl font-bold mb-xs font-heading text-primary flex items-center gap-xxs">
                    <Sparkles size={18} /> Survival Tips
                  </h3>
                  <p className="text-light text-xxs mb-md">Keep these culinary & transit tips in mind:</p>
                  <ul className="guide-bullet-list" style={{ listStyleType: 'circle', paddingLeft: '12px' }}>
                    {selectedItinerary.tips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-light mb-sm" style={{ lineHeight: '1.4' }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* STICKY BOTTOM BOOKING REDIRECT BAR */}
        <div className="sticky-booking-bar animate-slide-up" style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-color)',
          boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.05)',
          padding: '16px 24px',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div className="container flex justify-between items-center flex-wrap gap-md" style={{ maxWidth: '1200px', width: '100%' }}>
            <div>
              <span className="text-xxs font-bold text-terracotta uppercase block">Ready to visit {selectedItinerary.country}?</span>
              <h4 className="font-heading font-bold text-sm text-text-color" style={{ margin: 0 }}>
                {selectedItinerary.title}
              </h4>
            </div>
            
            <div className="flex items-center gap-md">
              {gygPartner && (
                <div className="text-right desktop-only">
                  <span className="text-xxs text-light block">GetYourGuide Promo Code</span>
                  <span className="font-bold text-xs text-primary bg-cream px-sm py-xxs rounded">
                    Code: {gygPartner.code} ({gygPartner.discount})
                  </span>
                </div>
              )}
              
              <a 
                href={gygPartner?.url || 'https://www.getyourguide.com'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
                style={{
                  backgroundColor: 'var(--terracotta)',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                Book Tours & Entry Tickets <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="itinerary-library-page section bg-cream">
      <div className="container">
        <div className="text-center mb-xl">
          <Calendar size={48} className="mx-auto mb-md text-primary" />
          <h1 className="hero-headline text-primary mb-sm">Europe Itinerary Library</h1>
          <p className="text-lg text-light max-w-2xl mx-auto">
            Vetted day-wise European travel itineraries featuring confirmed vegetarian, vegan, and Jain meals.
          </p>

          <div className="filters-container glass mx-auto mt-lg">
            <div className="search-bar">
              <Search className="text-light" />
              <input 
                type="text" 
                placeholder="Search country, city, or route..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filters-row flex justify-between items-center flex-wrap gap-md mt-md">
              <div className="filter-group">
                <span className="filter-label text-xs uppercase font-bold text-light mr-sm">Dietary Category:</span>
                <div className="filter-tags">
                  {diets.map(diet => (
                    <button 
                      key={diet}
                      className={`filter-btn ${activeDiet === diet ? 'active' : ''}`}
                      onClick={() => setActiveDiet(diet)}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <span className="filter-label text-xs uppercase font-bold text-light mr-sm">Budget:</span>
                <div className="filter-tags">
                  {budgets.map(budget => (
                    <button 
                      key={budget}
                      className={`filter-btn ${activeBudget === budget ? 'active' : ''}`}
                      onClick={() => setActiveBudget(budget)}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="itinerary-list-grid">
          {filteredItineraries.map((itinerary) => (
            <Card 
              key={itinerary.id} 
              imageFirst 
              hover 
              bgImage={itinerary.image} 
              className="itinerary-card"
              onClick={() => handleOpenItinerary(itinerary)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-image-overlay-content absolute top-0 left-0 w-full p-md flex justify-between items-start">
                <span className="dietary-badge shadow-sm font-bold bg-accent text-text-color text-xs px-sm py-xs rounded">
                  {itinerary.dietary || 'Vegetarian'} Safe
                </span>
                <span className="budget-badge shadow-sm font-bold bg-primary text-white text-xs px-sm py-xs rounded">
                  {itinerary.budget} Budget
                </span>
              </div>
              <div style={{ padding: '20px' }}>
                <span className="duration-tag text-xs font-bold text-terracotta uppercase">{itinerary.duration}</span>
                <h3 className="text-xl mb-xs mt-xs font-heading font-bold">{itinerary.title}</h3>
                <p className="text-xs text-light mb-md">
                  Covers {itinerary.cities.join(', ')} in {itinerary.country}.
                </p>
                <div className="mt-auto flex gap-md justify-between items-center pt-sm border-top">
                  <span className="text-xxs text-light">Jain Score: {itinerary.jainScore || '8.0'}/10</span>
                  <Button 
                    variant="primary" 
                    className="btn-sm border-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenItinerary(itinerary);
                    }}
                  >
                    View Days
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItineraries.length === 0 && (
          <div className="text-center mt-xl p-xl">
            <Search size={48} className="mx-auto mb-md text-terracotta opacity-50" />
            <h3 className="text-2xl font-bold">No itineraries match your criteria</h3>
            <p className="text-light">Try adjusting your filters or search text.</p>
          </div>
        )}
      </div>
      <AffiliateBookingCard />
    </div>
  );
};

export default ItineraryLibrary;

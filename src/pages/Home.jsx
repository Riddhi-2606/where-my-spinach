import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { 
  Play, MapPin, Search, Lock, Utensils, Compass, ArrowRight, 
  Sparkles, MessageSquare, Send, Shield, Globe, Calendar, Plane, Hotel, Tag 
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import DiscountBanner from '../components/DiscountBanner';
import './Home.css';

const foodDiscovery = [
  { title: 'Authentic Italian Pasta', img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80', tag: 'Safe option', type: 'safe' },
  { title: 'French Bakery Delights', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', tag: 'No egg', type: 'warning' },
  { title: 'European Street Falafel', img: 'https://images.unsplash.com/photo-1593010906232-4806a64016f4?auto=format&fit=crop&w=600&q=80', tag: 'Safe option', type: 'safe' },
  { title: 'Classic Ramen/Soups', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', tag: 'Check broth', type: 'danger' },
];

const suggestedQuestions = [
  {
    q: "Can I find Jain food in Paris?",
    a: "Yes! While French bakeries are tricky (eggwash/lard), areas near Rue du Faubourg Saint-Denis have incredible vegetarian Indian spots like Saravanaa Bhavan. Also, check my Paris reel where I list 5 places serving eggless, butter-free croissants! Safe dining is totally doable."
  },
  {
    q: "What should vegetarians eat in Italy?",
    a: "Stick to classics like Marinara Pizza, Cacio e Pepe, and Gnocchi alla Sorrentina. However, always ask 'Senza strutto?' (No lard in dough) and check if cheese has 'caglio animale' (animal rennet). In my Rome guide, I highlight 12 spot-on rennet-free pasta houses!"
  },
  {
    q: "Best vegan cafes in Amsterdam?",
    a: "Amsterdam is vegan heaven! Don't miss Mr. & Mrs. Watson for artisanal vegan cheeses, and Vegan Junk Food Bar. I did a whole Instagram guide on canal-side vegan coffee houses that serve oat-milk stroopwafels."
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { itineraries, destinations, affiliatePartners } = useTravel();
  const [previewQuestion, setPreviewQuestion] = useState(null);
  const [previewAnswer, setPreviewAnswer] = useState(null);
  const [isPreviewTyping, setIsPreviewTyping] = useState(false);
  const [heroSearchTab, setHeroSearchTab] = useState('tours');
  
  // Hero search form fields
  const [searchDest, setSearchDest] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchDiet, setSearchDiet] = useState('Vegetarian');

  // Video modal state
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);

  const handleQuestionClick = (q, a) => {
    setIsPreviewTyping(true);
    setPreviewQuestion(q);
    setPreviewAnswer(null);
    setTimeout(() => {
      setIsPreviewTyping(false);
      setPreviewAnswer(a);
    }, 800);
  };

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    // Redirect to itineraries library with parameters
    navigate(`/itineraries?search=${encodeURIComponent(searchDest)}&diet=${encodeURIComponent(searchDiet)}`);
  };

  // Get featured itineraries
  const featuredItineraries = itineraries.filter(it => it.isFeatured);

  // Get gyg and klook details to show on home deals
  const gygPartner = affiliatePartners.find(p => p.id === 'gyg');
  const klookPartner = affiliatePartners.find(p => p.id === 'klook');

  return (
    <div className="home-europe">
      
      {/* HERO SECTION WITH SEARCH WIDGET */}
      <section className="hero-europe">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=80" alt="Paris Streets" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container relative z-10 hero-content animate-fade-in">
          <h1 className="hero-headline">Where's My Spinach</h1>
          <p className="hero-subheadline">
            Europe Travel Marketplace for Vegetarian, Vegan, and Jain Travelers. 
            Book vetted experiences, flights, and hotels with exclusive discount codes.
          </p>

          {/* Airbnb / Google Travel style search widget */}
          <div className="hero-search-widget glass p-md">
            <div className="search-widget-tabs flex gap-xs mb-sm">
              <button 
                type="button" 
                className={`search-tab-btn ${heroSearchTab === 'tours' ? 'active' : ''}`}
                onClick={() => setHeroSearchTab('tours')}
              >
                <Compass size={16} /> Explore Trips
              </button>
              <button 
                type="button" 
                className={`search-tab-btn ${heroSearchTab === 'flights' ? 'active' : ''}`}
                onClick={() => {
                  setHeroSearchTab('flights');
                  navigate('/marketplace');
                }}
              >
                <Plane size={16} /> Compare Flights
              </button>
              <button 
                type="button" 
                className={`search-tab-btn ${heroSearchTab === 'hotels' ? 'active' : ''}`}
                onClick={() => {
                  setHeroSearchTab('hotels');
                  navigate('/marketplace');
                }}
              >
                <Hotel size={16} /> Veg Hotels
              </button>
            </div>
            
            <form onSubmit={handleHeroSearchSubmit} className="search-widget-form flex gap-md items-center">
              <div className="search-input-group flex-1">
                <MapPin size={20} className="input-icon" />
                <div>
                  <label>Where to?</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Italy, France, Switzerland..." 
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="search-input-group flex-1 border-left">
                <Calendar size={20} className="input-icon" />
                <div>
                  <label>When?</label>
                  <input 
                    type="date" 
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="search-input-group flex-1 border-left">
                <Utensils size={20} className="input-icon" />
                <div>
                  <label>Dietary Needs</label>
                  <select 
                    className="widget-select" 
                    value={searchDiet}
                    onChange={(e) => setSearchDiet(e.target.value)}
                  >
                    <option value="Vegetarian">Vegetarian Safe</option>
                    <option value="Vegan">Vegan Verified</option>
                    <option value="Jain">Jain (No Onion/Garlic)</option>
                  </select>
                </div>
              </div>

              <Button type="submit" variant="primary" className="search-submit-btn border-none shadow-md">
                <Search size={20} /> Search
              </Button>
            </form>
          </div>

          <div className="flex gap-md mt-lg hero-actions justify-center">
            <Link to="/itineraries">
              <Button variant="primary" className="btn-lg">Browse Itinerary Library</Button>
            </Link>
            <Link to="/deals">
              <Button variant="secondary" className="btn-lg glass text-white border-white">
                <Tag size={16} /> View Exclusive Deals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TRAVEL DEALS TICKER / BANNERS SECTION */}
      <section className="home-deals-ticker bg-cream py-md border-bottom">
        <div className="container">
          <div className="flex justify-between items-center flex-wrap mb-sm">
            <span className="font-heading font-bold text-sm text-terracotta flex items-center gap-xs">
              🔥 ACTIVE PROMO CODES
            </span>
            <Link to="/deals" className="text-xs font-bold text-primary flex items-center gap-xxs">
              View All Deals ({affiliatePartners.length}) <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="home-deals-banners">
            <DiscountBanner partnerId="gyg" />
            <DiscountBanner partnerId="klook" />
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS (DYNAMIC) */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-xl">
            <span className="premium-pill"><Globe size={14} /> Guided Discovery</span>
            <h2 className="section-title mt-xs mb-xs">Explore Europe Guides</h2>
            <p className="text-light max-w-2xl mx-auto">
              Vetted safety metrics, hidden meat warnings, and verified vegetarian, vegan, and Jain restaurant listings.
            </p>
          </div>

          <div className="grid-3-columns">
            {destinations.map((dest) => (
              <Card 
                key={dest.id} 
                imageFirst 
                bgImage={dest.img} 
                hover 
                onClick={() => navigate(`/destinations?id=${dest.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ padding: '16px' }}>
                  <h3 className="text-xl mb-xs font-heading font-bold">{dest.name}</h3>
                  <div className="flex justify-between items-center mb-sm">
                    <span className="food-tag warning-tag">Rating: {dest.score} / 5★</span>
                    <span className="food-tag bg-primary text-white">Best for {dest.bestFor}</span>
                  </div>
                  <p className="text-light text-xs line-clamp-2">{dest.description}</p>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                    {(dest.tags || []).slice(0, 2).map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.65rem', backgroundColor: 'var(--bg-color)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ITINERARIES */}
      <section className="section bg-cream">
        <div className="container">
          <div className="flex justify-between items-end mb-xl">
            <div>
              <span className="premium-pill"><Calendar size={14} /> Curated Trips</span>
              <h2 className="section-title text-left mt-xs mb-xs">Featured Itineraries</h2>
              <p className="text-light">Handcrafted itineraries with detailed schedules, maps, and recommended booking codes.</p>
            </div>
            <Link to="/itineraries" className="text-terracotta font-bold flex items-center gap-xs">
              View Itinerary Library <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid-3-columns">
            {(featuredItineraries.length > 0 ? featuredItineraries : itineraries).slice(0, 3).map((itinerary) => (
              <Card 
                key={itinerary.id} 
                imageFirst 
                bgImage={itinerary.image} 
                hover 
                className="home-itinerary-card"
                onClick={() => navigate(`/itineraries?id=${itinerary.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-image-overlay-content absolute top-0 left-0 w-full p-md flex justify-between items-start">
                  <span className="dietary-badge font-bold bg-primary text-white text-xs px-sm py-xs rounded">
                    Veg Score: {itinerary.vegScore || '9.0'}/10
                  </span>
                  <span className="duration-badge font-bold bg-accent text-text-color text-xs px-sm py-xs rounded">
                    {itinerary.duration}
                  </span>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 className="text-lg mb-xs font-heading font-bold">{itinerary.title}</h3>
                  <p className="text-xs text-light mb-md">Cities: {itinerary.cities.join(', ')}</p>
                  
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.7rem', color: 'var(--text-light)', marginBottom: '12px' }}>
                    <span>Difficulty: <strong>{itinerary.difficulty || 'Easy'}</strong></span>
                    <span>•</span>
                    <span>Budget: <strong>{itinerary.budget}</strong></span>
                  </div>

                  <div className="pt-sm border-top flex justify-between items-center">
                    <span className="text-xxs font-bold text-terracotta bg-cream px-xs py-xxs rounded">
                      Jain Score: {itinerary.jainScore || '8.0'}/10
                    </span>
                    <Button variant="outline" className="btn-sm border-primary text-primary">View Day-by-Day</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER BRANDS & DISCOUNTS */}
      <section className="section bg-white text-center">
        <div className="container">
          <span className="premium-pill"><Globe size={14} /> Booking Integration</span>
          <h2 className="section-title mt-xs mb-sm">Official Affiliate Partnerships</h2>
          <p className="text-light max-w-2xl mx-auto mb-xl">
            We integrate directly with Europe's largest booking platforms. Use our links and codes to unlock discounts.
          </p>

          <div className="partner-integration-grid">
            {affiliatePartners.map((partner) => (
              <div key={partner.id} className="partner-item glass p-lg flex flex-col justify-between" style={{ minHeight: '220px' }}>
                <div>
                  <span className="partner-logo flex items-center justify-center gap-xs">
                    {partner.logo} {partner.name}
                  </span>
                  {partner.code && (
                    <span className="offer-badge-tag mt-sm inline-block" style={{
                      backgroundColor: 'rgba(217, 122, 84, 0.1)',
                      color: 'var(--terracotta)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: '800',
                      fontSize: '0.7rem'
                    }}>
                      {partner.discount}
                    </span>
                  )}
                  <p className="text-xxs text-light mt-md">{partner.description}</p>
                </div>
                <div className="mt-md">
                  {partner.code && (
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginBottom: '6px' }}>
                      Use Code: <strong>{partner.code}</strong>
                    </div>
                  )}
                  <a 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="partner-link font-bold text-xs"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    {partner.buttonText} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAVEL INSURANCE RECOMMENDATIONS */}
      <section className="section bg-cream">
        <div className="container">
          <div className="insurance-promo-widget glass p-xl flex justify-between items-center flex-wrap gap-lg">
            <div className="promo-info flex-1">
              <span className="premium-pill"><Shield size={14} /> Medical Cover</span>
              <h2 className="section-title text-left mt-xs mb-sm">Schengen Visa Compliance Insurance</h2>
              <p className="text-light mb-md">
                Secure cashless outpatient visits at top-tier European hospitals. Fully compliant with Schengen visa medical rules. We recommend SafetyWing or Allianz. Use our partner portal to compare rates.
              </p>
              <div className="flex gap-md">
                <span className="badge-bullet">✓ SafetyWing Nomad Coverage</span>
                <span className="badge-bullet">✓ Allianz Schengen Travel Cover</span>
              </div>
            </div>
            <div className="promo-cta text-center p-md">
              <Shield size={64} className="text-terracotta mb-sm mx-auto" />
              <p className="font-bold mb-sm">Schengen Travel Cover</p>
              <Link to="/marketplace">
                <Button variant="primary" className="border-none bg-terracotta text-white">Compare Insurance Policies</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL FEEDS & COLLAGE */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-xl">
            <span className="premium-pill"><Sparkles size={14} /> Social Connections</span>
            <h2 className="section-title mt-xs mb-xs">Join Our Travel Community</h2>
            <p className="text-light">Connect with NRI, vegetarian, and Jain travelers sharing live itineraries and tips.</p>
          </div>

          <div className="social-feeds-grid">
            
            {/* Instagram Widget */}
            <div className="social-feed-column">
              <h3 className="social-feed-title flex items-center gap-xs font-heading font-bold mb-md">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> Instagram Highlights
              </h3>
              
              <div className="instagram-widget-card glass p-md">
                <div className="insta-header flex items-center gap-sm mb-md">
                  <div className="insta-avatar">🥬</div>
                  <div>
                    <p className="font-bold text-sm">where_my_spinach</p>
                    <p className="text-xs text-light">Creator-Curated Guides</p>
                  </div>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="insta-follow-btn ml-auto text-xs font-bold">Follow</a>
                </div>
                
                <div className="insta-grid">
                  <div className="insta-post-item">
                    <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=300&q=80" alt="Insta Post" />
                    <div className="insta-post-hover">
                      <span>❤️ 1,240</span>
                      <span>💬 48</span>
                    </div>
                  </div>
                  <div className="insta-post-item">
                    <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80" alt="Insta Post" />
                    <div className="insta-post-hover">
                      <span>❤️ 980</span>
                      <span>💬 32</span>
                    </div>
                  </div>
                  <div className="insta-post-item">
                    <img src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=300&q=80" alt="Insta Post" />
                    <div className="insta-post-hover">
                      <span>❤️ 2,450</span>
                      <span>💬 105</span>
                    </div>
                  </div>
                  <div className="insta-post-item">
                    <img src="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=300&q=80" alt="Insta Post" />
                    <div className="insta-post-hover">
                      <span>❤️ 1,890</span>
                      <span>💬 64</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Facebook Group Widget */}
            <div className="social-feed-column">
              <h3 className="social-feed-title flex items-center gap-xs font-heading font-bold mb-md">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> Facebook Community
              </h3>

              <div className="facebook-widget-card glass p-lg">
                <span className="fb-group-badge text-xs uppercase font-bold text-primary mb-xs block">Active Community</span>
                <h4 className="font-heading font-bold text-lg mb-sm">VegVoyagers NRI in Europe Group</h4>
                <p className="text-xs text-light mb-md">24,500 Members • 12 Posts Daily</p>
                
                <div className="fb-post mb-md pb-md border-bottom">
                  <div className="fb-post-user flex gap-sm items-center mb-xs">
                    <div className="user-avatar-sm">RS</div>
                    <div>
                      <p className="font-bold text-xs">Rohit Sharma</p>
                      <p className="text-xxs text-light">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-xs text-text-color font-body">
                    "Just landed in Rome! Highly recommend using the Translation Cards from Spinach AI. Showed it to the chef at Il Margutta and got an amazing custom Jain risotto! 🇮🇹🍕"
                  </p>
                  <div className="fb-actions mt-sm flex gap-md text-xxs text-light">
                    <span>👍 42 Likes</span>
                    <span>💬 8 Comments</span>
                  </div>
                </div>

                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="fb-join-btn btn btn-primary flex items-center justify-center font-bold text-xs py-sm">
                  Join Group on Facebook
                </a>
              </div>
            </div>

            {/* YouTube Widget */}
            <div className="social-feed-column">
              <h3 className="social-feed-title flex items-center gap-xs font-heading font-bold mb-md">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-danger"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg> YouTube Vlogs
              </h3>

              <div className="youtube-widget-card glass p-md">
                <div className="youtube-vlog-item flex gap-sm mb-md" onClick={() => setYoutubeVideoId('dQw4w9WgXcQ')}>
                  <div className="vlog-thumb">
                    <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=200&q=80" alt="Vlog Thumb" />
                    <Play className="play-overlay" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs leading-snug">Finding Jain Food in Rome, Italy! Survival Vlog 🇮🇹</h4>
                    <p className="text-xxs text-light mt-xs">Where's My Spinach • 24k views</p>
                  </div>
                </div>

                <div className="youtube-vlog-item flex gap-sm mb-md" onClick={() => setYoutubeVideoId('dQw4w9WgXcQ')}>
                  <div className="vlog-thumb">
                    <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=200&q=80" alt="Vlog Thumb" />
                    <Play className="play-overlay" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs leading-snug">The Ultimate Vegan Croissant Hunt in Paris 🥐</h4>
                    <p className="text-xxs text-light mt-xs">Where's My Spinach • 18k views</p>
                  </div>
                </div>

                <div className="youtube-vlog-item flex gap-sm" onClick={() => setYoutubeVideoId('dQw4w9WgXcQ')}>
                  <div className="vlog-thumb">
                    <img src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=200&q=80" alt="Vlog Thumb" />
                    <Play className="play-overlay" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs leading-snug">Swiss Alps: Surviving Interlaken as a Vegetarian 🇨🇭</h4>
                    <p className="text-xxs text-light mt-xs">Where's My Spinach • 45k views</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* YouTube Popup Player */}
      {youtubeVideoId && (
        <div className="youtube-modal-backdrop flex items-center justify-center" onClick={() => setYoutubeVideoId(null)}>
          <div className="youtube-modal-content glass p-md relative" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn absolute text-white" onClick={() => setYoutubeVideoId(null)}>×</button>
            <div className="iframe-container">
              <div className="simulated-player bg-dark text-white flex flex-col justify-center items-center">
                <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-danger mb-md"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
                <p className="font-bold text-lg">Playing Spinach Vlogs Reel</p>
                <p className="text-xs text-light">This is a simulated video playback experience</p>
                <Button variant="primary" className="mt-md border-none" onClick={() => setYoutubeVideoId(null)}>Close Player</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOD DISCOVERY */}
      <section className="section bg-cream">
        <div className="container">
          <div className="text-center mb-xl">
            <h2 className="section-title">Food Safety & Warnings</h2>
            <p className="text-light">Vetted local specialties to seek out or avoid due to hidden ingredients.</p>
          </div>
          <div className="food-grid">
            {foodDiscovery.map((food, idx) => (
              <Card key={idx} imageFirst bgImage={food.img} hover className="food-card">
                <div style={{ padding: '16px' }}>
                  <h3 className="text-lg mb-sm font-heading font-bold">{food.title}</h3>
                  <span className={`food-tag ${food.type === 'warning' ? 'warning-tag' : food.type === 'danger' ? 'bg-terracotta text-white' : 'bg-primary text-white'}`}>
                    {food.tag}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ASK AI COMPANION */}
      <section className="section bg-white home-ai-section">
        <div className="container">
          <div className="home-ai-grid">
            <div className="home-ai-info">
              <span className="premium-pill"><Sparkles size={16} /> Travel AI Companion</span>
              <h2 className="section-title text-left mt-xs mb-sm">Meet Your Europe Food & Travel Companion</h2>
              <p className="text-light mb-lg">
                Powered by the knowledge and experience behind <strong>Where's My Spinach</strong>. Ask specific questions about eggless pastries, animal rennet in cheeses, onion-garlic-free spots, and local transit.
              </p>
              
              <div className="suggested-questions-container mb-xl">
                <h4 className="mb-xs font-bold text-sm text-light uppercase tracking-wider">Tap to Ask a Question:</h4>
                <div className="suggested-tags-flex">
                  {suggestedQuestions.map((item, idx) => (
                    <button 
                      key={idx} 
                      className={`suggested-tag-btn ${previewQuestion === item.q ? 'active' : ''}`}
                      onClick={() => handleQuestionClick(item.q, item.a)}
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              </div>
              
              <Link to="/ask-ai">
                <Button variant="primary" className="btn-lg flex items-center gap-sm shadow-md">
                  <MessageSquare size={20} /> Ask custom questions
                </Button>
              </Link>
            </div>
            
            <div className="home-ai-preview-chat">
              <div className="chat-device-mockup glass">
                <div className="chat-mockup-header">
                  <div className="avatar-small">🥬</div>
                  <div className="chat-header-info">
                    <span className="chat-title">Where's My Spinach AI</span>
                    <span className="chat-status">● Active Companion</span>
                  </div>
                </div>
                
                <div className="chat-mockup-body">
                  {!previewQuestion ? (
                    <div className="chat-empty-state">
                      <Compass size={40} className="text-primary mb-sm animate-bounce" />
                      <p className="font-bold mb-xs">Ask anything about Europe travel</p>
                      <p className="text-xs text-light text-center">Click one of the suggested questions on the left to see the companion in action!</p>
                    </div>
                  ) : (
                    <div className="chat-messages-flow">
                      <div className="chat-msg user-msg animate-fade-in">
                        <p>{previewQuestion}</p>
                      </div>
                      
                      {isPreviewTyping ? (
                        <div className="chat-msg ai-msg typing animate-fade-in">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </div>
                      ) : previewAnswer ? (
                        <div className="chat-msg ai-msg animate-fade-in">
                          <p>{previewAnswer}</p>
                          <span className="source-tag">🥬 From Spinach Reels & Guides</span>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
                
                <div className="chat-mockup-footer">
                  <div className="mockup-input-bar">
                    <span className="text-light text-xs">Type your custom question...</span>
                    <Send size={16} className="text-light ml-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM MEMBER UNLOCK */}
      <section className="section bg-cream">
        <div className="container">
          <div className="text-center mb-xl">
            <h2 className="section-title">Unlock Premium Europe Guides</h2>
            <p className="text-light max-w-2xl mx-auto">Access detailed restaurant maps, offline translation cards, and city-by-city survival guides.</p>
          </div>
          
          <div className="membership-preview-area relative">
            <div className="preview-grid blurred">
              <Card imageFirst bgImage="https://images.unsplash.com/photo-1522083111333-8114a1150c5b?auto=format&fit=crop&w=400&q=80">
                <div style={{ padding: '16px' }}>
                  <h3>Zurich Veg Map</h3>
                  <p className="text-light text-sm">24 safe restaurants</p>
                </div>
              </Card>
              <Card imageFirst bgImage="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80">
                <div style={{ padding: '16px' }}>
                  <h3>Italian Translation Card</h3>
                  <p className="text-light text-sm">Audio & Text</p>
                </div>
              </Card>
              <Card imageFirst bgImage="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80">
                <div style={{ padding: '16px' }}>
                  <h3>Paris Vegan Guide</h3>
                  <p className="text-light text-sm">Top 10 patisseries</p>
                </div>
              </Card>
            </div>
            
            <div className="preview-overlay glass">
              <Lock size={48} className="text-terracotta mb-md mx-auto" />
              <h3 className="text-3xl mb-sm">Unlock the Full Experience</h3>
              <p className="mb-lg">Get unrestricted access to all Europe guides and maps.</p>
              <Link to="/signup">
                <Button variant="primary" className="btn-lg shadow-lg">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

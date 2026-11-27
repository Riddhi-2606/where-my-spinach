import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { Plane, Hotel, Compass, Shield, Search, ArrowRight, Check, AlertCircle, ShoppingCart } from 'lucide-react';
import './AffiliateBookings.css';

const AffiliateBookings = () => {
  const { addBooking } = useTravel();
  const [activeTab, setActiveTab] = useState('flights');
  const [bookingSuccess, setBookingSuccess] = useState(null);
  
  // Form states
  const [flightFrom, setFlightFrom] = useState('New Delhi (DEL)');
  const [flightTo, setFlightTo] = useState('Paris (CDG)');
  const [hotelCity, setHotelCity] = useState('Zurich');
  const [activitySearch, setActivitySearch] = useState('');
  
  // Insurance Quote calculator states
  const [insAge, setInsAge] = useState(25);
  const [insDays, setInsDays] = useState(10);
  const [insPlan, setInsPlan] = useState('SafetyWing');
  const [insQuote, setInsQuote] = useState(null);

  // Mock Data
  const mockFlights = [
    { id: 'f-mock-1', airline: 'Air India', from: 'DEL', to: 'CDG', price: 54200, time: '13:20 - 18:45', duration: '9h 55m (Non-stop)', meal: 'Vegetarian/Jain Hot Meal Included', logo: '✈️' },
    { id: 'f-mock-2', airline: 'Emirates', from: 'DEL', to: 'CDG', price: 61800, time: '10:35 - 19:30', duration: '12h 25m (1 stop)', meal: 'Vegan/Veg Meal Available on pre-request', logo: '✈️' },
    { id: 'f-mock-3', airline: 'Lufthansa', from: 'DEL', to: 'CDG', price: 58900, time: '09:15 - 18:15', duration: '12h 30m (1 stop)', meal: 'Vegetarian Lacto-Ovo/Jain Meal Available', logo: '✈️' }
  ];

  const mockHotels = {
    Paris: [
      { id: 'h-mock-1', name: 'HOY Paris (Vegan Hotel)', price: 16000, rating: '4.8★', perks: '100% plant-based restaurant, Yoga room', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80' },
      { id: 'h-mock-2', name: 'Hotel Regina Louvre', price: 28000, rating: '4.7★', perks: 'Jain food served upon 24h advance request', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80' }
    ],
    Rome: [
      { id: 'h-mock-3', name: 'Hotel Artemide Rome', price: 18500, rating: '4.7★', perks: 'Dedicated vegetarian breakfast menu', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80' },
      { id: 'h-mock-4', name: 'Bio Hotel Raphael', price: 24000, rating: '4.6★', perks: '100% Organic & Vegetarian rooftop dining', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=80' }
    ],
    Zurich: [
      { id: 'h-mock-5', name: 'Conscious Hotel Zurich', price: 19500, rating: '4.5★', perks: 'Eco-friendly, all-vegetarian buffet', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80' },
      { id: 'h-mock-6', name: 'The Dolder Grand', price: 42000, rating: '4.9★', perks: 'Michelin star restaurant with dedicated Vegan Menu', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80' }
    ]
  };

  const mockActivities = [
    { id: 'a-mock-1', title: 'Paris Vegetarian Pastry Crawl', provider: 'GetYourGuide', price: 4500, location: 'Paris', duration: '3 Hours', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
    { id: 'a-mock-2', title: 'Rome Vegan Cooking Class: Pasta & Tiramisu', provider: 'Viator', price: 5200, location: 'Rome', duration: '4 Hours', img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=400&q=80' },
    { id: 'a-mock-3', title: 'Zurich Chocolate & Fondue Private Tour (Veg)', provider: 'Klook', price: 8900, location: 'Zurich', duration: '5 Hours', img: 'https://images.unsplash.com/photo-1515542622106-78b28af7815d?auto=format&fit=crop&w=400&q=80' },
    { id: 'a-mock-4', title: 'Amsterdam Canal Cruise & Vegan Tapas', provider: 'GetYourGuide', price: 3800, location: 'Amsterdam', duration: '2 Hours', img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleBookFlight = (flight) => {
    addBooking({
      type: 'flight',
      provider: 'Skyscanner',
      title: `${flight.airline}: ${flightFrom} to ${flightTo}`,
      price: `₹${flight.price.toLocaleString()}`,
      date: '2026-07-22',
      details: `${flight.time} | ${flight.duration} | ${flight.meal}`
    });
    triggerSuccess(`Successfully booked Flight: ${flight.airline} to ${flightTo}!`);
  };

  const handleBookHotel = (hotel) => {
    addBooking({
      type: 'hotel',
      provider: 'Booking.com',
      title: `${hotel.name} in ${hotelCity}`,
      price: `₹${hotel.price.toLocaleString()} / Night`,
      date: '2026-07-22 to 2026-07-26',
      details: `Rating: ${hotel.rating} | ${hotel.perks}`
    });
    triggerSuccess(`Successfully booked Hotel: ${hotel.name}!`);
  };

  const handleBookActivity = (act) => {
    addBooking({
      type: 'activity',
      provider: act.provider,
      title: act.title,
      price: `₹${act.price.toLocaleString()}`,
      date: '2026-07-24',
      details: `Duration: ${act.duration} | Location: ${act.location}`
    });
    triggerSuccess(`Successfully booked Tour: ${act.title}!`);
  };

  const handleCalculateQuote = (e) => {
    e.preventDefault();
    let baseRate = insPlan === 'SafetyWing' ? 320 : 480;
    let multiplier = insAge > 40 ? 1.5 : insAge > 60 ? 2.2 : 1.0;
    let cost = Math.round(baseRate * insDays * multiplier);
    setInsQuote(cost);
  };

  const handleBuyInsurance = () => {
    addBooking({
      type: 'insurance',
      provider: insPlan,
      title: `${insPlan} Travel Medical Insurance Policy`,
      price: `₹${insQuote.toLocaleString()}`,
      date: `Valid for ${insDays} Days`,
      details: `Covered Age: ${insAge} | Medical Emergencies & Baggage Loss protection.`
    });
    triggerSuccess(`Successfully purchased ${insPlan} Travel Insurance policy!`);
    setInsQuote(null);
  };

  const triggerSuccess = (msg) => {
    setBookingSuccess(msg);
    setTimeout(() => {
      setBookingSuccess(null);
    }, 4000);
  };

  return (
    <div className="marketplace-page section bg-cream">
      <div className="container">
        
        {bookingSuccess && (
          <div className="booking-toast-alert glass animate-fade-in">
            <Check className="text-success" size={24} />
            <div>
              <p className="font-bold">Booking Confirmed!</p>
              <p className="text-xs text-light">{bookingSuccess}</p>
              <p className="text-xs text-primary font-bold">Ticket added to your Dashboard.</p>
            </div>
          </div>
        )}

        <div className="text-center mb-xl">
          <span className="premium-pill"><ShoppingCart size={14} /> Europe Travel Marketplace</span>
          <h1 className="hero-headline text-primary mb-sm mt-xs">Affiliate Booking Hub</h1>
          <p className="text-lg text-light max-w-2xl mx-auto">
            Plan flights, reserve hotels, and book unique tours verified safe for vegan, vegetarian, and Jain diets.
          </p>

          {/* Integration logos */}
          <div className="partner-badges flex justify-center gap-md mt-md">
            <span className="partner-badge font-bold">Skyscanner</span>
            <span className="partner-badge font-bold">Booking.com</span>
            <span className="partner-badge font-bold">GetYourGuide</span>
            <span className="partner-badge font-bold">Viator</span>
            <span className="partner-badge font-bold">Klook</span>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="marketplace-tabs glass mx-auto mb-xl">
          <button 
            className={`tab-btn ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => setActiveTab('flights')}
          >
            <Plane size={18} /> Skyscanner Flights
          </button>
          <button 
            className={`tab-btn ${activeTab === 'hotels' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotels')}
          >
            <Hotel size={18} /> Booking.com Hotels
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            <Compass size={18} /> GYG / Viator / Klook
          </button>
          <button 
            className={`tab-btn ${activeTab === 'insurance' ? 'active' : ''}`}
            onClick={() => setActiveTab('insurance')}
          >
            <Shield size={18} /> Travel Insurance
          </button>
        </div>

        {/* Tab content */}
        <div className="tab-content-area">
          
          {/* FLIGHTS TAB */}
          {activeTab === 'flights' && (
            <div className="flights-marketplace animate-fade-in">
              <div className="booking-search-bar glass p-lg mb-lg">
                <div className="input-grid">
                  <div className="input-field">
                    <label>From</label>
                    <input type="text" value={flightFrom} onChange={(e) => setFlightFrom(e.target.value)} />
                  </div>
                  <div className="input-field">
                    <label>To (Europe)</label>
                    <input type="text" value={flightTo} onChange={(e) => setFlightTo(e.target.value)} />
                  </div>
                  <div className="input-field">
                    <label>Date</label>
                    <input type="date" defaultValue="2026-07-22" />
                  </div>
                </div>
              </div>

              <div className="flight-results">
                {mockFlights.map((flight) => (
                  <div key={flight.id} className="flight-card glass p-lg mb-md flex justify-between items-center flex-wrap gap-lg">
                    <div className="flex items-center gap-md">
                      <span className="flight-icon">{flight.logo}</span>
                      <div>
                        <h3 className="text-xl font-bold">{flight.airline}</h3>
                        <p className="text-sm text-light">{flight.from} → {flight.to} | {flight.time}</p>
                        <p className="text-xs text-light mt-xs">{flight.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flight-meal-info flex items-center gap-xs bg-cream p-sm rounded border-primary">
                      <AlertCircle size={16} className="text-primary" />
                      <span className="text-xs text-primary font-bold">{flight.meal}</span>
                    </div>

                    <div className="flight-book-section text-right">
                      <p className="text-2xl font-bold text-terracotta mb-xs">₹{flight.price.toLocaleString()}</p>
                      <Button variant="primary" onClick={() => handleBookFlight(flight)}>Book via Skyscanner</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HOTELS TAB */}
          {activeTab === 'hotels' && (
            <div className="hotels-marketplace animate-fade-in">
              <div className="booking-search-bar glass p-lg mb-lg">
                <div className="input-grid">
                  <div className="input-field">
                    <label>Destination City</label>
                    <select value={hotelCity} onChange={(e) => setHotelCity(e.target.value)}>
                      <option value="Paris">Paris</option>
                      <option value="Rome">Rome</option>
                      <option value="Zurich">Zurich</option>
                    </select>
                  </div>
                  <div className="input-field">
                    <label>Check-in</label>
                    <input type="date" defaultValue="2026-07-22" />
                  </div>
                  <div className="input-field">
                    <label>Guests</label>
                    <select>
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>Family</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="hotel-results-grid">
                {(mockHotels[hotelCity] || []).map((hotel) => (
                  <Card key={hotel.id} imageFirst bgImage={hotel.img} hover className="hotel-marketplace-card">
                    <div className="card-image-overlay-content absolute top-0 right-0 p-sm">
                      <span className="bg-accent text-text-color font-bold text-xs px-sm py-xs rounded">{hotel.rating}</span>
                    </div>
                    <h3 className="text-xl mb-xs">{hotel.name}</h3>
                    <p className="text-xs text-primary font-bold mb-sm">{hotel.perks}</p>
                    <div className="flex justify-between items-center mt-auto border-top pt-sm">
                      <div>
                        <span className="text-light text-xs">Per Night</span>
                        <p className="font-bold text-lg text-terracotta">₹{hotel.price.toLocaleString()}</p>
                      </div>
                      <Button variant="primary" className="btn-sm" onClick={() => handleBookHotel(hotel)}>Book via Booking.com</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITIES TAB */}
          {activeTab === 'activities' && (
            <div className="activities-marketplace animate-fade-in">
              <div className="booking-search-bar glass p-lg mb-lg">
                <div className="input-grid single-field">
                  <div className="input-field">
                    <label>Search Activities & Food Tours</label>
                    <div className="search-input-wrap">
                      <Search size={18} className="search-icon" />
                      <input 
                        type="text" 
                        placeholder="Search e.g. Pasta cooking, Chocolate tour, Paris, Rome..." 
                        value={activitySearch}
                        onChange={(e) => setActivitySearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="activities-grid">
                {mockActivities
                  .filter(act => act.title.toLowerCase().includes(activitySearch.toLowerCase()) || 
                                 act.location.toLowerCase().includes(activitySearch.toLowerCase()) ||
                                 act.provider.toLowerCase().includes(activitySearch.toLowerCase()))
                  .map((act) => (
                    <Card key={act.id} imageFirst bgImage={act.img} hover className="activity-marketplace-card">
                      <div className="card-image-overlay-content absolute top-0 left-0 p-sm">
                        <span className="provider-label text-xs uppercase font-bold text-white bg-primary px-sm py-xs rounded">
                          {act.provider}
                        </span>
                      </div>
                      <span className="text-xs text-terracotta font-bold uppercase">{act.duration} | {act.location}</span>
                      <h3 className="text-lg mb-md leading-snug mt-xs">{act.title}</h3>
                      <div className="flex justify-between items-center mt-auto pt-sm border-top">
                        <p className="font-bold text-md text-text-color">₹{act.price.toLocaleString()}</p>
                        <Button variant="primary" className="btn-sm" onClick={() => handleBookActivity(act)}>Book Activity</Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* INSURANCE TAB */}
          {activeTab === 'insurance' && (
            <div className="insurance-marketplace animate-fade-in">
              <div className="insurance-grid-layout">
                <div className="insurance-info-section">
                  <h2 className="text-2xl font-bold mb-md">Vegetarian-Friendly Travel Insurance</h2>
                  <p className="text-light mb-md">
                    In Europe, a simple food allergy or accidental meat ingestion can trigger health emergencies. 
                    We highly recommend buying medical travel insurance. These plans include full 24/7 outpatient cover 
                    and cashless hospitalization in top Schengen hospitals.
                  </p>
                  
                  <div className="insurance-offers">
                    <div className="ins-offer-card glass p-lg mb-md">
                      <div className="flex justify-between items-center mb-xs">
                        <h3 className="text-xl font-bold">SafetyWing Nomad Insurance</h3>
                        <span className="bg-primary text-white text-xs px-sm py-xs rounded font-bold">Popular</span>
                      </div>
                      <p className="text-sm text-light mb-sm">
                        Perfect for budget travelers and remote nomads. Flexible subscription plan covering emergency medical, evacuation, and lost luggage.
                      </p>
                      <p className="text-xs font-bold text-primary">Starts at ₹320 / day</p>
                    </div>

                    <div className="ins-offer-card glass p-lg">
                      <div className="flex justify-between items-center mb-xs">
                        <h3 className="text-xl font-bold">Allianz Global Assistance</h3>
                        <span className="bg-accent text-text-color text-xs px-sm py-xs rounded font-bold">Premium</span>
                      </div>
                      <p className="text-sm text-light mb-sm">
                        Comprehensive trip cancellation cover, missed connections, high medical limit, and Schengen-visa compliant certificate.
                      </p>
                      <p className="text-xs font-bold text-terracotta">Starts at ₹480 / day</p>
                    </div>
                  </div>
                </div>

                <div className="insurance-calculator-sidebar glass p-lg">
                  <h3 className="text-xl font-bold mb-md">Get an Instant Quote</h3>
                  <form onSubmit={handleCalculateQuote} className="ins-calc-form">
                    <div className="form-field mb-sm">
                      <label className="text-xs font-bold uppercase text-light block mb-xs">Select Provider</label>
                      <select value={insPlan} onChange={(e) => setInsPlan(e.target.value)}>
                        <option value="SafetyWing">SafetyWing Nomad Care</option>
                        <option value="Allianz">Allianz Premium Schengen</option>
                      </select>
                    </div>
                    <div className="form-field mb-sm">
                      <label className="text-xs font-bold uppercase text-light block mb-xs">Age of Traveler</label>
                      <input type="number" value={insAge} onChange={(e) => setInsAge(parseInt(e.target.value) || 25)} min="1" max="99" />
                    </div>
                    <div className="form-field mb-lg">
                      <label className="text-xs font-bold uppercase text-light block mb-xs">Trip Duration (Days)</label>
                      <input type="number" value={insDays} onChange={(e) => setInsDays(parseInt(e.target.value) || 10)} min="1" max="180" />
                    </div>

                    <Button type="submit" variant="primary" className="btn-full border-none">Calculate Quote</Button>
                  </form>

                  {insQuote !== null && (
                    <div className="quote-result-box bg-cream p-md rounded border-primary mt-lg text-center animate-fade-in">
                      <span className="text-xs text-light uppercase tracking-wider block">Estimated Premium</span>
                      <p className="text-3xl font-bold text-terracotta mt-xs">₹{insQuote.toLocaleString()}</p>
                      <p className="text-xs text-light mt-xs">Includes GST & Schengen Visa Certificate</p>
                      <Button variant="primary" className="btn-full mt-md border-none bg-primary text-white" onClick={handleBuyInsurance}>
                        Buy Policy Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AffiliateBookings;

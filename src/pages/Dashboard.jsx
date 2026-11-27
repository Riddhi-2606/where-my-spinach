import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTravel } from '../context/TravelContext';
import Card from '../components/Card';
import Button from '../components/Button';
import TranslationCardGenerator from '../components/TranslationCardGenerator';
import AffiliateBookingCard from '../components/AffiliateBookingCard';
import { Map, Bookmark, LogOut, CheckSquare, Compass, ShieldCheck, Sparkles, ChevronRight, Plane, Hotel, Calendar, Tag, ShieldAlert, Trash2 } from 'lucide-react';
import './Dashboard.css';

const savedChats = [
  { id: '1', title: 'Paris Eggless Croissants & Cafes', date: '2 days ago' },
  { id: '2', title: 'Rome Cheese Rennet Check', date: '5 days ago' },
  { id: '3', title: 'Amsterdam Vegan Cheese Crawl', date: 'Last week' }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { itineraries, savedItineraryIds, toggleSaveItinerary, bookings, cancelBooking } = useTravel();
  const navigate = useNavigate();
  const [dashboardQuery, setDashboardQuery] = useState('');
  const [activeTab, setActiveTab] = useState('hub'); // hub, bookings, saved, checklist

  const handleAskAISubmit = (e) => {
    e.preventDefault();
    if (dashboardQuery.trim()) {
      navigate(`/ask-ai?q=${encodeURIComponent(dashboardQuery)}`);
    }
  };

  // Get saved itineraries objects
  const savedItinerariesList = itineraries.filter(it => savedItineraryIds.includes(it.id));

  return (
    <div className="dashboard-europe">
      <div className="container dashboard-grid-layout">
        
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <Card className="user-profile-card">
            <div className="avatar-circle mb-md mx-auto">
              {user?.name?.charAt(0) || 'E'}
            </div>
            <h3 className="text-center mb-xs">{user?.name || 'Explorer'}</h3>
            <p className="text-center text-light text-sm mb-md">{user?.email}</p>
            <div className="text-center">
              <span className="bg-accent text-white px-sm py-xs rounded font-bold text-xs uppercase shadow-sm">Global Pass Member</span>
            </div>
            <hr className="divider my-lg" />
            
            <div className="nav-menu">
              <button 
                className={`nav-item ${activeTab === 'hub' ? 'active' : ''}`}
                onClick={() => setActiveTab('hub')}
              >
                <Map size={18} /> Travel Hub
              </button>
              <button 
                className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <Plane size={18} /> My Bookings ({bookings.length})
              </button>
              <button 
                className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => setActiveTab('saved')}
              >
                <Bookmark size={18} /> Bookmarks ({savedItinerariesList.length})
              </button>
              <button 
                className={`nav-item ${activeTab === 'checklist' ? 'active' : ''}`}
                onClick={() => setActiveTab('checklist')}
              >
                <CheckSquare size={18} /> Checklists
              </button>
            </div>

            <Button variant="outline" className="btn-full mt-xl text-danger border-danger hover:bg-danger hover:text-white" onClick={logout}>
              <LogOut size={18} /> Logout
            </Button>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main animate-fade-in">
          
          {/* Welcome Banner */}
          <Card bgImage="https://images.unsplash.com/photo-1522083111333-8114a1150c5b?auto=format&fit=crop&w=1200&q=80" overlay className="welcome-banner mb-xl">
            <div className="relative z-10 text-white flex flex-col justify-center h-full">
              <span className="premium-pill bg-accent text-text-color mb-xs self-start"><Sparkles size={12} /> Member Perks Active</span>
              <h1 className="text-3xl mb-sm font-heading font-bold">Welcome back, {user?.name || 'Explorer'}!</h1>
              <p className="text-lg opacity-90 max-w-2xl">Your premium Europe flight alerts and translation tools are ready. Planning Switzerland next?</p>
              <Button variant="primary" className="mt-md self-start border-none shadow-md text-white bg-primary" onClick={() => navigate('/marketplace')}>
                Compare Flights
              </Button>
            </div>
          </Card>

          {/* Ask AI quick widget */}
          <Card className="dashboard-ask-ai-card mb-xl">
            <div className="dashboard-ask-ai-header">
              <Sparkles className="text-terracotta" size={24} />
              <div>
                <h3 className="font-heading font-bold text-lg">Ask Where's My Spinach AI</h3>
                <p className="text-light text-xs">Get creator-curated recommendations based on real travel reels & guides</p>
              </div>
            </div>
            <form onSubmit={handleAskAISubmit} className="dashboard-ask-ai-form">
              <input 
                type="text" 
                placeholder="Try: 'Can I find Jain food in Paris?' or 'Rennet in Italian cheese?'"
                value={dashboardQuery}
                onChange={(e) => setDashboardQuery(e.target.value)}
              />
              <Button type="submit" variant="primary" className="border-none">Ask Companion</Button>
            </form>
          </Card>

          {/* TAB CONTENT: TRAVEL HUB */}
          {activeTab === 'hub' && (
            <div className="dashboard-content-grid">
              
              {/* Left Column */}
              <div className="dashboard-col-left">
                <section className="dashboard-section mb-xl">
                  <div className="flex justify-between items-end mb-md">
                    <h3 className="text-2xl font-bold font-heading">Bookmarked Itineraries</h3>
                    <button onClick={() => setActiveTab('saved')} className="text-terracotta font-bold text-sm">View All</button>
                  </div>
                  
                  {savedItinerariesList.length === 0 ? (
                    <div className="empty-bookmark-box glass p-lg text-center">
                      <Bookmark size={32} className="mx-auto mb-xs text-primary opacity-50" />
                      <p className="text-sm text-light">No saved itineraries yet. Head to the library to add some!</p>
                      <Button variant="outline" className="btn-sm mt-sm border-primary text-primary" onClick={() => navigate('/itineraries')}>Browse Library</Button>
                    </div>
                  ) : (
                    <div className="saved-places-grid">
                      {savedItinerariesList.map((dest) => (
                        <Card key={dest.id} imageFirst hover bgImage={dest.image} className="saved-card" onClick={() => navigate('/itineraries')}>
                          <h4 className="mb-xs font-bold">{dest.title}</h4>
                          <div className="flex items-center gap-xs text-primary font-bold mb-xs text-sm">
                            <ShieldCheck size={14} /> {dest.dietary} Safe
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </section>

                {/* Member Perks & Flight Deal Alerts */}
                <section className="dashboard-section mb-xl">
                  <h3 className="text-2xl font-bold font-heading mb-md">Exclusive Member Perks & Alerts</h3>
                  <div className="alerts-grid">
                    <div className="alert-item-box glass p-md flex gap-md items-start">
                      <div className="alert-badge text-white bg-primary flex items-center justify-center p-sm rounded">
                        <Tag size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Booking.com: 10% Cash Back</h4>
                        <p className="text-xs text-light mt-xs">Use voucher code <strong>SPINACH10</strong> during your next hotel check out for direct cash-back benefits.</p>
                      </div>
                    </div>
                    
                    <div className="alert-item-box glass p-md flex gap-md items-start">
                      <div className="alert-badge text-white bg-terracotta flex items-center justify-center p-sm rounded">
                        <Plane size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Veg flight deal alert: Delhi (DEL) to Zurich (ZRH)</h4>
                        <p className="text-xs text-light mt-xs">Lufthansa flights are down to <strong>₹48,200</strong> for July. Veg/Jain meals pre-request active.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="dashboard-section mb-xl">
                  <TranslationCardGenerator />
                </section>
              </div>

              {/* Right Column */}
              <div className="dashboard-col-right">
                <section className="dashboard-section mb-xl">
                  <div className="flex justify-between items-end mb-md">
                    <h3 className="text-2xl font-bold font-heading">Saved AI chats</h3>
                    <button onClick={() => navigate('/ask-ai')} className="text-terracotta font-bold text-sm">Open AI</button>
                  </div>
                  <Card className="saved-chats-card">
                    <div className="saved-chats-list">
                      {savedChats.map((chat) => (
                        <div 
                          key={chat.id} 
                          className="saved-chat-item" 
                          onClick={() => navigate(`/ask-ai?chatId=${chat.id}`)}
                        >
                          <div className="chat-item-info">
                            <span className="chat-item-title font-bold text-sm">{chat.title}</span>
                            <span className="chat-item-date text-xs text-light">{chat.date}</span>
                          </div>
                          <ChevronRight size={16} className="text-light" />
                        </div>
                      ))}
                    </div>
                  </Card>
                </section>

                <section className="dashboard-section mb-xl">
                  <h3 className="text-2xl font-bold font-heading mb-md">Travel Insurance</h3>
                  <Card className="p-md text-center">
                    <ShieldCheck className="text-primary mx-auto mb-xs" size={36} />
                    <h4 className="font-bold text-sm">Schengen Visa Compliance</h4>
                    <p className="text-xs text-light mt-xs mb-sm">SafetyWing insurance is recommended for cashless outpatient visits in Europe.</p>
                    <Button variant="outline" className="btn-sm border-primary text-primary" onClick={() => setActiveTab('bookings')}>Manage Policies</Button>
                  </Card>
                </section>
              </div>

            </div>
          )}

          {/* TAB CONTENT: MY BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="bookings-dashboard-tab">
              <h3 className="text-2xl font-bold font-heading mb-md">Active Booking Tickets</h3>
              
              {bookings.length === 0 ? (
                <div className="empty-bookmark-box glass p-xl text-center">
                  <Plane size={48} className="mx-auto mb-sm text-primary opacity-50" />
                  <p className="font-bold">No active bookings yet</p>
                  <p className="text-sm text-light mt-xs">Head to the marketplace to search and book flights, hotels, and tours.</p>
                  <Button variant="primary" className="mt-md border-none" onClick={() => navigate('/marketplace')}>Open Marketplace</Button>
                </div>
              ) : (
                <div className="active-bookings-list">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="booking-ticket-item glass p-lg mb-md flex justify-between items-center flex-wrap gap-md">
                      <div className="flex gap-md items-center">
                        <span className="booking-type-icon bg-cream p-sm rounded text-lg">
                          {booking.type === 'flight' ? '✈️' : booking.type === 'hotel' ? '🏨' : booking.type === 'activity' ? '🎟️' : '🛡️'}
                        </span>
                        <div>
                          <span className="text-xxs uppercase font-bold text-primary">{booking.provider}</span>
                          <h4 className="font-bold text-lg text-text-color mt-xxs">{booking.title}</h4>
                          <p className="text-xs text-light mt-xs">{booking.details}</p>
                          <span className="text-xxs font-bold text-terracotta bg-cream px-xs py-xxs rounded mt-xs inline-block">{booking.date}</span>
                        </div>
                      </div>
                      <div className="ticket-actions text-right">
                        <p className="font-bold text-lg text-terracotta mb-sm">{booking.price}</p>
                        <Button 
                          variant="outline" 
                          className="btn-sm text-danger border-danger hover:bg-danger hover:text-white flex items-center gap-xs ml-auto"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          <Trash2 size={14} /> Cancel Ticket
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: BOOKMARKS */}
          {activeTab === 'saved' && (
            <div className="bookmarks-dashboard-tab">
              <h3 className="text-2xl font-bold font-heading mb-md">All Saved Itineraries</h3>
              
              {savedItinerariesList.length === 0 ? (
                <div className="empty-bookmark-box glass p-xl text-center">
                  <Bookmark size={48} className="mx-auto mb-sm text-primary opacity-50" />
                  <p className="font-bold">No saved itineraries</p>
                  <p className="text-sm text-light mt-xs">Bookmarks allow you to easily find routes during your trips.</p>
                  <Button variant="primary" className="mt-md border-none" onClick={() => navigate('/itineraries')}>Browse Library</Button>
                </div>
              ) : (
                <div className="saved-list-layout">
                  {savedItinerariesList.map((itinerary) => (
                    <div key={itinerary.id} className="saved-list-item glass p-lg mb-md flex justify-between items-center flex-wrap gap-md">
                      <div className="flex gap-md items-center">
                        <img src={itinerary.image} alt={itinerary.title} className="saved-item-thumb" />
                        <div>
                          <span className="dietary-badge font-bold bg-primary text-white text-xs px-sm py-xs rounded">
                            {itinerary.dietary} Safe
                          </span>
                          <h4 className="font-bold text-lg text-text-color mt-sm">{itinerary.title}</h4>
                          <p className="text-xs text-light mt-xs">Cities: {itinerary.cities.join(', ')}</p>
                        </div>
                      </div>
                      <div className="flex gap-md">
                        <Button variant="primary" className="btn-sm border-none" onClick={() => navigate('/itineraries')}>
                          Open Detailed Plan
                        </Button>
                        <Button 
                          variant="outline" 
                          className="btn-sm text-danger border-danger hover:bg-danger hover:text-white"
                          onClick={() => toggleSaveItinerary(itinerary.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="checklist-dashboard-tab">
              <h3 className="text-2xl font-bold font-heading mb-md">Pre-Travel Checklist</h3>
              <Card className="checklist-card p-lg">
                <label className="flex items-center gap-sm mb-sm cursor-pointer">
                  <input type="checkbox" className="custom-checkbox" defaultChecked />
                  <span className="text-light line-through">Download offline maps</span>
                </label>
                <label className="flex items-center gap-sm mb-sm cursor-pointer">
                  <input type="checkbox" className="custom-checkbox" defaultChecked />
                  <span className="text-light line-through">Save translation cards</span>
                </label>
                <label className="flex items-center gap-sm mb-sm cursor-pointer">
                  <input type="checkbox" className="custom-checkbox" />
                  <span>Pack ready-to-eat Jain snacks / vegetarian ready-to-eat pouches</span>
                </label>
                <label className="flex items-center gap-sm mb-sm cursor-pointer">
                  <input type="checkbox" className="custom-checkbox" />
                  <span>Send "Senza strutto" Italian warning cards to phone storage</span>
                </label>
                <label className="flex items-center gap-sm cursor-pointer">
                  <input type="checkbox" className="custom-checkbox" />
                  <span>Compare SafetyWing Schengen insurance quotes for medical safety</span>
                </label>
              </Card>
            </div>
          )}

        </main>
      </div>
      <AffiliateBookingCard />
    </div>
  );
};

export default Dashboard;

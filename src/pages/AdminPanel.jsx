import React, { useState, useEffect } from 'react';
import { useTravel } from '../context/TravelContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { 
  Settings, Plus, Trash2, Edit, Lock, Unlock, Calendar, MapPin, 
  Check, PlusCircle, AlertCircle, X, Tag, Globe, Percent, 
  ChevronRight, FileText, Utensils, Hotel, HelpCircle 
} from 'lucide-react';
import './AdminPanel.css';

const PRESETS_IMAGES = [
  { name: 'Swiss Alps', url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80' },
  { name: 'Colosseum Rome', url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Eiffel Tower Paris', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80' },
  { name: 'Amsterdam Canals', url: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80' },
  { name: 'Barcelona Park Guell', url: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80' }
];

const AdminPanel = () => {
  const { 
    itineraries, destinations, affiliatePartners,
    addItinerary, updateItinerary, deleteItinerary,
    addDestination, updateDestination, deleteDestination,
    updateAffiliatePartner
  } = useTravel();

  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('spinach_admin_unlocked') === 'true';
  });
  const [passcodeError, setPasscodeError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState('itineraries'); // itineraries, destinations, affiliates

  // --- ITINERARY FORM STATES ---
  const [editingItineraryId, setEditingItineraryId] = useState(null);
  const [itiTitle, setItiTitle] = useState('');
  const [itiDestId, setItiDestId] = useState('');
  const [itiCountry, setItiCountry] = useState('');
  const [itiCities, setItiCities] = useState('');
  const [itiDuration, setItiDuration] = useState('5 Days');
  const [itiBudget, setItiBudget] = useState('Medium');
  const [itiBestTime, setItiBestTime] = useState('');
  const [itiDifficulty, setItiDifficulty] = useState('Easy');
  const [itiVegScore, setItiVegScore] = useState(9.0);
  const [itiJainScore, setItiJainScore] = useState(8.0);
  const [itiVeganScore, setItiVeganScore] = useState(8.0);
  const [itiIsFeatured, setItiIsFeatured] = useState(false);
  const [itiImage, setItiImage] = useState(PRESETS_IMAGES[0].url);
  const [itiMapUrl, setItiMapUrl] = useState('');
  
  // Arrays
  const [itiDays, setItiDays] = useState([{ day: 1, title: '', description: '', breakfast: '', attractions: '', lunch: '', activities: '', dinner: '', hotel: '' }]);
  const [itiRestaurants, setItiRestaurants] = useState([{ name: '', address: '', desc: '' }]);
  const [itiHotels, setItiHotels] = useState([{ name: '', rating: '4.5★', desc: '' }]);
  const [itiPDFs, setItiPDFs] = useState([{ name: '', url: '' }]);
  const [itiTips, setItiTips] = useState(['']);
  const [itiPacking, setItiPacking] = useState(['']);
  const [itiFAQs, setItiFAQs] = useState([{ question: '', answer: '' }]);

  // --- DESTINATION FORM STATES ---
  const [editingDestId, setEditingDestId] = useState(null);
  const [destName, setDestName] = useState('');
  const [destScore, setDestScore] = useState(4.0);
  const [destVegScore, setDestVegScore] = useState(4.0);
  const [destJainScore, setDestJainScore] = useState(4.0);
  const [destVeganScore, setDestVeganScore] = useState(4.0);
  const [destBestFor, setDestBestFor] = useState('Vegetarian');
  const [destTags, setDestTags] = useState('');
  const [destImg, setDestImg] = useState('');
  const [destDesc, setDestDesc] = useState('');
  const [destWeather, setDestWeather] = useState('');
  const [destBudget, setDestBudget] = useState('Medium');
  const [destMapUrl, setDestMapUrl] = useState('');
  const [destOverview, setDestOverview] = useState('');
  
  const [destSafeFoods, setDestSafeFoods] = useState(['']);
  const [destWarningFoods, setDestWarningFoods] = useState(['']);
  const [destTips, setDestTips] = useState(['']);

  // Set default destination selection if list is loaded
  useEffect(() => {
    if (destinations.length > 0 && !itiDestId) {
      setItiDestId(destinations[0].id);
    }
  }, [destinations, itiDestId]);

  // Unlock Admin
  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === 'spinach2026' || passcode === 'admin123') {
      setIsUnlocked(true);
      sessionStorage.setItem('spinach_admin_unlocked', 'true');
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid passcode! Try "spinach2026" or "admin123".');
    }
  };

  const triggerToast = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4500);
  };

  // --- ITINERARY ACTION HELPERS ---
  const addDayRow = () => {
    setItiDays([...itiDays, { day: itiDays.length + 1, title: '', description: '', breakfast: '', attractions: '', lunch: '', activities: '', dinner: '', hotel: '' }]);
  };
  const removeDayRow = (idx) => {
    if (itiDays.length === 1) return;
    setItiDays(itiDays.filter((_, i) => i !== idx).map((day, i) => ({ ...day, day: i + 1 })));
  };

  const addItiArrayRow = (setter, state) => setter([...state, '']);
  const updateItiArrayRow = (setter, state, idx, val) => {
    setter(state.map((item, i) => i === idx ? val : item));
  };
  const removeItiArrayRow = (setter, state, idx) => {
    if (state.length === 1) return;
    setter(state.filter((_, i) => i !== idx));
  };

  // Submit Itinerary
  const handleItinerarySubmit = (e) => {
    e.preventDefault();
    if (!itiTitle || !itiCountry || !itiCities || !itiDuration) {
      alert('Fill all mandatory fields: Title, Country, Cities, Duration.');
      return;
    }

    const payload = {
      title: itiTitle,
      destinationId: itiDestId || (destinations.length > 0 ? destinations[0].id : ''),
      country: itiCountry,
      cities: itiCities.split(',').map(c => c.trim()).filter(Boolean),
      duration: itiDuration,
      budget: itiBudget,
      bestTimeToVisit: itiBestTime,
      difficulty: itiDifficulty,
      vegScore: parseFloat(itiVegScore),
      jainScore: parseFloat(itiJainScore),
      veganScore: parseFloat(itiVeganScore),
      isFeatured: itiIsFeatured,
      image: itiImage,
      mapUrl: itiMapUrl || 'https://maps.google.com',
      days: itiDays.filter(d => d.title || d.description),
      restaurants: itiRestaurants.filter(r => r.name),
      hotels: itiHotels.filter(h => h.name),
      pdfs: itiPDFs.filter(p => p.name && p.url),
      tips: itiTips.filter(t => t.trim()),
      packingList: itiPacking.filter(p => p.trim()),
      faqs: itiFAQs.filter(f => f.question && f.answer)
    };

    if (editingItineraryId) {
      updateItinerary(editingItineraryId, payload);
      triggerToast('Itinerary updated successfully!');
      setEditingItineraryId(null);
    } else {
      addItinerary(payload);
      triggerToast('Itinerary published successfully!');
    }

    // Reset Form
    setItiTitle('');
    setItiCountry('');
    setItiCities('');
    setItiDuration('5 Days');
    setItiBudget('Medium');
    setItiBestTime('');
    setItiDifficulty('Easy');
    setItiVegScore(9.0);
    setItiJainScore(8.0);
    setItiVeganScore(8.0);
    setItiIsFeatured(false);
    setItiImage(PRESETS_IMAGES[0].url);
    setItiMapUrl('');
    setItiDays([{ day: 1, title: '', description: '', breakfast: '', attractions: '', lunch: '', activities: '', dinner: '', hotel: '' }]);
    setItiRestaurants([{ name: '', address: '', desc: '' }]);
    setItiHotels([{ name: '', rating: '4.5★', desc: '' }]);
    setItiPDFs([{ name: '', url: '' }]);
    setItiTips(['']);
    setItiPacking(['']);
    setItiFAQs([{ question: '', answer: '' }]);
    window.scrollTo(0, 0);
  };

  const handleEditItinerary = (itinerary) => {
    setEditingItineraryId(itinerary.id);
    setItiTitle(itinerary.title);
    setItiDestId(itinerary.destinationId || '');
    setItiCountry(itinerary.country);
    setItiCities(itinerary.cities.join(', '));
    setItiDuration(itinerary.duration);
    setItiBudget(itinerary.budget);
    setItiBestTime(itinerary.bestTimeToVisit || '');
    setItiDifficulty(itinerary.difficulty || 'Easy');
    setItiVegScore(itinerary.vegScore || 9.0);
    setItiJainScore(itinerary.jainScore || 8.0);
    setItiVeganScore(itinerary.veganScore || 8.0);
    setItiIsFeatured(itinerary.isFeatured || false);
    setItiImage(itinerary.image);
    setItiMapUrl(itinerary.mapUrl || '');
    setItiDays(itinerary.days.length > 0 ? itinerary.days : [{ day: 1, title: '', description: '', breakfast: '', attractions: '', lunch: '', activities: '', dinner: '', hotel: '' }]);
    setItiRestaurants(itinerary.restaurants && itinerary.restaurants.length > 0 ? itinerary.restaurants : [{ name: '', address: '', desc: '' }]);
    setItiHotels(itinerary.hotels && itinerary.hotels.length > 0 ? itinerary.hotels : [{ name: '', rating: '4.5★', desc: '' }]);
    setItiPDFs(itinerary.pdfs && itinerary.pdfs.length > 0 ? itinerary.pdfs : [{ name: '', url: '' }]);
    setItiTips(itinerary.tips && itinerary.tips.length > 0 ? itinerary.tips : ['']);
    setItiPacking(itinerary.packingList && itinerary.packingList.length > 0 ? itinerary.packingList : ['']);
    setItiFAQs(itinerary.faqs && itinerary.faqs.length > 0 ? itinerary.faqs : [{ question: '', answer: '' }]);
    triggerToast(`Editing: ${itinerary.title}`);
    window.scrollTo(0, 0);
  };

  // --- DESTINATION ACTION HELPERS ---
  const handleDestinationSubmit = (e) => {
    e.preventDefault();
    if (!destName || !destDesc || !destImg) {
      alert('Please fill out Name, Description, and Image.');
      return;
    }

    const payload = {
      name: destName,
      score: parseFloat(destScore),
      vegScore: parseFloat(destVegScore),
      jainScore: parseFloat(destJainScore),
      veganScore: parseFloat(destVeganScore),
      bestFor: destBestFor,
      tags: destTags.split(',').map(t => t.trim()).filter(Boolean),
      img: destImg,
      description: destDesc,
      weather: destWeather,
      budget: destBudget,
      mapUrl: destMapUrl || 'https://maps.google.com',
      overview: destOverview,
      safeFoods: destSafeFoods.filter(f => f.trim()),
      warningFoods: destWarningFoods.filter(f => f.trim()),
      tips: destTips.filter(t => t.trim())
    };

    if (editingDestId) {
      updateDestination(editingDestId, payload);
      triggerToast('Destination guide updated successfully!');
      setEditingDestId(null);
    } else {
      addDestination(payload);
      triggerToast('Destination guide published successfully!');
    }

    setDestName('');
    setDestScore(4.0);
    setDestVegScore(4.0);
    setDestJainScore(4.0);
    setDestVeganScore(4.0);
    setDestBestFor('Vegetarian');
    setDestTags('');
    setDestImg('');
    setDestDesc('');
    setDestWeather('');
    setDestBudget('Medium');
    setDestMapUrl('');
    setDestOverview('');
    setDestSafeFoods(['']);
    setDestWarningFoods(['']);
    setDestTips(['']);
    window.scrollTo(0, 0);
  };

  const handleEditDest = (dest) => {
    setEditingDestId(dest.id);
    setDestName(dest.name);
    setDestScore(dest.score || 4.0);
    setDestVegScore(dest.vegScore || 4.0);
    setDestJainScore(dest.jainScore || 4.0);
    setDestVeganScore(dest.veganScore || 4.0);
    setDestBestFor(dest.bestFor || 'Vegetarian');
    setDestTags((dest.tags || []).join(', '));
    setDestImg(dest.img);
    setDestDesc(dest.description);
    setDestWeather(dest.weather || '');
    setDestBudget(dest.budget || 'Medium');
    setDestMapUrl(dest.mapUrl || '');
    setDestOverview(dest.overview || '');
    setDestSafeFoods(dest.safeFoods && dest.safeFoods.length > 0 ? dest.safeFoods : ['']);
    setDestWarningFoods(dest.warningFoods && dest.warningFoods.length > 0 ? dest.warningFoods : ['']);
    setDestTips(dest.tips && dest.tips.length > 0 ? dest.tips : ['']);
    triggerToast(`Editing Destination: ${dest.name}`);
    window.scrollTo(0, 0);
  };

  // --- LOCK SCREEN UI ---
  if (!isUnlocked) {
    return (
      <div className="admin-lock-screen section flex items-center justify-center bg-cream" style={{ minHeight: '80vh' }}>
        <Card className="p-xl text-center glass shadow-lg" style={{ maxWidth: '420px', width: '90%' }}>
          <div className="avatar-circle mx-auto mb-md bg-primary text-white" style={{ width: '64px', height: '64px', fontSize: '1.8rem' }}>
            <Lock size={28} />
          </div>
          <h2 className="font-heading font-bold text-2xl mb-xs text-primary">Secure Host Dashboard</h2>
          <p className="text-light text-sm mb-lg">Enter the administrator passcode to manage travel listings, destinations, and affiliate codes.</p>
          
          <form onSubmit={handleUnlock}>
            <div className="form-group mb-md">
              <input 
                type="password" 
                placeholder="Enter Passcode (e.g. spinach2026)" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)}
                style={{ textAlign: 'center', fontSize: '1.1rem', padding: '12px' }}
                autoFocus
              />
            </div>
            {passcodeError && (
              <p className="text-danger text-xs font-bold mb-md flex items-center gap-xs justify-center">
                <AlertCircle size={14} /> {passcodeError}
              </p>
            )}
            <Button type="submit" variant="primary" className="btn-full py-md shadow-md border-none">
              Unlock Dashboard
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="admin-page section bg-cream">
      <div className="container">
        
        {successMsg && (
          <div className="admin-alert-toast glass animate-fade-in">
            <Check className="text-success" size={24} />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        <div className="flex justify-between items-center mb-xl border-bottom pb-md flex-wrap gap-md">
          <div className="flex items-center gap-md">
            <Settings size={36} className="text-primary animate-spin" style={{ animationDuration: '6s' }} />
            <div>
              <h1 className="hero-headline text-primary mb-xxs" style={{ fontSize: '2.4rem' }}>Spinach Host Portal</h1>
              <p className="text-light text-sm">Update prices, travel warnings, maps, pdfs, and affiliate links dynamically.</p>
            </div>
          </div>
          <div className="flex gap-sm">
            <button 
              className={`admin-tab-btn ${activeTab === 'itineraries' ? 'active' : ''}`}
              onClick={() => setActiveTab('itineraries')}
            >
              <Calendar size={16} /> Itineraries
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'destinations' ? 'active' : ''}`}
              onClick={() => setActiveTab('destinations')}
            >
              <MapPin size={16} /> Destinations
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'affiliates' ? 'active' : ''}`}
              onClick={() => setActiveTab('affiliates')}
            >
              <Tag size={16} /> Affiliate Manager
            </button>
            <Button 
              variant="outline" 
              className="btn-sm text-danger border-danger"
              onClick={() => {
                setIsUnlocked(false);
                sessionStorage.removeItem('spinach_admin_unlocked');
              }}
            >
              <Unlock size={14} /> Lock
            </Button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: ITINERARY MANAGER */}
        {/* ======================================================== */}
        {activeTab === 'itineraries' && (
          <div className="admin-grid animate-fade-in">
            <div className="admin-creator-form glass p-xl">
              <h2 className="text-2xl font-bold mb-lg font-heading border-bottom pb-sm flex justify-between items-center">
                <span>{editingItineraryId ? '✏️ Edit Itinerary' : '➕ Create New Itinerary'}</span>
                {editingItineraryId && (
                  <button 
                    onClick={() => {
                      setEditingItineraryId(null);
                      setItiTitle('');
                      setItiCountry('');
                      setItiCities('');
                    }}
                    className="text-light hover:text-danger text-sm font-bold flex items-center gap-xxs"
                  >
                    <X size={16} /> Cancel Edit
                  </button>
                )}
              </h2>

              <form onSubmit={handleItinerarySubmit}>
                {/* Section 1: Basic Details */}
                <div className="form-section mb-xl">
                  <h3 className="text-lg font-bold mb-md text-primary flex items-center gap-xs">
                    <Globe size={18} /> 1. Core Information
                  </h3>
                  <div className="inputs-grid-2">
                    <div className="form-group">
                      <label>Itinerary Title *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 7-Day Jain Italy Classic Tour" 
                        value={itiTitle} 
                        onChange={(e) => setItiTitle(e.target.value)} 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Destination Guide Group *</label>
                      <select value={itiDestId} onChange={(e) => setItiDestId(e.target.value)} required>
                        {destinations.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Country *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Italy" 
                        value={itiCountry} 
                        onChange={(e) => setItiCountry(e.target.value)} 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Cities (Comma separated) *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Rome, Florence, Venice" 
                        value={itiCities} 
                        onChange={(e) => setItiCities(e.target.value)} 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Duration *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 7 Days / 5 Days" 
                        value={itiDuration} 
                        onChange={(e) => setItiDuration(e.target.value)} 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Budget Level</label>
                      <select value={itiBudget} onChange={(e) => setItiBudget(e.target.value)}>
                        <option value="Low">Low Budget</option>
                        <option value="Medium">Medium Budget</option>
                        <option value="Luxury">Luxury Budget</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Best Time to Visit</label>
                      <input 
                        type="text" 
                        placeholder="e.g. April - October" 
                        value={itiBestTime} 
                        onChange={(e) => setItiBestTime(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Difficulty</label>
                      <select value={itiDifficulty} onChange={(e) => setItiDifficulty(e.target.value)}>
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Challenging">Challenging</option>
                      </select>
                    </div>
                  </div>

                  <div className="inputs-grid-3 mt-md">
                    <div className="form-group">
                      <label className="flex items-center gap-xxs"><Percent size={14} /> Vegetarian Score (1-10)</label>
                      <input type="number" step="0.1" min="1" max="10" value={itiVegScore} onChange={(e) => setItiVegScore(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="flex items-center gap-xxs"><Percent size={14} /> Jain Score (1-10)</label>
                      <input type="number" step="0.1" min="1" max="10" value={itiJainScore} onChange={(e) => setItiJainScore(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="flex items-center gap-xxs"><Percent size={14} /> Vegan Score (1-10)</label>
                      <input type="number" step="0.1" min="1" max="10" value={itiVeganScore} onChange={(e) => setItiVeganScore(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group mt-md">
                    <label>Itinerary Cover Image URL</label>
                    <input 
                      type="url" 
                      placeholder="Enter custom image URL" 
                      value={itiImage} 
                      onChange={(e) => setItiImage(e.target.value)} 
                    />
                    <div className="image-preset-picker mt-xs">
                      {PRESETS_IMAGES.map((p, i) => (
                        <button 
                          key={i} 
                          type="button"
                          className={`preset-btn ${itiImage === p.url ? 'active' : ''}`}
                          onClick={() => setItiImage(p.url)}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group mt-md">
                    <label>Google Maps Integration Link</label>
                    <input 
                      type="url" 
                      placeholder="e.g. https://maps.google.com/?q=Rome" 
                      value={itiMapUrl} 
                      onChange={(e) => setItiMapUrl(e.target.value)} 
                    />
                  </div>

                  <div className="form-group mt-md flex items-center gap-sm">
                    <input 
                      type="checkbox" 
                      id="itiIsFeatured"
                      checked={itiIsFeatured} 
                      onChange={(e) => setItiIsFeatured(e.target.checked)} 
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <label htmlFor="itiIsFeatured" className="font-bold cursor-pointer" style={{ marginBottom: 0 }}>
                      ⭐ Mark Itinerary as Featured on Homepage
                    </label>
                  </div>
                </div>

                {/* Section 2: Day-by-Day Detailed Schedule */}
                <div className="form-section mb-xl border-top pt-lg">
                  <div className="flex justify-between items-center mb-md">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-xs">
                      <Calendar size={18} /> 2. Day-by-Day Schedule Builder
                    </h3>
                    <button type="button" onClick={addDayRow} className="flex items-center gap-xs text-primary font-bold text-sm">
                      <PlusCircle size={18} /> Add Day
                    </button>
                  </div>

                  {itiDays.map((day, idx) => (
                    <div key={idx} className="admin-day-row glass p-md mb-md border-primary">
                      <div className="flex justify-between items-center mb-sm">
                        <span className="font-bold text-md text-terracotta">Day {day.day} Details</span>
                        {itiDays.length > 1 && (
                          <button type="button" onClick={() => removeDayRow(idx)} className="text-danger">
                            <Trash2 size={16} /> Remove Day
                          </button>
                        )}
                      </div>

                      <div className="form-group mb-sm">
                        <label>Day Title *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Arrival & Exploring Montmartre" 
                          value={day.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setItiDays(itiDays.map((item, i) => i === idx ? { ...item, title: val } : item));
                          }}
                          required
                        />
                      </div>

                      <div className="form-group mb-sm">
                        <label>Day Description *</label>
                        <textarea 
                          rows="3" 
                          placeholder="Detail what activities the travelers will do on this day..." 
                          value={day.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            setItiDays(itiDays.map((item, i) => i === idx ? { ...item, description: val } : item));
                          }}
                          required
                        />
                      </div>

                      <div className="inputs-grid-3">
                        <div className="form-group mb-xs">
                          <label>🍳 Breakfast Recommendation</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Bio cafe croissants" 
                            value={day.breakfast}
                            onChange={(e) => {
                              const val = e.target.value;
                              setItiDays(itiDays.map((item, i) => i === idx ? { ...item, breakfast: val } : item));
                            }}
                          />
                        </div>
                        <div className="form-group mb-xs">
                          <label>🏛️ Attractions Visited</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Louvre, Eiffel Tower" 
                            value={day.attractions}
                            onChange={(e) => {
                              const val = e.target.value;
                              setItiDays(itiDays.map((item, i) => i === idx ? { ...item, attractions: val } : item));
                            }}
                          />
                        </div>
                        <div className="form-group mb-xs">
                          <label>🥗 Lunch Recommendation</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Vegan burgers at Hank" 
                            value={day.lunch}
                            onChange={(e) => {
                              const val = e.target.value;
                              setItiDays(itiDays.map((item, i) => i === idx ? { ...item, lunch: val } : item));
                            }}
                          />
                        </div>
                        <div className="form-group mb-xs">
                          <label>🎟️ Day Activities</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Seine River Boat Cruise" 
                            value={day.activities}
                            onChange={(e) => {
                              const val = e.target.value;
                              setItiDays(itiDays.map((item, i) => i === idx ? { ...item, activities: val } : item));
                            }}
                          />
                        </div>
                        <div className="form-group mb-xs">
                          <label>🍝 Dinner Recommendation</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Indian veg curry" 
                            value={day.dinner}
                            onChange={(e) => {
                              const val = e.target.value;
                              setItiDays(itiDays.map((item, i) => i === idx ? { ...item, dinner: val } : item));
                            }}
                          />
                        </div>
                        <div className="form-group mb-xs">
                          <label>🏨 Hotel Overnight</label>
                          <input 
                            type="text" 
                            placeholder="e.g. HOY Paris" 
                            value={day.hotel}
                            onChange={(e) => {
                              const val = e.target.value;
                              setItiDays(itiDays.map((item, i) => i === idx ? { ...item, hotel: val } : item));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section 3: Safe Restaurants */}
                <div className="form-section mb-xl border-top pt-lg">
                  <div className="flex justify-between items-center mb-md">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-xs">
                      <Utensils size={18} /> 3. Recommended Veg/Jain Restaurants
                    </h3>
                    <button 
                      type="button" 
                      onClick={() => setItiRestaurants([...itiRestaurants, { name: '', address: '', desc: '' }])}
                      className="flex items-center gap-xs text-primary font-bold text-sm"
                    >
                      <PlusCircle size={18} /> Add Restaurant
                    </button>
                  </div>
                  {itiRestaurants.map((rest, idx) => (
                    <div key={idx} className="admin-subform-row flex gap-md mb-sm items-start">
                      <input 
                        type="text" 
                        placeholder="Restaurant Name" 
                        value={rest.name} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setItiRestaurants(itiRestaurants.map((item, i) => i === idx ? { ...item, name: val } : item));
                        }} 
                        style={{ flex: 1 }}
                      />
                      <input 
                        type="text" 
                        placeholder="Address" 
                        value={rest.address} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setItiRestaurants(itiRestaurants.map((item, i) => i === idx ? { ...item, address: val } : item));
                        }} 
                        style={{ flex: 1 }}
                      />
                      <input 
                        type="text" 
                        placeholder="Notes (e.g. Vegan Fondue, Jain pizza)" 
                        value={rest.desc} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setItiRestaurants(itiRestaurants.map((item, i) => i === idx ? { ...item, desc: val } : item));
                        }} 
                        style={{ flex: 2 }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setItiRestaurants(itiRestaurants.filter((_, i) => i !== idx))} 
                        className="text-danger mt-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Section 4: Hotels */}
                <div className="form-section mb-xl border-top pt-lg">
                  <div className="flex justify-between items-center mb-md">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-xs">
                      <Hotel size={18} /> 4. Vetted Hotels
                    </h3>
                    <button 
                      type="button" 
                      onClick={() => setItiHotels([...itiHotels, { name: '', rating: '4.5★', desc: '' }])}
                      className="flex items-center gap-xs text-primary font-bold text-sm"
                    >
                      <PlusCircle size={18} /> Add Hotel
                    </button>
                  </div>
                  {itiHotels.map((h, idx) => (
                    <div key={idx} className="admin-subform-row flex gap-md mb-sm items-start">
                      <input 
                        type="text" 
                        placeholder="Hotel Name" 
                        value={h.name} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setItiHotels(itiHotels.map((item, i) => i === idx ? { ...item, name: val } : item));
                        }} 
                        style={{ flex: 2 }}
                      />
                      <select 
                        value={h.rating} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setItiHotels(itiHotels.map((item, i) => i === idx ? { ...item, rating: val } : item));
                        }}
                        style={{ width: '100px' }}
                      >
                        <option value="5.0★">5.0★</option>
                        <option value="4.8★">4.8★</option>
                        <option value="4.7★">4.7★</option>
                        <option value="4.5★">4.5★</option>
                        <option value="4.0★">4.0★</option>
                      </select>
                      <input 
                        type="text" 
                        placeholder="Perks (e.g. fully plant-based organic breakfast)" 
                        value={h.desc} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setItiHotels(itiHotels.map((item, i) => i === idx ? { ...item, desc: val } : item));
                        }} 
                        style={{ flex: 3 }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setItiHotels(itiHotels.filter((_, i) => i !== idx))} 
                        className="text-danger mt-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Section 5: PDFs, Travel Tips, Packing Lists, FAQs */}
                <div className="form-section mb-xl border-top pt-lg">
                  <h3 className="text-lg font-bold mb-md text-primary flex items-center gap-xs">
                    <FileText size={18} /> 5. Guides, Packing & FAQ Attachments
                  </h3>

                  {/* PDFs */}
                  <div className="mb-lg">
                    <label className="font-bold text-xs uppercase tracking-wider block mb-sm">Attached Travel PDFs / Dining Guides</label>
                    {itiPDFs.map((pdf, idx) => (
                      <div key={idx} className="flex gap-md mb-xs">
                        <input 
                          type="text" 
                          placeholder="PDF Document Title (e.g. Jain Translation Card)" 
                          value={pdf.name} 
                          onChange={(e) => setItiPDFs(itiPDFs.map((item, i) => i === idx ? { ...item, name: e.target.value } : item))} 
                          style={{ flex: 1 }}
                        />
                        <input 
                          type="text" 
                          placeholder="Link / URL to PDF file" 
                          value={pdf.url} 
                          onChange={(e) => setItiPDFs(itiPDFs.map((item, i) => i === idx ? { ...item, url: e.target.value } : item))} 
                          style={{ flex: 2 }}
                        />
                        <button type="button" onClick={() => setItiPDFs(itiPDFs.filter((_, i) => i !== idx))} className="text-danger">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setItiPDFs([...itiPDFs, { name: '', url: '' }])} className="text-primary font-bold text-xs flex items-center gap-xxs mt-xs">
                      <Plus size={14} /> Add PDF Attachment
                    </button>
                  </div>

                  {/* Travel Tips */}
                  <div className="mb-lg">
                    <label className="font-bold text-xs uppercase tracking-wider block mb-sm">Specific Travel Tips</label>
                    {itiTips.map((tip, idx) => (
                      <div key={idx} className="flex gap-md mb-xs">
                        <input 
                          type="text" 
                          placeholder="Tip description" 
                          value={tip} 
                          onChange={(e) => updateItiArrayRow(setItiTips, itiTips, idx, e.target.value)} 
                          style={{ flex: 1 }}
                        />
                        <button type="button" onClick={() => removeItiArrayRow(setItiTips, itiTips, idx)} className="text-danger">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addItiArrayRow(setItiTips, itiTips)} className="text-primary font-bold text-xs flex items-center gap-xxs mt-xs">
                      <Plus size={14} /> Add Travel Tip
                    </button>
                  </div>

                  {/* Packing Checklist */}
                  <div className="mb-lg">
                    <label className="font-bold text-xs uppercase tracking-wider block mb-sm">Packing List Items</label>
                    {itiPacking.map((pack, idx) => (
                      <div key={idx} className="flex gap-md mb-xs">
                        <input 
                          type="text" 
                          placeholder="e.g. Ready-to-eat Jain food mixes" 
                          value={pack} 
                          onChange={(e) => updateItiArrayRow(setItiPacking, itiPacking, idx, e.target.value)} 
                          style={{ flex: 1 }}
                        />
                        <button type="button" onClick={() => removeItiArrayRow(setItiPacking, itiPacking, idx)} className="text-danger">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addItiArrayRow(setItiPacking, itiPacking)} className="text-primary font-bold text-xs flex items-center gap-xxs mt-xs">
                      <Plus size={14} /> Add Packing Item
                    </button>
                  </div>

                  {/* FAQs */}
                  <div className="mb-md">
                    <label className="font-bold text-xs uppercase tracking-wider block mb-sm">Frequently Asked Questions (FAQs)</label>
                    {itiFAQs.map((faq, idx) => (
                      <div key={idx} className="glass p-sm mb-sm relative">
                        <div className="form-group mb-xs">
                          <input 
                            type="text" 
                            placeholder="Question (e.g. Is water free in Switzerland?)" 
                            value={faq.question} 
                            onChange={(e) => setItiFAQs(itiFAQs.map((item, i) => i === idx ? { ...item, question: e.target.value } : item))} 
                          />
                        </div>
                        <div className="form-group">
                          <textarea 
                            rows="2" 
                            placeholder="Answer..." 
                            value={faq.answer} 
                            onChange={(e) => setItiFAQs(itiFAQs.map((item, i) => i === idx ? { ...item, answer: e.target.value } : item))} 
                          />
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setItiFAQs(itiFAQs.filter((_, i) => i !== idx))} 
                          className="text-danger absolute top-xs right-xs"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setItiFAQs([...itiFAQs, { question: '', answer: '' }])} className="text-primary font-bold text-xs flex items-center gap-xxs mt-xs">
                      <Plus size={14} /> Add FAQ Pair
                    </button>
                  </div>
                </div>

                <div className="border-top pt-lg text-center">
                  <Button type="submit" variant="primary" className="btn-lg border-none shadow-lg px-xl bg-primary text-white">
                    {editingItineraryId ? '💾 Save Itinerary Changes' : '🚀 Publish Itinerary to Library'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Active List Panel */}
            <div className="admin-active-list">
              <Card className="p-lg">
                <h3 className="text-xl font-bold mb-md font-heading border-bottom pb-xs">Active Itineraries ({itineraries.length})</h3>
                <div className="active-itineraries-list">
                  {itineraries.map((itinerary) => (
                    <div key={itinerary.id} className="active-itinerary-item flex justify-between items-center mb-md pb-md border-bottom flex-wrap gap-sm">
                      <div>
                        <h4 className="font-bold text-sm text-text-color">{itinerary.title}</h4>
                        <p className="text-xs text-light">
                          {itinerary.cities.join(', ')} | <strong>{itinerary.dietary || itinerary.days?.length + ' Days'}</strong>
                          {itinerary.isFeatured && <span className="text-terracotta font-bold ml-xs">★ Featured</span>}
                        </p>
                      </div>
                      <div className="flex gap-xs">
                        <button 
                          onClick={() => handleEditItinerary(itinerary)}
                          className="text-primary hover:text-primary-hover p-xs"
                          title="Edit Itinerary"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${itinerary.title}?`)) {
                              deleteItinerary(itinerary.id);
                              triggerToast('Itinerary deleted.');
                            }
                          }}
                          className="text-danger hover:text-red-700 p-xs"
                          title="Delete Itinerary"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DESTINATION MANAGER */}
        {/* ======================================================== */}
        {activeTab === 'destinations' && (
          <div className="admin-grid animate-fade-in">
            <div className="admin-creator-form glass p-xl">
              <h2 className="text-2xl font-bold mb-lg font-heading border-bottom pb-sm flex justify-between items-center">
                <span>{editingDestId ? '✏️ Edit Destination Guide' : '➕ Create New Destination Guide'}</span>
                {editingDestId && (
                  <button 
                    onClick={() => {
                      setEditingDestId(null);
                      setDestName('');
                      setDestDesc('');
                    }}
                    className="text-light hover:text-danger text-sm font-bold flex items-center gap-xxs"
                  >
                    <X size={16} /> Cancel Edit
                  </button>
                )}
              </h2>

              <form onSubmit={handleDestinationSubmit}>
                <div className="form-section mb-xl">
                  <h3 className="text-lg font-bold mb-md text-primary">1. Basic Guide Details</h3>
                  <div className="inputs-grid-2">
                    <div className="form-group">
                      <label>Destination Name *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. France 🇫🇷 or Switzerland 🇨🇭" 
                        value={destName} 
                        onChange={(e) => setDestName(e.target.value)} 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Primary Dietary Specialty</label>
                      <select value={destBestFor} onChange={(e) => setDestBestFor(e.target.value)}>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Jain & Veg">Jain & Veg</option>
                        <option value="Vegan & Veg">Vegan & Veg</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Filter Tags (Comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Vegan friendly, Jain friendly, Budget friendly" 
                        value={destTags} 
                        onChange={(e) => setDestTags(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Estimated Weather (Average)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 15°C - 24°C (Best: May - Oct)" 
                        value={destWeather} 
                        onChange={(e) => setDestWeather(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Average Budget Level</label>
                      <select value={destBudget} onChange={(e) => setDestBudget(e.target.value)}>
                        <option value="Low">Low Budget</option>
                        <option value="Medium">Medium Budget</option>
                        <option value="Luxury">Luxury Budget</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Google Maps Integration Link</label>
                      <input 
                        type="url" 
                        placeholder="e.g. https://maps.google.com/?q=Switzerland" 
                        value={destMapUrl} 
                        onChange={(e) => setDestMapUrl(e.target.value)} 
                      />
                    </div>
                  </div>

                  <div className="inputs-grid-4 mt-md">
                    <div className="form-group">
                      <label>Overall Score</label>
                      <input type="number" step="0.1" min="1" max="5" value={destScore} onChange={(e) => setDestScore(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Vegetarian Score</label>
                      <input type="number" step="0.1" min="1" max="5" value={destVegScore} onChange={(e) => setDestVegScore(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Jain Score</label>
                      <input type="number" step="0.1" min="1" max="5" value={destJainScore} onChange={(e) => setDestJainScore(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Vegan Score</label>
                      <input type="number" step="0.1" min="1" max="5" value={destVeganScore} onChange={(e) => setDestVeganScore(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group mt-md">
                    <label>Destination Hero Image URL *</label>
                    <input 
                      type="url" 
                      placeholder="Enter Unsplash image URL" 
                      value={destImg} 
                      onChange={(e) => setDestImg(e.target.value)} 
                      required
                    />
                  </div>

                  <div className="form-group mt-md">
                    <label>Short Description *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Switzerland is accommodating due to Indian diaspora..." 
                      value={destDesc} 
                      onChange={(e) => setDestDesc(e.target.value)} 
                      required
                    />
                  </div>

                  <div className="form-group mt-md">
                    <label>In-depth Overview Text</label>
                    <textarea 
                      rows="4" 
                      placeholder="Write an introductory summary about local vegan/vegetarian options..." 
                      value={destOverview} 
                      onChange={(e) => setDestOverview(e.target.value)} 
                    />
                  </div>
                </div>

                {/* Section 2: Culinary Warnings & Safety List */}
                <div className="form-section mb-xl border-top pt-lg">
                  <h3 className="text-lg font-bold mb-md text-primary">2. Food Guidelines & Travel Tips</h3>
                  
                  {/* Verified Safe Foods */}
                  <div className="mb-lg">
                    <label className="font-bold text-xs uppercase tracking-wider block mb-sm">Verified Safe Local Dishes</label>
                    {destSafeFoods.map((food, idx) => (
                      <div key={idx} className="flex gap-md mb-xs">
                        <input 
                          type="text" 
                          placeholder="e.g. Ratatouille (French vegetable stew)" 
                          value={food} 
                          onChange={(e) => updateItiArrayRow(setDestSafeFoods, destSafeFoods, idx, e.target.value)} 
                          style={{ flex: 1 }}
                        />
                        <button type="button" onClick={() => removeItiArrayRow(setDestSafeFoods, destSafeFoods, idx)} className="text-danger">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addItiArrayRow(setDestSafeFoods, destSafeFoods)} className="text-primary font-bold text-xs flex items-center gap-xxs mt-xs">
                      <Plus size={14} /> Add Safe Food
                    </button>
                  </div>

                  {/* Warning Foods */}
                  <div className="mb-lg">
                    <label className="font-bold text-xs uppercase tracking-wider block mb-sm">Hidden Meat / Broth / Rennet Warning Foods</label>
                    {destWarningFoods.map((food, idx) => (
                      <div key={idx} className="flex gap-md mb-xs">
                        <input 
                          type="text" 
                          placeholder="e.g. Croissants (Contain animal fat / egg wash)" 
                          value={food} 
                          onChange={(e) => updateItiArrayRow(setDestWarningFoods, destWarningFoods, idx, e.target.value)} 
                          style={{ flex: 1 }}
                        />
                        <button type="button" onClick={() => removeItiArrayRow(setDestWarningFoods, destWarningFoods, idx)} className="text-danger">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addItiArrayRow(setDestWarningFoods, destWarningFoods)} className="text-primary font-bold text-xs flex items-center gap-xxs mt-xs">
                      <Plus size={14} /> Add Warning Food
                    </button>
                  </div>

                  {/* Destination Survival Tips */}
                  <div className="mb-md">
                    <label className="font-bold text-xs uppercase tracking-wider block mb-sm">Destination-specific Survival Tips</label>
                    {destTips.map((tip, idx) => (
                      <div key={idx} className="flex gap-md mb-xs">
                        <input 
                          type="text" 
                          placeholder="e.g. Ask for 'senza strutto' (no lard) in local pizzerias." 
                          value={tip} 
                          onChange={(e) => updateItiArrayRow(setDestTips, destTips, idx, e.target.value)} 
                          style={{ flex: 1 }}
                        />
                        <button type="button" onClick={() => removeItiArrayRow(setDestTips, destTips, idx)} className="text-danger">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addItiArrayRow(setDestTips, destTips)} className="text-primary font-bold text-xs flex items-center gap-xxs mt-xs">
                      <Plus size={14} /> Add Survival Tip
                    </button>
                  </div>
                </div>

                <div className="border-top pt-lg text-center">
                  <Button type="submit" variant="primary" className="btn-lg border-none shadow-lg px-xl bg-primary text-white">
                    {editingDestId ? '💾 Save Destination Changes' : '🚀 Publish Destination Guide'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Active Destinations List */}
            <div className="admin-active-list">
              <Card className="p-lg">
                <h3 className="text-xl font-bold mb-md font-heading border-bottom pb-xs">Active Destinations ({destinations.length})</h3>
                <div className="active-itineraries-list">
                  {destinations.map((dest) => (
                    <div key={dest.id} className="active-itinerary-item flex justify-between items-center mb-md pb-md border-bottom">
                      <div>
                        <h4 className="font-bold text-sm text-text-color">{dest.name}</h4>
                        <p className="text-xs text-light">{dest.bestFor} | Rating: {dest.score}★</p>
                      </div>
                      <div className="flex gap-xs">
                        <button 
                          onClick={() => handleEditDest(dest)}
                          className="text-primary hover:text-primary-hover p-xs"
                          title="Edit Destination Guide"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Delete destination ${dest.name}? All associated itineraries will lose their destination connection.`)) {
                              deleteDestination(dest.id);
                              triggerToast('Destination guide deleted.');
                            }
                          }}
                          className="text-danger hover:text-red-700 p-xs"
                          title="Delete Destination"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: AFFILIATE MANAGER */}
        {/* ======================================================== */}
        {activeTab === 'affiliates' && (
          <div className="admin-affiliates-tab animate-fade-in">
            <div className="glass p-xl">
              <h2 className="text-2xl font-bold mb-lg font-heading border-bottom pb-sm flex justify-between items-center text-primary">
                <span>🔗 Affiliate Tracking & Promo Code Manager</span>
                <span className="text-xs font-bold text-light uppercase bg-cream px-sm py-xs rounded">Live Site Configuration</span>
              </h2>

              <p className="text-light mb-xl" style={{ fontSize: '0.95rem' }}>
                Manage all your affiliate partner links, tracking codes, and discount percentages in real-time. 
                Any changes made here will propagate instantly to the homepage, destination pages, itinerary pages, 
                and deals hub, with no code edits required.
              </p>

              <div className="affiliates-editor-grid">
                {affiliatePartners.map((partner) => (
                  <AffiliatePartnerEditorCard 
                    key={partner.id} 
                    partner={partner} 
                    onSave={(updated) => {
                      updateAffiliatePartner(partner.id, updated);
                      triggerToast(`Affiliate profiles for ${partner.name} updated!`);
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// --- SUB-COMPONENT FOR EDITING AFFILIATE PARTNER ---
const AffiliatePartnerEditorCard = ({ partner, onSave }) => {
  const [name, setName] = useState(partner.name);
  const [logo, setLogo] = useState(partner.logo);
  const [url, setUrl] = useState(partner.url);
  const [code, setCode] = useState(partner.code);
  const [discount, setDiscount] = useState(partner.discount);
  const [description, setDescription] = useState(partner.description);
  const [buttonText, setButtonText] = useState(partner.buttonText);
  const [expiryDate, setExpiryDate] = useState(partner.expiryDate || '');

  // Reset local state if partner changes (e.g. from backend context load)
  useEffect(() => {
    setName(partner.name);
    setLogo(partner.logo);
    setUrl(partner.url);
    setCode(partner.code);
    setDiscount(partner.discount);
    setDescription(partner.description);
    setButtonText(partner.buttonText);
    setExpiryDate(partner.expiryDate || '');
  }, [partner]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      logo,
      url,
      code,
      discount,
      description,
      buttonText,
      expiryDate: expiryDate || null
    });
  };

  return (
    <Card className="p-lg bg-white relative animate-fade-in" style={{ border: '1px solid var(--border-color)' }}>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-md border-bottom pb-xs flex-wrap gap-xs">
          <div className="flex items-center gap-sm">
            <span style={{ fontSize: '1.6rem' }}>{logo}</span>
            <h4 className="text-lg font-bold text-primary font-heading">{name}</h4>
          </div>
          <span className="text-xxs font-bold text-terracotta bg-cream px-sm py-xxs rounded">
            ID: {partner.id}
          </span>
        </div>

        <div className="form-group mb-sm">
          <label>Partner Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="inputs-grid-2">
          <div className="form-group mb-sm">
            <label>Partner Logo (Emoji)</label>
            <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} required />
          </div>
          <div className="form-group mb-sm">
            <label>Discount Amount (e.g. 10% OFF)</label>
            <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
          </div>
        </div>

        <div className="form-group mb-sm">
          <label>Affiliate tracking URL</label>
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>

        <div className="inputs-grid-2">
          <div className="form-group mb-sm">
            <label>Promo Code (e.g. SPINACH10)</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <div className="form-group mb-sm">
            <label>Expiry Date (Optional)</label>
            <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          </div>
        </div>

        <div className="form-group mb-sm">
          <label>CTA Button Text</label>
          <input type="text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} required />
        </div>

        <div className="form-group mb-md">
          <label>Offer Description / Bullet Details</label>
          <textarea rows="2" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <Button type="submit" variant="primary" className="btn-full btn-sm border-none bg-primary text-white font-bold">
          Update Affiliate Code
        </Button>
      </form>
    </Card>
  );
};

export default AdminPanel;

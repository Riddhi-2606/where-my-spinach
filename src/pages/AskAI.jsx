import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Compass, Sparkles, MapPin, ChevronRight, Info, User, AlertCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import './AskAI.css';

const PRESETS = {
  jain_paris: {
    q: "Can I find Jain food in Paris?",
    a: "Yes! While French bakeries are tricky (eggwash/lard), areas near Rue du Faubourg Saint-Denis have incredible vegetarian Indian spots like Saravanaa Bhavan. Also, check my Paris reel where I list 5 places serving eggless, butter-free croissants! Safe dining is totally doable."
  },
  veg_italy: {
    q: "What should vegetarians eat in Italy?",
    a: "Stick to classics like Marinara Pizza, Cacio e Pepe, and Gnocchi alla Sorrentina. However, always ask 'Senza strutto?' (No lard in dough) and check if cheese has 'caglio animale' (animal rennet). In my Rome guide, I highlight 12 spot-on rennet-free pasta houses!"
  },
  vegan_amsterdam: {
    q: "Best vegan cafes in Amsterdam?",
    a: "Amsterdam is vegan heaven! Don't miss Mr. & Mrs. Watson for artisanal vegan cheeses, and Vegan Junk Food Bar. I did a whole Instagram guide on canal-side vegan coffee houses that serve oat-milk stroopwafels."
  },
  itinerary_indian: {
    q: "Europe itinerary for Indian travellers?",
    a: "For a first trip, Paris (3d) -> Switzerland (4d) -> Italy (3d) is perfect. Switzerland is incredibly friendly with Indian kitchens in the Alps (Mount Titlis/Engelberg), and Italy has vegetarian pizza/pasta. Check my detailed story highlight for transport tips!"
  },
  veg_cities: {
    q: "Vegetarian-friendly cities in Europe?",
    a: "Berlin (the vegan capital!), Amsterdam, London, and Zurich are absolute top-tier. Even Paris has caught up. Spain is the hardest, but cities like Barcelona have amazing veggie tapas if you know where to look."
  },
  french_jain: {
    q: "How do I explain Jain restrictions in French?",
    a: "Use this exact phrase: 'Je mange végétarien. Sans oignon, sans ail, sans pomme de terre, et sans viande ni poisson.' Show our translation cards on your phone to the chef. They are usually very understanding once it's written down!"
  }
};

const MOCK_SAVED_CHATS = [
  { id: '1', title: 'Paris Eggless Croissants & Cafes', date: '2 days ago', initialQuery: 'Can I find Jain food in Paris?' },
  { id: '2', title: 'Rome Cheese Rennet Check', date: '5 days ago', initialQuery: 'What should vegetarians eat in Italy?' },
  { id: '3', title: 'Amsterdam Vegan Cheese Crawl', date: 'Last week', initialQuery: 'Best vegan cafes in Amsterdam?' }
];

const AskAI = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQueryParam = searchParams.get('q');
  const chatIdParam = searchParams.get('chatId');

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hey there explorer! 🥬 I'm your Where's My Spinach AI companion. I'm trained on all of my travel reels, vlogs, guidebooks, and food experiences across Europe. Ask me anything about finding vegetarian, vegan, or Jain food, safe restaurants, or itinerary planning!",
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load query from URL params (from homepage CTA or Dashboard)
  useEffect(() => {
    if (initialQueryParam) {
      handleSend(initialQueryParam);
      // Clean query param to prevent re-sending on refresh
      setSearchParams({});
    } else if (chatIdParam) {
      const savedChat = MOCK_SAVED_CHATS.find(c => c.id === chatIdParam);
      if (savedChat) {
        // Load chat history
        setMessages([
          { id: 'welcome', sender: 'ai', text: "Hey! Let's resume our conversation about " + savedChat.title.split(' ')[0] + ". Here is what we discussed:", time: 'Loaded' },
          { id: 'user-hist', sender: 'user', text: savedChat.initialQuery, time: 'Past conversation' },
          { id: 'ai-hist', sender: 'ai', text: getResponseForQuery(savedChat.initialQuery), time: 'Past conversation', source: true }
        ]);
        setSearchParams({});
      }
    }
  }, [initialQueryParam, chatIdParam]);

  const getResponseForQuery = (query) => {
    const q = query.toLowerCase();
    
    // Check exact presets
    if (q.includes('jain') && q.includes('paris')) return PRESETS.jain_paris.a;
    if (q.includes('vegetarian') && q.includes('italy') || q.includes('vegetarians') && q.includes('italy')) return PRESETS.veg_italy.a;
    if (q.includes('vegan') && q.includes('amsterdam')) return PRESETS.vegan_amsterdam.a;
    if (q.includes('itinerary') || q.includes('indian travellers')) return PRESETS.itinerary_indian.a;
    if (q.includes('vegetarian-friendly cities') || q.includes('cities')) return PRESETS.veg_cities.a;
    if (q.includes('french') || q.includes('explain jain') || q.includes('restrictions in french')) return PRESETS.french_jain.a;
    
    // Keywords logic
    if (q.includes('paris') || q.includes('france') || q.includes('french')) {
      return "Paris is wonderful but requires caution. French bakeries often glaze pastries with eggwash (dorure) and standard dishes use beef stock or lard. For Jain food, head to Rue du Faubourg Saint-Denis. I highly recommend unlocking my Paris Veg Guide for our full restaurant map!";
    }
    if (q.includes('rome') || q.includes('italy') || q.includes('italian')) {
      return "In Italy, pasta and pizza are your best friends, but watch out for 'caglio' (animal rennet) in Parmigiano-Reggiano and Grana Padano. Always ask for Pecorino Romano or fresh buffalo mozzarella which are sometimes safer, or stick to Marinara pizza (totally vegan!). My Rome vlog lists 5 secret cheese-free spots near the Colosseum.";
    }
    if (q.includes('swiss') || q.includes('switzerland') || q.includes('zurich')) {
      return "Switzerland is super accommodating for Indian travellers due to the high volume of tourism. In Zurich, Tibits and Hiltl (the oldest vegetarian restaurant in the world!) are absolute must-visits. For Alpine areas like Mt. Titlis, most mountain-top cafes offer hot vegetarian options or Indian buffets. Check my Swiss highlights for details!";
    }
    if (q.includes('barcelona') || q.includes('spain') || q.includes('spanish')) {
      return "Spain is historically tough for vegetarians because jamón (ham) is everywhere (even in potato dishes!). However, Barcelona is an exception with incredible vegan tapas bars. Try Flax & Kale or Teresa Carles. Always ask: '¿Tiene carne o pescado?' (Does it have meat or fish?).";
    }
    if (q.includes('munich') || q.includes('germany') || q.includes('berlin')) {
      return "Berlin is the vegan capital of Europe—you won't have any issues there! Munich is slightly more traditional. If you're at a traditional German beer garden, try Obatzda (cheese spread) with a Giant Pretzel (Brezn). Just make sure they don't use lard in the pretzel dough. Check my Munich reel for garden recommendations.";
    }
    if (q.includes('jain') || q.includes('no onion') || q.includes('no garlic')) {
      return "Jain dining in Europe is easier when you plan ahead. I recommend staying in apartments with kitchens for breakfast, packing ready-to-eat packets, and using our digital translation cards. When dining out in Italian, say: 'Senza cipolla e senza aglio' (No onion, no garlic). Check our Guide section for complete translation cards.";
    }
    
    return "Hey! That's a great question. In my travels across Europe, I've found that the key is verifying ingredients at local markets, asking about hidden broths, and using translation cards. Let me know which country or city you are asking about, and I will share my specific reels or guidebook recommendations!";
  };

  const handleSend = (textToSend) => {
    const queryText = textToSend || inputValue;
    if (!queryText.trim()) return;

    // Add user message
    const userMsg = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'user',
      text: queryText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const responseText = getResponseForQuery(queryText);
      const aiMsg = {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: true
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="ask-ai-page">
      {/* Background visual */}
      <div className="ask-ai-bg">
        <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1600&q=80" alt="Europe Background" />
        <div className="ask-ai-bg-overlay"></div>
      </div>

      <div className="container ask-ai-container">
        
        {/* Sidebar */}
        <aside className="ask-ai-sidebar">
          
          <Card className="sidebar-section-card mb-lg">
            <h3 className="sidebar-section-title"><Sparkles size={18} className="text-terracotta" /> Destination Quick Ask</h3>
            <div className="sidebar-buttons-grid">
              <button onClick={() => handleSend("Can I find Jain food in Paris?")} className="sidebar-prompt-btn">
                <MapPin size={14} /> Paris, France
              </button>
              <button onClick={() => handleSend("What should vegetarians eat in Italy?")} className="sidebar-prompt-btn">
                <MapPin size={14} /> Rome, Italy
              </button>
              <button onClick={() => handleSend("Best vegan cafes in Amsterdam?")} className="sidebar-prompt-btn">
                <MapPin size={14} /> Amsterdam, NL
              </button>
              <button onClick={() => handleSend("What to eat in Switzerland for vegetarians?")} className="sidebar-prompt-btn">
                <MapPin size={14} /> Zurich, Swiss
              </button>
              <button onClick={() => handleSend("Vegetarian food in Barcelona?")} className="sidebar-prompt-btn">
                <MapPin size={14} /> Barcelona, Spain
              </button>
              <button onClick={() => handleSend("Are Munich beer gardens vegetarian friendly?")} className="sidebar-prompt-btn">
                <MapPin size={14} /> Munich, Germany
              </button>
            </div>
          </Card>

          <Card className="sidebar-section-card mb-lg">
            <h3 className="sidebar-section-title"><Compass size={18} className="text-primary" /> Suggested Guides</h3>
            <div className="sidebar-links-list">
              <div className="sidebar-link-item" onClick={() => handleSend("How do I explain Jain restrictions in French?")}>
                <span>French Translation Card</span>
                <ChevronRight size={16} />
              </div>
              <div className="sidebar-link-item" onClick={() => handleSend("What is animal rennet in Italian?")}>
                <span>Rennet-Free Cheese Guide</span>
                <ChevronRight size={16} />
              </div>
              <div className="sidebar-link-item" onClick={() => handleSend("Europe itinerary for Indian travellers?")}>
                <span>10-Day Indian Veg Itinerary</span>
                <ChevronRight size={16} />
              </div>
            </div>
          </Card>

          <Card className="sidebar-section-card">
            <div className="sidebar-premium-note">
              <AlertCircle size={20} className="text-terracotta mb-sm" />
              <h4>Where's My Spinach Guide Book</h4>
              <p className="text-xs text-light">This AI searches all premium e-books, offline maps, and exclusive translation tools in real-time.</p>
              <a href="/pricing" className="premium-link font-bold text-xs text-terracotta mt-sm inline-block">Upgrade to Premium Pass →</a>
            </div>
          </Card>
        </aside>

        {/* Chat Area */}
        <main className="ask-ai-chat-wrapper">
          <Card className="chat-window-card">
            <div className="chat-window-header">
              <div className="avatar-large">🥬</div>
              <div className="chat-window-header-info">
                <h2>Ask Where's My Spinach AI</h2>
                <p>Personalized Travel Companion powered by the knowledge behind the brand</p>
              </div>
            </div>

            <div className="chat-window-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-message-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}>
                  <div className="bubble-content">
                    <p>{msg.text}</p>
                    {msg.source && (
                      <span className="source-label">🥬 Citing Where's My Spinach Reels & Guides</span>
                    )}
                  </div>
                  <span className="bubble-time">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="chat-message-bubble ai typing">
                  <div className="bubble-content">
                    <div className="typing-dots">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-window-input-area">
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Ask about cities, foods, ingredients, translation phrases..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button 
                  variant="primary" 
                  className="send-btn border-none"
                  onClick={() => handleSend()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </main>

      </div>
    </div>
  );
};

export default AskAI;

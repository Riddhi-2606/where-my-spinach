import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Destinations from './pages/Destinations';
import Guides from './pages/Guides';
import NRILife from './pages/NRILife';
import Pricing from './pages/Pricing';
import AskAI from './pages/AskAI';
import ItineraryLibrary from './pages/ItineraryLibrary';
import AffiliateBookings from './pages/AffiliateBookings';
import AdminPanel from './pages/AdminPanel';
import Deals from './pages/Deals';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TravelProvider } from './context/TravelContext';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <TravelProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/ask-ai" element={<AskAI />} />
                <Route path="/nri-life" element={<NRILife />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/itineraries" element={<ItineraryLibrary />} />
                <Route path="/marketplace" element={<AffiliateBookings />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/login" element={<Auth isLogin={true} />} />
                <Route path="/signup" element={<Auth isLogin={false} />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </TravelProvider>
    </AuthProvider>
  );
}

export default App;


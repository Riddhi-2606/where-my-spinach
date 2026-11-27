import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { Compass, CheckCircle2 } from 'lucide-react';
import './Auth.css';

const Auth = ({ isLogin = false }) => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(formData.email, formData.password);
    } else {
      signup(formData.name, formData.email, formData.password);
    }
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <div className="auth-content">
          <Card className="auth-card">
            <div className="text-center mb-lg">
              <Compass className="text-primary mb-md mx-auto" size={48} />
              <h1 className="auth-title">
                {isLogin ? 'Welcome Back' : 'Start Your 7-Day Free Trial'}
              </h1>
              <p className="text-light">
                {isLogin 
                  ? 'Enter your details to access your premium guides.' 
                  : 'No credit card required. Cancel anytime.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Rahul Sharma" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="rahul@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="btn-full btn-lg mt-md">
                {isLogin ? 'Log In' : 'Start Free Trial'}
              </Button>
            </form>

            <div className="auth-footer text-center mt-lg">
              {isLogin ? (
                <p>Don't have an account? <Link to="/signup" className="text-primary font-bold">Sign up here</Link></p>
              ) : (
                <p>Already have an account? <Link to="/login" className="text-primary font-bold">Log in here</Link></p>
              )}
            </div>
          </Card>
        </div>

        {!isLogin && (
          <div className="auth-benefits desktop-only">
            <h2 className="mb-lg">What's included in your trial?</h2>
            <ul className="benefits-list">
              <li>
                <CheckCircle2 className="text-success" />
                <span>Unlimited access to country-wise food guides</span>
              </li>
              <li>
                <CheckCircle2 className="text-success" />
                <span>Jain Food Translation Card Generator (6 languages)</span>
              </li>
              <li>
                <CheckCircle2 className="text-success" />
                <span>Detailed Veg Safety Scores for 50+ countries</span>
              </li>
              <li>
                <CheckCircle2 className="text-success" />
                <span>Exclusive NRI travel tips and community access</span>
              </li>
              <li>
                <CheckCircle2 className="text-success" />
                <span>Save destinations and build custom itineraries</span>
              </li>
            </ul>
            
            <div className="testimonial-mini mt-lg">
              <p className="text-light italic">"Literally the best ₹299/month I spend. Traveling as a strict Jain is finally stress-free."</p>
              <p className="font-bold mt-sm">— Siddharth J., Premium Member</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;

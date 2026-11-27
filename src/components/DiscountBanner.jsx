import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiscountBanner = ({ partnerId, customText }) => {
  const { affiliatePartners } = useTravel();
  const [copied, setCopied] = useState(false);

  // Find partner
  const partner = affiliatePartners.find(p => p.id === partnerId);
  if (!partner) return null;

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(partner.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="discount-banner glass-dark animate-fade-in" style={{
      borderRadius: 'var(--radius-md)',
      padding: '16px 24px',
      margin: '20px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
      background: 'linear-gradient(135deg, #4A6354 0%, #2B2B2B 100%)',
      color: '#FFFFFF',
      boxShadow: 'var(--shadow-md)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1', minWidth: '280px' }}>
        <div style={{
          backgroundColor: 'var(--accent-color)',
          color: 'var(--text-color)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          flexShrink: 0
        }}>
          {partner.logo || '🔥'}
        </div>
        <div>
          <span style={{
            fontSize: '0.65rem',
            color: 'var(--accent-color)',
            textTransform: 'uppercase',
            fontWeight: '800',
            letterSpacing: '1px',
            display: 'block'
          }}>
            Exclusive Deal
          </span>
          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>
            {customText || `${partner.discount} on Europe Tours with ${partner.name}!`}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {partner.code && (
          <button
            onClick={handleCopy}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px dashed rgba(255, 255, 255, 0.4)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'var(--transition)'
            }}
          >
            Code: <strong style={{ color: 'var(--accent-color)', letterSpacing: '0.5px' }}>{partner.code}</strong>
            {copied ? <Check size={12} className="text-success" /> : <Copy size={12} />}
          </button>
        )}

        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: 'var(--accent-color)',
            color: 'var(--text-color)',
            fontWeight: '700',
            fontSize: '0.8rem',
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'var(--transition)'
          }}
        >
          {partner.buttonText || 'Book Now'} <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
};

export default DiscountBanner;

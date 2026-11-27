import React from 'react';

const OfferBadge = ({ text, className = '' }) => {
  if (!text) return null;
  return (
    <span className={`offer-badge-tag ${className}`} style={{
      display: 'inline-block',
      padding: '4px 10px',
      backgroundColor: 'var(--terracotta)',
      color: '#FFFFFF',
      fontSize: '0.75rem',
      fontWeight: '800',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-heading)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {text}
    </span>
  );
};

export default OfferBadge;

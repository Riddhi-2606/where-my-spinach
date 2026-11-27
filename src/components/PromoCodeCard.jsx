import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import OfferBadge from './OfferBadge';

const PromoCodeCard = ({ partnerName, code, discount, description, expiryDate, buttonText, url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="promo-code-card glass animate-fade-in" style={{
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transition: 'var(--transition)',
      background: 'rgba(255, 255, 255, 0.7)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-color)', textTransform: 'uppercase' }}>
          {partnerName}
        </span>
        <OfferBadge text={discount} />
      </div>

      <div>
        <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '6px' }}>
          {discount} Discount
        </h3>
        <p className="text-light" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
          {description || `Save on your bookings with ${partnerName}.`}
        </p>
      </div>

      {code && (
        <div className="code-box-wrapper" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '2px dashed var(--primary-color)',
          backgroundColor: 'rgba(94, 125, 106, 0.05)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          margin: '4px 0'
        }}>
          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>
              Use Coupon Code
            </span>
            <span className="font-heading font-bold" style={{ fontSize: '1.1rem', color: 'var(--text-color)', letterSpacing: '1px' }}>
              {code}
            </span>
          </div>
          <button 
            type="button" 
            onClick={handleCopy}
            className="flex items-center gap-xs"
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: copied ? 'var(--primary-color)' : 'transparent',
              color: copied ? '#FFFFFF' : 'var(--primary-color)',
              border: copied ? 'none' : '1px solid var(--primary-color)',
              fontSize: '0.75rem',
              fontWeight: '700',
              transition: 'var(--transition)'
            }}
          >
            {copied ? (
              <>
                <Check size={14} /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy
              </>
            )}
          </button>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
          {expiryDate ? `Expires: ${new Date(expiryDate).toLocaleDateString()}` : 'Active Offer'}
        </span>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-xs"
          style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            color: 'var(--terracotta)',
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          {buttonText || 'Book Now'} <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default PromoCodeCard;

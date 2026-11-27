import React, { useState } from 'react';
import PartnerLogo from './PartnerLogo';
import OfferBadge from './OfferBadge';
import { Copy, Check, ExternalLink } from 'lucide-react';

const AffiliateCard = ({ partner }) => {
  const [copied, setCopied] = useState(false);

  if (!partner) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(partner.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="affiliate-partner-card glass animate-fade-in" style={{
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '24px',
      background: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: 'var(--shadow-sm)',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.8rem' }}>{partner.logo}</span>
          <PartnerLogo name={partner.name} size={20} />
        </div>
        <OfferBadge text={partner.discount} />
      </div>

      <p className="text-light" style={{ fontSize: '0.9rem', lineHeight: '1.5', minHeight: '44px' }}>
        {partner.description}
      </p>

      {partner.code && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px dashed var(--primary-color)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          backgroundColor: 'rgba(94, 125, 106, 0.03)'
        }}>
          <div>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-light)', textTransform: 'uppercase', display: 'block' }}>
              PROMO CODE
            </span>
            <code style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-color)', fontFamily: 'monospace' }}>
              {partner.code}
            </code>
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-xs text-xs font-bold"
            style={{
              color: 'var(--primary-color)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {copied ? (
              <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} /> Copied!
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Copy size={14} /> Copy
              </span>
            )}
          </button>
        </div>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a 
          href={partner.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-full"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: 'var(--primary-color)',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '700',
            fontFamily: 'var(--font-heading)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            transition: 'var(--transition)'
          }}
        >
          {partner.buttonText || `Book with ${partner.name}`} <ExternalLink size={14} />
        </a>
        
        {partner.expiryDate && (
          <span style={{ display: 'block', textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-light)' }}>
            Offer valid until {new Date(partner.expiryDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default AffiliateCard;

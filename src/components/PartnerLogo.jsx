import React from 'react';
import { Compass, Hotel, Plane, Tag, Star } from 'lucide-react';

const PartnerLogo = ({ name, size = 18 }) => {
  const cleanName = name?.toLowerCase() || '';

  if (cleanName.includes('getyourguide')) {
    return (
      <span className="partner-logo-badge gyg-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <Compass size={size} className="text-orange-500" style={{ color: '#D97A54' }} />
        <span className="font-heading font-bold" style={{ letterSpacing: '-0.5px' }}>GetYourGuide</span>
      </span>
    );
  }

  if (cleanName.includes('klook')) {
    return (
      <span className="partner-logo-badge klook-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <Tag size={size} className="text-orange-600" style={{ color: '#F4C95D' }} />
        <span className="font-heading font-bold" style={{ letterSpacing: '-0.5px' }}>Klook</span>
      </span>
    );
  }

  if (cleanName.includes('booking')) {
    return (
      <span className="partner-logo-badge booking-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <Hotel size={size} className="text-blue-600" style={{ color: '#5E7D6A' }} />
        <span className="font-heading font-bold" style={{ letterSpacing: '-0.5px' }}>Booking.com</span>
      </span>
    );
  }

  if (cleanName.includes('viator')) {
    return (
      <span className="partner-logo-badge viator-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <Star size={size} className="text-green-600" style={{ color: '#5E7D6A' }} />
        <span className="font-heading font-bold" style={{ letterSpacing: '-0.5px' }}>Viator</span>
      </span>
    );
  }

  if (cleanName.includes('skyscanner')) {
    return (
      <span className="partner-logo-badge skyscanner-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <Plane size={size} className="text-cyan-500" style={{ color: '#5E7D6A' }} />
        <span className="font-heading font-bold" style={{ letterSpacing: '-0.5px' }}>Skyscanner</span>
      </span>
    );
  }

  return (
    <span className="partner-logo-badge generic-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <Compass size={size} />
      <span className="font-heading font-bold">{name}</span>
    </span>
  );
};

export default PartnerLogo;

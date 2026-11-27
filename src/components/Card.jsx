import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  bgImage = null,
  overlay = false,
  imageFirst = false,
  ...props 
}) => {
  if (imageFirst && bgImage) {
    return (
      <div className={`card card-image-first ${hover ? 'card-hover' : ''} ${className}`} {...props}>
        <div className="card-image-container">
          <img src={bgImage} alt="Card Cover" className="card-img" />
          {overlay && <div className="card-overlay"></div>}
          <div className="card-image-overlay-content">
            {/* Elements meant to hover over the image (tags, scores) can be passed as specific children or just use absolute positioning in the children */}
          </div>
        </div>
        <div className="card-content-bottom">
          {children}
        </div>
      </div>
    );
  }

  // Standard Card or Full BG Image Card
  const style = bgImage ? { backgroundImage: `url(${bgImage})` } : {};
  
  return (
    <div 
      className={`card ${hover ? 'card-hover' : ''} ${bgImage && !imageFirst ? 'card-bg-image' : ''} ${className}`} 
      style={style}
      {...props}
    >
      {overlay && !imageFirst && <div className="card-overlay"></div>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;

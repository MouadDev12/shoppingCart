import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ 
  rating, 
  onRatingChange, 
  maxStars = 5, 
  size = 'medium',
  readonly = false,
  showValue = true,
  showReviews = true,
  reviewCount = 0
}) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleStarClick = (starIndex) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starIndex);
    }
  };

  const handleStarHover = (starIndex) => {
    if (!readonly) {
      setHoveredStar(starIndex);
    }
  };

  const handleStarsLeave = () => {
    if (!readonly) {
      setHoveredStar(0);
    }
  };

  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxStars; i++) {
      let starClass = `star ${size}`;
      
      if (readonly) {
        // Mode lecture seule
        if (i <= Math.floor(rating)) {
          starClass += ' filled';
        } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
          starClass += ' half';
        } else {
          starClass += ' empty';
        }
      } else {
        // Mode interactif
        if (hoveredStar > 0) {
          starClass += i <= hoveredStar ? ' hover-active' : ' empty';
        } else {
          if (i <= Math.floor(rating)) {
            starClass += ' filled';
          } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
            starClass += ' half';
          } else {
            starClass += ' empty';
          }
        }
      }

      stars.push(
        <span 
          key={i} 
          className={starClass}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          title={readonly ? '' : `Noter ${i} étoile${i > 1 ? 's' : ''}`}
          style={{ cursor: readonly ? 'default' : 'pointer' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="star-rating">
      <div 
        className="stars-container"
        onMouseLeave={handleStarsLeave}
      >
        {renderStars()}
      </div>
      {showValue && (
        <span className="rating-value">{rating.toFixed(1)}</span>
      )}
      {showReviews && reviewCount > 0 && (
        <span className="reviews-count">({reviewCount} avis)</span>
      )}
    </div>
  );
};

export default StarRating;
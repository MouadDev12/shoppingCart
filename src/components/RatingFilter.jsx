import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByRating } from '../store/slices/productSlice';
import StarRating from './StarRating';
import './RatingFilter.css';

const RatingFilter = () => {
  const dispatch = useDispatch();
  const currentRating = useSelector(state => state.products.filters.rating);

  const ratingOptions = [
    { value: 'All', label: 'Toutes les notes', stars: 0 },
    { value: '4', label: '4 étoiles et plus', stars: 4 },
    { value: '3', label: '3 étoiles et plus', stars: 3 },
    { value: '2', label: '2 étoiles et plus', stars: 2 },
    { value: '1', label: '1 étoile et plus', stars: 1 }
  ];

  const handleRatingFilter = (rating) => {
    dispatch(filterByRating(rating));
  };

  return (
    <div className="rating-filter">
      <h4 className="filter-title">Filtrer par note</h4>
      <div className="rating-options">
        {ratingOptions.map((option) => (
          <div 
            key={option.value}
            className={`rating-option ${currentRating === option.value ? 'active' : ''}`}
            onClick={() => handleRatingFilter(option.value)}
          >
            {option.stars > 0 ? (
              <div className="rating-option-content">
                <StarRating
                  rating={option.stars}
                  readonly={true}
                  showValue={false}
                  showReviews={false}
                  size="small"
                />
                <span className="rating-label">et plus</span>
              </div>
            ) : (
              <span className="rating-label">{option.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
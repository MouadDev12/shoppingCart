import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { modifyRating } from '../store/slices/productSlice';
import StarRating from './StarRating';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRatingChange = (newRating) => {
    dispatch(modifyRating({ productId: product.id, newRating }));
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {hasDiscount && (
          <div className="discount-badge">-{discountPercentage}%</div>
        )}
        {!product.inStock && (
          <div className="out-of-stock-overlay">Out of Stock</div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <StarRating
          rating={product.rating}
          onRatingChange={handleRatingChange}
          reviewCount={product.reviews}
          size="medium"
          showValue={true}
          showReviews={true}
        />
        
        <div className="product-details">
          <span className="category">{product.category}</span>
          <span 
            className="color" 
            style={{
              backgroundColor: product.color === 'Light Gray' ? '#d3d3d3' : product.color.toLowerCase().replace(' ', ''),
              border: product.color === 'Light Gray' ? '1px solid #999' : '2px solid #fff'
            }}
          ></span>
          <span className="color-name">{product.color}</span>
        </div>
        
        <div className="product-footer">
          <div className="price-container">
            <div className="current-price">${product.price.toFixed(2)}</div>
            {hasDiscount && (
              <div className="original-price">${product.originalPrice.toFixed(2)}</div>
            )}
          </div>
          
          <button 
            className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
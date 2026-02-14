import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, filterByCategory, filterByPrice, filterByColor, filterByBrand, filterByRating, resetFilters } from '../store/slices/productSlice';
import ProductCard from './ProductCard';
import RatingFilter from './RatingFilter';
import './ProductsList.css';

const ProductsList = () => {
  const dispatch = useDispatch();
  const { 
    filteredItems, 
    loading, 
    error, 
    filters 
  } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryFilter = (category) => {
    dispatch(filterByCategory(category));
  };

  const handlePriceFilter = (priceRange) => {
    dispatch(filterByPrice(priceRange));
  };

  const handleColorFilter = (color) => {
    dispatch(filterByColor(color));
  };

  const handleBrandFilter = (brand) => {
    dispatch(filterByBrand(brand));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="products-container">
      <div className="filters-sidebar">
        <h3>Filters</h3>
        
        <div className="filter-section">
          <h4>Category</h4>
          <div className="filter-options">
            {['All', 'Sneakers', 'Flats', 'Heels', 'Sandals'].map(category => (
              <button
                key={category}
                className={`filter-btn ${filters.category === category ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section" data-filter="price">
          <h4>Price</h4>
          <div className="filter-options">
            {['All', '$0 - $50', '$50 - $100', '$100 - $150', 'Over $150'].map(price => (
              <button
                key={price}
                className={`filter-btn ${filters.priceRange === price ? 'active' : ''}`}
                onClick={() => handlePriceFilter(price)}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Colors</h4>
          <div className="filter-options">
            {['All', 'Black', 'Light Gray', 'Red', 'Blue', 'Green'].map(color => (
              <button
                key={color}
                className={`filter-btn color-btn ${filters.color === color ? 'active' : ''}`}
                onClick={() => handleColorFilter(color)}
                style={{
                  backgroundColor: color === 'All' ? '#f0f0f0' : 
                                 color === 'Light Gray' ? '#d3d3d3' : 
                                 color.toLowerCase().replace(' ', ''),
                  color: color === 'Light Gray' || color === 'All' ? '#333' : 'white',
                  border: color === 'Light Gray' ? '1px solid #999' : 'none'
                }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section" data-filter="brand">
          <h4>Brand</h4>
          <div className="filter-options">
            {['All', 'Nike', 'Adidas', 'Puma', 'Generic'].map(brand => (
              <button
                key={brand}
                className={`filter-btn ${filters.brand === brand ? 'active' : ''}`}
                onClick={() => handleBrandFilter(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <RatingFilter />
        </div>

        <button className="reset-filters-btn" onClick={handleResetFilters}>
          Reset All Filters
        </button>
      </div>

      <div className="products-content">
        <div className="products-header">
          <h2>Products ({filteredItems.length})</h2>
          <div className="active-filters">
            {filters.category !== 'All' && (
              <span className="active-filter">Category: {filters.category}</span>
            )}
            {filters.priceRange !== 'All' && (
              <span className="active-filter">Price: {filters.priceRange}</span>
            )}
            {filters.color !== 'All' && (
              <span className="active-filter">Color: {filters.color}</span>
            )}
            {filters.brand !== 'All' && (
              <span className="active-filter">Brand: {filters.brand}</span>
            )}
            {filters.rating !== 'All' && (
              <span className="active-filter">Rating: {filters.rating}+ stars</span>
            )}
          </div>
        </div>

        <div className="products-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products">
              No products found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
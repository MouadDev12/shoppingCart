import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from '../ProductCard';
import productSlice from '../../store/slices/productSlice';
import cartSlice from '../../store/slices/cartSlice';

// Mock product data
const mockProduct = {
  id: 1,
  name: 'Nike Air Monarch IV',
  price: 140.00,
  category: 'Sneakers',
  color: 'White',
  brand: 'Nike',
  rating: 4.5,
  reviews: 123,
  image: '/api/placeholder/200/200'
};

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      products: productSlice,
      cart: cartSlice,
    },
    preloadedState: initialState
  });
};

const renderWithProvider = (component, initialState = {}) => {
  const store = createTestStore(initialState);
  return {
    ...render(
      <Provider store={store}>
        {component}
      </Provider>
    ),
    store
  };
};

describe('ProductCard', () => {
  test('renders product information correctly', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Nike Air Monarch IV')).toBeInTheDocument();
    expect(screen.getByText('$140.00')).toBeInTheDocument();
    expect(screen.getByText('Nike')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByText('(123 reviews)')).toBeInTheDocument();
  });

  test('renders product image with correct alt text', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    
    const image = screen.getByAltText('Nike Air Monarch IV');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/api/placeholder/200/200');
  });

  test('displays correct number of stars based on rating', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    
    const filledStars = screen.getAllByText('★');
    const emptyStars = screen.getAllByText('☆');
    
    // Rating is 4.5, so we should have 4 filled stars and 1 empty star
    expect(filledStars).toHaveLength(4);
    expect(emptyStars).toHaveLength(1);
  });

  test('adds product to cart when Add to Cart button is clicked', () => {
    const { store } = renderWithProvider(<ProductCard product={mockProduct} />);
    
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    
    const cartState = store.getState().cart;
    expect(cartState.items).toHaveLength(1);
    expect(cartState.items[0].id).toBe(mockProduct.id);
    expect(cartState.totalQuantity).toBe(1);
  });

  test('updates product rating when star is clicked', () => {
    const { store } = renderWithProvider(<ProductCard product={mockProduct} />, {
      products: {
        items: [mockProduct],
        filteredItems: [mockProduct],
        loading: false,
        error: null,
        filters: {
          category: 'All',
          priceRange: 'All',
          color: 'All',
          brand: 'All'
        }
      }
    });
    
    const stars = screen.getAllByText('★');
    fireEvent.click(stars[2]); // Click on 3rd star (rating = 3)
    
    const productState = store.getState().products;
    const updatedProduct = productState.items.find(p => p.id === mockProduct.id);
    expect(updatedProduct.rating).toBe(3);
  });

  test('handles product with zero rating', () => {
    const productWithZeroRating = { ...mockProduct, rating: 0 };
    renderWithProvider(<ProductCard product={productWithZeroRating} />);
    
    const emptyStars = screen.getAllByText('☆');
    expect(emptyStars).toHaveLength(5);
  });

  test('handles product with maximum rating', () => {
    const productWithMaxRating = { ...mockProduct, rating: 5 };
    renderWithProvider(<ProductCard product={productWithMaxRating} />);
    
    const filledStars = screen.getAllByText('★');
    expect(filledStars).toHaveLength(5);
  });

  test('applies hover effect on stars', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    
    const stars = screen.getAllByText('★');
    fireEvent.mouseEnter(stars[0]);
    
    expect(stars[0]).toHaveClass('star');
  });
});
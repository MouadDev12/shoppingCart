import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductsList from '../ProductsList';
import productSlice, { fetchProducts } from '../../store/slices/productSlice';
import cartSlice from '../../store/slices/cartSlice';

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Nike Air Monarch IV',
    price: 140.00,
    category: 'Sneakers',
    color: 'White',
    brand: 'Nike',
    rating: 4.5,
    reviews: 123,
    image: '/api/placeholder/200/200'
  },
  {
    id: 2,
    name: 'Nike Air Vapormax Plus',
    price: 140.00,
    category: 'Sneakers',
    color: 'Red',
    brand: 'Nike',
    rating: 4.3,
    reviews: 123,
    image: '/api/placeholder/200/200'
  },
  {
    id: 3,
    name: 'Flat Slip On Pumps',
    price: 140.00,
    category: 'Flats',
    color: 'Green',
    brand: 'Generic',
    rating: 4.1,
    reviews: 122,
    image: '/api/placeholder/200/200'
  }
];

// Mock the fetchProducts async thunk
jest.mock('../../store/slices/productSlice', () => ({
  ...jest.requireActual('../../store/slices/productSlice'),
  fetchProducts: jest.fn()
}));

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

describe('ProductsList', () => {
  beforeEach(() => {
    fetchProducts.mockClear();
  });

  test('renders loading state initially', () => {
    const initialState = {
      products: {
        items: [],
        filteredItems: [],
        loading: true,
        error: null,
        filters: {
          category: 'All',
          priceRange: 'All',
          color: 'All',
          brand: 'All'
        }
      }
    };

    renderWithProvider(<ProductsList />, initialState);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  test('renders error state when there is an error', () => {
    const initialState = {
      products: {
        items: [],
        filteredItems: [],
        loading: false,
        error: 'Failed to fetch products',
        filters: {
          category: 'All',
          priceRange: 'All',
          color: 'All',
          brand: 'All'
        }
      }
    };

    renderWithProvider(<ProductsList />, initialState);
    expect(screen.getByText('Error: Failed to fetch products')).toBeInTheDocument();
  });

  test('renders products when loaded successfully', () => {
    const initialState = {
      products: {
        items: mockProducts,
        filteredItems: mockProducts,
        loading: false,
        error: null,
        filters: {
          category: 'All',
          priceRange: 'All',
          color: 'All',
          brand: 'All'
        }
      }
    };

    renderWithProvider(<ProductsList />, initialState);
    
    expect(screen.getByText('Products (3)')).toBeInTheDocument();
    expect(screen.getByText('Nike Air Monarch IV')).toBeInTheDocument();
    expect(screen.getByText('Nike Air Vapormax Plus')).toBeInTheDocument();
    expect(screen.getByText('Flat Slip On Pumps')).toBeInTheDocument();
  });

  test('renders filter sidebar with all filter options', () => {
    const initialState = {
      products: {
        items: mockProducts,
        filteredItems: mockProducts,
        loading: false,
        error: null,
        filters: {
          category: 'All',
          priceRange: 'All',
          color: 'All',
          brand: 'All'
        }
      }
    };

    renderWithProvider(<ProductsList />, initialState);
    
    // Check filter sections
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('Brand')).toBeInTheDocument();
    
    // Check some filter options
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
    expect(screen.getByText('Flats')).toBeInTheDocument();
    expect(screen.getByText('Nike')).toBeInTheDocument();
  });

  test('filters products by category when category filter is clicked', async () => {
    const { store } = renderWithProvider(<ProductsList />, {
      products: {
        items: mockProducts,
        filteredItems: mockProducts,
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

    const sneakersFilter = screen.getByRole('button', { name: 'Sneakers' });
    fireEvent.click(sneakersFilter);

    await waitFor(() => {
      const state = store.getState().products;
      expect(state.filters.category).toBe('Sneakers');
    });
  });

  test('filters products by color when color filter is clicked', async () => {
    const { store } = renderWithProvider(<ProductsList />, {
      products: {
        items: mockProducts,
        filteredItems: mockProducts,
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

    const redFilter = screen.getByRole('button', { name: 'Red' });
    fireEvent.click(redFilter);

    await waitFor(() => {
      const state = store.getState().products;
      expect(state.filters.color).toBe('Red');
    });
  });

  test('resets all filters when reset button is clicked', async () => {
    const { store } = renderWithProvider(<ProductsList />, {
      products: {
        items: mockProducts,
        filteredItems: mockProducts,
        loading: false,
        error: null,
        filters: {
          category: 'Sneakers',
          priceRange: '$100 - $150',
          color: 'Red',
          brand: 'Nike'
        }
      }
    });

    const resetButton = screen.getByText('Reset All Filters');
    fireEvent.click(resetButton);

    await waitFor(() => {
      const state = store.getState().products;
      expect(state.filters.category).toBe('All');
      expect(state.filters.priceRange).toBe('All');
      expect(state.filters.color).toBe('All');
      expect(state.filters.brand).toBe('All');
    });
  });

  test('displays active filters when filters are applied', () => {
    const initialState = {
      products: {
        items: mockProducts,
        filteredItems: mockProducts,
        loading: false,
        error: null,
        filters: {
          category: 'Sneakers',
          priceRange: '$100 - $150',
          color: 'Red',
          brand: 'Nike'
        }
      }
    };

    renderWithProvider(<ProductsList />, initialState);
    
    expect(screen.getByText('Category: Sneakers')).toBeInTheDocument();
    expect(screen.getByText('Price: $100 - $150')).toBeInTheDocument();
    expect(screen.getByText('Color: Red')).toBeInTheDocument();
    expect(screen.getByText('Brand: Nike')).toBeInTheDocument();
  });

  test('displays no products message when no products match filters', () => {
    const initialState = {
      products: {
        items: mockProducts,
        filteredItems: [],
        loading: false,
        error: null,
        filters: {
          category: 'All',
          priceRange: 'All',
          color: 'All',
          brand: 'All'
        }
      }
    };

    renderWithProvider(<ProductsList />, initialState);
    expect(screen.getByText('No products found matching your filters.')).toBeInTheDocument();
  });

  test('highlights active filter buttons', () => {
    const initialState = {
      products: {
        items: mockProducts,
        filteredItems: mockProducts,
        loading: false,
        error: null,
        filters: {
          category: 'Sneakers',
          priceRange: 'All',
          color: 'All',
          brand: 'All'
        }
      }
    };

    renderWithProvider(<ProductsList />, initialState);
    
    const sneakersButton = screen.getByRole('button', { name: 'Sneakers' });
    expect(sneakersButton).toHaveClass('active');
  });
});
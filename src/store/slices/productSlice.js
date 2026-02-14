import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Données mockées plus réalistes
const mockProducts = [
  {
    id: 1,
    name: 'Nike Air Monarch IV',
    price: 140.00,
    originalPrice: 160.00,
    category: 'Sneakers',
    color: 'Light Gray',
    brand: 'Nike',
    rating: 4.5,
    reviews: 123,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    inStock: true,
    description: 'Comfortable running shoes with excellent support'
  },
  {
    id: 2,
    name: 'Nike Air Vapormax Plus',
    price: 140.00,
    originalPrice: 180.00,
    category: 'Sneakers',
    color: 'Red',
    brand: 'Nike',
    rating: 4.3,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
    inStock: true,
    description: 'Modern design with advanced cushioning technology'
  },
  {
    id: 3,
    name: 'Nike Waffle One Sneaker',
    price: 120.00,
    originalPrice: 140.00,
    category: 'Sneakers',
    color: 'Blue',
    brand: 'Nike',
    rating: 4.4,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
    inStock: true,
    description: 'Classic waffle sole design for everyday wear'
  },
  {
    id: 4,
    name: 'Nike Running Shoe',
    price: 110.00,
    originalPrice: 130.00,
    category: 'Sneakers',
    color: 'Black',
    brand: 'Nike',
    rating: 4.2,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop',
    inStock: true,
    description: 'Lightweight running shoes for performance'
  },
  {
    id: 5,
    name: 'Flat Slip On Pumps',
    price: 85.00,
    originalPrice: 100.00,
    category: 'Flats',
    color: 'Green',
    brand: 'Generic',
    rating: 4.1,
    reviews: 122,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop',
    inStock: true,
    description: 'Comfortable slip-on flats for casual wear'
  },
  {
    id: 6,
    name: 'Knit Ballet Flat',
    price: 75.00,
    originalPrice: 90.00,
    category: 'Flats',
    color: 'Black',
    brand: 'Generic',
    rating: 4.0,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop',
    inStock: true,
    description: 'Elegant knit ballet flats for office wear'
  },
  {
    id: 7,
    name: 'Adidas Ultraboost',
    price: 180.00,
    originalPrice: 200.00,
    category: 'Sneakers',
    color: 'Light Gray',
    brand: 'Adidas',
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop',
    inStock: true,
    description: 'Premium running shoes with boost technology'
  },
  {
    id: 8,
    name: 'Puma RS-X',
    price: 90.00,
    originalPrice: 110.00,
    category: 'Sneakers',
    color: 'Blue',
    brand: 'Puma',
    rating: 4.3,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop',
    inStock: true,
    description: 'Retro-inspired sneakers with modern comfort'
  }
];

// Action asynchrone pour récupérer les données
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProducts;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    loading: false,
    error: true,
    filters: {
      category: 'All',
      priceRange: 'All',
      color: 'All',
      brand: 'All',
      rating: 'All',
      searchTerm: ''
    }
  },
  reducers: {
    filterByCategory: (state, action) => {
      state.filters.category = action.payload;
      applyFilters(state);
    },
    filterByPrice: (state, action) => {
      state.filters.priceRange = action.payload;
      applyFilters(state);
    },
    filterByColor: (state, action) => {
      state.filters.color = action.payload;
      applyFilters(state);
    },
    filterByBrand: (state, action) => {
      state.filters.brand = action.payload;
      applyFilters(state);
    },
    filterByRating: (state, action) => {
      state.filters.rating = action.payload;
      applyFilters(state);
    },
    searchProducts: (state, action) => {
      state.filters.searchTerm = action.payload;
      applyFilters(state);
    },
    modifyRating: (state, action) => {
      const { productId, newRating } = action.payload;
      const product = state.items.find(item => item.id === productId);
      if (product) {
        product.rating = newRating;
      }
      applyFilters(state);
    },
    resetFilters: (state) => {
      state.filters = {
        category: 'All',
        priceRange: 'All',
        color: 'All',
        brand: 'All',
        rating: 'All',
        searchTerm: ''
      };
      state.filteredItems = state.items;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Fonction helper pour appliquer tous les filtres
const applyFilters = (state) => {
  let filtered = [...state.items];

  // Filtre par terme de recherche
  if (state.filters.searchTerm) {
    const searchTerm = state.filters.searchTerm.toLowerCase();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.brand.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  }

  // Filtre par catégorie
  if (state.filters.category !== 'All') {
    filtered = filtered.filter(item => item.category === state.filters.category);
  }

  // Filtre par couleur
  if (state.filters.color !== 'All') {
    filtered = filtered.filter(item => item.color === state.filters.color);
  }

  // Filtre par marque
  if (state.filters.brand !== 'All') {
    filtered = filtered.filter(item => item.brand === state.filters.brand);
  }

  // Filtre par note
  if (state.filters.rating !== 'All') {
    const minRating = parseFloat(state.filters.rating);
    filtered = filtered.filter(item => item.rating >= minRating);
  }

  // Filtre par prix
  if (state.filters.priceRange !== 'All') {
    switch (state.filters.priceRange) {
      case '$0 - $50':
        filtered = filtered.filter(item => item.price <= 50);
        break;
      case '$50 - $100':
        filtered = filtered.filter(item => item.price > 50 && item.price <= 100);
        break;
      case '$100 - $150':
        filtered = filtered.filter(item => item.price > 100 && item.price <= 150);
        break;
      case 'Over $150':
        filtered = filtered.filter(item => item.price > 150);
        break;
    }
  }

  state.filteredItems = filtered;
};

export const {
  filterByCategory,
  filterByPrice,
  filterByColor,
  filterByBrand,
  filterByRating,
  searchProducts,
  modifyRating,
  resetFilters
} = productSlice.actions;

export default productSlice.reducer;
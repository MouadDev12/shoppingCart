import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
import './styles.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalQuantity } = useSelector(state => state.cart);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Nike Store</h1>
          <button className="cart-toggle-btn" onClick={toggleCart}>
            🛒 Cart {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <ProductsList />
      </main>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, modifyQuantity, clearCart } from '../store/slices/cartSlice';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    dispatch(modifyQuantity({ id, quantity: parseInt(newQuantity) }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Votre panier est vide !');
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleConfirmCheckout = async () => {
    setIsProcessing(true);
    
    // Simulation d'un processus de checkout
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simule un délai d'API
      
      // Ici vous pourriez ajouter l'appel à votre API de paiement
      alert(`Commande confirmée ! Total: $${totalAmount.toFixed(2)}\nMerci pour votre achat !`);
      
      // Vider le panier après le checkout réussi
      dispatch(clearCart());
      setShowCheckoutModal(false);
      onClose(); // Fermer le panier
      
    } catch (error) {
      alert('Erreur lors du checkout. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelCheckout = () => {
    setShowCheckoutModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Shopping Cart ({totalQuantity})</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-brand">{item.brand}</p>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="item-controls">
                      <div className="quantity-control">
                        <label>Qty:</label>
                        <select 
                          value={item.quantity} 
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="item-total">
                      ${item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="total-line">
                    <span>Total Items: {totalQuantity}</span>
                  </div>
                  <div className="total-line total-amount">
                    <span>Total: ${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="cart-actions">
                  <button className="clear-cart-btn" onClick={handleClearCart}>
                    Clear Cart
                  </button>
                  <button 
                    className="checkout-btn"
                    onClick={handleCheckout}
                    disabled={items.length === 0}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de confirmation de checkout */}
      {showCheckoutModal && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <div className="checkout-modal-header">
              <h3>Confirmer votre commande</h3>
            </div>
            
            <div className="checkout-modal-content">
              <div className="order-summary">
                <h4>Résumé de la commande :</h4>
                {items.map(item => (
                  <div key={item.id} className="checkout-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
                <div className="checkout-total">
                  <strong>Total: ${totalAmount.toFixed(2)}</strong>
                </div>
              </div>
            </div>
            
            <div className="checkout-modal-actions">
              <button 
                className="cancel-checkout-btn"
                onClick={handleCancelCheckout}
                disabled={isProcessing}
              >
                Annuler
              </button>
              <button 
                className="confirm-checkout-btn"
                onClick={handleConfirmCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Traitement...' : 'Confirmer la commande'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
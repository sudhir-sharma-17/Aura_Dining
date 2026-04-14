import React from 'react';

const CartModal = ({ isOpen, onClose, cart, setCart, onCheckout }) => {
  if (!isOpen) return null;

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const priceVal = parseFloat(item.price.replace('₹', ''));
      return total + priceVal;
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-overlay">
      <div className="cart-modal glass-card">
        <button className="close-btn" onClick={onClose} aria-label="Close cart">
          &times;
        </button>
        <div className="cart-header">
          <h2>Your Orders</h2>
          <p>{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</p>
        </div>
        
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="empty-cart-icon">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Your cart is empty.</p>
              <button onClick={onClose} className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Browse Menu</button>
            </div>
          ) : (
            <ul className="cart-item-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <span className="cart-item-price">{item.price}</span>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(index)}
                    aria-label="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-amount">₹{calculateTotal()}</span>
            </div>
            <button className="btn-primary btn-solid checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          z-index: 2000;
        }

        .cart-modal {
          position: relative;
          width: 100%;
          max-width: 450px;
          height: 100%;
          background: var(--bg);
          border-left: 1px solid var(--glass-border);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
          animation: slideLeft 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.05) forwards;
          display: flex;
          flex-direction: column;
        }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 2.5rem;
          cursor: pointer;
          transition: color 0.3s;
          line-height: 1;
        }

        .close-btn:hover {
          color: var(--primary);
        }

        .cart-header {
          padding: 2.5rem 2rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cart-header h2 {
          font-family: 'Cinzel', serif;
          margin-bottom: 0.2rem;
          color: var(--primary);
          font-size: 1.8rem;
        }

        .cart-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .cart-items-container {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1.5rem 2rem;
        }

        /* Customize Scrollbar for Cart */
        .cart-items-container::-webkit-scrollbar {
          width: 6px;
        }
        .cart-items-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .cart-items-container::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 3px;
        }

        .empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--text-muted);
          text-align: center;
        }

        .empty-cart-icon {
          color: rgba(255, 255, 255, 0.1);
          margin-bottom: 1rem;
        }

        .cart-item-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .cart-item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .cart-item-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
        }

        .cart-item-details {
          flex-grow: 1;
        }

        .cart-item-title {
          font-size: 0.95rem;
          margin: 0 0 0.3rem 0;
          color: var(--text-main);
        }

        .cart-item-price {
          font-family: 'Cinzel', serif;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .remove-btn {
          background: rgba(255, 77, 79, 0.1);
          color: #ff4d4f;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .remove-btn:hover {
          background: #ff4d4f;
          color: white;
          transform: scale(1.1);
        }

        .cart-footer {
          padding: 1.5rem 2rem 2.5rem;
          background: rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }

        .total-amount {
          font-family: 'Cinzel', serif;
          color: var(--primary);
          font-weight: 700;
          font-size: 1.5rem;
        }

        .checkout-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

export default CartModal;

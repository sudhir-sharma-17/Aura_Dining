import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, cartTotal, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="payment-overlay">
      <div className="payment-modal glass-card">
        <button className="close-btn" onClick={onClose} aria-label="Close payment dialog">
          &times;
        </button>
        <div className="payment-header">
          <h2>Secure Checkout</h2>
          <p>Complete your order of <strong>₹{cartTotal}</strong></p>
        </div>
        
        <form className="payment-form" onSubmit={handlePaymentSubmit}>
          <div className="form-group">
            <label htmlFor="cardName">Name on Card</label>
            <input 
              type="text" 
              id="cardName" 
              className="form-control" 
              placeholder="John Doe" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <div className="input-with-icon">
              <input 
                type="text" 
                id="cardNumber" 
                className="form-control" 
                placeholder="0000 0000 0000 0000" 
                pattern="[\d ]*" 
                maxLength="19"
                required 
              />
              <svg className="card-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="expiry">Expiry Date</label>
              <input 
                type="text" 
                id="expiry" 
                className="form-control" 
                placeholder="MM/YY" 
                maxLength="5"
                required 
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor="cvc">CVC</label>
              <input 
                type="text" 
                id="cvc" 
                className="form-control" 
                placeholder="123" 
                maxLength="4"
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary btn-solid pay-btn" 
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="processing-text">
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                Processing...
              </span>
            ) : (
              `Pay ₹${cartTotal}`
            )}
          </button>
          <div className="secure-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Guaranteed Secure Checkout
          </div>
        </form>
      </div>

      <style jsx>{`
        .payment-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2100;
        }

        .payment-modal {
          position: relative;
          width: 100%;
          max-width: 480px;
          padding: 2.5rem;
          background: var(--bg);
          border-radius: 12px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
          border: 1px solid var(--glass-border);
        }

        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
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

        .payment-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .payment-header h2 {
          font-family: 'Cinzel', serif;
          color: var(--primary);
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .payment-header p {
          color: var(--text-main);
          font-size: 1.1rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .half-width {
          flex: 1;
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon .form-control {
          padding-right: 40px;
        }

        .card-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .pay-btn {
          width: 100%;
          margin-top: 1rem;
          padding: 1rem;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .pay-btn:disabled {
          background: rgba(212, 175, 55, 0.5);
          cursor: not-allowed;
          border-color: transparent;
        }

        .processing-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .secure-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default PaymentModal;

import React, { useState, useEffect } from 'react';

const BookingsModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [userData, setUserData] = useState({ orders: [], reservations: [] });

  useEffect(() => {
    if (isOpen && user) {
      const storedData = localStorage.getItem(`aura_user_data_${user}`);
      if (storedData) {
        setUserData(JSON.parse(storedData));
      } else {
        setUserData({ orders: [], reservations: [] });
      }
    }
  }, [isOpen, user]);

  const handleCancelReservation = (indexToCancel) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      const newReservations = userData.reservations.filter((_, idx) => idx !== indexToCancel);
      const newUserData = { ...userData, reservations: newReservations };
      setUserData(newUserData);
      localStorage.setItem(`aura_user_data_${user}`, JSON.stringify(newUserData));
      alert("Reservation cancelled successfully.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bookings-overlay">
      <div className="bookings-modal glass-card">
        <button className="close-btn" onClick={onClose} aria-label="Close bookings dialog">
          &times;
        </button>
        <div className="bookings-header">
          <h2>My Bookings</h2>
          <p>View your past orders and reservations</p>
        </div>
        
        <div className="bookings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Food Orders
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            Table Reservations
          </button>
        </div>

        <div className="bookings-content">
          {activeTab === 'orders' && (
            <div className="orders-list">
              {userData.orders.length > 0 ? (
                userData.orders.map((order, index) => (
                  <div key={index} className="booking-card">
                    <div className="booking-card-header">
                      <span className="booking-date">{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      <span className="booking-total">₹{order.total}</span>
                    </div>
                    <ul className="order-items">
                      {order.items.map((item, i) => (
                        <li key={i}>{item.name} <span className="item-price">{item.price}</span></li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="empty-state">No past food orders found.</div>
              )}
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="reservations-list">
              {userData.reservations.length > 0 ? (
                userData.reservations.map((res, index) => (
                  <div key={index} className="booking-card">
                    <div className="booking-card-header">
                      <span className="booking-date">{res.date} at {res.time}</span>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span className="booking-status">Confirmed</span>
                        <button 
                          className="cancel-btn" 
                          onClick={() => handleCancelReservation(index)}
                          title="Cancel Reservation"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div className="reservation-details">
                      <p><strong>Name:</strong> {res.name}</p>
                      <p><strong>Guests:</strong> {res.guests} People</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">No table reservations found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bookings-overlay {
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
          z-index: 2200;
        }

        .bookings-modal {
          position: relative;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          padding: 2.5rem;
          background: var(--bg);
          border-radius: 12px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
          border: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
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

        .bookings-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .bookings-header h2 {
          font-family: 'Cinzel', serif;
          color: var(--primary);
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .bookings-header p {
          color: var(--text-main);
          font-size: 1.1rem;
        }

        .bookings-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 1rem;
        }

        .tab-btn {
          flex: 1;
          padding: 0.8rem;
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .tab-btn.active {
          background: var(--primary);
          color: var(--bg);
          border-color: var(--primary);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
        }

        .bookings-content {
          overflow-y: auto;
          flex: 1;
          padding-right: 0.5rem;
        }

        /* Custom scrollbar for bookings content */
        .bookings-content::-webkit-scrollbar {
          width: 6px;
        }
        .bookings-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .bookings-content::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 4px;
        }

        .booking-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: transform 0.2s;
        }

        .booking-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .booking-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .booking-date {
          font-weight: 600;
          color: var(--primary);
        }

        .booking-total, .booking-status {
          font-weight: bold;
          color: var(--text-main);
          background: rgba(212, 175, 55, 0.15);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .cancel-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: bold;
          transition: background 0.3s;
        }

        .cancel-btn:hover {
          background: #c0392b;
        }

        .order-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .order-items li {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .item-price {
          color: var(--text-main);
        }

        .reservation-details p {
          margin: 0.5rem 0;
          color: var(--text-muted);
        }
        
        .reservation-details strong {
          color: var(--text-main);
          margin-right: 0.5rem;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem 0;
          color: var(--text-muted);
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default BookingsModal;

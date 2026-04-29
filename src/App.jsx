import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


import Navbar from './components/Navbar';
import Login from './components/Login';
import CartModal from './components/CartModal';
import PaymentModal from './components/PaymentModal';
import BookingsModal from './components/BookingsModal';
import BlogDetails from './components/BlogDetails';
import './App.css';
import { menuItems } from './menuData';
import { blogData } from './blogData';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(() => sessionStorage.getItem('aura_active_user') || null);
  const [cart, setCart] = useState([]);
  const [addingItem, setAddingItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleLoginSuccess = (email) => {
    setUser(email);
    sessionStorage.setItem('aura_active_user', email);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('aura_active_user');
  };


  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    setAddingItem(item.id);
    
    // Clear the animation state after it plays
    setTimeout(() => {
      setAddingItem(null);
    }, 600);
  };

  const handleCheckoutClick = () => {
    if (!user) {
      alert("Please login first to proceed to checkout.");
      setIsCartOpen(false);
      setIsLoginOpen(true);
      return;
    }
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (user && cart.length > 0) {
      const storageKey = `aura_user_data_${user}`;
      const existingData = JSON.parse(localStorage.getItem(storageKey) || '{"orders": [], "reservations": []}');
      
      const newOrder = {
        date: new Date().toISOString(),
        total: cartTotal,
        items: cart.map(item => ({ name: item.name, price: item.price }))
      };
      
      existingData.orders.unshift(newOrder);
      localStorage.setItem(storageKey, JSON.stringify(existingData));
    }

    setCart([]);
    setIsPaymentOpen(false);
    alert('Payment Complete! Your culinary experience is being prepared.');
  };

  const cartTotal = cart.reduce((total, item) => {
    const priceVal = parseFloat(item.price.replace('₹', ''));
    return total + priceVal;
  }, 0).toFixed(2);


  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  // Filtering Menu Items Based on Search Results and Category
  const filteredMenuItems = menuItems.filter(item => {
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
    return searchMatch && categoryMatch;
  });


  const submitReservation = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first to make a reservation.");
      setIsLoginOpen(true);
      return;
    }

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    const storageKey = `aura_user_data_${user}`;
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '{"orders": [], "reservations": []}');
    
    const newReservation = {
      name,
      date,
      time,
      guests
    };
    
    existingData.reservations.unshift(newReservation);
    localStorage.setItem(storageKey, JSON.stringify(existingData));

    e.target.reset();
    alert("Table reserved successfully! We look forward to hosting you.");
  }

  const submitContact = (e) => {
    e.preventDefault();
    e.target.reset();
    alert("Thank you for your message! We will get back to you shortly.");
  };

  const Home = () => (
    <main>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">A Symphony of Global Flavors</h1>
            <p className="hero-subtitle">
              Embark on a culinary journey across the world. At Aura, we unite the finest authentic cuisines under one roof, prepared by master chefs using exceptional ingredients.
            </p>
            <div className="hero-buttons">
              <a href="#reservation" className="btn-primary btn-solid">Book a Table</a>
              <a href="#menu" className="btn-primary">View Menu</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content glass-card">
            <div className="about-text">
              <h2 className="section-title">Our Story</h2>
              <p>
                Founded in 2010, Aura Dining began with a unified vision: to bring the world's most exquisite flavors under one roof. Our founders journeyed across continents, discovering authentic recipes and culinary secrets passed down through generations.
              </p>
              <p>
                Today, our Michelin-starred chefs continue this legacy, transforming exceptional ingredients into masterpieces of taste. At Aura, dining is not merely a meal; it is an immersive, multi-sensory experience designed to captivate and inspire.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years of<br/>Excellence</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">Global<br/>Cuisines</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Michelin<br/>Stars</span>
                </div>
              </div>
            </div>
            <div className="about-image-wrapper">
              <img src="/about-image.png" alt="Aura Dining Interior" className="about-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="menu-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {searchQuery ? 'Search Results' : 'Culinary Masterpieces'}
            </h2>
            <p className="section-subtitle">
              {searchQuery ? `Showing results for "${searchQuery}"` : 'Discover our signature dishes curated from the finest culinary traditions around the globe.'}
            </p>
          </div>

          {/* Category Filter */}
          {!searchQuery && (
            <div className="category-filter">
              {categories.map(category => (
                <button 
                  key={category} 
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          <div className="menu-grid">
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <div className="menu-card glass-card" key={item.id}>
                  <div className="cuisine-tag">{item.cuisine}</div>
                  <img src={item.img} alt={item.name} className="menu-img" />
                  <div className="dish-info">
                    <div className="dish-header">
                      <h3 className="dish-name">{item.name}</h3>
                      <span className="dish-price">{item.price}</span>
                    </div>
                    <p className="dish-desc">{item.desc}</p>
                    
                    {/* Add to Cart Actions */}
                    <div className="cart-actions">
                      <button 
                        className={`add-to-cart-btn ${addingItem === item.id ? 'added' : ''}`}
                        onClick={() => addToCart(item)}
                      >
                        {addingItem === item.id ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            Added!
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                <h3>No matches found</h3>
                <p>Try searching for a specific dish, cuisine or ingredient.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="reservation-section">
        <div className="container reservation-container">
          <div className="reservation-info">
            <h3>Reserve Your Experience</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Join us for an unforgettable dining experience. Whether it's an intimate dinner, a family gathering, or a corporate event, we ensure flawless service and exquisite taste.
            </p>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Opening Hours</h4>
                <p style={{ color: 'var(--text-muted)' }}>Mon - Sun<br/>5:00 PM - 11:30 PM</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Contact</h4>
                <p style={{ color: 'var(--text-muted)' }}>+1 (555) 123-4567<br/>reservations@auradining.com</p>
              </div>
            </div>
          </div>

          <div className="reservation-form glass-card">
            <form onSubmit={submitReservation}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" className="form-control" required placeholder="John Doe" />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <label htmlFor="date">Date</label>
                  <input type="date" id="date" className="form-control" required />
                </div>
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <label htmlFor="time">Time</label>
                  <input type="time" id="time" className="form-control" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="guests">Number of Guests</label>
                <select id="guests" className="form-control" required>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5+ People</option>
                </select>
              </div>
              <button type="submit" className="btn-primary btn-solid" style={{ width: '100%' }}>Confirm Reservation</button>
            </form>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="blog-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">React Chronicles</h2>
            <p className="section-subtitle">Deep dive into the world of React. From core concepts to advanced patterns, stay updated with the latest in the React ecosystem.</p>
          </div>
          <div className="blog-grid">
            {blogData.map((blog) => (
              <Link to={`/blog/${blog.slug}`} key={blog.id} className="blog-card glass-card" style={{ textDecoration: 'none' }}>
                <div className="blog-card-img-wrapper">
                  <div className="blog-category-tag">{blog.category}</div>
                  <img src={blog.image} alt={blog.title} className="blog-card-img" />
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span>{blog.date}</span>
                    <span className="dot">•</span>
                    <span>{blog.author}</span>
                  </div>
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <button className="read-more-btn">
                    Read Article
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container contact-container">
          <div className="contact-info">
            <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Get In Touch</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Have a question or special request? We are here to ensure your dining experience is nothing less than perfect. Reach out to us below.
            </p>
            <div className="contact-details">
              <div className="contact-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>contact@auradining.com</span>
              </div>
              <div className="contact-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>123 Culinary Blvd, NY 10001</span>
              </div>
            </div>
          </div>

          <div className="contact-form glass-card">
            <form onSubmit={submitContact}>
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input type="text" id="contact-name" className="form-control" required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input type="email" id="contact-email" className="form-control" required placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" className="form-control" required placeholder="How can we help you?" rows="4" style={{ resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" className="btn-primary btn-solid" style={{ width: '100%' }}>Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );

  return (
    <Router>
      <div className="app-container">
        <Helmet>
          <title>Aura Dining | Multi-Cuisine Luxury Restaurant in New York</title>
          <meta name="description" content="Experience flavors from around the world at Aura Dining. A luxury multi-cuisine restaurant located in Downtown New York offering authentic Italian, Japanese, Spanish, and more." />
        </Helmet>
        <Navbar 
          onLoginClick={() => setIsLoginOpen(true)} 
          user={user} 
          onLogout={handleLogout}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onBookingsClick={() => setIsBookingsOpen(true)}
        />
        
        {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />}
        
        <BookingsModal 
          isOpen={isBookingsOpen}
          onClose={() => setIsBookingsOpen(false)}
          user={user}
        />
        
        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart} 
          setCart={setCart}
          onCheckout={handleCheckoutClick}
        />

        <PaymentModal 
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          cartTotal={cartTotal}
          onPaymentSuccess={handlePaymentSuccess}
        />

        {/* Floating Cart Implementation */}
        {cart.length > 0 && (
          <div className="floating-cart" onClick={() => setIsCartOpen(true)}>
            <svg className="cart-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <div className="cart-badge" key={cart.length}>
              {cart.length}
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
        </Routes>

        <footer className="restaurant-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-col">
                <div className="logo" style={{ color: 'var(--primary)', fontFamily: 'Cinzel', fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 700 }}>
                  ❈ Aura Dining
                </div>
                <p>Elevating multi-cuisine dining to an art form. Experience flavors from around the world in an atmosphere of pure luxury.</p>
              </div>
              <div className="footer-col">
                <h4>Location</h4>
                <p>123 Culinary Boulevard</p>
                <p>Downtown District</p>
                <p>New York, NY 10001</p>
              </div>
              <div className="footer-col">
                <h4>Follow Us</h4>
                <p>Instagram</p>
                <p>Facebook</p>
                <p>Twitter</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Aura Dining. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

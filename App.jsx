import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  // page can be 'home', 'plants' or 'cart'
  const [page, setPage] = useState('home');

  if (page === 'plants') {
    return <ProductList onNavigate={setPage} />;
  }

  if (page === 'cart') {
    return <CartItem onNavigate={setPage} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p className="tagline">Where Green Meets Serenity</p>
        <button className="get-started-btn" onClick={() => setPage('plants')}>
          Get Started
        </button>
      </div>
      <AboutUs />
    </div>
  );
}

export default App;

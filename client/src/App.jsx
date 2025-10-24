import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import OfferCard from './components/OfferCard';
import './App.css';

function App() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/offers')
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((error) => console.error('Error fetching offers:', error));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <h1>Available Offers</h1>
        <div className="offers-container">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

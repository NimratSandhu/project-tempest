import React from 'react';
import './OfferCard.css';

const OfferCard = ({ offer }) => {
  return (
    <div className="offer-card">
      <h3 className="restaurant-name">{offer.restaurant_name}</h3>
      <p className="description">{offer.description}</p>
      <p className="expiration-date">Expires on: {offer.expiration_date}</p>
      {offer.active ? <span className="active">Active</span> : <span className="inactive">Inactive</span>}
    </div>
  );
};

export default OfferCard;

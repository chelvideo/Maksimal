import React from 'react';
import '../styles/EditCard.css';
import CardsBar from './CardsBar';
import Form from './Form';

function EditCard() {
  return (
    <div className="card-edit">
      <CardsBar />
      <Form />
    </div>
  );
}

export default EditCard;

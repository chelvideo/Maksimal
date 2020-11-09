import React from 'react';
import { connect } from 'react-redux';
import addCard from '../store/actionsCreators/addCard';
import iconCardClick from '../store/actionsCreators/iconCardClick';
import '../styles/CardsBar.css';
import cardIconBg from '../assets/card_icon.png';

const background = (color) => ({
  background: color,
});

function cardIcon(cards, cardClick) {
  return (
    cards.map((card) => (
      <div
        className="card-icon"
        style={background(cards[card.cardId].cardImg)}
        key={card.cardId}
        id={card.cardId}
        onClick={cardClick}
      >
        <img src={cardIconBg} alt="icon" width="40" />
      </div>
    ))
  );
}

function CardsBar(props) {
  const {
    activeCardId, cards, cardClick, addCard, isMaxCount,
  } = props;

  return (
    <div className="cards-bar">
      <div className="cards-bar__icon">
        { cardIcon(cards, cardClick, activeCardId) }
      </div>
      <button className="cards-bar__btn" onClick={addCard} disabled={isMaxCount}>+</button>
    </div>
  );
}

function mapStateToProps(store) {
  return {
    activeCardId: store.activeCardId,
    cards: store.cards,
    isMaxCount: store.isMaxCount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cardClick: (e) => {
      dispatch(iconCardClick({ activeCardId: e.currentTarget.id }));
    },
    addCard: () => {
      dispatch(addCard());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsBar);

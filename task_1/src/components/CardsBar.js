import React from 'react';
import { connect } from 'react-redux';
import addCard from '../store/actionsCreators/addCard';
import saveCard from '../store/actionsCreators/saveCard';
import iconCardClick from '../store/actionsCreators/iconCardClick';
import '../styles/CardsBar.css';

function cardIcon(cards, cardClick) {
    return (
        cards.map(card => { 
            return (
                <div 
                    className="card-icon"
                    key={card.cardId}
                    id={card.cardId}
                    onClick={cardClick}>
                </div>
            )
        })
    )
}

function CardsBar(props) {
    const {activeCardId, cards, cardClick, addCard, isMaxCount} = props;
    
    return (
        <div className="cards-bar">
            <div className="cards-bar__icon">
                { cardIcon(cards, cardClick) }
            </div>
            <button className="cards-bar__btn" onClick={addCard} disabled={isMaxCount}>+</button>
        </div> 
    );
}

function mapStateToProps(store) {
    return {
        cardsCount: store.cardsCount,
        activeCardId: store.activeCardId,
        cards: store.cards,
        isMaxCount: store.isMaxCount
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cardClick: (e) => {
            //console.log(e.target.id);
            dispatch(iconCardClick({activeCardId:e.target.id}))
        },
        addCard: () => {
            const formData =new FormData(document.forms.cardDetail);
            dispatch(addCard());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsBar)
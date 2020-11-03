import React from 'react';
import { connect } from 'react-redux';
import '../styles/PreviewCard.css';
//import img from '../assets/nfc.png';

function PreviewCard(props) {
    //console.log(props);
    const {cardsCount, activeCardId, cards} = props;
    
    return (
        <div className="card-preview">
           <div className="card-preview__front">
                <div className="first-line">
                    
                </div>
                <div className="second-line">
                    {cards[activeCardId].cardAccount}
                </div>
                <div className="third-line">
                    <div className="third-line__name">
                        {cards[activeCardId].cardName}
                    </div>
                    <div className="third-line__expiried">
                        {cards[activeCardId].cardExpiried}
                    </div>
                    <div className="third-line__logo">
                        
                    </div>
                </div>
           </div>
           <div className="card-preview__back">
               
            </div>
        </div>
    );
}

function mapStateToProps (store) {
    return {
        cardsCount: store.cardsCount,
        activeCardId: store.activeCardId,
        cards: store.cards
    }
}

export default connect(mapStateToProps, null)(PreviewCard)
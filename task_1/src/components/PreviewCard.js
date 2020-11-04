import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import '../styles/PreviewCard.css';
import chipImg from '../assets/chip.png';
import visaImg from '../assets/visa.png';
import nfcImg from '../assets/nfc.png';

const numberToStr = (str) => {
    return (
        <Fragment>
            <span>{str.slice(0,4)}</span>
            <span>{str.slice(4,8)}</span>
            <span>{str.slice(8,12)}</span>
            <span>{str.slice(12,16)}</span> 
        </Fragment>
    )
} 

function PreviewCard(props) {
    //console.log(props);
    const {cardsCount, activeCardId, cards} = props;
    
    return (
        <div className="card-preview">
            <div className="card-preview__front">
                <div className="first-line">
                    <img className="first-line__chip" src={chipImg}></img>
                    <img className="first-line__nfc" src={nfcImg}></img>
                </div>
                <div className="second-line">
                    {numberToStr(cards[activeCardId].cardNumber)}
                </div>
                <div className="third-line">
                    <div className="third-line__name">
                        {cards[activeCardId].cardName}
                    </div>
                    <div className="third-line__expiry">
                        {cards[activeCardId].cardExpiry}
                    </div>
                    <div className="third-line__logo">
                        <img className="third-line__logo-visa" src={visaImg}></img>
                    </div>
                </div>
            </div>
            <div className="card-preview__back">
                <div className="fourth-line">
                    <div className="fourth-line__label">CVV</div>
                    <div className="fourth-line__cvv"></div>
                </div>    
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
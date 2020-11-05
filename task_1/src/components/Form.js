import React from 'react';
import { connect } from 'react-redux';
import saveCard from '../store/actionsCreators/saveCard';
import '../styles/Form.css';

function Form(props) {
    const {activeCardId, cards, save} = props;
    console.log(cards[activeCardId].cardName);
    
    return (
        <div className="form">
            <h2 className="form__title">Card detail</h2>
            <form onSubmit = { save } name="cardDetail">
                <label className="form__label">Name of Card
                    <input className="input form__name" type="text" name="name" key={cards[activeCardId].cardId} defaultValue={cards[activeCardId].cardName}  autoComplete="off" />
                </label>
                <label className="form__label">Card Number
                    <input className="input form__number" type="text" name="number" key={cards[activeCardId].cardId} defaultValue={cards[activeCardId].cardNumber} autoComplete="off" />
                </label>
                <div className="form__line">
                    <label className="form__label">Expiry Date
                        <input className="input form__expiry" type="text" name="expiry" key={cards[activeCardId].cardId} defaultValue={cards[activeCardId].cardExpiry} autoComplete="off" />
                    </label>
                    <label className="form__label">CVV
                        <input className="input form__cvv" type="text" name="cvv" defaultValue="***" autoComplete="off" />
                    </label>
                </div>
                <div className="btn">
                    <button className="btn__save">Save</button>
                </div>
            </form>
        </div>
    );
}

function mapStateToProps(store) {
    return {
        cardsCount: store.cardsCount,
        activeCardId: store.activeCardId,
        cards: store.cards
    }
}

function mapDispatchToProps(dispatch ) {
    return {
        save: (e) => {
            e.preventDefault();
            const formData =new FormData(document.forms.cardDetail);

            const newCard = {
                cardName: formData.get("name"),
                cardNumber: formData.get("number"),
                cardExpiry: formData.get("expiry"),
                cardCVV: formData.get("cvv")
            };
            
            dispatch(saveCard({cards: newCard}))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
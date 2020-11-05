import React from 'react';
import { connect } from 'react-redux';
import saveCard from '../store/actionsCreators/saveCard';
import '../styles/Form.css';

function Form(props) {
    const {activeCardId, cards, save} = props;
    //console.log(cards[activeCardId].cardName);
    const expiryToStr = `${cards[activeCardId].cardExpiry.slice(0,2)}/${cards[activeCardId].cardExpiry.slice(2)}`;
    const numberPattern = '[0-9]{13,19}';
    const namePattern = '[A-Za-z- ]{1,}[- ]{1}[A-Za-z- ]{1,}';
    const expiryPattern = '[0-9]{2}[\/]{0,1}[0-9]{2}';
    const cvvPattern = '[0-9]{3,4}';
    
    return (
        <div className="form">
            <h2 className="form__title">Card detail</h2>
            <form onSubmit = { save } name="cardDetail">
                <label className="form__label">Name of Card
                    <input 
                        className="input form__name" 
                        type="text" name="name" 
                        key={cards[activeCardId].cardId} 
                        defaultValue={cards[activeCardId].cardName} 
                        autoComplete="off"
                        pattern={namePattern}
                        required />
                </label>
                <label className="form__label">Card Number
                    <input 
                        className="input form__number" 
                        type="text" 
                        name="number" 
                        key={cards[activeCardId].cardId} 
                        defaultValue={cards[activeCardId].cardNumber} 
                        autoComplete="off" 
                        pattern={numberPattern}
                        required />
                </label>
                <div className="form__line">
                    <label className="form__label">Expiry Date
                        <input className="input form__expiry" 
                            type="text" name="expiry" 
                            key={Math.random()} 
                            defaultValue={expiryToStr} 
                            autoComplete="off" 
                            pattern={expiryPattern}
                            required />
                    </label>
                    <label className="form__label">CVV
                        <input 
                            className="input form__cvv" 
                            type="password" 
                            name="cvv" 
                            defaultValue={cards[activeCardId].cardCVV}
                            autoComplete="off" 
                            pattern={cvvPattern}
                            required />
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
                cardExpiry: formData.get("expiry").replace(/\//g, ""),
                cardCVV: formData.get("cvv")
            };
            
            dispatch(saveCard({cards: newCard}))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
import React from 'react';
import { connect } from 'react-redux';
import saveCard from '../store/actionsCreators/saveCard';
import previewCard from '../store/actionsCreators/previewCard';
import '../styles/Form.css';
import checkLuhn from '../utils/utils';

function Form(props) {
    const {activeCardId, cards, save, preview, previewName, previewNumber, previewExpiry, previewCVV} = props;

    const numberPattern = '[0-9 ]{19,27}';
    const namePattern = '[A-Za-z- .]{1,}[- ]{1}[A-Za-z- .]{1,}';
    const expiryPattern = '[0-9]{2}[\/]{0,1}[0-9]{2}';
    const cvvPattern = '[0-9]{3,4}';

    const expiryToStr = () => {
        if (previewExpiry.length > 2) { 
            return `${previewExpiry.slice(0,2)}/${previewExpiry.slice(2)}`;
        } else {
            return (previewExpiry ? `${previewExpiry.slice(0,2)}` : '')
        }
    };

    const previewNumberToStr = () => {
        const res = previewNumber
                        .split('')
                        .reduce((prev, item, index) => {
                            if ((index+1) % 4 == 0) return prev = prev + item + '  '; 
                            return prev = prev + item; 
                        }, '');  
        return res.slice(-1)==' ' ? res.slice(0, -2) : res;
    }

    return (
        <div className="form">
            <h2 className="form__title">Card detail</h2>
            <form onSubmit = { save } name="cardDetail">
                <label className="form__label">Name of Card
                    <input 
                        className="input form__name" 
                        type="text" 
                        name="name"
                        onInput={preview} 
                        key={cards[activeCardId].cardId} 
                        value={previewName} 
                        autoComplete="off"
                        placeholder="***"
                        pattern={namePattern}
                        required />
                </label>
                <label className="form__label">Card Number
                    <input 
                        className="input form__number" 
                        type="text" 
                        name="number" 
                        onInput={preview} 
                        key={cards[activeCardId].cardId} 
                        value={previewNumberToStr()} 
                        autoComplete="off" 
                        placeholder="***"
                        pattern={numberPattern}
                        required />
                </label>
                <div className="form__line">
                    <label className="form__label">Expiry Date
                        <input className="input form__expiry" 
                            type="text" 
                            name="expiry" 
                            onInput={preview} 
                            value={expiryToStr()} 
                            autoComplete="off" 
                            placeholder="**/**"
                            pattern={expiryPattern}
                            required />
                    </label>
                    <label className="form__label">CVV
                        <input 
                            className="input form__cvv" 
                            type="password" 
                            name="cvv" 
                            onInput={preview} 
                            value={previewCVV}
                            autoComplete="off" 
                            placeholder="***"
                            pattern={cvvPattern}
                            required />
                    </label>
                </div>
                <div className="btn">
                    <button className="btn__save" type="submit">SAVE</button>
                </div>
            </form>
        </div>
    );
}

function mapStateToProps(store) {
    return {
        cardsCount: store.cardsCount,
        activeCardId: store.activeCardId,
        cards: store.cards,
        previewName: store.previewName,
        previewNumber: store.previewNumber,
        previewExpiry: store.previewExpiry,
        previewCVV: store.previewCVV,
    }
}

function mapDispatchToProps(dispatch ) {
    return {
        save: (e) => {
            e.preventDefault();
            const formData =new FormData(document.forms.cardDetail);
            const newCard = {
                cardName: formData.get("name"),
                cardNumber: formData.get("number").replace(/\ /g, ""),
                cardExpiry: formData.get("expiry").replace(/\//g, ""),
                cardCVV: formData.get("cvv")
            };
            dispatch(saveCard({cards: newCard}))
        },

        preview: (e) => {
            const formData =new FormData(document.forms.cardDetail);
            const inputNumber = document.querySelector('.form__number');
            const card = formData.get("number").replace(/\ /g, "");
            if (card.length>=13 && !checkLuhn(card)) {
                inputNumber.setCustomValidity("Not valid card!");
            } else {
                inputNumber.setCustomValidity("");
            }
            
            const newDetail = {
                previewName: formData.get("name"),
                previewNumber: formData.get("number").replace(/\ /g, ""),
                previewExpiry: formData.get("expiry").replace(/\//g, ""),
                previewCVV: formData.get("cvv")
            };
            dispatch(previewCard(newDetail))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
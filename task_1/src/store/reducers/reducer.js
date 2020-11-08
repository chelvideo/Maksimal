import {
  SAVE_CARD, ICON_CARD_CLICK, ADD_CARD, PREVIEW_CARD,
} from '../actions/actions';

// New card template
const cardDetailNew = (cardsCount) => ({
  cardId: cardsCount,
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCVV: '',
  cardImg: `#${(`${Math.random().toString(16)}000000`).substring(2, 8)}`,
});

function reducer(state, action) {
  const maxCardNumber = 6;

  switch (action.type) {
    case SAVE_CARD:
      const newCards = state.cards.slice();
      newCards[state.activeCardId] = action.cards;
      newCards[state.activeCardId].cardId = state.activeCardId;

      return {
        ...state,
        cards: newCards,
      };

    case ICON_CARD_CLICK:
      return {
        ...state,
        activeCardId: action.activeCardId,
        previewName: state.cards[action.activeCardId].cardName,
        previewNumber: state.cards[action.activeCardId].cardNumber,
        previewExpiry: state.cards[action.activeCardId].cardExpiry,
        previewCVV: state.cards[action.activeCardId].cardCVV,
      };

    case ADD_CARD:
      const newCardsAdd = state.cards.slice();
      newCardsAdd.push(cardDetailNew(state.cardsCount));
      return {
        ...state,
        cardsCount: state.cardsCount + 1,
        activeCardId: state.cardsCount,
        cards: newCardsAdd,
        isMaxCount: (state.cardsCount + 1 == maxCardNumber),
        previewName: '',
        previewNumber: '',
        previewExpiry: '',
        previewCVV: '',
      };

    case PREVIEW_CARD:
      let name = state.previewName;
      let number = state.previewNumber;
      let expiry = state.previewExpiry;
      let CVV = state.previewCVV;
      const lastNameChar = action.previewName.slice(-1).charCodeAt();
      const lastNumberChar = action.previewNumber.slice(-1).charCodeAt();
      const lastExpiryChar = action.previewExpiry.slice(-1).charCodeAt();
      const lastCVVChar = action.previewCVV.slice(-1).charCodeAt();
      if (!lastNameChar || ((lastNameChar >= 65 && lastNameChar <= 90) || (lastNameChar >= 97 && lastNameChar <= 122) || lastNameChar == 32 || lastNameChar == 46 || lastNameChar == 45)) name = action.previewName;
      if (!lastNumberChar || (lastNumberChar >= 48 && lastNumberChar <= 57)) number = action.previewNumber;
      if (!lastCVVChar || (lastCVVChar >= 48 && lastCVVChar <= 57)) CVV = action.previewCVV;
      if (!lastExpiryChar || (lastExpiryChar >= 47 && lastExpiryChar <= 57)) expiry = action.previewExpiry;

      return {
        ...state,
        previewName: name,
        previewNumber: number,
        previewExpiry: expiry,
        previewCVV: CVV,
      };

    default: return state;
  }
}

export default reducer;

function reducer(state, action) {
    //console.log(action);
    switch(action.type) {
        case 'SAVE_CARD': 
            const newCards = state.cards.slice();
            newCards[state.activeCardId] = action.cards;
            newCards[state.activeCardId].cardId = state.activeCardId;

            return {
                ...state,
                cards:  newCards
            };

        case 'ICON_CARD_CLICK': 
            return {
                ...state,
                activeCardId: action.activeCardId,
            };

        case 'ADD_CARD':
            const newCardsAdd = state.cards.slice();
            newCardsAdd.push({
                cardId: state.cardsCount,
                cardName: 'Donald Trump',
                cardNumber: '1111222233334444',
                cardExpiry: '0122',
                cardCVV: '111'
            })

            return {
                ...state,
                cardsCount: state.cardsCount + 1,
                activeCardId: state.cardsCount,
                cards:  newCardsAdd,
                isMaxCount: (state.cardsCount + 1 == 6) ? true : false,
            };
        
        default: return state;
    }
}

export default reducer;
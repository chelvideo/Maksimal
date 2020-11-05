function reducer(state, action) {
    //console.log(action);
    switch(action.type) {
        case 'SAVE_CARD': 
            const newCards = state.cards;
            newCards[state.activeCardId] = action.cards;
            newCards[state.activeCardId].cardId = state.activeCardId;
            console.log(newCards);

            return {
                ...state,
                cards:  newCards
            };

        case 'ICON_CARD_CLICK': 
            return {
                ...state,
                activeCardId: action.activeCardId,
            };
        
        default: return state;
    }
}

export default reducer;
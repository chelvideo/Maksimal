function reducer(state, action) {
    //console.log(state);
    switch(action.type) {
        case 'SAVE_CARD': 
            return {
                ...state,
                activeCardId: action.activeCardId,
                cards:  action.cards
            };
        
        default: return state;
    }
}

export default reducer;
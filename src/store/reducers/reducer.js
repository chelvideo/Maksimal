function reducer(state, action) {
    console.log(state);
    switch(action.type) {
        case 'SAVE_CARD': 
            return {
                ...state,
                cardsName:  action.cardsName
            };
        
        default: return state;
    }
}

export default reducer;
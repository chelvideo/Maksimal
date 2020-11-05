import {ICON_CARD_CLICK} from '../actions/actions';

function iconCardClick(card) {
    //console.log(card);
    return { 
        type: ICON_CARD_CLICK, 
        activeCardId: card.activeCardId,
    }
}

export default iconCardClick;
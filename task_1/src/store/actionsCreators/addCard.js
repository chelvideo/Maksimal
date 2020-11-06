import {ADD_CARD} from '../actions/actions';

function addCard(cardDetail) {
    return { 
        type: ADD_CARD, 
    }
}

export default addCard;
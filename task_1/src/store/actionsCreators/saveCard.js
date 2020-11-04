import SAVE_CARD from '../actions/actions';

function saveCard(cardDetail) {
    //console.log(cardDetail);
    return { 
        type: SAVE_CARD, 
        activeCardId: cardDetail.activeCardId,
        cards: cardDetail.cards,
    }
}

export default saveCard;
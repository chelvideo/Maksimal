import SAVE_CARD from '../actions/actions';

function saveCard(cardDetail) {
    console.log(cardDetail);
    return { 
        type: SAVE_CARD, 
        cardsName: cardDetail.name,
        cardsAccount: cardDetail.Account,
        cardsExpiried: cardDetail.Expiried,
        cardsCVV: cardDetail.CVV
    }
}

export default saveCard;
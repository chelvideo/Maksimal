import { SAVE_CARD } from '../actions/actions';

function saveCard(cardDetail) {
  return {
    type: SAVE_CARD,
    cards: cardDetail.cards,
  };
}

export default saveCard;

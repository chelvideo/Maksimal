import {PREVIEW_CARD} from '../actions/actions';

function previewCard(cardDetail) {
    return { 
        type: PREVIEW_CARD, 
        previewName: cardDetail.previewName,
        previewNumber: cardDetail.previewNumber,
        previewExpiry: cardDetail.previewExpiry,
        previewCVV: cardDetail.previewCVV,
    }
}

export default previewCard;
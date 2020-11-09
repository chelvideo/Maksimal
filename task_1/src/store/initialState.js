const initialState = {
  cardsCount: 1,
  isMaxCount: false,
  activeCardId: 0,
  cards: [
    {
      cardId: 0,
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: '',
      cardImg: '#fd435b',
    },
  ],
  previewName: '',
  previewNumber: '',
  previewExpiry: '',
  previewCVV: '',
};

export default initialState;

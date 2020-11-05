const initialState = {
    cardsCount: 3,
    isMaxCount: false,
    activeCardId: 0,
    cards: [
        {
            cardId: 0,
            cardName: 'Ivan Ivanov',
            cardNumber: '424242424242424242',
            cardExpiry: '0422',
            cardCVV: '111'
        },
        {
            cardId: 1,
            cardName: 'John Smith',
            cardNumber: '1111222233334444',
            cardExpiry: '0125',
            cardCVV: '111'
        },
        {
            cardId: 2,
            cardName: 'V Putin',
            cardNumber: '0000000000000000',
            cardExpiry: '0422',
            cardCVV: '111'
        }
    ]
};

export default initialState;
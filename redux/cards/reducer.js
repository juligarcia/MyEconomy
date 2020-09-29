const initialState = {
  myCards: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return ({
        ...state,
        myCards: [...state.myCards, action.card]
      }); 
    case 'ADDING_CARD':
      return ({
        ...state,
        addingCard: action.addingCard
      });
    case 'ADD_PAYMENT':
      return ({
        ...state,
        myCards: state.myCards.map(card => (
          card.key === action.key ? { ...card, payments: [...card.payments, action.payment] } : card
        ))
      });
    case 'UPDATE_PAYMENT_ID':
      return ({
        ...state,
        myCards: state.myCards.map(card => (
          card.key === action.key ? {...card, nextPaymentId: action.nextId} : card
        ))
      });
    default:
      return state;
  }
}

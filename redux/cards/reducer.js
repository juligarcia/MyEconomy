const initialState = {
  myCards: [],
  nextKey: 0,
  creatingPayment: false,
  loadingCardsLoading: false,
  addingCard: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_CARD':
      return ({
        ...state,
        myCards: state.myCards.filter(card => card.key !== action.key)
      });
    case 'INC_KEY':
      return ({
        ...state,
        nextKey: state.nextKey + 1
      })
    case 'LOAD_CARDS':
      return ({
        ...state,
        ...action.cardInfo
      }); 
    case 'STORE_CARDS_LOADING':
      return ({
        ...state,
        storeCardsLoading: true
      });
    case 'STORE_CARDS_FINISHED':
      return ({
        ...state,
        storeCardsLoading: false
      });
    case 'LOAD_CARDS_LOADED':
      return ({
        ...state,
        loadCardsLoading: false
      });
    case 'LOAD_CARDS_LOADING':
      return ({
        ...state,
        loadCardsLoading: true
      });
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
    case 'CREATING_PAYMENT':
      return ({
        ...state,
        creatingPayment: action.creatingPayment
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

export const addCard = card => ({
  type: 'ADD_CARD',
  card
});

export const incKey = () => ({
  type: 'INC_KEY'
});

export const addingCard = value => ({
  type: 'ADDING_CARD',
  addingCard: value
});

export const creatingPayment = value => ({
  type: 'CREATING_PAYMENT',
  creatingPayment: value
});

export const addPayment = (payment, key) => ({
  type: 'ADD_PAYMENT',
  payment,
  key
});

export const updateNextPaymentId = (nextId, key) => ({
  type: 'UPDATE_PAYMENT_ID',
  nextId,
  key
});

export const storeCardsLoading = () => ({
  type: 'STORE_CARDS_LOADING'
});

export const storeCardsFinished = () => ({
  type: 'STORE_CARDS_FINISHED'
});

export const loadCardsLoading = () => ({
  type: 'LOAD_CARDS_LOADING'
});

export const loadCardsLoaded = () => ({
  type: 'LOAD_CARDS_LOADED'
});

export const loadCards = cardInfo => ({
  type: 'LOAD_CARDS',
  cardInfo
});

export const deleteCard = key => ({
  type: 'DELETE_CARD',
  key
});

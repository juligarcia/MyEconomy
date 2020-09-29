export const addCard = card => ({
  type: 'ADD_CARD',
  card
});

export const addingCard = value => ({
  type: 'ADDING_CARD',
  addingCard: value
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
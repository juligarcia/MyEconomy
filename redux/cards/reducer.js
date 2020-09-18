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
      return({
        ...state,
        addingCard: action.addingCard
      });
    default:
      return state;
  }
}

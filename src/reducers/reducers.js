const initialState = {
    numbers: [],
    currentQuestion: 0,
  };
  
  const abacusReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NUMBERS':
        return { ...state, numbers: action.payload };
      case 'NEXT_QUESTION':
        return { ...state, currentQuestion: state.currentQuestion + 1 };
      default:
        return state;
    }
  };
  
  export default abacusReducer;
  
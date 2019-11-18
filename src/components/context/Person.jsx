import React, { useReducer } from 'react';

export const PersonContext = React.createContext();

export const PERSON_UPDATE_WALLET = 'person_update_wallet';

// Create our auth initial state
const PersonInitialState = {
  wallet: []
};

// Handle dispatched actions
function PersonReducer(state, action) {
  switch (action.type) {
    case PERSON_UPDATE_WALLET:
      // Merge new notes into currently held notes
      return {
        ...state,
        wallet: [...state.wallet, ...action.payload]
      };
    default:
      return state;
  }
}

export function PersonContextProvider({ children }) {
  const [state, dispatch] = useReducer(PersonReducer, PersonInitialState);
  const { wallet } = state;

  // Calculate total money in atm
  const getWalletTotal = () => {
    // Reducer for accumlating notes in wallet
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.value * currentValue.stock;
    // How much is in our wallet
    return wallet.reduce(reducer, 0);
  };

  return (
    <PersonContext.Provider value={{ state, dispatch, getWalletTotal }}>
      {children}
    </PersonContext.Provider>
  );
}

export default {
  PersonContextProvider,
  PersonContext,
  PERSON_UPDATE_WALLET
};

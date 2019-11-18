import React, { useReducer } from 'react';
import { withdraw } from 'helper/Atm';

export const AtmContext = React.createContext();

export const ATM_INVENTORY_UPDATE = 'atm_inventory_update';

const AtmInitialState = {
  name: 'ScreenCloud Bank .Ltd',
  currency: '£',
  inventory: [
    { value: 5, stock: 4 },
    { value: 10, stock: 15 },
    { value: 20, stock: 7 }
  ]
};

function AtmReducer(state, action) {
  switch (action.type) {
    case ATM_INVENTORY_UPDATE:
      return {
        ...state,
        inventory: action.payload
      };
    default:
      return state;
  }
}

export function AtmContextProvider({ children }) {
  const [state, dispatch] = useReducer(AtmReducer, AtmInitialState);
  const { inventory } = state;

  // Calculate total money in atm
  const getATMTotal = () => {
    const reducer = (value, item) => item.value * item.stock + value;
    // Return atm total
    return inventory.reduce(reducer, 0);
  };

  // TODO:: Check if notes are available to do withdrawal
  const isValidWithdrawal = (value, userBalance) => {
    // Return if value is null
    if (value === null) return 'Invalid amount selected.';

    const amount = parseInt(value, 10);
    const atmTotal = getATMTotal();

    // Stop if amount is zero
    if (amount === 0) return 'Invalid amount selected.';

    // If user does not have sufficient funds
    if (amount > userBalance) return 'Insufficent funds for transaction.';

    // ATM does not have sufficient funds
    if (amount > atmTotal) return 'ATM does not have enough money for transaction.';

    // If ATM cannot find a combination for the withdrawal
    if (withdraw(inventory, amount) === false) return 'ATM cannot process this withdrawal amount.';

    return true;
  };

  return (
    <AtmContext.Provider value={{ state, dispatch, getATMTotal, isValidWithdrawal }}>
      {children}
    </AtmContext.Provider>
  );
}

export default {
  AtmContextProvider,
  AtmContext,
  ATM_INVENTORY_UPDATE
};

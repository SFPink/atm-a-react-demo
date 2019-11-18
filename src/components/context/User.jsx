import React, { useReducer } from 'react';

export const UserContext = React.createContext();

// Create types that can be used to dispatch else where in the app.
export const USER_SET = 'user_set';
export const USER_UPDATE_BALANCE = 'user_update_balance';

// Create our auth initial state
const UserInitialState = {
  account: null,
  overdrawLimit: 100
};

// Handle dispatched actions
function UserReducer(state, action) {
  switch (action.type) {
    case USER_SET:
      return {
        ...state,
        account: action.payload
      };
    case USER_UPDATE_BALANCE:
      return {
        ...state,
        account: {
          ...state.account,
          currentBalance: action.payload
        }
      };
    default:
      return state;
  }
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, UserInitialState);
  const { overdrawLimit, account } = state;

  const getUserAvailableFunds = () => {
    return overdrawLimit + account.currentBalance;
  };

  return (
    <UserContext.Provider value={{ state, dispatch, getUserAvailableFunds }}>
      {children}
    </UserContext.Provider>
  );
}

export default {
  UserContextProvider,
  UserContext,
  USER_SET,
  USER_UPDATE_BALANCE
};

import React, { useReducer } from 'react';

export const AuthContext = React.createContext();

// Create types that can be used to dispatch else where in the app.
export const LOGIN_FETCHING = 'login_request_fetch';
export const LOGIN_FETCH_SUCCESS = 'login_request_success';
export const LOGIN_FETCH_FAILURE = 'login_request_fetch_failure';

// Create our auth initial state
const AuthInitialState = {
  isFetching: false,
  isAuthenticated: false,
  error: null
};

// Handle dispatched actions
function AuthReducer(state, action) {
  switch (action.type) {
    case LOGIN_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case LOGIN_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true
      };
    case LOGIN_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, AuthInitialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}

export default {
  AuthContextProvider,
  AuthContext,
  LOGIN_FETCHING,
  LOGIN_FETCH_SUCCESS,
  LOGIN_FETCH_FAILURE
};

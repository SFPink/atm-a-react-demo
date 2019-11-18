import React, { useState, useContext, useEffect, Fragment } from 'react';

import {
  AuthContext,
  LOGIN_FETCHING,
  LOGIN_FETCH_SUCCESS,
  LOGIN_FETCH_FAILURE
} from 'context/Auth';

import { UserContext, USER_SET } from 'context/User';

import { useHistory } from 'react-router-dom';

import NumKeypad from 'common/keypad/NumKeypad';
import Error from 'common/error/Error';
import Loading from 'common/loading/Loading';
import getAccount from 'requests/GetAccount';

// Helper function to create obfuscated string
function pinDisplay(value) {
  const padded = (value ? value : '').padEnd(4, '-');
  const chars = padded.split('');
  return chars.map((x, i) => <span key={i}>{x === '-' ? '-' : '*'}</span>);
}

export default function Login() {
  // Get dispatch from context
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  // Get history from router
  const history = useHistory();

  // If the user has been authenticated redirect to account page
  useEffect(() => {
    if (authState.isAuthenticated) {
      history.push('/account');
    }
  }, [authState]);

  // Store entered PIN
  const [userInput, setUserInput] = useState('');

  // Append clicked values onto input string
  const handleOnClick = function handleOnClick(value) {
    const input = `${userInput || ''}${value}`;

    if (input.length <= 4) setUserInput(input);
  };

  // Click current input string
  const handleOnClear = function handleOnClear() {
    setUserInput(null);
  };

  // Send input string to auth endpoint
  const handleOnEnter = function handleOnEnter() {
    // Begin fetch
    authDispatch({ type: LOGIN_FETCHING });

    // Let's slow this down a little
    setTimeout(() => {
      getAccount(userInput).then(
        response => {
          // Set current account
          authDispatch({ type: LOGIN_FETCH_SUCCESS, payload: response.data });
          userDispatch({ type: USER_SET, payload: response.data });
        },
        error => {
          const { data } = error.response;
          // Clear entered PIN
          setUserInput(null);
          // Set fetch error
          authDispatch({ type: LOGIN_FETCH_FAILURE, payload: data.error });
        }
      );
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-center">Enter Pin</h2>

      {authState.isFetching ? (
        <Loading />
      ) : (
        <div>
          {authState.error && <Error error={authState.error} />}
          <p className="pin">{pinDisplay(userInput)}</p>
        </div>
      )}

      <NumKeypad onClick={handleOnClick} onClear={handleOnClear} onEnter={handleOnEnter} />
    </div>
  );
}

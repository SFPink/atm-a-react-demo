import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AtmContext } from 'context/Atm';
import { UserContext } from 'context/User';

import AmountKeypad from 'common/keypad/AmountKeypad';
import KeypadButton from 'common/keypad/KeypadButton';
import NumKeypad from 'common/keypad/NumKeypad';
import KeypadRow from 'common/keypad/KeypadRow';
import Error from 'common/error/Error';
import Amount from 'common/Amount';

import './Withdraw.scss';

export default function Withdraw() {
  const { isValidWithdrawal } = useContext(AtmContext);
  const { getUserAvailableFunds } = useContext(UserContext);

  // Store entered amount
  const [userInput, setUserInput] = useState('');
  const [showPreset, setPreset] = useState(true);
  const [error, setError] = useState(null);

  // Get history from router
  const history = useHistory();

  // On amount select go to confirmation
  const handleAmountSelect = value => {
    setUserInput(value);
  };

  // On input store value
  const handleOnClick = value => {
    const input = `${userInput || ''}${value}`;
    setUserInput(input);
  };

  // Click current input string
  const handleOnClear = () => {
    setUserInput(null);
  };

  // Redirect user back to account on cancel
  const handleOnCancel = () => {
    history.push('/account');
  };

  // Send input to confirmation screen
  const handleOnWithdraw = () => {
    // Is request valid?
    const validate = isValidWithdrawal(userInput, getUserAvailableFunds());

    if (validate === true) {
      history.push({ pathname: '/withdraw/confirm', state: { amount: userInput } });
    } else {
      // Set returned validation error
      setError(validate);
    }
  };

  const onOtherClick = () => {
    // Clear value on keypad change
    setUserInput(null);
    setPreset(!showPreset);
  };

  return (
    <div>
      <h2 className="text-center">Select an amount.</h2>

      <Error error={error} />

      <h4 className="amount text-center mb-4">
        <Amount amount={userInput} />
      </h4>

      {showPreset ? (
        <AmountKeypad onClick={handleAmountSelect} />
      ) : (
        <NumKeypad onClick={handleOnClick} onClear={handleOnClear} onEnter={handleOnWithdraw} />
      )}
      <KeypadRow className="withdraw-options">
        <KeypadButton onClick={handleOnCancel} className="cancel">
          Cancel
        </KeypadButton>
        <KeypadButton onClick={onOtherClick} className="type-toggle">
          {!showPreset ? 'Preset' : 'Other'}
        </KeypadButton>
        <KeypadButton onClick={handleOnWithdraw} className="withdraw">
          Withdraw
        </KeypadButton>
      </KeypadRow>
    </div>
  );
}

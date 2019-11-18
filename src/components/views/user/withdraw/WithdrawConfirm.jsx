import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext, USER_UPDATE_BALANCE } from 'context/User';
import { AtmContext, ATM_INVENTORY_UPDATE } from 'context/Atm';

import Error from 'common/error/Error';
import Amount from 'common/Amount';
import KeypadRow from 'common/keypad/KeypadRow';
import KeypadButton from 'common/keypad/KeypadButton';

import { doWithdrawal } from 'helper/Atm';

export default function WithdrawConfirm({ location }) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: atmState, dispatch: atmDispatch } = useContext(AtmContext);
  const { account } = userState;
  const { inventory } = atmState;

  // Get history from router
  const history = useHistory();
  const { amount } = location.state;

  // Parse amount to ensure it's a number
  const withdrawAmount = parseInt(amount, 10);
  // Calc new balance
  const newBalance = account.currentBalance - withdrawAmount;
  // Check if user will overdraw
  const willOverdraw = newBalance < 0;

  // On confirm redirect back to account
  const handleConfirm = function handleOnClick(type) {
    const { withdrawal, inventory: newInventory } = doWithdrawal(inventory, amount, type);

    // Set users new balance
    userDispatch({ type: USER_UPDATE_BALANCE, payload: newBalance });
    // Update ATM inventory
    atmDispatch({ type: ATM_INVENTORY_UPDATE, payload: newInventory });
    // Redirect to success
    history.push({ pathname: '/withdraw/success', state: { withdrawal } });
  };

  // On cancel redirect to withdraw view
  const handleCancel = function handleOnClick() {
    history.push('/withdraw');
  };

  return (
    <div>
      <h5 className="text-center mb-4">
        {willOverdraw && (
          <Error className="mb-4" error="Account will be overdrawn if you proceed!" />
        )}
        You have selected to withdraw <Amount amount={amount} />. <br />
        <br />
        How would you like the notes distributed?
      </h5>
      <KeypadRow className="withdraw-options">
        <KeypadButton onClick={() => handleConfirm('min')} className="confirm">
          Minimum
        </KeypadButton>
        <KeypadButton onClick={() => handleConfirm('max')} className="confirm">
          Maximum
        </KeypadButton>
        <KeypadButton onClick={() => handleConfirm()} className="confirm">
          Evenly Distributed
        </KeypadButton>
      </KeypadRow>
      <KeypadRow className="withdraw-options">
        <KeypadButton onClick={handleCancel} className="cancel">
          Cancel Transaction
        </KeypadButton>
      </KeypadRow>
    </div>
  );
}

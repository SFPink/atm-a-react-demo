import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Banknote from 'common/banknote/Banknote';

import { PersonContext, PERSON_UPDATE_WALLET } from 'context/Person';

function Dispenser({ dispense = [] }) {
  const { dispatch } = useContext(PersonContext);

  const [tookMoney, setTookMoney] = useState(false);

  // Get history from router
  const history = useHistory();

  const updateWallet = () => {
    // Update notes in the wallet
    dispatch({ type: PERSON_UPDATE_WALLET, payload: dispense });
    // Make money disappear
    setTookMoney(true);
    // Redirect back to account
    history.push('/account');
  };

  // Used to offset notes position
  let calcTop = 0;

  // Create a flat array for displaying the money to be withdrawn
  const toDisplay = [];
  dispense.map(({ value, stock }, index) => {
    for (let i = 1; i <= stock; i++) {
      toDisplay.push(value);
    }
  });

  return (
    <div
      role="button"
      onClick={() => {
        updateWallet();
      }}
      className="dispenser"
      title="Click here to take your money"
    >
      {!tookMoney &&
        toDisplay.map((value, index) => {
          if (index > 0) calcTop += 35;
          else calcTop += 10;

          return <Banknote style={{ top: `${calcTop}px` }} key={index} value={value} />;
        })}
    </div>
  );
}

export default function WithdrawSuccess({ location }) {
  // Get history from router
  const { withdrawal } = location.state;

  return (
    <div>
      <h5 className="text-center mb-4">Please collect your money from the dispenser.</h5>
      <Dispenser dispense={withdrawal} />
    </div>
  );
}

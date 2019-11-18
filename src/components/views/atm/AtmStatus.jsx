import React, { Fragment, useContext } from 'react';
import { AtmContext } from 'context/Atm';

import Error from 'common/error/Error';
import Amount from 'common/Amount';

export default function AtmStatus() {
  const { state } = useContext(AtmContext);
  const { inventory } = state;

  // Get notes with 0 stock
  const errors = inventory.filter(({ stock }) => {
    return stock === 0;
  });

  const errorCount = errors.length;

  // Return false if atm has no errors
  if (errorCount === 0) return false;

  const outOfStock = errors.map(({ value }, index) => {
    let separator = '';
    const currentPos = index + 1;

    // Work out element separator i.e 10, 20 & 50
    if (errorCount > 0 && currentPos !== errorCount) {
      separator = currentPos === errorCount - 1 ? ' & ' : ', ';
    }

    return (
      <Fragment key={index}>
        <Amount amount={value} />
        {separator}
      </Fragment>
    );
  });

  // Check if ATM has no money
  const outOfOrder = errorCount === inventory.length;

  return (
    <div className="atm-status">
      {outOfOrder && <Error error="Out Of Order!" />}
      <Error error={<span>ATM is out of {outOfStock} notes</span>} />
    </div>
  );
}

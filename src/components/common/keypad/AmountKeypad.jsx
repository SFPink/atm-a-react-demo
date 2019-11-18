import React from 'react';
import PropTypes from 'prop-types';
import { chunkArray } from 'helper/Array';
import Amount from 'common/Amount';

import KeypadButton from './KeypadButton';
import KeypadRow from './KeypadRow';

import './Keypad.scss';

export default function AmountKeypad({ onClick }) {
  // Create preset buttons array
  const buttons = ['10', '20', '30', '40', '50', '60', '100', '150', '200'];

  // Use helper to split preset array into chunks of 3
  const chunks = chunkArray(buttons, 3);

  return (
    <div className="keypad">
      {chunks.map((row, rowIndex) => {
        return (
          <KeypadRow key={`row_${rowIndex}`}>
            {row.map((value, btnIndex) => {
              return (
                <KeypadButton
                  key={`button_${rowIndex}_${btnIndex}`}
                  onClick={onClick}
                  className="col"
                  value={value}
                >
                  <Amount amount={value} />
                </KeypadButton>
              );
            })}
          </KeypadRow>
        );
      })}
    </div>
  );
}

AmountKeypad.propTypes = {
  onClick: PropTypes.func
};

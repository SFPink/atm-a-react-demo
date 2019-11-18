import React from 'react';
import PropTypes from 'prop-types';

import { chunkArray } from 'helper/Array';
import KeypadButton from './KeypadButton';
import KeypadRow from './KeypadRow';

import './Keypad.scss';

export default function NumKeypad({ onClick, onEnter, onClear }) {
  // Create array for numbers 1-9
  const buttons = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];

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
                  {value}
                </KeypadButton>
              );
            })}
          </KeypadRow>
        );
      })}
      <KeypadRow>
        <KeypadButton onClick={onClear} className="col s4" value="clear">
          Clear
        </KeypadButton>
        <KeypadButton onClick={onClick} className="col s4" value={0}>
          0
        </KeypadButton>
        <KeypadButton onClick={onEnter} className="col s4" value="ok">
          OK
        </KeypadButton>
      </KeypadRow>
    </div>
  );
}

NumKeypad.propTypes = {
  onClear: PropTypes.func,
  onClick: PropTypes.func,
  onEnter: PropTypes.func
};

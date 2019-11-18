import React from 'react';
import PropTypes from 'prop-types';

export default function KeypadButton({ value, children, onClick = null, className = '' }) {
  return (
    <button type="button" className={`keypad-button ${className}`} onClick={() => onClick(value)}>
      {children}
    </button>
  );
}

KeypadButton.propTypes = {
  title: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onClick: PropTypes.func
};

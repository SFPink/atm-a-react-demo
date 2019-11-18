import React from 'react';
import PropTypes from 'prop-types';

export default function KeypadRow({ children, className = '' }) {
  return <div className={`keypad-row ${className}`}>{children}</div>;
}

KeypadRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

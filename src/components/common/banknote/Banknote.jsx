import React from 'react';
import PropTypes from 'prop-types';

import './Banknote.scss';

import five from './notes/5.jpg';
import ten from './notes/10.jpg';
import twenty from './notes/20.jpg';

export default function Banknote({ value, style }) {
  let image = null;

  // Get image based on value
  switch (value) {
    case 5:
      image = five;
      break;
    case 10:
      image = ten;
      break;
    case 20:
      image = twenty;
      break;
    default:
      break;
  }

  return (
    <div className="banknote" style={style}>
      <img src={image} alt="Banknote" />
    </div>
  );
}

Banknote.defaultProps = {
  style: {}
};

Banknote.propTypes = {
  value: PropTypes.number.isRequired,
  style: PropTypes.object
};

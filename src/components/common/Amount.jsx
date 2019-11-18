import React from 'react';
import Currency from 'common/Currency';
import PropTypes from 'prop-types';

export default function Amount({ amount }) {
  return (
    <span className={`amount ${amount < 0 ? 'text-danger' : ''}`}>
      <Currency />
      {amount ? amount : '0'}
    </span>
  );
}

Amount.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

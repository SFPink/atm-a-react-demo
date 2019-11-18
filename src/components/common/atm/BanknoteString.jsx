import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Amount from 'common/Amount';

// Create a string separated by comma or & from an array
export default function BanknoteString({ list, strSeparator, strLastJoin }) {
  const count = list.length;
  // Return false if array is empty
  if (count === 0) return false;

  return list.map(({ value }, index) => {
    let separator = '';
    const currentPos = index + 1;

    // Work out element separator i.e 10, 20 & 50
    if (count > 0 && currentPos !== count) {
      separator = currentPos === count - 1 ? strLastJoin : strSeparator;
    }

    return (
      <Fragment key={index}>
        <Amount amount={value} />
        {separator}
      </Fragment>
    );
  });
}

BanknoteString.defaultProps = {
  list: [],
  strSeparator: ', ',
  strLastJoin: ' & '
};

BanknoteString.propTypes = {
  strSeparator: PropTypes.string,
  strLastJoin: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      stock: PropTypes.number
    })
  ).isRequired
};

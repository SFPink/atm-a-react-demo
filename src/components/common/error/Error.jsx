import React from 'react';
import PropTypes from 'prop-types';

import './Error.scss';

export default function Error({ error, className }) {
  return error && <p className={`error-message ${className}`}>{error}</p>;
}

Error.propTypes = {
  error: PropTypes.node,
  className: PropTypes.string
};

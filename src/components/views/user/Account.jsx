import React from 'react';
import { Link } from 'react-router-dom';

import Balance from './Balance';

export default function Account() {
  return (
    <div>
      <h2 className="text-center">Welcome back</h2>

      <div className="mt-3 row">
        <div className="col-12 text-center large-balance">
          <Balance />
        </div>
      </div>

      <div className="mt-5 text-center">
        <h6>What would you like to do today?</h6>
        <Link to="/withdraw">Withdraw</Link>
      </div>
    </div>
  );
}

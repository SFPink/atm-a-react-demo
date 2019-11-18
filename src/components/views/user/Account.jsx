import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from 'context/User';

import Error from 'common/error/Error';

import Balance from './Balance';
import Amount from 'common/Amount';

export default function Account() {
  const { state, getUserAvailableFunds } = useContext(UserContext);
  const { account } = state;

  const available = getUserAvailableFunds();
  const isOverdrawn = account.currentBalance < 0;

  return (
    <div>
      <h2 className="text-center mb-3 ">Welcome back</h2>

      {isOverdrawn && (
        <div className="row">
          <div className="col-12 text-center large-balance">
            <Error
              error={
                available === 0 ? (
                  <span>Account is overdraw limit has been reached.</span>
                ) : (
                  <span>
                    Account is currently overdrawn. <br />
                    Available funds <Amount amount={available} />
                  </span>
                )
              }
            />
          </div>
        </div>
      )}

      <div className="row">
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

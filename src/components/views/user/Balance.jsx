import React from 'react';

import { UserContext } from 'context/User';
import Amount from 'common/Amount';

import './Balance.scss';

export default function Balance() {
  return (
    <UserContext.Consumer>
      {context => {
        const {
          state: { account, overdrawLimit }
        } = context;
        return (
          <div>
            <span className="balance">
              <Amount amount={account ? account.currentBalance : 0} />
            </span>
            Balance
          </div>
        );
      }}
    </UserContext.Consumer>
  );
}

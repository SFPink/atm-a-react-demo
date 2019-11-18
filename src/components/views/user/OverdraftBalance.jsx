import React from 'react';

import { UserContext } from 'context/User';
import Amount from 'common/Amount';

export default function OverdraftBalance() {
  return (
    <UserContext.Consumer>
      {context => {
        const {
          state: { account, overdrawLimit }
        } = context;
        return (
          <span className="balance">
            <Amount amount={100} />
          </span>
        );
      }}
    </UserContext.Consumer>
  );
}

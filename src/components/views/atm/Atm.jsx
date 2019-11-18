import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AtmHeader from './AtmHeader';
import AtmStatus from './AtmStatus';
import AuthRoute from 'common/auth/AuthRoute';

import { AuthContext } from 'context/Auth';

import Error from 'views/error/Error';
import Login from 'views/auth/Login';
import Account from 'views/user/Account';
import Withdraw from 'views/user/withdraw/Withdraw';
import WithdrawConfirm from 'views/user/withdraw/WithdrawConfirm';
import WithdrawSuccess from 'views/user/withdraw/WithdrawSuccess';

import './Atm.scss';

export default function Screen() {
  // Create switch statement to handle our public and protected views
  return (
    <AuthContext.Consumer>
      {context => {
        const { state } = context;
        return (
          <div className="atm grey lighten-5">
            <AtmHeader />
            <AtmStatus />
            <div className="atm-content">
              <Switch>
                <Route exact path="/">
                  <Login />
                </Route>
                <AuthRoute
                  isAuthenticated={state.isAuthenticated}
                  exact
                  path="/account"
                  component={Account}
                />
                <AuthRoute
                  isAuthenticated={state.isAuthenticated}
                  exact
                  path="/withdraw"
                  component={Withdraw}
                />
                <AuthRoute
                  isAuthenticated={state.isAuthenticated}
                  exact
                  path="/withdraw/confirm"
                  component={WithdrawConfirm}
                />
                <AuthRoute
                  isAuthenticated={state.isAuthenticated}
                  exact
                  path="/withdraw/success"
                  component={WithdrawSuccess}
                />
                <Route>
                  <Error />
                </Route>
              </Switch>
            </div>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}

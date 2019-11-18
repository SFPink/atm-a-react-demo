import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from 'context/Auth';
import { UserContextProvider } from 'context/User';
import { AtmContextProvider } from 'context/Atm';
import { PersonContextProvider } from 'context/Person';
import ATM from 'views/atm/Atm';
import Wallet from 'views/wallet/Wallet';

import '../styles/app.scss';

export default function App() {
  return (
    <Router>
      <PersonContextProvider>
        <AuthContextProvider>
          <AtmContextProvider>
            <UserContextProvider>
              <ATM />
              <Wallet />
            </UserContextProvider>
          </AtmContextProvider>
        </AuthContextProvider>
      </PersonContextProvider>
    </Router>
  );
}

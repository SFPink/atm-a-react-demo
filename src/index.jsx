import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

import 'bootstrap/dist/css/bootstrap.min.css';

const rootEl = document.getElementById('app');

render(<App />, rootEl);

if (module.hot) {
  module.hot.accept();
}

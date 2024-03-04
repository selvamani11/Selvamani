import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import AbacusQuiz from './components/AbacusQuiz';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <AbacusQuiz />
  </Provider>,
  document.getElementById('root')
);

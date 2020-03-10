console.disableYellowBox = true;

import React from 'react';
import { Provider } from 'react-redux';

import store from './App/store.js';
import AppContainer from './App/AppContainer.js';

export default class App extends React.Component {
  render() {
    return (
      <Provider store = { store }>
        <AppContainer />
      </Provider>
    );
  }
}

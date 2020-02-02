import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Root from './components/Root';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Root />
      </Provider>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;

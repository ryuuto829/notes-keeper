import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';

import Theme from './components/Theme';
import Document from './scenes/Document/Document';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <Router>
          <Document />
        </Router>
      </Theme>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
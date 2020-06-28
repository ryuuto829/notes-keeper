import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';

import Theme from './components/Theme';
import List from './scenes/List';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <Router>
          <div style={{ padding: "50px", backgroundColor: 'green' }}>
            <List />
          </div>
        </Router>
      </Theme>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

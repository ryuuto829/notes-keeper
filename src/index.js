import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Theme from './components/Theme';

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <Router>
        <h1>NOTES KEEPER</h1>
      </Router>
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);

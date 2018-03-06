import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import TrafficHome from './component/TrafficHome';
import registerServiceWorker from './registerServiceWorker';
import {
  HashRouter as Router
} from 'react-router-dom';

ReactDOM.render((
  <Router>
    <TrafficHome/>
  </Router>
), document.getElementById('root'));
registerServiceWorker();

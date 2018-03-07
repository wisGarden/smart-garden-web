import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import TrafficHome from './component/TrafficHome';
import TrafficLogin from './component/TrafficLogin';
import registerServiceWorker from './registerServiceWorker';
import {
  HashRouter as Router
} from 'react-router-dom';

ReactDOM.render((
  <div>
    <TrafficLogin/>
    <TrafficHome/>
  </div>
), document.getElementById('root'));
registerServiceWorker();

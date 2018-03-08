import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import TrafficHome from './component/TrafficHome';
import TrafficLogin from './component/TrafficLogin';
import registerServiceWorker from './registerServiceWorker';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

const Main = (
  <Switch>
    <Redirect exact from={'/'} to={'/login'}/>
    <Route path={'/login'} component={TrafficLogin}/>
    <Route path={'/home'} component={TrafficHome}/>
  </Switch>
);

ReactDOM.render((
  <Router>
    {/*<TrafficHome/>*/}
    {Main}
  </Router>
), document.getElementById('root'));
registerServiceWorker();

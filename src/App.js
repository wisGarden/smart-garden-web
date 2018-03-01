import React, {Component} from 'react';
import './App.css';
import Demo from './component/Demo';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Demo />
        </div>
      </Router>
    );
  }
}

export default App;

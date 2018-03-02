import React, {Component} from 'react';
import './App.css';
import EasyDSS from './component/EasyDSS';
// import {
//   BrowserRouter as Router,
//   Route,
//   Redirect,
//   Link
// } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <EasyDSS/>
      </div>
    );
  }
}

export default App;

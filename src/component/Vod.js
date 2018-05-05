import React, {Component} from 'react';
import VodVideoList from './VodVideoList';
import axios from 'axios';

class EasyDSS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowsHeight: 0
    }
  }

  componentDidMount() {
    this.setState({
      windowsHeight: window.screen.availHeight
    });
  }

  render() {
    return (
      <div className="easydss">
        <p style={{
          fontWeight: 'bolder'
        }}>录像回放</p>
        <VodVideoList/>
      </div>
    );
  }
}

export default EasyDSS;

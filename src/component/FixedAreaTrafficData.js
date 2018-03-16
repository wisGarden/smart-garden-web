import React, {Component} from 'react';

class FixedAreaTrafficData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('i am mount');
  }

  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

export default FixedAreaTrafficData;
import React, {Component} from 'react';
import Time from 'react-time';
import {Col, Row} from 'antd';


class Welcome extends Component {
  state = {
    'user_name': localStorage.getItem('user_name'),
    'new_now_time': new Date()
  };

  constructor(props) {
    super(props);
  }

  render() {
    const now = new Date();
    setInterval(() => {
      this.setState({
        'new_now_time': new Date(),
      });
    }, 500);
    return (
      <div>
        <Row>
          <Col span={24}>
            <img style={{
              width: '100%',
              height: '100%',
              filter: 'blur(3px)',
              position: 'relative'
            }} src="img/garden_1.jpg" alt=""/>
            <div style={{
              color: 'white',
              fontSize: '2em',
              textAlign: 'center',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate3d(-50%,-50%,0)'
            }}>
              <p style={{
                fontSize: '1.5em'
              }}>您好，{this.state.user_name} !</p>
              <p><Time value={now} format="YYYY年 MM月 DD日"/></p>
              <p><Time value={this.state.new_now_time} format="HH : mm : ss"/></p>
            </div>
          </Col>
        </Row>
        {/*<p>This was <Time value={wasDate} titleFormat="YYYY/MM/DD HH:mm" relative/></p>*/}
      </div>
    )
  }
}

export default Welcome;
import React, {Component} from 'react';
import CHeader from './CHeader';
import CFooter from './CFooter';
import WrappedLoginForm from './WrappedLoginForm';
import {Layout, Row, Col} from 'antd';
import api from '../service/api'

const { Header, Content, Footer } = Layout;

class TrafficLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (api.isLogged()) {
      this.props.history.push('/home');
    }
  }

  logged = () => {
    if (api.isLogged()) {
      this.props.history.push('/home');
    }
  };

  render() {
    return (
      <div>
        <Layout>
          {/*<Header className="header" style={{*/}
          {/*'backgroundColor': '#18A55C',*/}
          {/*'fontSize': '2em',*/}
          {/*'lineHeight': '3em',*/}
          {/*'height': '3em'*/}
          {/*}}>*/}
          <Header className="header" style={{
            'backgroundColor': '#18A55C',
            // 'fontSize': '2em',
            // 'lineHeight': '3em',
            'height': '100px'
          }}>
            <CHeader/>
          </Header>
          <Content style={{
            padding: '180px 0',
            height: '650px'
          }}>
            <Row>
              <Col span={4} offset={10}>
                <WrappedLoginForm onlogged={this.logged}/>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <CFooter/>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default TrafficLogin;
import React, {Component} from 'react';
import CHeader from './CHeader';
import CFooter from './CFooter';
import WrappedLoginForm from './WrappedLoginForm';
import {Layout, Row, Col} from 'antd';

const { Header, Content, Footer } = Layout;

class TrafficLogin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Layout>
          <Header className="header" style={{
            'backgroundColor': '#18A55C',
            'fontSize': '2em',
            'lineHeight': '3em',
            'height': '3em'
          }}>
            <CHeader/>
          </Header>
          <Content style={{
            padding: '180px 0',
          }}>
            <Row>
              <Col span={8} offset={8}>
                <WrappedLoginForm/>
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
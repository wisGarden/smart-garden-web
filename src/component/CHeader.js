import React, {Component} from 'react';
import {Avatar, Dropdown, Menu, Row, Col} from 'antd';
import '../style/main.css';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">修改个人信息</a>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item key="1">
      <a href="#">退出登录</a>
    </Menu.Item>
  </Menu>
);

class CHeader extends Component {
  constructor(prop) {
    super(prop);
  }

  render() {
    return (
      <Row>
        <Col span={22} style={{
          height: '100px',
          padding: '12px 0'
        }}>
          <p style={{
            lineHeight: '1.8em',
            fontSize: '1.8em',
            marginBottom: '5px'
          }}>智慧园林网络服务平台</p>
          <p style={{
            lineHeight: '1.2em',
            fontSize: '1.2em'
          }}>客流量分析与监控</p>
        </Col>
        <Col span={2} style={{
          height: '100px',
          padding: '20px 0'
        }}>
          <Dropdown style={{
            marginTop: '10px',

          }} overlay={menu} trigger={['hover']} placement={'bottomLeft'}>
            {/*<Avatar className={'avatar'} size="large" icon="user"/>*/}
            <Avatar className={'avatar'} style={{
              verticalAlign: 'middle'
            }} size='large'>Admin</Avatar>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

export default CHeader;
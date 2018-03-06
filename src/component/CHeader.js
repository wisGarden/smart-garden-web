import React, {Component} from 'react';
import {Avatar, Dropdown, Menu} from 'antd';
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
      <div style={{
        position: 'relative'
      }}>
        <p style={{
          textAlign: 'center',
          position: 'absolute',
          left: '50%',
          fontSize: '0.8em'
        }}>客流量监控子系统</p>
        <span>智慧园林网络服务平台</span>

        <Dropdown overlay={menu} trigger={['hover']} placement={'bottomLeft'}>
          <Avatar className={'avatar'} size="large" icon="user"/>
        </Dropdown>
      </div>
    );
  }
}

export default CHeader;
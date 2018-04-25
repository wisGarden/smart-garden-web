import React, {Component} from 'react';
import {Avatar, Dropdown, Menu, Row, Col, message} from 'antd';
import '../style/main.css';
import api from '../service/api'
import {Link} from 'react-router-dom';

class CHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
    }
  }

  logout(e) {
    if (e.key === '1') {
      if (!api.isLogged()) {
        console.log('i am logging out');
        message.error('未登录！');
        this.props.history.replace('/login');
      } else {
        localStorage.setItem('isLogged', 'false');
        message.success('退出成功！');
      }
    }
  };

  menu = (
    <Menu onClick={this.logout}>
      <Menu.Item key="0">
        <a href="#">修改个人信息</a>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="1">
        <a href="#">退出登录</a>
      </Menu.Item>
    </Menu>
  );


  componentDidMount() {
    const isLogged = localStorage.getItem('isLogged') === 'true';
    this.setState({
      isLogged,
    });
  }

  render() {
    return (
      <Row>
        <Col span={22} style={{
          height: '100px',
          padding: '12px 0'
        }}>
          <Link
            className='title-link'
            to={'/home/'}
          >
            <p style={{
              lineHeight: '1.8em',
              fontSize: '1.8em',
              marginBottom: '5px'
            }}>智慧园林客流监测系统</p>
            <p style={{
              lineHeight: '1.2em',
              fontSize: '1.2em'
            }}>客流分析与监控</p>
          </Link>
        </Col>
        {
          this.state.isLogged && (
            <Col span={2} style={{
              height: '100px',
              padding: '20px 0'
            }}>
              <Dropdown style={{
                marginTop: '10px',

              }} overlay={this.menu} trigger={['hover']} placement={'bottomLeft'}>
                {/*<Avatar className={'avatar'} size="large" icon="user"/>*/}
                <Avatar className={'avatar'} style={{
                  verticalAlign: 'middle'
                }} size='large'>{localStorage.getItem('user_name') || 'user'}</Avatar>
              </Dropdown>
            </Col>
          )
        }
      </Row>
    );
  }
}

export default CHeader;
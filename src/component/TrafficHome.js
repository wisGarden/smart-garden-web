import React, {Component} from 'react';
import '../style/main.css';
import CFooter from './CFooter';
import CHeader from './CHeader';
import {Layout, Menu, Icon} from 'antd';
import EasyDSS from './EasyDSS';
import VideoList from './VideoList';
import VideoUpload from './VideoUpload';
import TrafficSetting from './TrafficSetting';

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;


class TrafficHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spots: ['图书馆', '银杏大道', '二食堂'],
      menuItem: ''
    };
  }

  handleMenuClick = (e) => {
    console.log(e);
    this.setState({
      menuItem: e.key
    });
  };

  render() {
    const SpotLists = this.state.spots.map((spot, index) => {
      return <Menu.Item key={index}>{spot}</Menu.Item>;
    });

    const ContentRender = (menu) => {
      if (menu === 'vod') {
        return <EasyDSS/>;
      }
      if (menu === 'setting') {
        return <TrafficSetting/>;
      }
      if (menu === 'upload') {
        return <VideoUpload/>;
      }
    };

    return (
      <Layout>
        <Header className="header" style={{
          'backgroundColor': '#18A55C',
          'fontSize': '2em',
          'lineHeight': '3em',
          'height': '3em'
        }}>
          <CHeader/>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              // defaultSelectedKeys={['0']}
              // defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.handleMenuClick}
            >
              <SubMenu key="list" title={<span><Icon type="play-circle-o"/>录像列表</span>}>
                {SpotLists}
              </SubMenu>
              <Menu.Item key="vod">
                <Icon type="laptop"/>
                <span>录像点播</span>
              </Menu.Item>
              <Menu.Item key="upload">
                <Icon type="upload"/>
                <span>录像上传</span>
              </Menu.Item>
              <Menu.Item key="setting">
                <Icon type="setting"/>
                <span>系统管理</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {ContentRender(this.state.menuItem)}
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          <CFooter/>
        </Footer>
      </Layout>
    );
  }
}

export default TrafficHome;

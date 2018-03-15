import React, {Component} from 'react';
import '../style/main.css';
import CFooter from './CFooter';
import CHeader from './CHeader';
import {Layout, Menu, Icon} from 'antd';
import EasyDSS from './EasyDSS';
import VideoList from './VideoList';
import VideoUpload from './VideoUpload';
import TrafficSetting from './TrafficSetting';
import TrafficStatistics from './TrafficStatistics';
import {Route, Switch, Link} from 'react-router-dom';

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;


class TrafficHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spots: ['图书馆', '银杏大道', '二食堂'],
      menuItem: '',
      collapsed: true
    };
  }

  handleMenuClick = (e) => {
    this.setState({
      menuItem: e.key
    });
  };

  render() {
    const SpotLists = this.state.spots.map((spot, index) => {
      return <Menu.Item key={`list-${index}`}>{spot}</Menu.Item>;
    });

    const ContentRender = (menu) => {
      // if (menu.substr(0, 4) === 'list') {
      //   return <VideoList/>
      // }
      // if (menu === 'vod') {
      //   return <EasyDSS/>;
      // }
      // if (menu === 'setting') {
      //   return <TrafficSetting/>;
      // }
      // if (menu === 'upload') {
      //   return <VideoUpload/>;
      // }
      return (
        <Switch>
          <Route exact path='/home/videolist' component={VideoList}/>
          <Route path='/home/vod' component={EasyDSS}/>
          <Route path='/home/setting' component={TrafficSetting}/>
          <Route path='/home/upload' component={VideoUpload}/>
          <Route path='/home/videolist/yinxingdadao' component={TrafficStatistics}/>
        </Switch>
      );
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
              inlineCollapsed={this.state.collapsed}
            >
              <SubMenu onTitleClick={this.handleMenuClick} key="list"
                       title={<span><Icon type="play-circle-o"/>
                         录像列表
                       </span>}>
                {/*{SpotLists}*/}
                <Menu.Item key={'fixed-position'}>
                  <Link style={{
                    color: 'rgba(0,0,0,0.65)'
                  }} to={`/home/videolist`}>
                    定点客流量
                  </Link>
                </Menu.Item>
                <Menu.Item key={'fixed-area'}>定区域客流密度</Menu.Item>
              </SubMenu>

              <Menu.Item key="vod">
                <Link style={{
                  color: 'rgba(0,0,0,0.65)'
                }} to={`/home/vod`}>
                  <Icon type="laptop"/>
                  <span>录像点播</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="upload">
                <Link style={{
                  color: 'rgba(0,0,0,0.65)'
                }} to={`/home/upload`}>
                  <Icon type="upload"/>
                  <span>录像上传</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="setting">
                <Link
                  style={{
                    color: 'rgba(0,0,0,0.65)'
                  }} to={`/home/setting`}>
                  <Icon type="setting"/>
                  <span>系统管理</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {ContentRender(this.state.menuItem)}
              {/*<TrafficStatistics/>*/}
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

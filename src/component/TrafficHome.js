import React, {Component} from 'react';
import '../style/main.css';
import CFooter from './CFooter';
import CHeader from './CHeader';
import {Layout, Menu, Icon, message} from 'antd';
import Vod from './Vod';
import FixedPositionVideoList from './FixedPositionVideoList';
import FixedAreaVideoList from './FixedAreaVideoList';
import VideoUpload from './VideoUpload';
import VideoFileList from './VideoFileList';
import TrafficSetting from './TrafficSetting';
import FixedPositionTrafficData from './FixedPositionTrafficData';
import FixedAreaTrafficData from './FixedAreaTrafficData';
import Camera from './Camera';
import Welcome from './Welcome';
import {Route, Switch, Link} from 'react-router-dom';
import api from '../service/api';


const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;


class TrafficHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuItem: '',
      collapsed: true
    };
  }

  componentDidMount() {
    if (!api.isLogged()) {
      message.error('请先登录！');
      this.props.history.replace('/login');
    }
  }

  handleMenuClick = (e) => {
    this.setState({
      menuItem: e.key
    });
  };

  render() {
    const ContentRender = () => {
      return (
        <Switch>
          <Route exact path='/home/' component={Welcome}/>
          <Route exact path='/home/video-list/' component={VideoFileList}/>
          <Route exact path='/home/fixed-pos/' component={FixedPositionVideoList}/>
          <Route exact path='/home/fixed-area/' component={FixedAreaVideoList}/>
          <Route path='/home/fixed-pos/analyse' component={FixedPositionTrafficData}/>
          <Route path='/home/fixed-area/analyse' component={FixedAreaTrafficData}/>
          <Route path='/home/setting' component={TrafficSetting}/>
          <Route path='/home/upload' component={VideoUpload}/>
          <Route path='/home/vod' component={Vod}/>
          <Route path='/home/camera' component={Camera}/>
        </Switch>
      );
    };

    return (
      <Layout>
        <Header className="header" style={{
          'backgroundColor': '#18A55C',
          // 'fontSize': '2em',
          // 'lineHeight': '3em',
          'height': '100px'
        }}>
          <CHeader/>
        </Header>
        <Layout>
          <Sider width={200} style={{
            background: '#fff',
            height: '650px'
          }}>
            <Menu
              mode="inline"
              // defaultSelectedKeys={['0']}
              // defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.handleMenuClick}
              inlineCollapsed={this.state.collapsed}
            >

              {localStorage.getItem('user_role') === '1' ? (
                <Menu.Item key="upload">
                  <Link style={{
                    color: 'rgba(0,0,0,0.65)'
                  }} to={`/home/upload`}>
                    <Icon type="upload"/>
                    <span>录像上传</span>
                  </Link>
                </Menu.Item>
              ) : null}

              <SubMenu
                onTitleClick={this.handleMenuClick}
                key="list"
                title={<span><Icon type="play-circle-o"/>录像分析</span>}
              >
                <Menu.Item key={'fixed-position'}>
                  <Link style={{
                    color: 'rgba(0,0,0,0.65)'
                  }} to={`/home/fixed-pos`}>
                    定点客流量
                  </Link>
                </Menu.Item>
                <Menu.Item key={'fixed-area'}>
                  <Link style={{
                    color: 'rgba(0,0,0,0.65)'
                  }} to={`/home/fixed-area`}>
                    定区域客流密度
                  </Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="vod">
                <Link style={{
                  color: 'rgba(0,0,0,0.65)'
                }} to={`/home/vod`}>
                  <Icon type="laptop"/>
                  <span>录像回放</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="video-list">
                <Link style={{
                  color: 'rgba(0,0,0,0.65)'
                }} to={`/home/video-list/`}>
                  <Icon type="bars"/>
                  <span>录像列表</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="ip-camera">
                <Link style={{
                  color: 'rgba(0,0,0,0.65)'
                }} to={`/home/camera`}>
                  <Icon type="video-camera"/>
                  <span>摄像头分析</span>
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
          <Layout style={{
            padding: '0 24px 24px',
            height: '650px'
          }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, }}>
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

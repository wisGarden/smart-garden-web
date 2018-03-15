import React, {Component} from 'react';
import WrappedChangePassForm from './WrappedChangePassForm';
import WrappedAuthNewForm from './WrappedAuthNewForm';
import ProfileUpdateForm from './ProfileUpdateForm';
import AllUserList from './AllUserList';
import '../style/main.css';
import {
  Tabs,
  Collapse,
  Input, Row, Col, Icon, message, Tooltip
} from 'antd';


//TODO 在上传文件时要先确认有没有设置文件上传路径

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class TrafficSetting extends Component {
  state = {
    file_path: '/document/video/',
    is_edit_file_path: true
  };

  render() {
    return (
      <Tabs onChange={callback} type="card">
        <TabPane tab="个人中心" key="profile">
          <Collapse bordered={false}>
            <Panel header="查看个人信息" key="showProfile">
              <ProfileUpdateForm/>
            </Panel>
            <Panel header="修改密码" key="changePass">
              <WrappedChangePassForm/>
            </Panel>
            <Panel header="查看用户列表" key="showUser">
              <AllUserList/>
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="用户授权" key="authNew">
          <WrappedAuthNewForm/>
        </TabPane>
        <TabPane tab="服务配置" key="systemSetting">
          <Collapse bordered={false}>
            <Panel header="录像上传路径" key="file_path">
              <Row>
                <Col span={4} offset={1}>
                  <Input disabled={this.state.is_edit_file_path} value={this.state.file_path} placeholder={'请输入文件上传路径'}
                         onChange={e => {
                           this.setState({
                             file_path: e.target.value
                           });
                         }}/>
                </Col>
                <Col span={1} style={{
                  lineHeight: '32px',
                  marginLeft: '15px'
                }}>
                  {this.state.is_edit_file_path ?
                    <Tooltip title={'编辑'}>
                      <Icon onClick={_ => {
                        this.setState({
                          is_edit_file_path: false
                        });
                      }} className={'icon-hover'} type={'edit'}/>
                    </Tooltip> :
                    <Tooltip title={'完成'}>
                      <Icon onClick={_ => {
                        this.setState({
                          is_edit_file_path: true
                        }, () => {
                          message.success('文件上传路径修改成功！');
                        });
                      }} className={'icon-hover'} type={'check'}/>
                    </Tooltip>
                  }
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>
    );
  };
}

export default TrafficSetting;
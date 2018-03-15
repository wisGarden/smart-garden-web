import React, {Component} from 'react';
import WrappedChangePassForm from './WrappedChangePassForm';
import WrappedAuthNewForm from './WrappedAuthNewForm';
import ProfileUpdateForm from './ProfileUpdateForm';
import AllUserList from './AllUserList';
import {
  Tabs,
  Collapse,
  Form
} from 'antd';


//TODO 加入上传路径设置
//TODO 在上传文件时要先确认有没有设置文件上传路径

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class TrafficSetting extends Component {


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
      </Tabs>
    );
  };
}

export default TrafficSetting;
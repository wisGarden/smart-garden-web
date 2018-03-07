import React, {Component} from 'react';
import WrappedChangePassForm from './WrappedChangePassForm';
import WrappedAuthNew from './WrappedAuthNew';
import {
  Tabs,
  Collapse,
  Form
} from 'antd';

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
              {'查看个人信息'}
            </Panel>
            <Panel header="修改密码" key="changePass">
              <WrappedChangePassForm/>
            </Panel>
            <Panel header="查看用户列表" key="showUser">
              {'查看当前用户列表，可以进行基础操作，比如帮他修改密码，删除等'}
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="用户授权" key="authNew">
          <WrappedAuthNew/>
        </TabPane>
      </Tabs>
    );
  };
}

export default TrafficSetting;
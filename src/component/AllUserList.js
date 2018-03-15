import React, {Component} from 'react';
import {Table, Divider, Button, Modal, Input, message} from 'antd';

const dataSource = [{
  key: '1',
  user_name: 'user1',
  user_role: '管理员',
  user_mobile: '13123433233',
  user_email: '123@126.com'
}, {
  key: '2',
  user_name: 'user2',
  user_role: '普通用户',
  user_mobile: '13123433233',
  user_email: '123@126.com'
}];


class AllUserList extends Component {
  state = {
    is_modal_show: false,
    resetPassName: ''
  };

  columns = [{
    title: '用户名',
    dataIndex: 'user_name',
    key: 'user_name',
  }, {
    title: '用户角色',
    dataIndex: 'user_role',
    key: 'user_role',
  }, {
    title: '联系方式',
    dataIndex: 'user_mobile',
    key: 'user_mobile',
  }, {
    title: '电子邮件',
    dataIndex: 'user_email',
    key: 'user_email',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
      <a onClick={() => {
        this.changePass(record.user_name);
      }}>重置密码</a>
      <Divider type="vertical"/>
      <a>禁用</a>
      <Divider type="vertical"/>
      <a>删除</a>
    </span>
    ),
  }];


  changePass = (user_name) => {
    this.setState({
      is_modal_show: true,
      resetPassName: user_name
    }, () => {
      console.log(user_name);
    });
  };


  resetPass = () => {
    this.handleOk();
    message.success('密码重置成功！');
  };

  handleOk = () => {
    this.setState({ is_modal_show: false });
  };

  handleCancel = () => {
    this.setState({ is_modal_show: false });
  };

  render() {
    return (
      <div style={{
        margin: '20px'
      }}>
        <Modal
          visible={this.state.is_modal_show}
          title={`正在重置 ${this.state.resetPassName} 的密码`}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.resetPass}>
              重置
            </Button>,
          ]}
        >
          <p>请输入新密码：</p>
          <Input placeholder={'请输入新密码'}/>
        </Modal>
        <Table columns={this.columns} dataSource={dataSource}/>
      </div>
    );
  };
}

export default AllUserList;
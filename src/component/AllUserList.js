import React, {Component} from 'react';
import {Table, Divider, Button, Modal, Input, message, Popconfirm} from 'antd';
import api from '../service/api';

const user_role_mapping = {
  '1': '管理员',
  '0': '工作人员'
};


class AllUserList extends Component {
  state = {
    is_modal_show: false,
    resetPassName: '',
    dataSource: [],
    reset_new_pass: ''
  };

  componentDidMount() {
    this.getAllUser();
  }

  getAllUser = () => {
    api.getUserList(res => {
      this.setState({
        dataSource: res.data.map((user, index) => ({
          key: index,
          user_name: user.user_name,
          user_role: user_role_mapping[user.user_role],
          user_mobile: user.user_mobile,
          user_email: user.user_email
        }))
      });
    })
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
      <Popconfirm title={`确定删除 ${record.user_name} 么？`}
                  onConfirm={() => {
                    this.deleteUser(record.user_name);
                  }}
                  okText="删除"
                  cancelText="取消">
        <a>删除</a>
      </Popconfirm>
    </span>
    ),
  }];

  deleteUser = (delete_user) => {
    if (delete_user !== localStorage.getItem('user_name')) {
      let userObj = {
        user_name: localStorage.getItem('user_name'),
        delete_user_name: delete_user
      };
      api.deleteUser(userObj, res => {
        const result = res.data;
        if (result.success === 'true') {
          message.success('删除成功！');
          this.getAllUser();
        }
      })
    }
    if (delete_user === localStorage.getItem('user_name')) {
      message.error('不能删除自己！');
    }
  };

  changePass = (user_name) => {
    this.setState({
      is_modal_show: true,
      resetPassName: user_name
    }, () => {
    });
  };


  resetPass = () => {
    this.handleOk();
    const userObj = {
      user_name: localStorage.getItem('user_name'),
      reset_user_name: this.state.resetPassName,
      reset_new_pass: this.state.reset_new_pass
    };
    api.resetUserPass(userObj, res => {
      const result = res.data;
      if (result.success === 'true') {
        message.success('密码重置成功！');
        this.setState({
          reset_new_pass: ''
        });
      }
    });
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
          <Input value={this.state.reset_new_pass}
                 onPressEnter={this.resetPass}
                 onChange={(e) => {
                   this.setState({
                     reset_new_pass: e.target.value,
                   }, () => {
                   });
                 }}
                 type={'password'}
                 placeholder={'请输入新密码'}/>
        </Modal>
        <Table columns={this.columns} dataSource={this.state.dataSource}/>
      </div>
    );
  };
}

export default AllUserList;
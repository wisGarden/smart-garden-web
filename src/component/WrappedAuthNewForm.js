import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
  Switch,
  message,
} from 'antd';
import api from '../service/api';

const FormItem = Form.Item;

class AuthNewForm extends Component {

  state = {
    user_name: '',
    user_role: '0',
    user_pass: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.user_name, this.state.user_pass, this.state.user_role);
    const { user_name, user_pass, user_role } = this.state;
    const userObj = { user_name, user_pass, user_role };
    api.authUser(userObj, (res) => {
      const result = res.data;
      console.log(result);
      if (result.success === 'true') {
        message.success('用户授权成功！', () => {
          window.location.reload();
        });
      }
      if (result.success === 'false' && result.message === 'user exist') {
        message.error('该用户已存在，请更换用户名!');
        this.setState({
          user_name: '',
          user_pass: '',
        });
      }
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('userName', {
            rules: [{
              required: true, message: '请输入用户名！',
            }],
          })(
            <Input
              onChange={(e) => {
                this.setState({
                  user_name: e.target.value
                });
              }}
              type={'text'}
              style={{
                width: '200px'
              }}/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('pass', {
            rules: [{
              required: true, message: '请输入密码！',
            }],
          })(
            <Input
              onChange={(e) => {
                this.setState({
                  user_pass: e.target.value
                });
              }}
              type={'password'}
              style={{
                width: '200px'
              }}/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="是否具备管理员权限"
        >
          {getFieldDecorator('isAdmin', {
            rules: [{
              required: true,
              message: '请确认该用户是否具有管理员权限！',
            }],
          })(
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
              defaultChecked={false}
              onChange={(e) => {
                this.setState({
                  user_role: e ? '1' : '0'
                });
              }}/>
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">授权该用户</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAuthNewForm = Form.create()(AuthNewForm);

export default WrappedAuthNewForm;
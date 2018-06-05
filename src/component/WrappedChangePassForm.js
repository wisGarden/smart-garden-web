import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
  message
} from 'antd';
import api from '../service/api';

const FormItem = Form.Item;

class ChangePassForm extends Component {

  state = {
    confirmDirty: false,
    user_old_pass: '',
    user_new_pass: '',
    repeat_user_new_pass: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.user_new_pass !== this.state.repeat_user_new_pass) {
      message.error('两次密码输入不一致!');
    } else {
      const userObj = {
        user_name: localStorage.getItem('user_name'),
        user_old_pass: this.state.user_old_pass,
        user_new_pass: this.state.user_new_pass
      };
      api.changePass(userObj, res => {
        const result = res.data;
        if (result.success === 'true') {
          this.setState({
            user_old_pass: '',
            user_new_pass: '',
            repeat_user_new_pass: ''
          }, () => {
            message.success('密码修改成功！', () => {
              window.location.reload();
            });
          });
        } else if (result.success === 'false' && result.message === 'wrong pass') {
          message.error('旧密码错误！', () => {
            window.location.reload();
          });
        }
      })
    }
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPass')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['reNewPass'], { force: true });
    }
    callback();
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
          label="旧密码"
        >
          {getFieldDecorator('oldPass', {
            rules: [{
              required: true, message: '请输入密码！',
            }],
          })(
            <Input type={'password'}
              // value={this.state.user_old_pass}
                   onChange={(e) => {
                     this.setState({
                       user_old_pass: e.target.value
                     }, () => {
                     });
                   }}
                   style={{
                     width: '200px'
                   }}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
        >
          {getFieldDecorator('newPass', {
            rules: [{
              required: true,
              message: '请输入新密码！',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password"
              // value={this.state.user_new_pass}
                   onChange={(e) => {
                     this.setState({
                       user_new_pass: e.target.value
                     }, () => {
                     });
                   }}
                   style={{
                     width: '200px'
                   }}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="重复新密码"
        >
          {getFieldDecorator('reNewPass', {
            rules: [{
              required: true, message: '请重复输入新密码',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password"
              // value={this.state.repeat_user_new_pass}
                   onChange={(e) => {
                     this.setState({
                       repeat_user_new_pass: e.target.value
                     }, () => {
                     });
                   }}
                   onBlur={this.handleConfirmBlur}
                   style={{
                     width: '200px'
                   }}/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">确认修改</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedChangePassForm = Form.create()(ChangePassForm);

export default WrappedChangePassForm;
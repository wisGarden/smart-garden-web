import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
  message,
  Col,
  Icon
} from 'antd';
import Vcode from 'react-vcode';
import {Link} from 'react-router-dom';
import api from '../service/api'

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_pass: ''
    }
  }

  changeUserName = (e) => {
    this.setState({
      user_name: e.target.value
    })
  };

  changePass = (e) => {
    this.setState({
      user_pass: e.target.value
    })
  };

  handleSubmit = (e) => {
    localStorage.setItem('isLogged', 'false');
    e.preventDefault();
    const userObj = {
      user_name: this.state.user_name,
      user_pass: this.state.user_pass
    };
    if (userObj.user_name === '' || userObj.user_pass === '') {
      message.error('用户名或密码为空！');
    } else {
      api.login(userObj, res => {
        const result = res.data;
        console.log(result);
        if (result.success === 'true') {
          localStorage.setItem('isLogged', 'true');
          localStorage.setItem('user_name', result.message.user_name);
          localStorage.setItem('user_role', result.message.user_role);
          localStorage.setItem('user_id', result.message.user_id);
          this.props.onlogged();
        } else {
          if (result.message === 'wrong password') {
            message.error('密码错误，请重新输入！');
            this.setState({
              user_pass: ''
            });
          } else if (result.message === 'user not found') {
            message.error('未找到该用户！');
            this.setState({
              user_name: ''
            });
          }
        }
      });
    }
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
          /*{...formItemLayout}*/
          // label="用户名"
        >
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入用户名！',
            }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="用户名"
              type={'text'}
              value={this.state.user_name}
              onInput={this.changeUserName}
              style={{
                width: '100%'
              }}/>
          )}
        </FormItem>
        <FormItem
          /*{...formItemLayout}*/
          // label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入密码！',
            }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="密码"
              type="password"
              onInput={this.changePass}
              style={{
                width: '100%'
              }}/>
          )}
        </FormItem>
        {/*<FormItem*/}
        {/*{...formItemLayout}*/}
        {/*// label="验证码"*/}
        {/*>*/}
        {/*<Row gutter={4}>*/}
        {/*<Col span={24}>*/}
        {/*{getFieldDecorator('captcha', {*/}
        {/*rules: [{ required: true, message: '请输入验证码！' }],*/}
        {/*})(*/}
        {/*<Input*/}
        {/*type={'text'}*/}
        {/*prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }}/>}*/}
        {/*style={{*/}
        {/*width: '100px',*/}
        {/*marginRight: '4px'*/}
        {/*}}*/}
        {/*placeholder={'验证码'}*/}
        {/*/>*/}
        {/*)}*/}
        {/*<Vcode width={96} height={32} style={{*/}
        {/*margin: '0 auto',*/}
        {/*display: 'inline-block',*/}
        {/*borderRadius: '4px',*/}
        {/*verticalAlign: 'top'*/}
        {/*}}/>*/}
        {/*</Col>*/}
        {/*</Row>*/}
        {/*</FormItem>*/}
        <FormItem
          /*{...formItemLayout}*/
        >
          <Button style={{
            width: '100%'
          }} type="primary" htmlType="submit" onClick={this.handleSubmit} className="login-form-button">
            登 录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
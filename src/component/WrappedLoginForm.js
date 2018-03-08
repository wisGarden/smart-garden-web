import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Icon
} from 'antd';
import Vcode from 'react-vcode';
import {Link} from 'react-router-dom';

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
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
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入用户名！',
            }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="请输入用户名"
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
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入密码！',
            }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="请输入密码"
              type="password"
              style={{
                width: '200px'
              }}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
        >
          <Row gutter={4}>
            <Col span={24}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入验证码！' }],
              })(
                <Input
                  type={'text'}
                  prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                  size="large"
                  style={{
                    width: '100px',
                    marginRight: '4px'
                  }}
                  placeholder={'请输入验证码'}
                />
              )}
              <Vcode width={96} height={32} style={{
                margin: '0 auto',
                display: 'inline-block',
                borderRadius: '4px',
                verticalAlign: 'top'
              }}/>
            </Col>
          </Row>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            <Link to={'/home'}>登 录</Link>
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
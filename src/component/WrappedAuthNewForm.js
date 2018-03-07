import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
  Switch
} from 'antd';

const FormItem = Form.Item;

class AuthNewForm extends Component {

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
          {getFieldDecorator('userName', {
            rules: [{
              required: true, message: '请输入用户名！',
            }],
          })(
            <Input type={'text'} style={{
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
            <Input type={'password'} style={{
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
            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={false} onChange={(e) => {
              console.log(e);
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
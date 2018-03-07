import React, {Component} from 'react';
import {
  Tabs,
  Collapse,
  Form,
  Input,
  Button
} from 'antd';

const FormItem = Form.Item;
function callback(key) {
  console.log(key);
}

class ChangePassForm extends Component {

  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
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
            <Input type={'password'} style={{
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
            <Input type="password" style={{
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
            <Input type="password" onBlur={this.handleConfirmBlur} style={{
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
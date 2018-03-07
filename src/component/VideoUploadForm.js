import React, {Component} from 'react';
import {
  Form, Select, Button, Upload, Icon, DatePicker
} from 'antd';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class VideoUploadItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleVideoUploadSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleVideoUploadSubmit}>

        {/*视频文件*/}
        <FormItem
          {...formItemLayout}
          label="选择文件"
        >
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [{
                required: true,
                message: '请选择要上传的监控录像！'
              }]
            })(
              <Upload.Dragger name="files">
                <p className="ant-upload-drag-icon" style={{
                  paddingTop:'13px'
                }}>
                  <Icon type="inbox"/>
                </p>
                <p className="ant-upload-text">点击或拖拽视频文件到此处上传</p>
                <p className="ant-upload-hint">支持多选</p>
              </Upload.Dragger>
            )}
          </div>
        </FormItem>

        {/*录像地点*/}
        <FormItem
          {...formItemLayout}
          label="录像地点"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [{
              required: true,
              message: '请选择监控录像的地点！'
            }],
          })(
            <Select
              mode="combobox"
              placeholder='请选择或直接输入新的监控录像地点'
              size={'large'}
              // onChange={handleChange}
            >
              <Option value='图书馆'>图书馆</Option>
              <Option value='银杏大道'>银杏大道</Option>
              <Option value='二食堂'>二食堂</Option>
            </Select>
          )}
        </FormItem>

        {/*录像时间*/}
        <FormItem
          {...formItemLayout}
          label="录像时间"
        >
          {getFieldDecorator('range-time-picker', {
            rules: [{ type: 'array', required: true, message: '请填写监控录像的具体时间间隔!' }],
          })(
            <RangePicker showTime format="YYYY-MM-DD HH:mm"/>
          )}
        </FormItem>

        {/*上传*/}
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">上传</Button>
        </FormItem>
      </Form>
    );
  }
}

const VideoUploadForm = Form.create()(VideoUploadItemForm);

export default VideoUploadForm;
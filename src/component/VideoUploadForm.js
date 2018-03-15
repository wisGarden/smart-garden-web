import React, {Component} from 'react';
import {
  Form, Select, Button, Upload, Icon, DatePicker, Radio, Input
} from 'antd';

const { RadioGroup } = Radio;

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class VideoUploadItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrafficLimitShow: false
    };
  }

  handleVideoUploadSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleAnalyseType = (type) => {
    if (type === 'fixed-position') {
      this.setState({
        isTrafficLimitShow: false
      });
    }
    if (type === 'fixed-area') {
      this.setState({
        isTrafficLimitShow: true
      });
    }
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
                  paddingTop: '13px'
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
              // size={'default'}
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

        {/*客流分析类型*/}
        <FormItem
          {...formItemLayout}
          label="选择客流分析类型"
        >
          {getFieldDecorator('radio-group')(
            <div>
              <input onChange={e => {
                this.handleAnalyseType('fixed-position');
              }} value={'fixed-position'} className={'radio-choose-date-gap'} type="radio" id={'fixed-position'}
                     name={'analyse-type'}/><label
              htmlFor="fixed-position">定点客流量分析</label>

              <input onChange={e => {
                this.handleAnalyseType('fixed-area');
              }} value={'fixed-area'} className={'radio-choose-date-gap'} type="radio" id={'fixed-area'}
                     name={'analyse-type'}/><label
              htmlFor="fixed-area">定区域客流密度分析</label>
              {this.state.isTrafficLimitShow ?
                <Input style={{
                  marginLeft: '10px',
                  verticalAlign: 'middle'
                }} placeholder="请输入该区域人数报警上限"/> : null}
            </div>
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
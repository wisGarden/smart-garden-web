import React, {Component} from 'react';
import {
  Form, Select, Button, Upload, Icon, DatePicker, Radio, Input, message
} from 'antd';
import axios from 'axios';
import api from '../service/api';
import config from '../service/config';

const querystring = require('querystring');

const { RadioGroup } = Radio;

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

const analyse_type = {
  'fixed-position': '定点客流量分析',
  'fixed-area': '定区域客流密度分析'
};

class VideoUploadItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrafficLimitShow: false,
      isAnalyseTypeDecided: false,
      file_site: '', // 文件的地点
      file_during_time: '', // 文件的时间
      analyse_type: '', // 文件的分析类型
      traffic_density_limit: 0, // 地点客流密度上限
      all_sites: [],
      video_file: null
    };
  }

  componentDidMount() {
    api.getSites(res => {
      if (res.data.success === 'true') {
        const all_sites = res.data.message;
        this.setState({
          all_sites,
        }, () => {
          console.log(this.state.all_sites);
        });
      }
    });
  }

  handleDuringTime = time => {
    const start_time = time[0]._d;
    const end_time = time[1]._d;
    const file_during_time = `${start_time.getTime()}-${end_time.getTime()}`;
    this.setState({
      file_during_time,
    });
  };

  handleVideoSite = file_site => {
    this.setState({
      file_site,
    }, () => {
      const all_sites_name = this.state.all_sites.map(site => site.site_name);
      if (all_sites_name.includes(this.state.file_site)) {
        this.setState({
          isAnalyseTypeDecided: true
        });
      } else {
        this.setState({
          isAnalyseTypeDecided: false
        });
      }
    });
  };

  handleAnalyseType = (type) => {
    if (type === 'fixed-position') {
      this.setState({
        isTrafficLimitShow: false,
        analyse_type: type
      });
    }
    if (type === 'fixed-area') {
      this.setState({
        isTrafficLimitShow: true,
        analyse_type: type
      });
    }
  };

  handleDensityLimit = e => {
    this.setState({
      traffic_density_limit: parseInt(e.target.value)
    });
  };

  uploadFile = (e) => {
    const video_file = e.file;
    this.setState({
      video_file
    });
  };

  handleVideoUploadSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { video_file, file_site, file_during_time, analyse_type, traffic_density_limit } = this.state;
        const fileObj = {
          video_file,
          file_site,
          file_during_time,
          analyse_type,
          traffic_density_limit
        };
        api.uploadVideoFile(fileObj, res => {
          if (res.data.success === 'true') {
            message.success('上传成功！', 1, () => {
              window.location.reload();
            });
          }
        })
      }
    });
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
            <Upload.Dragger
              name="files"
              customRequest={this.uploadFile}
            >
              <p className="ant-upload-drag-icon" style={{
                paddingTop: '13px'
              }}>
                <Icon type="inbox"/>
              </p>
              <p className="ant-upload-text">点击或拖拽视频文件到此处上传</p>
              <p className="ant-upload-hint">支持多选</p>
            </Upload.Dragger>
          </div>
        </FormItem>
        {/*录像地点*/}
        <FormItem
          {...formItemLayout}
          label="录像地点"
          hasFeedback
        >
          {getFieldDecorator('file_site', {
            rules: [{
              required: true,
              message: '请选择监控录像的地点'
            }],
          })(
            <Select
              mode="combobox"
              placeholder='请选择或直接输入新的监控录像地点'
              // size={'default'}
              onChange={this.handleVideoSite}
            >
              {
                this.state.all_sites.map((site, index) =>
                  (<Option key={index} value={site.site_name}>{site.site_name}
                    <span
                      style={{
                        float: 'right',
                        fontSize: '.8em',
                        fontWeight: 'normal'
                      }}>{analyse_type[site.site_analyse_type]}</span></Option>)
                )
              }
            </Select>
          )}
        </FormItem>

        {/*录像时间*/}
        <FormItem
          {...formItemLayout}
          label="录像时间"
        >
          {getFieldDecorator('file_during_time', {
            rules: [{ type: 'array', required: true, message: '请填写监控录像的具体时间间隔' }],
          })(
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              onChange={this.handleDuringTime}
            />
          )}
        </FormItem>

        {/*客流分析类型*/}
        {!this.state.isAnalyseTypeDecided ?
          <FormItem
            {...formItemLayout}
            label="选择客流分析类型"
          >
            {getFieldDecorator('analyse_type', {
              rules: [{ required: true, message: '请选择客流分析类型' }],
            })(
              <div>
                <input
                  onChange={_ => {
                    this.handleAnalyseType('fixed-position');
                  }}
                  value={'fixed-position'}
                  className={'radio-choose-date-gap'}
                  type="radio"
                  id={'fixed-position'}
                  name={'analyse-type'}
                />
                <label htmlFor="fixed-position">定点客流量分析</label>

                <input
                  onChange={_ => {
                    this.handleAnalyseType('fixed-area');
                  }}
                  value={'fixed-area'}
                  className={'radio-choose-date-gap'}
                  type="radio"
                  id={'fixed-area'}
                  name={'analyse-type'}
                />
                <label htmlFor="fixed-area">定区域客流密度分析</label>

                {this.state.isTrafficLimitShow ?
                  <Input
                    style={{
                      marginLeft: '10px',
                      verticalAlign: 'middle'
                    }}
                    placeholder="请输入该区域人数报警上限"
                    onChange={this.handleDensityLimit}
                  /> : null}
              </div>
            )}
          </FormItem> : null}

        {/*上传*/}
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">上传</Button>
        </FormItem>
      </Form>
    );
  }
}

const VideoUploadForm = Form.create()(VideoUploadItemForm);

export default VideoUploadForm;
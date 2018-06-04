import React, {Component} from 'react';
import {
  Form, Select, Button, Icon, DatePicker, Tooltip, Radio, Input, message, InputNumber, Modal, Row, Col, Card, Spin
} from 'antd';
import api from '../service/api';
import {ResponsiveContainer, LineChart, Line, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar} from 'recharts';
import websocket from '../service/webSocketCof';
import config from "../service/config";
import {Player} from 'video-react';

const { RadioGroup } = Radio;

const data = [];
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

const analyse_type = {
  'fixed-position': '定点客流量分析',
  'fixed-area': '定区域客流密度分析'
};

class CameraItemForm extends Component {

  data = [];

  socket = null;

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
      video_file: null,
      isModalPosAnalysisVisible: false,
      streamingImgSrc: '',
      posLiveSiteAnalyseType: '',
      posLiveSrc: '',
      isPassengerDataLoaded: false,
      isModalAreaAnalysisVisible: false,
      isPassengerAreaLiveDataLoaded: false,
      videoSrc: ''
    };
  }

  componentDidMount() {
    api.getSites(res => {
      if (res.data.success === 'true') {
        const all_sites = res.data.message;
        this.setState({
          all_sites,
        });
      }
    });
  }

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

  handleVideoLiveAnalysisSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const posLiveSrc = `${values.protocol}://${values.hosts}`;
        this.setState({
          posLiveSrc,
        }, () => {
          this.state.all_sites.filter(site => {
            if (site.site_name === values.file_site) {
              this.setState({
                posLiveSiteAnalyseType: site.site_analyse_type
              }, () => {
                if (this.state.posLiveSiteAnalyseType === 'fixed-position') {
                  this.setState({
                    isModalPosAnalysisVisible: true,
                  });
                  this.socket = websocket.wsPosLiveConfig({
                    onmessage: this.handlePosSocketOnMessage,
                    onopen: () => {
                      console.log('The fixed pos socket is open');
                    },
                    onclose: () => {
                      console.log('The fixed pos socket is closed');
                    },
                    send: JSON.stringify({ 'live_src': this.state.posLiveSrc })
                  });
                } else {
                  console.log(this.state.posLiveSiteAnalyseType);
                  this.setState({
                    isModalAreaAnalysisVisible: true
                  });
                  this.socket = websocket.wsAreaLiveConfig({
                    onmessage: this.handleAreaSocketOnMessage,
                    onopen: () => {
                      console.log('socket is open');
                    },
                    onclose: () => {
                      console.log('The fixed area socket is closed');
                    },
                    send: JSON.stringify({ 'live_src': this.state.posLiveSrc })
                  });
                }
              });
            }
          })
        });
      }
    });
  };

  handleAreaSocketOnMessage = e => {
    const transdata = JSON.parse(e.data);
    const passenger_data = transdata['passenger_data'];
    data.push({
      name: '',
      traffic_data: passenger_data
    });
    this.setState({
      presentTrafficData: passenger_data / 10
    }, () => {
      this.setState({
        isPassengerAreaLiveDataLoaded: true,
        videoSrc: `${config.apiUrl}/static/video/${this.state.posLiveSrc.split('8554/')[1]}`
      });
    });
  };

  handlePosSocketOnMessage = e => {
    const transdata = JSON.parse(e.data);
    const passenger_data = transdata['passenger_data'];
    this.data.push({
      name: '',
      traffic_data: passenger_data,
    });
    this.setState({
      streamingImgSrc: `${config.posImgStreamUrl}/fixedPos/video_feed/live/${this.state.posLiveSrc}/`,
      isPassengerDataLoaded: true
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
        <Form onSubmit={this.handleVideoLiveAnalysisSubmit}>

          <FormItem
            label='摄像机传输协议'
            {...formItemLayout}
          >
            {getFieldDecorator('protocol', {
              rules: [{
                required: true, message: '请选择摄像机的传输协议',
              }],
            })(
              <Radio.Group onChange={() => {
              }}>
                <Radio.Button value="rtsp">RTSP</Radio.Button>
                <Radio.Button value="onvif">ONVIF</Radio.Button>
                <Radio.Button value="others">OTHERS</Radio.Button>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="摄像机主机地址"
          >
            {getFieldDecorator('hosts', {
              rules: [{
                required: true, message: '请输入摄像机的主机地址',
              }],
            })(
              <Input placeholder='***'/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="摄像机端口号"
          >
            {getFieldDecorator('port-number', {
              initialValue: 8554,
              rules: [{
                required: true, message: '请选择摄像机的传输协议',
              }],
            })(
              <InputNumber min={1} max={99999}/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="摄像机地点"
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
                disabled={this.state.isUploading}
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
                    disabled={this.state.isUploading}
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
                    disabled={this.state.isUploading}
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
                      disabled={this.state.isUploading}
                    /> : null}
                </div>
              )}
            </FormItem> : null}

          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">确定</Button>
          </FormItem>
        </Form>
        <Modal
          title={this.state.file_site}
          visible={this.state.isModalPosAnalysisVisible}
          footer={null}
          destroyOnClose={true}
          width={1170}
          onCancel={() => {
            this.socket.close();
            this.setState({
              isModalPosAnalysisVisible: false
            })
          }}
        >
          {this.state.isPassengerDataLoaded ? (
            <Row>
              <Col span={12}>
                <img style={{
                  width: '560px',
                  height: '315px'
                }} src={this.state.streamingImgSrc} alt=""/>
              </Col>
              <Col span={12}>
                <Card title="实时客流量" bordered={false} style={{ width: '100%' }}>
                  <p style={{
                    lineHeight: '30px',
                    height: '30px'
                  }}>当日人流总量</p>
                  <p style={{
                    fontWeight: 'bold',
                    fontSize: '30px',
                    height: '40px',
                    lineHeight: '40px',
                    color: 'rgba(0,0,0,.85)',
                    display: 'inline-block'
                  }}>{this.data.reduce((pre, curr) => {
                    return pre + curr.traffic_data;
                  }, 0)}</p>
                  <ResponsiveContainer height={150}>
                    <LineChart
                      data={this.data.slice(-20)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <Tooltip/>
                      <Line type="monotone" dataKey="traffic_data" stroke="#82ca9d"/>
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>

          ) : (
            <div style={{
              height: '315px',
            }}>
              <Spin style={{
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate3d(28%,-50%,0)'
              }} size="large"/>
            </div>
          )}
        </Modal>

        <Modal
          title={this.state.file_site}
          visible={this.state.isModalAreaAnalysisVisible}
          footer={null}
          destroyOnClose={true}
          width={1170}
          onCancel={() => {
            this.socket.close();
            this.setState({
              isModalAreaAnalysisVisible: false
            })
          }}
        >
          {this.state.isPassengerAreaLiveDataLoaded ? (
            <Row>
              <Col span={12}>
                <Player
                  style={{
                    width: '100%',
                    height: '350px',
                  }}
                  playsInline
                  autoPlay={true}
                  preload={'auto'}
                  src={this.state.videoSrc}
                />
              </Col>
              <Col span={12}>
                <Card title="实时客流密度" bordered={false} style={{ width: '100%' }}>
                  <p style={{
                    lineHeight: '30px',
                    height: '30px'
                  }}>当前客流密度</p>
                  <p style={{
                    fontWeight: 'bold',
                    fontSize: '30px',
                    height: '40px',
                    lineHeight: '40px',
                    color: 'rgba(0,0,0,.85)',
                    display: 'inline-block'
                  }}>{parseInt(this.state.presentTrafficData)} 人</p>
                  <ResponsiveContainer height={150}>
                    <LineChart
                      data={data.slice(-20)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <Tooltip/>
                      <Line type="monotone" dataKey="traffic_data" stroke="#82ca9d"/>
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>

          ) : (
            <div style={{
              height: '315px',
            }}>
              <Spin style={{
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate3d(28%,-50%,0)'
              }} size="large"/>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

const CameraForm = Form.create()(CameraItemForm);

export default CameraForm;
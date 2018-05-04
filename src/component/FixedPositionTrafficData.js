import React, {Component} from 'react';
import {Row, Col, Card, Tooltip, Tabs, DatePicker, Button} from 'antd';
import {ResponsiveContainer, LineChart, Line, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar} from 'recharts';
import '../style/main.css';
import websocket from '../service/webSocketCof';

const { RangePicker } = DatePicker;

const { TabPane } = Tabs;

const data = [
  { name: '1:00', traffic_data: 2 },
];

class FixedPositionTrafficData extends Component {
  state = {
    isExportShow: true,
    dateGap: 'byWeek',
    isRangePickerShow: false,
    isSocketOpen: false,
    presentTrafficData: 0,
    imgSrc: '',
    file_name: '',
    file_during_time: ''
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('i am mount, Fixed position');
    // this.setState({
    //   file_name: this.props.location.state.file_name || localStorage.getItem('file_name'),
    //   file_during_time: this.props.location.state.file_during_time || localStorage.getItem('file_during_time')
    // }, () => {
    //   localStorage.setItem('file_name', this.state.file_name);
    //   localStorage.setItem('file_during_time', this.state.file_during_time);
    // });
    if (!!!localStorage.getItem('file_name') || !!!localStorage.getItem('file_during_time')) {
      localStorage.setItem('file_name', this.props.location.state.file_name);
      localStorage.setItem('file_during_time', this.props.location.state.file_during_time);
    }
    websocket.wsPosConfig({
      file_uuid: this.props.location.hash.substr(1),
      onmessage: this.handleSocketOnMessage,
      onopen: this.handleSocketOnOpen,
      onclose: this.handleSocketOnClose,
      send: JSON.stringify({ 'file_path': localStorage.getItem('file_path') })
    });
    this.setState({
      imgSrc: `http://localhost:8000/fixedPos/video_feed/${localStorage.getItem('file_path')}/`
    });
  }

  shouldComponentUpdate() {
    if (this.state.isSocketOpen) {
      console.log('i am in shouldComponent ');
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      console.log('navigated!');
    }
  }

  handleSocketOnMessage = (e) => {
    const transdata = JSON.parse(e.data);
    const passenger_data = transdata['passenger_data'];
    data.push({
      name: '',
      traffic_data: passenger_data
    });
    this.setState({
      presentTrafficData: passenger_data
    });
  };

  handleSocketOnOpen = (e) => {
    this.setState({
      isSocketOpen: true
    });
  };

  handleSocketOnClose = (e) => {
    this.setState({
      isSocketOpen: false
    });
    console.log('The fixed pos socket is closed');
  };

  componentWillUnmount() {
    console.log('i will unmount');
    this.setState({
      imgSrc: ''
    });
  }

  render() {

    const chooseGap =
      this.state.isExportShow ? (
        <div>
        <span style={{
          marginRight: '24px'
        }}>
          <a className={'chart-gap-choose-anchor'}>本周</a>
          <a className={'chart-gap-choose-anchor'}>本月</a>
          <a className={'chart-gap-choose-anchor'}>全年</a>
        </span>
          <RangePicker onChange={e => {
            console.log('time is change ');
          }}/>
        </div>
      ) : null;

    const setDateGap = (dateGap) => {
      this.setState({
        dateGap,
      }, () => {
        console.log(this.state.dateGap);
        if (this.state.dateGap === 'byCustom') {
          this.setState({
            isRangePickerShow: true
          });
        } else {
          this.setState({
            isRangePickerShow: false
          });
        }
      });
    };

    return (
      <div>
        <p style={{
          marginBottom: '10px'
        }}><span style={{
          fontWeight: 'bold',
          marginRight: '10px',
          fontSize: '1.2em'
        }}>{localStorage.getItem('file_name')}</span><span>{localStorage.getItem('file_during_time')}</span>
        </p>
        <Row>
          <Col span={12}>
            {/*<iframe*/}
            {/*onClick={() => {*/}
            {/*console.log('iframe on click');*/}
            {/*}}*/}
            {/*title='fixedPosition'*/}
            {/*width='560px'*/}
            {/*height='315px'*/}
            {/*src='http://10.211.55.6:10080/api/play/9661da30437511e8b5ec8b8b2fe21cab'*/}
            {/*frameBorder='0'*/}
            {/*allowFullScreen/>*/}
            <img style={{
              width: '560px',
              height: '315px'
            }} src={this.state.imgSrc} alt=""/>
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
              }}>{this.state.presentTrafficData}</p>
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
        <Row>
          <Col span={24}>
            <Tabs
              onChange={activeKey => {
                if (activeKey === 'dataExport') {
                  this.setState({
                    isExportShow: false
                  });
                }
                if (activeKey === 'historyData') {
                  this.setState({
                    isExportShow: true
                  });
                }
              }}
              defaultActiveKey="historyData"
              tabBarExtraContent={chooseGap}
              style={{
                paddingTop: '20px'
              }}
            >
              <TabPane tab="历史数据" key="historyData">
                <ResponsiveContainer height={300}>
                  <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar name={'客流量'} dataKey="traffic_data" fill="#82ca9d"/>
                  </BarChart>
                </ResponsiveContainer>
              </TabPane>
              <TabPane tab="数据导出" key="dataExport" style={{
                height: '300px',
                paddingLeft: '20px',
                paddingTop: '5px'
              }}>
                <p style={{
                  marginBottom: '5px'
                }}>请选择导出日期：</p>

                <div>
                  <input onChange={e => {
                    setDateGap('byWeek');
                  }} value={'byWeek'} className={'radio-choose-date-gap'} type="radio" id={'byWeek'}
                         name={'dateGap'}/><label
                  htmlFor="byWeek">本周</label>
                </div>
                <div>
                  <input onChange={e => {
                    setDateGap('byMonth');
                  }} value={'byMonth'} className={'radio-choose-date-gap'} type="radio" id={'byMonth'}
                         name={'dateGap'}/><label
                  htmlFor="byMonth">本月</label>
                </div>
                <div>
                  <input onChange={e => {
                    setDateGap('byYear');
                  }} value={'byYear'} className={'radio-choose-date-gap'} type="radio" id={'byYear'}
                         name={'dateGap'}/><label
                  htmlFor="byYear">本年</label>
                </div>
                <div>
                  <input onChange={e => {
                    setDateGap('byCustom');
                  }} value={'byCustom'} className={'radio-choose-date-gap'} type="radio" id={'byCustom'}
                         name={'dateGap'}/>
                  <label
                    htmlFor="byCustom">自定义时间段</label>
                  {this.state.isRangePickerShow ?
                    <RangePicker
                      style={{
                        marginLeft: '10px',
                        verticalAlign: 'middle'
                      }}
                    /> : null}
                </div>
                <Button style={{
                  margin: '10px'
                }} type={'primary'}>导出</Button>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FixedPositionTrafficData;
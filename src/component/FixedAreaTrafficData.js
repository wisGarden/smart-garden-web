import React, {Component} from 'react';
import {Row, Col, Card, Tooltip, Tabs, DatePicker, Button, notification} from 'antd';
import {ResponsiveContainer, LineChart, Line, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar} from 'recharts';
import '../style/main.css'
import websocket from "../service/webSocketCof";
import config from "../service/config";
import api from "../service/api";
import {Player} from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";

const { RangePicker } = DatePicker;

const { TabPane } = Tabs;

const data = [];

class FixedAreaTrafficData extends Component {
  state = {
    isExportShow: true,
    dateGap: 'byWeek',
    isRangePickerShow: false,
    isSocketOpen: false,
    presentTrafficData: 0,
    fileName: '',
    fileDuringTime: '',
    historyData: [],
    exportExcelLink: '',
    densityLimit: 0,
    isWarningShownFlag: false,
    isSuccessShownFlag: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    api.getDensityLimit(localStorage.getItem('file_uuid'), res => {
      const result = res.data;
      if (result.result === 'true') {
        this.setState({
          densityLimit: result.message.site_density_limit
        });
      }
    });
    this.getWeekHistoryData();
    websocket.wsAreaConfig({
      file_uuid: this.props.location.hash.substr(1),
      onmessage: this.handleSocketOnMessage,
      onopen: this.handleSocketOnOpen,
      onclose: this.handleSocketOnClose,
      send: JSON.stringify({ 'file_path': decodeURI(localStorage.getItem('file_path')) })
    });
  }

  getWeek = () => {
    //按周日为一周的最后一天计算
    let date = new Date();
    //今天是这周的第几天
    let today = date.getDay();
    //上周日距离今天的天数（负数表示）
    let stepSunDay = -today + 1;
    // 如果今天是周日
    if (today === 0) {
      stepSunDay = -7;
    }
    // 周一距离今天的天数（负数表示）
    let stepMonday = 7 - today;
    let time = date.getTime();
    let monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
    let sunday = new Date(time + stepMonday * 24 * 3600 * 1000);
    //本周一的日期 （起始日期）
    let startDate = this.transferDate(monday); // 日期变换
    //本周日的日期 （结束日期）
    let endDate = this.transferDate(sunday); // 日期变换
    return [startDate, endDate];
  };

  getMonth = () => {
    // 获取当前月的第一天
    let start = new Date();
    start.setDate(1);
    // 获取当前月的最后一天
    let date = new Date();
    let currentMonth = date.getMonth();
    let nextMonth = ++currentMonth;
    let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    let oneDay = 1000 * 60 * 60 * 24;
    let end = new Date(nextMonthFirstDay - oneDay);
    let startDate = this.transferDate(start); // 日期变换
    let endDate = this.transferDate(end); // 日期变换
    return [startDate, endDate];
  };

  transferDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    return year + '/' + month + '/' + day;
  };

  getWeekHistoryData = () => {
    api.getFixedAreaTrafficData({
      start_date: (new Date(this.getWeek()[0])).getTime(),
      end_date: (new Date(this.getWeek()[1])).getTime(),
      file_uuid: localStorage.getItem('file_uuid')
    }, res => {
      this.setState({
        historyData: res.data.message,
      });
    })
  };

  getMonthHistoryData = () => {
    api.getFixedAreaTrafficData({
      start_date: (new Date(this.getMonth()[0])).getTime(),
      end_date: (new Date(this.getMonth()[1])).getTime(),
      file_uuid: localStorage.getItem('file_uuid')
    }, res => {
      this.setState({
        historyData: res.data.message,
      });
    })
  };

  getYearHistoryData = () => {
    const nowYear = (new Date()).getFullYear();
    const nowMonth = (new Date()).getMonth();
    let dataByYear = [];
    api.getFixedAreaTrafficData({
      start_date: (new Date(nowYear, 0, 1)).getTime(),
      end_date: (new Date()).getTime(),
      file_uuid: localStorage.getItem('file_uuid')
    }, res => {
      const allDatas = res.data.message;
      for (let month = 0; month <= nowMonth; month++) {
        const formatMonth = month >= 9 ? (month + 1).toString() : `0${month + 1}`;
        const sumArray = allDatas.filter((dataObj, index) => {
          const m = dataObj.datetime.substr(5, 2);
          return m === formatMonth;
        });
        const amount = sumArray.reduce((sum, curr) => {
          return sum + curr.density_data;
        }, 0);
        dataByYear.push({
          datetime: month >= 9 ? `${(month + 1).toString()}月` : `0${month + 1}月`,
          density_data: amount
        })
      }
      this.setState({
        historyData: dataByYear
      });
    })
  };

  getCustomHistoryData = (e) => {
    const start_date = (new Date(e[0])).getTime();
    const end_date = (new Date(e[1])).getTime();
    api.getFixedAreaTrafficData({
      start_date,
      end_date,
      file_uuid: localStorage.getItem('file_uuid'),
    }, res => {
      this.setState({
        historyData: res.data.message
      });
    })
  };

  handleSocketOnMessage = (e) => {
    const transdata = JSON.parse(e.data);
    const passenger_data = transdata['passenger_data'];
    data.push({
      name: '',
      traffic_data: passenger_data
    });
    this.setState({
      presentTrafficData: passenger_data / 10
    }, () => {
      if (this.state.presentTrafficData > this.state.densityLimit) {
        if (this.state.isWarningShownFlag === false) {
          notification.warning({
            message: '警报',
            description: '当前区域内人数已超过上限，请及时采取梳理措施，以防发生危险！',
            duration: 60
          });
          this.setState({
            isWarningShownFlag: true,
            isSuccessShownFlag: false
          })
        }
      } else {
        this.setState({
          isWarningShownFlag: false,
        }, () => {
          if (this.state.isSuccessShownFlag === false) {
            notification.success({
              message: '通知',
              description: '人数密集度警报已解除!',
              duration: 60,
            });
            this.setState({
              isSuccessShownFlag: true
            });
          }
        });
      }
    });
  };

  handleSocketOnOpen = (e) => {
    this.setState({
      isSocketOpen: true
    });
    console.log('socket is open');
  };

  handleSocketOnClose = (e) => {
    this.setState({
      isSocketOpen: false
    });
    console.log('The fixed area socket is closed');
  };


  render() {

    const chooseGap =
      this.state.isExportShow ? (
        <div>
        <span style={{
          marginRight: '24px'
        }}>
          <a
            className={'chart-gap-choose-anchor'}
            onClick={() => {
              this.getWeekHistoryData();
            }}
          >本周</a>
          <a
            className={'chart-gap-choose-anchor'}
            onClick={() => {
              this.getMonthHistoryData();
            }}
          >本月</a>
          <a
            className={'chart-gap-choose-anchor'}
            onClick={() => {
              this.getYearHistoryData();
            }}
          >全年</a>
        </span>
          <RangePicker onChange={e => {
            this.getCustomHistoryData(e);
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

    const handleExportExcelByWeek = () => {
      const start_date = (new Date(this.getWeek()[0])).getTime();
      const end_date = (new Date(this.getWeek()[1])).getTime();
      const file_uuid = localStorage.getItem('file_uuid');
      this.setState({
        exportExcelLink: `${config.apiUrl}/fixedArea/export_data/${start_date}/${end_date}/${file_uuid}`,
      });
    };

    const handleExportExcelByMonth = () => {
      const start_date = (new Date(this.getMonth()[0])).getTime();
      const end_date = (new Date(this.getMonth()[1])).getTime();
      const file_uuid = localStorage.getItem('file_uuid');
      this.setState({
        exportExcelLink: `${config.apiUrl}/fixedArea/export_data/${start_date}/${end_date}/${file_uuid}`,
      });
    };

    const handleExportExcelByYear = () => {
      const nowYear = (new Date()).getFullYear();
      const start_date = (new Date(nowYear, 0, 1)).getTime();
      const end_date = (new Date()).getTime();
      const file_uuid = localStorage.getItem('file_uuid');
      this.setState({
        exportExcelLink: `${config.apiUrl}/fixedArea/export_data/${start_date}/${end_date}/${file_uuid}`,
      });
    };

    const handleExportExcelByCustom = e => {
      const start_date = (new Date(e[0])).getTime();
      const end_date = (new Date(e[1])).getTime();
      const file_uuid = localStorage.getItem('file_uuid');
      this.setState({
        exportExcelLink: `${config.apiUrl}/fixedArea/export_data/${start_date}/${end_date}/${file_uuid}`,
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
        }}>{localStorage.getItem('file_name')}</span><span>{localStorage.getItem('file_during_time')}</span></p>
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
              src={`${config.apiUrl}/static${localStorage.getItem('file_path').replace('media/', '')}`}
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
                  <BarChart width={730} height={250} data={this.state.historyData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="datetime"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar name={'客流密度'} dataKey="density_data" fill="#82ca9d"/>
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
                  <input
                    onChange={e => {
                      setDateGap('byWeek');
                      handleExportExcelByWeek();
                    }}
                    value={'byWeek'}
                    className={'radio-choose-date-gap'}
                    type="radio"
                    id={'byWeek'}
                    name={'dateGap'}
                  />
                  <label htmlFor="byWeek">本周</label>
                </div>
                <div>
                  <input
                    onChange={e => {
                      setDateGap('byMonth');
                      handleExportExcelByMonth();
                    }}
                    value={'byMonth'}
                    className={'radio-choose-date-gap'}
                    type="radio"
                    id={'byMonth'}
                    name={'dateGap'}
                  />
                  <label htmlFor="byMonth">本月</label>
                </div>
                <div>
                  <input
                    onChange={e => {
                      setDateGap('byYear');
                      handleExportExcelByYear();
                    }}
                    value={'byYear'}
                    className={'radio-choose-date-gap'}
                    type="radio"
                    id={'byYear'}
                    name={'dateGap'}
                  />
                  <label htmlFor="byYear">本年</label>
                </div>
                <div>
                  <input
                    onChange={e => {
                      setDateGap('byCustom');
                    }}
                    value={'byCustom'}
                    className={'radio-choose-date-gap'}
                    type="radio"
                    id={'byCustom'}
                    name={'dateGap'}
                  />
                  <label htmlFor="byCustom">自定义时间段</label>
                  {this.state.isRangePickerShow ?
                    <RangePicker
                      onChange={e => {
                        handleExportExcelByCustom(e);
                      }}
                      style={{
                        marginLeft: '10px',
                        verticalAlign: 'middle'
                      }}
                    /> : null}
                </div>
                <Button style={{
                  margin: '10px'
                }} type={'primary'}>
                  <a href={`${this.state.exportExcelLink}`} target='_blank'>导出</a>
                </Button>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FixedAreaTrafficData;
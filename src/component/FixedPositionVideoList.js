import React, {Component} from 'react';
import {Card, Col, Row, Select, Spin} from 'antd';
import {Link} from 'react-router-dom';
import '../style/main.css';
import api from '../service/api';

const Option = Select.Option;

class FixedPositionVideoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fixed_pos_video_files: [],
      fixed_pos_video_files_show: [],
      fixed_pos_video_sites: [],
      isContentLoaded: false
    };
  }

  componentDidMount() {
    api.getAllVideoFiles(res => {
      this.setState({
        fixed_pos_video_files: res.data.files.filter(file => file.analyse_type === 'fixed-position'),
        fixed_pos_video_files_show: res.data.files.filter(file => file.analyse_type === 'fixed-position')
      }, _ => {
        this.setState({
          isContentLoaded: true
        });
      });
    });
    api.getSites(res => {
      this.setState({
        fixed_pos_video_sites: res.data.message.filter(site => site.site_analyse_type === 'fixed-position')
      });
    });
  }

  handleDuringTime = timeString => {
    let [start_time, end_time] = timeString.split('-');
    start_time = new Date(parseInt(start_time));
    end_time = new Date(parseInt(end_time));
    return {
      start_time: start_time.toLocaleString(),
      end_time: end_time.toLocaleString(),
      gap: end_time - start_time
    }
  };

  handleTimeFormat = mss => {
    const days = parseInt(mss / (1000 * 60 * 60 * 24));
    const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = (mss % (1000 * 60)) / 1000;
    return days + "天 " + hours + "小时 " + minutes + "分钟 " + seconds + "秒 ";
  };

  handleSiteFilter = sites => {
    if (sites.length === 0) {
      this.setState({
        fixed_pos_video_files_show: this.state.fixed_pos_video_files,
      });
    } else {
      this.setState({
        fixed_pos_video_files_show: this.state.fixed_pos_video_files.filter(file => sites.includes(file.file_site))
      });
    }
  };

  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Select
          mode="tags"
          size={'default'}
          placeholder="可筛选欲查看录像地点"
          onChange={sites => {
            this.handleSiteFilter(sites);
          }}
          style={{ width: '30%', marginBottom: '20px' }}
        >
          {
            this.state.fixed_pos_video_sites.map(site => (
              <Option key={site.site_name}>{site.site_name}</Option>
            ))
          }
        </Select>

        {
          !this.state.isContentLoaded ? (<Row>
            <Col style={{
              textAlign: 'center',
              margin: '30px auto',
            }}>
              <Spin size="large"/>
            </Col>
          </Row>) : (<Row gutter={16}>
            {
              this.state.fixed_pos_video_files_show.map((file, index) => (
                <Col span={6} key={index} style={{
                  marginBottom: '20px'
                }}>
                  <Link to={'/home/fixed-pos/yinxingdadao'}>
                    <Card
                      className='video-list-card'
                      bordered={false}
                      bodyStyle={{
                        padding: '5px'
                      }}
                    >
                      <img src={file.url_snap} alt="" style={{
                        width: '100%'
                      }}/>
                      <div style={{
                        textAlign: 'center'
                      }}>
                        <p style={{
                          fontWeight: 'bold',
                          margin: '5px 0',
                          fontSize: '1.1em',
                        }}>{file.file_site}</p>
                        <p style={{
                          marginBottom: '5px'
                        }}>{this.handleDuringTime(file.during_time).start_time}</p>
                        <p>{this.handleTimeFormat(this.handleDuringTime(file.during_time).gap)}</p>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>)
        }
      </div>
    );
  }
}

export default FixedPositionVideoList;
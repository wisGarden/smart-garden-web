import React, {Component} from 'react';
import {Card, Col, Row, Select, Spin} from 'antd';
import {Link} from 'react-router-dom';
import '../style/main.css';
import api from "../service/api";
import utils from '../service/utils';
import config from '../service/config';

const Option = Select.Option;

class FixedAreaVideoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fixed_area_video_files: [],
      fixed_area_video_files_show: [],
      fixed_area_video_sites: [],
      isContentLoaded: false
    };
  }

  componentDidMount() {
    api.getAllVideoFiles(res => {
      this.setState({
        fixed_area_video_files: res.data.files.filter(file => file.analyse_type === 'fixed-area'),
        fixed_area_video_files_show: res.data.files.filter(file => file.analyse_type === 'fixed-area')
      }, _ => {
        this.setState({
          isContentLoaded: true
        });
      });
    });
    api.getSites(res => {
      this.setState({
        fixed_area_video_sites: res.data.message.filter(site => site.site_analyse_type === 'fixed-area')
      });
    });
  }

  handleSiteFilter = sites => {
    if (sites.length === 0) {
      this.setState({
        fixed_area_video_files_show: this.state.fixed_area_video_files,
      });
    } else {
      this.setState({
        fixed_area_video_files_show: this.state.fixed_area_video_files.filter(file => sites.includes(file.file_site))
      });
    }
  };

  render() {
    return (
      <div>
        <p style={{
          fontWeight: 'bolder'
        }}>定区域客流密度分析</p>
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
              this.state.fixed_area_video_sites.map(site => (
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
                this.state.fixed_area_video_files_show.length === 0 ? (
                  <p style={{ textAlign: 'center' }}>暂无视频文件</p>) : (
                  this.state.fixed_area_video_files_show.map((file, index) => (
                    <Col span={6} key={index} style={{
                      marginBottom: '20px'
                    }}>
                      <Link to={{
                        pathname: `/home/fixed-area/analyse`,
                        hash: file.file_uuid,
                        state: {
                          file_path: file.file_path,
                          file_name: file.file_site,
                          file_during_time: utils.handleDuringTime(file.during_time).start_time
                        }
                      }}>
                        <Card
                          className='video-list-card'
                          bordered={false}
                          bodyStyle={{
                            padding: '5px'
                          }}
                          onClick={e => {
                            localStorage.setItem('file_path', file.file_path);
                            localStorage.setItem('file_uuid', file.file_uuid);
                            localStorage.setItem('file_name', file.file_site);
                            localStorage.setItem('file_during_time', utils.handleDuringTime(file.during_time).start_time);
                          }}
                        >
                          <img src={config.vodServerUrl + file.url_snap} alt="" style={{
                            width: '100%',
                            height: '150px'
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
                            }}>{utils.handleDuringTime(file.during_time).start_time}</p>
                            <p>{utils.handleTimeFormat(utils.handleDuringTime(file.during_time).gap)}</p>
                          </div>
                        </Card>
                      </Link>
                    </Col>
                  ))
                )
              }
            </Row>)
          }
        </div>
      </div>
    );
  }
}

export default FixedAreaVideoList;
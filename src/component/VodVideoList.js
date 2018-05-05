import React, {Component} from 'react';
import {Card, Col, Row, Select, Spin, Modal} from 'antd';
import '../style/main.css';
import api from '../service/api';
import config from '../service/config';
import utils from '../service/utils';

const Option = Select.Option;

class VodVideoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      all_video_files: [],
      all_video_files_show: [],
      all_video_sites: [],
      isContentLoaded: false,
      isVideoModalShow: false,
      showModalSite: '',
      showModalTime: '',
    };
  }

  componentDidMount() {
    api.getAllVideoFiles(res => {
      this.setState({
        all_video_files: res.data.files,
        all_video_files_show: res.data.files
      }, _ => {
        this.setState({
          isContentLoaded: true
        });
      });
    });
    api.getSites(res => {
      this.setState({
        all_video_sites: res.data.message
      });
    });
  }

  handleShowModal = (site, time) => {
    this.setState({
      isVideoModalShow: true,
      showModalSite: site,
      showModalTime: time
    });
  };

  handleCancelModal = () => {
    this.setState({
      isVideoModalShow: false,
    });
  };

  handleSiteFilter = sites => {
    if (sites.length === 0) {
      this.setState({
        all_video_files_show: this.state.all_video_files,
      });
    } else {
      this.setState({
        all_video_files_show: this.state.all_video_files.filter(file => sites.includes(file.file_site))
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
            this.state.all_video_sites.map(site => (
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
          </Row>) : (
            <Row gutter={16}>
              {
                this.state.all_video_files_show.length === 0 ? (<p style={{ textAlign: 'center' }}>暂无视频文件</p>) : (
                  this.state.all_video_files_show.map((file, index) => (
                    <Col span={6} key={index} style={{
                      marginBottom: '20px'
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
                          this.handleShowModal(file.file_site, utils.handleDuringTime(file.during_time).start_time);
                        }}
                      >
                        <img src={config.vodServerUrl + file.url_snap} alt="" style={{
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
                          }}>{utils.handleDuringTime(file.during_time).start_time}</p>
                          <p>{utils.handleTimeFormat(utils.handleDuringTime(file.during_time).gap)}</p>
                        </div>
                      </Card>
                    </Col>
                  ))
                )
              }
            </Row>)
        }
        <Modal
          title={this.state.showModalSite + ' | ' + this.state.showModalTime}
          visible={this.state.isVideoModalShow}
          onCancel={this.handleCancelModal}
          footer={null}
          destroyOnClose={true}
          width={816}
          bodyStyle={{
            width: '816px'
          }}
        >
          <iframe
            style={{
              width: '768px',
              height: '430px',
            }}
            title="vod"
            allowFullScreen="true"
            scrolling="no"
            src={`${config.vodServerUrl}/share.html?id=${localStorage.getItem('file_uuid')}&type=vod`}
            frameBorder="0"
          />

        </Modal>
      </div>
    );
  }
}

export default VodVideoList;
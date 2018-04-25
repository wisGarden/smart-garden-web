import React, {Component} from 'react';
import {List, Avatar, Popconfirm} from 'antd';
import api from '../service/api';
import utils from '../service/utils';

const analyse_type_map = {
  'fixed-position': '定点客流量分析',
  'fixed-area': '定区域客流密度分析'
};

class VideoFileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      videoFilesData: [],
    }
  }

  componentDidMount() {
    this.getAllVideoList();
  }

  getAllVideoList = () => {
    api.getAllVideoFiles(res => {
      const result = res.data;
      if (result.success === 'true') {
        this.setState({
          videoFilesData: result.files
        }, _ => {
          this.setState({
            loading: false
          });
        });
      }
      console.log(result.files);
    });
  };

  deleteVideoFile = file_uuid => {
    api.deleteVideoFile(file_uuid, res => {
      const result = res.data;
      if (result.success === 'true') {
        this.setState({
          loading: true
        });
        this.getAllVideoList();
      }
    });
  };

  render() {
    return (
      <List
        style={{
          width: '90%'
        }}
        loading={this.state.loading}
        itemLayout="horizontal"
        dataSource={this.state.videoFilesData}
        renderItem={videoFile => (
          <List.Item actions={[
            <Popconfirm
              title={`确定删除 ${videoFile.file_name} 么？`}
              onConfirm={() => {
                this.deleteVideoFile(videoFile.file_uuid);
              }}
              okText="删除"
              cancelText="取消">
              <a>删除文件</a>
            </Popconfirm>]}>
            <List.Item.Meta
              avatar={<Avatar size='large' shape='square' src={videoFile.url_snap}/>}
              title={<span>{videoFile.file_site}</span>}
              description={(
                <div>
                  <span>{utils.handleDuringTime(videoFile.during_time).start_time}</span><br/>
                  <span>{utils.handleTimeFormat(utils.handleDuringTime(videoFile.during_time).gap)}</span>
                </div>
              )}
            />
            <div>
              <span style={{ marginRight: '20px' }}>{analyse_type_map[videoFile.analyse_type]}</span>
              <span>{(videoFile.file_size / 1000 / 1000).toFixed(2)}MB</span>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default VideoFileList;
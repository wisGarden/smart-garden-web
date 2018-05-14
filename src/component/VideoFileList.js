import React, {Component} from 'react';
import {Modal, Avatar, Popconfirm, Table, Button, Input, message} from 'antd';
import api from '../service/api';
import utils from '../service/utils';
import config from '../service/config';

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
      isChangingName: false,
      changingFile: { file_name: '' },
      new_file_name: ''
    }
  }

  componentDidMount() {
    this.getAllVideoList();
  }

  columns = [
    {
      title: '视频缩略图',
      key: '1',
      width: 100,
      align: 'center',
      render: videoFile => {
        const snapPath = videoFile.url_snap;
        return <Avatar size='large' shape='square'
                       src={`${config.apiUrl}/static/${snapPath.replace('media/', '')}`}/>;
      }
    },
    { title: '视频地点', dataIndex: 'file_site', align: 'center', width: 100 },
    { title: '视频名称', dataIndex: 'file_name', align: 'center', width: 100 },
    {
      title: '视频时间',
      key: '4',
      align: 'center',
      width: 100,
      render: videoFile => (
        <span>{utils.handleDuringTime(videoFile.during_time).start_time}</span>
      )
    },
    {
      title: '视频长度',
      key: '5',
      width: 100,
      align: 'center',
      render: videoFile => (
        <span>{utils.handleTimeFormat(utils.handleDuringTime(videoFile.during_time).gap)}</span>
      )
    },
    {
      title: '分析类型',
      key: '6',
      width: 100,
      align: 'center',
      render: videoFile => (
        <span>{analyse_type_map[videoFile.analyse_type]}</span>
      )
    },
    {
      title: '视频大小',
      key: '7',
      width: 100,
      align: 'center',
      render: videoFile => (
        <span>{(videoFile.file_size / 1000 / 1000).toFixed(2)}MB</span>
      )
    },
    {
      title: '操作',
      key: '8',
      width: 100,
      align: 'center',
      render: videoFile => {
        return (
          <div>
            <a onClick={() => {
              this.setState({
                changingFile: videoFile,
                isChangingName: true,
                new_file_name: videoFile.file_name
              });
            }}>修改名称</a>
            <br/>
            <Popconfirm
              title={`确定删除 ${videoFile.file_name} 么？`}
              onConfirm={() => {
                this.deleteVideoFile(videoFile.file_uuid);
              }}
              okText="删除"
              cancelText="取消">
              <a>删除文件</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  handleChangeFileNameCancel = (e) => {
    this.setState({
      isChangingName: false,
      new_file_name: ''
    });
  };

  updateFileName = () => {
    const { file_uuid } = this.state.changingFile;
    const fileObj = { file_uuid, file_name: this.state.new_file_name };
    api.updateFileName(fileObj, res => {
      if (res.data.success === 'true') {
        message.success('文件名修改成功!');
        this.getAllVideoList();
        this.handleChangeFileNameCancel();
      } else {
        message.error('网络错误，请稍后重试!');
      }
    })
  };

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
    let videoFiles = this.state.videoFilesData.concat();
    videoFiles.forEach((video, index) => video.key = index);
    return (
      <div>
        <Modal
          visible={this.state.isChangingName}
          title={`正在修改${this.state.changingFile.file_name}的文件名`}
          onOk={this.handleChangeFileNameCancel}
          onCancel={this.handleChangeFileNameCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.updateFileName}>
              重置
            </Button>,
          ]}
        >
          <p>请输入文件名：</p>
          <Input
            value={this.state.new_file_name}
            placeholder={this.state.changingFile.file_name}
            onPressEnter={this.updateFileName}
            onChange={(e) => {
              this.setState({
                new_file_name: e.target.value,
              });
            }}
            type={'text'}
          />
        </Modal>
        <Table
          columns={this.columns}
          dataSource={videoFiles}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default VideoFileList;
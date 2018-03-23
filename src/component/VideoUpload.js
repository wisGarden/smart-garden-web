import React, {Component} from 'react';
import VideoUploadForm from './VideoUploadForm';
import {Card} from 'antd';

class VideoUpload extends Component {
  render() {
    return (
      <div style={{
        paddingTop: '20px'
      }}>
        <VideoUploadForm/>
        <Card title="上传说明" style={{ width: '70%', margin: 'auto' }}>
          <ul>
            <li style={{
              marginBottom: '10px'
            }}>支持上传的视频格式.mp4 .mpg .mpeg .wmv .avi .rmvb .mkv .flv .mov .3gpp .3gp .webm .m4v .mng .vob
            </li>
            <li style={{
              marginBottom: '10px'
            }}>支持上传的音频格式.mp3.wav
            </li>
            <li>您可以拖放视频文件到该页面</li>
          </ul>
        </Card>
      </div>
    );
  }
}

export default VideoUpload;
import React, {Component} from 'react';
import VideoUploadForm from './VideoUploadForm';

class VideoUpload extends Component {
  render() {
    return (
      <div>
        {/*<p>请填写表单上传录像视频文件</p>*/}
        <VideoUploadForm/>
      </div>
    );
  }
}

export default VideoUpload;
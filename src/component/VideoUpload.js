import React, {Component} from 'react';
import VideoUploadForm from './VideoUploadForm';

class VideoUpload extends Component {
  render() {
    return (
      <div style={{
        paddingTop: '20px'
      }}>
        <VideoUploadForm/>
      </div>
    );
  }
}

export default VideoUpload;
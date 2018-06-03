import React, {Component} from 'react';
import CameraForm from './CameraForm';

class Camera extends Component {
  render() {
    return (
      <div style={{
        paddingTop: '20px'
      }}>
        <p style={{
          fontWeight: 'bolder'
        }}>监控摄像机配置</p>
        <CameraForm/>
      </div>
    );
  };
}

export default Camera;
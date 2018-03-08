import React, {Component} from 'react';
import {Card, Col, Row} from 'antd';
import {Link} from 'react-router-dom';
import '../style/main.css';

class VideoList extends Component {
  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Link to={'/home/videolist/yinxingdadao'}>
              <Card className='video-list-card' bordered={false} onClick={e => {
                console.log(e);
              }} bodyStyle={{
                padding: '5px'
              }}>
                <img src="img/demo.png" alt="" style={{
                  width: '100%'
                }}/>
                <div style={{
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontWeight: 'bold',
                    margin: '5px 0',
                    fontSize: '1.1em',
                  }}>银杏大道</p>
                  <p style={{
                    marginBottom: '5px'
                  }}>2018 年 2 月 28 日</p>
                  <p>08:00 ~ 12:00</p>
                </div>
              </Card>
            </Link>
          </Col>
          <Col span={6}>
            <Card className='video-list-card' bordered={false} onClick={e => {
              console.log(e);
            }} bodyStyle={{
              padding: '5px'
            }}>
              <img src="img/demo.png" alt="" style={{
                width: '100%'
              }}/>
              <div style={{
                textAlign: 'center'
              }}>
                <p style={{
                  fontWeight: 'bold',
                  margin: '5px 0',
                  fontSize: '1.1em',
                }}>银杏大道</p>
                <p style={{
                  marginBottom: '5px'
                }}>2018 年 2 月 28 日</p>
                <p>08:00 ~ 12:00</p>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className='video-list-card' bordered={false} onClick={e => {
              console.log(e);
            }} bodyStyle={{
              padding: '5px'
            }}>
              <img src="img/demo.png" alt="" style={{
                width: '100%'
              }}/>
              <div style={{
                textAlign: 'center'
              }}>
                <p style={{
                  fontWeight: 'bold',
                  margin: '5px 0',
                  fontSize: '1.1em',
                }}>银杏大道</p>
                <p style={{
                  marginBottom: '5px'
                }}>2018 年 2 月 28 日</p>
                <p>08:00 ~ 12:00</p>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className='video-list-card' bordered={false} onClick={e => {
              console.log(e);
            }} bodyStyle={{
              padding: '5px'
            }}>
              <img src="img/demo.png" alt="" style={{
                width: '100%'
              }}/>
              <div style={{
                textAlign: 'center'
              }}>
                <p style={{
                  fontWeight: 'bold',
                  margin: '5px 0',
                  fontSize: '1.1em',
                }}>银杏大道</p>
                <p style={{
                  marginBottom: '5px'
                }}>2018 年 2 月 28 日</p>
                <p>08:00 ~ 12:00</p>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className='video-list-card' bordered={false} onClick={e => {
              console.log(e);
            }} bodyStyle={{
              padding: '5px'
            }}>
              <img src="img/demo.png" alt="" style={{
                width: '100%'
              }}/>
              <div style={{
                textAlign: 'center'
              }}>
                <p style={{
                  fontWeight: 'bold',
                  margin: '5px 0',
                  fontSize: '1.1em',
                }}>银杏大道</p>
                <p style={{
                  marginBottom: '5px'
                }}>2018 年 2 月 28 日</p>
                <p>08:00 ~ 12:00</p>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className='video-list-card' bordered={false} onClick={e => {
              console.log(e);
            }} bodyStyle={{
              padding: '5px'
            }}>
              <img src="img/demo.png" alt="" style={{
                width: '100%'
              }}/>
              <div style={{
                textAlign: 'center'
              }}>
                <p style={{
                  fontWeight: 'bold',
                  margin: '5px 0',
                  fontSize: '1.1em',
                }}>银杏大道</p>
                <p style={{
                  marginBottom: '5px'
                }}>2018 年 2 月 28 日</p>
                <p>08:00 ~ 12:00</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VideoList;
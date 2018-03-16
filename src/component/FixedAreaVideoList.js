import React, {Component} from 'react';
import {Card, Col, Row, Select} from 'antd';
import {Link} from 'react-router-dom';
import '../style/main.css';

const Option = Select.Option;

class FixedAreaVideoList extends Component {

  componentDidMount() {
    console.log('fixed area video list');
  }

  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Select
          mode="tags"
          size={'default'}
          placeholder="可筛选欲查看录像地点"
          onChange={(e) => {
            console.log(e);
          }}
          style={{ width: '30%', marginBottom: '20px' }}
        >
          <Option key={'door'}>银杏大道</Option>
          <Option key={'catin'}>二食堂</Option>
        </Select>

        <Row gutter={16}>
          <Col span={6}>
            <Link to={'/home/fixed-area/yinxingdadao'}>
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

export default FixedAreaVideoList;
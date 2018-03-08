import React, {Component} from 'react';
import {Layout, Row, Col, Card} from 'antd';

const { Header } = Layout;

class TrafficStatistics extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <iframe
              width='560'
              height='315'
              src='http://10.211.55.6:10080/api/play/27df52b0220811e88b4b8b5d102dc31d'
              frameBorder='0'
              allowFullScreen/>
          </Col>
          <Col span={12}>
            <Card title="活动情况预测" style={{ marginBottom: 24 }} bordered={false}>
              <ActiveChart/>
            </Card>
            <Card
              title="券核效率"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge
                format={(val) => {
                  switch (parseInt(val, 10)) {
                    case 20:
                      return '差';
                    case 40:
                      return '中';
                    case 60:
                      return '良';
                    case 80:
                      return '优';
                    default:
                      return '';
                  }
                }}
                title="跳出率"
                height={180}
                percent={87}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TrafficStatistics;
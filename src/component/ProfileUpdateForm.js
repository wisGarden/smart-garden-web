import React, {Component} from 'react';
import {Input, Tooltip, Icon, Row, Col, message} from 'antd';
import '../style/main.css';


class ProfileUpdateForm extends Component {
  state = {
    user_name: 'Admin',
    user_role: '管理员',
    user_mobile: '13298987678',
    user_email: '123@126.com',
    is_user_name_disable: true,
    is_user_mobile_disable: true,
    is_user_email_disable: true
  };

  render() {

    return (
      <div style={{
        padding: '20px',
        color: 'rgba(0,0,0,0.85)'
      }}>
        <Row>
          <Col span={4} style={{
            textAlign: 'right',
            lineHeight: '32px',
            marginRight: '10px',
            marginBottom: '20px',
          }}>
            <label htmlFor={'user_name'}>用户名</label>
          </Col>
          <Col span={8}>
            <Input id={'user_name'} onChange={(e) => {
              this.setState({
                user_name: e.target.value
              });
            }} value={this.state.user_name} disabled={this.state.is_user_name_disable}/>
          </Col>
          <Col span={1} className={'icon-hover'} style={{
            lineHeight: '32px',
            height: '32px',
            marginLeft: '15px'
          }}>
            {this.state.is_user_name_disable ?
              <Icon onClick={e => {
                this.setState({
                  is_user_name_disable: false
                });
              }} type="edit"/> :
              <Icon onClick={e => {
                this.setState({
                  is_user_name_disable: true
                }, () => {
                  message.success('用户名修改成功');
                });
              }} type={'check'}/>
            }
          </Col>
        </Row>

        <Row>
          <Col span={4} style={{
            textAlign: 'right',
            lineHeight: '32px',
            marginRight: '10px',
            marginBottom: '20px',
          }}>
            <label htmlFor={'user_role'}>用户角色&nbsp;
              <Tooltip title="用户角色不可修改">
                <Icon type="question-circle-o"/>
              </Tooltip></label>
          </Col>
          <Col span={8}>
            <Input id={'user_role'} onChange={(e) => {
              this.setState({
                user_role: e.target.value
              });
            }} value={this.state.user_role} disabled={true}/>
          </Col>
        </Row>

        <Row>
          <Col span={4} style={{
            textAlign: 'right',
            lineHeight: '32px',
            marginRight: '10px',
            marginBottom: '20px',
          }}>
            <label htmlFor={'user_mobile'}>联系方式</label>
          </Col>
          <Col span={8}>
            <Input id={'user_mobile'} onChange={(e) => {
              this.setState({
                user_mobile: e.target.value
              });
            }} value={this.state.user_mobile} disabled={this.state.is_user_mobile_disable}/>
          </Col>
          <Col span={1} className={'icon-hover'} style={{
            lineHeight: '32px',
            height: '32px',
            marginLeft: '15px'
          }}>
            {this.state.is_user_mobile_disable ?
              <Icon onClick={e => {
                this.setState({
                  is_user_mobile_disable: false
                });
              }} type="edit"/> :
              <Icon onClick={e => {
                this.setState({
                  is_user_mobile_disable: true
                }, () => {
                  message.success('联系方式修改成功');
                });
              }} type={'check'}/>
            }
          </Col>
        </Row>

        <Row>
          <Col span={4} style={{
            textAlign: 'right',
            lineHeight: '32px',
            marginRight: '10px',
            marginBottom: '20px',
          }}>
            <label htmlFor={'user_email'}>电子邮件</label>
          </Col>
          <Col span={8}>
            <Input id={'user_email'} onChange={(e) => {
              this.setState({
                user_email: e.target.value
              });
            }} value={this.state.user_email} disabled={this.state.is_user_email_disable}/>
          </Col>
          <Col span={1} className={'icon-hover'} style={{
            lineHeight: '32px',
            height: '32px',
            marginLeft: '15px'
          }}>
            {this.state.is_user_email_disable ?
              <Icon onClick={e => {
                this.setState({
                  is_user_email_disable: false
                });
              }} type="edit"/> :
              <Icon onClick={e => {
                this.setState({
                  is_user_email_disable: true
                }, () => {
                  message.success('电子邮件修改成功');
                });
              }} type={'check'}/>
            }
          </Col>
        </Row>
      </div>


    );
  }
}

export default ProfileUpdateForm;

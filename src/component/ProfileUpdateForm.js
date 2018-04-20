import React, {Component} from 'react';
import {Input, Tooltip, Icon, Row, Col, message} from 'antd';
import '../style/main.css';
import api from '../service/api';

const user_role_mapping = {
  '1': '管理员',
  '0': '工作人员'
};

class ProfileUpdateForm extends Component {
  state = {
    user_name: '',
    user_role: '',
    user_mobile: '',
    user_email: '',
    is_user_name_disable: true,
    is_user_mobile_disable: true,
    is_user_email_disable: true
  };

  componentDidMount() {
    const user_name = localStorage.getItem('user_name');
    api.getUserInfo(user_name, res => {
      const user = res.data;
      if (user.success) {
        const { user_name, user_mobile, user_email, user_role } = user;
        this.setState({
          user_name,
          user_mobile,
          user_email,
          user_role: user_role_mapping[user_role]
        }, () => {
          localStorage.setItem('user_mobile', this.state.user_mobile);
          localStorage.setItem('user_email', this.state.user_email)
        });
      }
    })
  }

  updateUserInfo = (type, successMes) => {
    const userObj = {
      user_name: localStorage.getItem('user_name'),
      user_new_name: this.state.user_name,
      user_mobile: this.state.user_mobile,
      user_email: this.state.user_email
    };
    console.log(userObj);
    api.updateUserInfo(userObj, res => {
      const result = res.data;
      console.log(result);
      if (result.success === 'true') {
        localStorage.setItem(type, result.message[type]);
        message.success(successMes);
        // window.location.reload();
      } else if (result.success === 'false' && result.message === 'the user name is used') {
        message.error('用户名已占用！');
        this.setState({
          user_name: localStorage.getItem('user_name'),
        });
      } else if (result.success === 'false' && result.message === 'wrong mobile') {
        message.error('联系方式格式错误！');
        this.setState({
          user_mobile: localStorage.getItem('user_mobile')
        });
      } else if (result.success === 'false' && result.message === 'wrong email') {
        message.error('邮箱格式错误！');
        this.setState({
          user_email: localStorage.getItem('user_email')
        });
      }
    });
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
              }, () => {
                // console.log(this.state.user_name);
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
                  this.updateUserInfo('user_name', '用户名修改成功');
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
                  this.updateUserInfo('user_mobile', '联系方式修改成功');
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
                  this.updateUserInfo('user_email', '电子邮件修改成功');
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

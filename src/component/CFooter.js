import React, {Component} from 'react';

// const pStyle = {
//   color: 'gray',
//   fontSize: '14px',
//   fontFamily: 'Arial, Helvetica, "Hiragino Sans GB", "Microsoft YaHei","WenQuanYi Micro Hei", sans-serif'
// };

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.setState({});
  }

  render() {
    return (
      <div className="footer">
        <p>Copyright © 2018
          <a style={{
            color: 'gray',
            textDecoration: 'none'
          }} href="http://www.bjfu.edu.cn."> BJFU </a> All rights reserved.</p>
      </div>
    );
  }
}

export default Footer;

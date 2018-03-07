import React, {Component} from 'react';

class EasyDSS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowsHeight: 0
    }
  }

  componentDidMount() {
    this.setState({
      windowsHeight: window.screen.availHeight
    });
  }

  render() {
    return (
      <div className="easydss">
        <iframe
          style={{
            marginTop: '-24px',
            marginRight: '-24px',
            marginBottom: '-24px',
            marginLeft: '-48px'
          }}
          title="easyDSS"
          allowFullScreen="true"
          width="100%"
          height={this.state.windowsHeight + 'px'}
          scrolling="no"
          src="http://10.211.55.6:10080/admin/main.html"
          frameBorder="0"
        />
      </div>
    );
  }
}

export default EasyDSS;

import React, {Component} from 'react';
import {Button} from 'antd';

class Demo extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">*/}
          {/*<h1 className="App-title">智慧园林</h1>*/}
        {/*</header>*/}
        {/*<p className="App-intro">*/}
          {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
          <Button type="primary">Button</Button>
        {/*</p>*/}
        {/*<iframe allowFullScreen="true" width="100%" height="1000px" frameborder="0" scrolling="no" src="http://10.211.55.6:10080/admin/main.html"></iframe>*/}
        
        <iframe width='560' height='315' src='http://10.211.55.6:10080/api/play/b2779a90017e11e8895a734ee1bad023' frameborder='0' allowfullscreen></iframe>
      </div>
    );
  }
}

export default Demo;

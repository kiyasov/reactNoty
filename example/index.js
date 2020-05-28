import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { notyConnect, NotyProvider, useNoty } from '../src';

import '../src/style/animate.css';
import '../src/style/noty.css';

@notyConnect
class NotyExample extends Component {
  showNoty = e => {
    e.preventDefault();

    this.props.noty.show({
      title: 'Success!',
      text: 'Hello, World!'
    });
  };

  showHookNoty = e => {
    e.preventDefault();

    let noty = useNoty();
    noty.show({
      title: 'Success hook!',
      text: 'Hello, World hook!'
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.showNoty}>Show noty</button>
        <button onClick={this.showHookNoty}>Show noty hook</button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <NotyProvider>
        <NotyExample />
      </NotyProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

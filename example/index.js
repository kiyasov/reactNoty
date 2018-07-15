import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { notyConnect, NotyProvider } from '../src';

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

  render() {
    return (
      <div>
        <button onClick={this.showNoty}>Show noty</button>
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

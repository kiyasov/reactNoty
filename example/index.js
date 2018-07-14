import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { notyConnect, NotyProvider } from '../src';
import { Button } from 'semantic-ui-react';

import '../src/style/animate.css';
import '../src/style/noty.css';
import 'semantic-ui-css/semantic.min.css';

@notyConnect
class NotyExample extends Component {
  showNoty = e => {
    e.preventDefault();

    this.props.noty.show({
      title: 'Success!',
      text: 'Hello, World!',
      type: 'success'
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.showNoty}>Show noty</Button>
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

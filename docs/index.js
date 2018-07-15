import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { notyConnect, NotyProvider } from '../src';
import {
  Segment,
  Divider,
  Container,
  Menu,
  Table,
  Header,
  Message
} from 'semantic-ui-react';

import '../src/style/animate.css';
import '../src/style/noty.css';
import '../src/style/themes/relax.css';

import './app.css';
import 'semantic-ui-css/semantic.min.css';

import Position from './components/notyType/Position';
import Template from './components/notyType/Template';
import Theme from './components/notyType/Theme';
import GroupNoty from './components/notyType/GroupNoty';

@notyConnect
class NotyExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'installation',
      defaultProps: {
        type: 'alert',
        ttl: 4000,
        position: 'topRight',
        animate: {
          open: 'bounceInRight',
          close: 'bounceOutRight'
        },
        isProgressBar: true,
        isCloseButton: true,
        template: false,
        props: {},
        theme: 'relax'
      }
    };
  }

  menuCLick = (e, { name }) => this.setState({ activeItem: name });

  isObject = object => {
    if (typeof object === 'object') return JSON.stringify(object);

    return String(object);
  };

  showTable = (settings = {}) => (
    <Table celled fixed padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>key</Table.HeaderCell>
          <Table.HeaderCell>value</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(settings).map(key => (
          <Table.Row key={key}>
            <Fragment>
              <Table.Cell>{key}</Table.Cell>
              <Table.Cell>{this.isObject(settings[key])}</Table.Cell>
            </Fragment>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  showGroup = (settings = {}) => (
    <Fragment>
      {_.size(settings) > 0 && this.showTable(settings)}
      <GroupNoty noty={this.props.noty} settings={settings} />
    </Fragment>
  );

  render() {
    const {
      state: { activeItem, defaultProps }
    } = this;

    return (
      <Container>
        <Menu pointing secondary>
          <Menu.Item
            name="installation"
            active={activeItem === 'installation'}
            onClick={this.menuCLick}
          />

          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.menuCLick}
          />

          <Menu.Item
            name="template"
            active={activeItem === 'template'}
            onClick={this.menuCLick}
          />

          <Menu.Item
            name="position"
            active={activeItem === 'position'}
            onClick={this.menuCLick}
          />

          <Menu.Item
            name="theme"
            active={activeItem === 'theme'}
            onClick={this.menuCLick}
          />

          <Menu.Menu position="right">
            <Menu.Item
              name="defaultProps"
              active={activeItem === 'defaultProps'}
              onClick={this.menuCLick}
            />
            <Menu.Item
              href="https://github.com/kiyasov/reactNoty"
              name="github"
              icon="github alternate"
            />
          </Menu.Menu>
        </Menu>

        {activeItem === 'installation' ? (
          <Segment padded>
            <Container>
              <Header as="h2">Install via NPM</Header>
              <Segment raised>npm i @kiyasov/noty --save</Segment>

              <Header as="h2">Install via Bower</Header>
              <Segment raised>bower install react-noty --save</Segment>

              <Header as="h2">Basic usage</Header>
              <Message raised>
                {`// index.js`}
                <br />
                <b>{`import React from 'react';`}</b>
                <br />
                <b>{`import ReactDOM from 'react-dom';`}</b>
                <br />
                <b> {`import { NotyProvider } from 'react-notie';`}</b>
                <br />
                <br />
                {`const App = (<NotyProvider><MyApp/></NotyProvider>);`} <br />
                <br />
                {`ReactDOM.render(App, document.getElementById('root'));`}
                <br />
                <br />
                {`// MyComponent.js`} <br />
                <b> {`import React, { Component } from 'react';`}</b> <br />
                <b>
                  {`import { notyConnect } from 'react-notie';`}
                </b> <br /> <br />
                {`class MyComponent extends Component {`} <br />
                <div
                  dangerouslySetInnerHTML={{
                    __html: `&nbsp; &nbsp;render() { <br />&nbsp; &nbsp;}`
                  }}
                />
                {`}`}
                <br />
                <br />
                {`export default notyConnect(MyComponent);`}
              </Message>
            </Container>
          </Segment>
        ) : activeItem === 'defaultProps' ? (
          <Segment padded>
            {this.showTable(defaultProps)}
            {this.showGroup()}
          </Segment>
        ) : activeItem === 'template' ? (
          <Template showGroup={this.showGroup} />
        ) : activeItem === 'position' ? (
          <Position showGroup={this.showGroup} />
        ) : activeItem === 'theme' ? (
          <Theme showGroup={this.showGroup} />
        ) : (
          <Segment padded>
            {this.showGroup()}
            <Divider horizontal>or</Divider>

            {this.showGroup({
              isCloseButton: false
            })}
            <Divider horizontal>Or</Divider>

            {this.showGroup({
              isCloseButton: false,
              ttl: 0
            })}
          </Segment>
        )}
      </Container>
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

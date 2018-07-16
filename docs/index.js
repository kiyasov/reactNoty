import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { notyConnect, NotyProvider } from '../src';
import { Segment, Divider, Container, Menu, Table } from 'semantic-ui-react';

import '../src/style/animate.css';
import '../src/style/noty.css';
import '../src/style/themes/relax.css';

import './app.css';
import 'semantic-ui-css/semantic.min.css';

import Position from './components/notyType/Position';
import Template from './components/notyType/Template';
import Theme from './components/notyType/Theme';
import GroupNoty from './components/notyType/GroupNoty';
import Installation from './components/Installation';

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
      },
      infoProps: {
        text: 'Only String',
        title: 'Only String',
        type:
          'alert, success, error, warning, info - ClassName generator uses this value → noty_type__${type}',
        ttl:
          '0, 1000, 3000, 3500, etc. Delay for closing event in milliseconds (ms). Set 0 for sticky notifications.',
        position:
          'top, topLeft, topCenter, topRight, center, centerLeft, centerRight, bottom, bottomLeft, bottomCenter, bottomRight - ClassName generator uses this value → noty_layout__${layout}',
        animate: {
          open: 'CSS class name',
          close: 'CSS class name'
        },
        isProgressBar:
          'true, false - Displays a progress bar if isProgressBar is not 0.',
        isCloseButton:
          'true, false - Displays a progress bar if isCloseButton is not false.',
        template: 'false or template',
        props: 'object props',
        theme:
          'mint, sunset, relax, nest, metroui, semanticui, light, bootstrap-v3, bootstrap-v4 - ClassName generator uses this value → noty_theme__${theme}'
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
          <Table.HeaderCell>Key</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Info</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(settings).map(key => (
          <Table.Row key={key}>
            <Fragment>
              <Table.Cell>{key}</Table.Cell>
              <Table.Cell>{this.isObject(settings[key])}</Table.Cell>
              <Table.Cell>
                {this.isObject(this.state.infoProps[key])}
              </Table.Cell>
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
          <Installation />
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

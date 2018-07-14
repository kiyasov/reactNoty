import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { notyConnect, NotyProvider } from '../src';
import {
  Button,
  Segment,
  Divider,
  Container,
  Menu,
  Table,
  Icon
} from 'semantic-ui-react';

import '../src/style/animate.css';
import '../src/style/noty.css';
import '../src/style/themes/relax.css';

import './app.css';
import 'semantic-ui-css/semantic.min.css';

@notyConnect
class NotyExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'home',
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

  showTable = (settings = {}) => {
    const props = {
      ...this.state.defaultProps,
      ...settings
    };

    return (
      <Table celled fixed padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>key</Table.HeaderCell>
            <Table.HeaderCell>value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(props).map(key => (
            <Table.Row key={key}>
              <Fragment>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{this.isObject(props[key])}</Table.Cell>
              </Fragment>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  showGroup = (settings = {}) => {
    const { noty } = this.props;

    return (
      <Button.Group widths="6">
        <Button
          color="green"
          onClick={() =>
            noty.show({
              title: 'Success',
              text: 'Hello, World!',
              type: 'success',
              ...settings
            })
          }
        >
          Success
        </Button>
        <Button
          color="red"
          onClick={() =>
            noty.show({
              title: 'Error',
              text: 'Bye Bye, World!',
              type: 'error',
              ...settings
            })
          }
        >
          Error
        </Button>
        <Button
          onClick={() =>
            noty.show({
              title: 'Alert',
              text: 'Hello, World!',
              type: 'alert',
              ...settings
            })
          }
        >
          Alert
        </Button>
        <Button
          color="blue"
          onClick={() =>
            noty.show({
              title: 'Info',
              text: "I'm tired!",
              type: 'info',
              ...settings
            })
          }
        >
          Info
        </Button>
        <Button
          color="yellow"
          onClick={() =>
            noty.show({
              title: 'Warning',
              text: 'Thank you for attention!',
              type: 'warning',
              ...settings
            })
          }
        >
          Warning
        </Button>
        <Button
          color="purple"
          onClick={() =>
            noty.show({
              title: 'Custom',
              text: 'Any class!',
              type: 'custom',
              ...settings
            })
          }
        >
          Custom
        </Button>
      </Button.Group>
    );
  };

  render() {
    const {
      state: { activeItem }
    } = this;

    return (
      <Container>
        <Menu pointing secondary>
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

        {activeItem === 'defaultProps' ? (
          <Segment padded>
            {this.showTable()}
            {this.showGroup()}
          </Segment>
        ) : activeItem === 'template' ? (
          <Segment padded>
            {this.showTable({
              text: 'Hello',
              template: `{{title}}! </br> {{text}}, {{props.name}} {{props.surname}}`,
              props: {
                name: 'Islam',
                surname: 'Kiyasov'
              }
            })}
            {this.showGroup({
              text: 'Hello',
              template: `{{title}}! </br> {{text}}, {{props.name}} {{props.surname}}`,
              props: {
                name: 'Islam',
                surname: 'Kiyasov'
              }
            })}
          </Segment>
        ) : (
          <Segment padded>
            {this.showTable()}
            {this.showGroup()}
            <Divider horizontal>or</Divider>
            {this.showTable({ isCloseButton: false })}
            {this.showGroup({
              isCloseButton: false
            })}
            <Divider horizontal>Or</Divider>
            {this.showTable({ isCloseButton: false, ttl: 0 })}
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

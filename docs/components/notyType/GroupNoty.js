import React, { Component } from 'react';

import { Button } from 'semantic-ui-react';

export default class GroupNoty extends Component {
  render() {
    const { noty, settings } = this.props;

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
  }
}

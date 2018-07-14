import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';

export default class Template extends Component {
  render() {
    const { showGroup } = this.props;

    return (
      <Segment padded>
        {showGroup({
          text: 'Hello',
          template: `{{title}}! </br> {{text}}, {{props.name}} {{props.surname}}`,
          props: {
            name: 'Islam',
            surname: 'Kiyasov'
          }
        })}
      </Segment>
    );
  }
}

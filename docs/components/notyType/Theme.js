import React, { Component } from 'react';

import { Segment, Divider } from 'semantic-ui-react';

import '../../../src/style/themes/bootstrap-v4.css';
import '../../../src/style/themes/bootstrap-v3.css';
import '../../../src/style/themes/metroui.css';
import '../../../src/style/themes/semanticui.css';
import '../../../src/style/themes/light.css';
import '../../../src/style/themes/nest.css';
import '../../../src/style/themes/relax.css';

export default class Theme extends Component {
  render() {
    const { showGroup } = this.props;

    return (
      <Segment padded>
        {showGroup({
          theme: 'metroui'
        })}
        <Divider horizontal>or</Divider>
        {showGroup({
          theme: 'light'
        })}
        <Divider horizontal>or</Divider>
        {showGroup({
          theme: 'relax'
        })}
        <Divider horizontal>or</Divider>
        {showGroup({
          theme: 'nest'
        })}
        <Divider horizontal>or</Divider>
        {showGroup({
          theme: 'semanticui'
        })}
        <Divider horizontal>or</Divider>
        {showGroup({
          theme: 'mint'
        })}
        <Divider horizontal>or</Divider>
        {showGroup({
          theme: 'bootstrap-v4'
        })}
        <Divider horizontal>or</Divider>
        {showGroup({
          theme: 'bootstrap-v3'
        })}
      </Segment>
    );
  }
}

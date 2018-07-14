import React, { Component } from 'react';

import { Segment, Divider } from 'semantic-ui-react';

export default class Position extends Component {
  render() {
    const { showGroup } = this.props;

    return (
      <Segment padded>
        {showGroup({
          position: 'topLeft',
          animate: {
            open: 'bounceInLeft',
            close: 'bounceOutLeft'
          }
        })}
        <Divider horizontal>or</Divider>

        {showGroup({
          position: 'bottomLeft',
          animate: {
            open: 'bounceInLeft',
            close: 'bounceOutLeft'
          }
        })}
        <Divider horizontal>or</Divider>

        {showGroup({
          position: 'bottomRight',
          animate: {
            open: 'bounceInRight',
            close: 'bounceOutRight'
          }
        })}
        <Divider horizontal>or</Divider>

        {showGroup({
          position: 'top',
          animate: {
            open: 'bounceInDown',
            close: 'bounceOutDown'
          }
        })}
        <Divider horizontal>or</Divider>

        {showGroup({
          position: 'bottom',
          animate: {
            open: 'bounceInUp',
            close: 'bounceOutUp'
          }
        })}
        <Divider horizontal>or</Divider>

        {showGroup({
          position: 'bottomCenter',
          animate: {
            open: 'bounceInUp',
            close: 'bounceOutUp'
          }
        })}
        <Divider horizontal>or</Divider>

        {showGroup({
          position: 'topCenter',
          animate: {
            open: 'bounceInDown',
            close: 'bounceOutDown'
          }
        })}
        <Divider horizontal>or</Divider>

        {showGroup({
          position: 'center',
          animate: {
            open: 'bounceIn',
            close: 'bounceOut'
          }
        })}
        <Divider horizontal>or</Divider>

        {showGroup({
          position: 'centerLeft',
          animate: {
            open: 'bounceInLeft',
            close: 'bounceOutLeft'
          }
        })}
        <Divider horizontal>or</Divider>

        {showGroup({
          position: 'centerRight',
          animate: {
            open: 'bounceInRight',
            close: 'bounceOutRight'
          }
        })}
      </Segment>
    );
  }
}

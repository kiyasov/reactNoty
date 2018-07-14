import React, { Component } from 'react';

import propTypes from './propTypes';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function notyConnect(WrappedComponent) {
  return class extends Component {
    static displayName = `notyConnect(${getDisplayName(WrappedComponent)})`;

    static contextTypes = {
      noty: propTypes
    };

    render() {
      return <WrappedComponent {...this.props} noty={this.context.noty} />;
    }
  };
}

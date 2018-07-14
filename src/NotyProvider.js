import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Noty from './Noty';

import propTypes from './propTypes';

export default class NotyProvider extends Component {
  static childContextTypes = {
    noty: propTypes
  };

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  getChildContext() {
    return {
      noty: {
        show: (...props) => this.noty.show(...props),
        on: (...props) => this.noty.on(...props),
        closeAll: (...props) => this.noty.closeAll(...props)
      }
    };
  }

  render() {
    const { children, ...rest } = this.props;

    return (
      <Fragment>
        {children}
        <Noty ref={c => (this.noty = c)} {...rest} />
      </Fragment>
    );
  }
}

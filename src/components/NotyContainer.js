import React, { Component, Fragment } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import { CSSTransition } from "react-css-transition";

CSSTransition.childContextTypes = {
  // this can be empty
};

export default class NotyContainer extends Component {
  constructor(props) {
    super(props);

    const { ttl } = this.props;

    this.state = {
      isShow: true,
      ttl: ttl / 1000,
      styleProgressBar: {
        width: `100%`
      }
    };
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired
  };

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  setInterval = () => {
    const { ttl } = this.props;

    if (!ttl) return;

    this.interval = setInterval(() => {
      this.ttl();
    }, 1000);

    setTimeout(() => {
      this.setState({
        styleProgressBar: {
          transition: `width ${ttl}ms linear`,
          width: `0%`
        }
      });
    }, 1000);
  };

  clearInterval = () => {
    const { ttl } = this.props;

    if (!ttl) return;

    clearInterval(this.interval);
  };

  componentDidMount() {
    const { emit, id } = this.props;

    this.setInterval();

    emit("onShow", id);
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  componentDidUpdate(prevProps) {
    const { ttl } = this.props;

    let { ttl: timeout } = prevProps;

    if (ttl !== timeout) {
      this.setState({
        ttl: ttl / 1000
      });
    }
  }

  ttl = () => {
    let { ttl } = this.state;

    if (ttl === 0) {
      this.clearInterval();
      this.onClose();
    } else {
      this.setState({
        ttl: --ttl
      });
    }
  };

  onClose = e => {
    if (e) e.preventDefault();

    const { id, onClose, isButton } = this.props;

    const type = _.toInteger(e.currentTarget.getAttribute("data-type"));

    if (isButton === 1) {
      this.setState({
        isShow: false
      });

      setTimeout(() => {
        onClose(id, type);
      }, 500);
    }
  };

  resetTtl = () => {
    const { ttl, emit, id } = this.props;

    if (ttl) {
      this.setState({
        ttl: ttl / 1000,
        styleProgressBar: {
          width: `100%`,
          transition: "width 0ms linear"
        }
      });

      this.clearInterval();
    }

    emit("onHover", id);
  };

  render() {
    const {
      text,
      title,
      id,
      animate,
      isProgressBar,
      isCloseButton,
      type,
      ttl,
      props,
      template,
      theme
    } = this.props;

    const { styleProgressBar, isShow } = this.state;

    return (
      <div
        id={id}
        onMouseEnter={this.resetTtl}
        onMouseLeave={this.setInterval}
        className={`animated ${
          isShow ? animate.open : animate.close
        } noty_bar noty_type__${type} noty_theme__${theme} noty_has_timeout noty_has_progressbar`}
      >
        <div onClick={this.onClose} className="noty_body" data-type="1">
          {template ? (
            <div
              dangerouslySetInnerHTML={{
                __html: _.reduce(
                  template.split(/({{[^}]*(?:}[^}]+)*}*}})/g).filter(Boolean),
                  (arr, item) => {
                    if (item.match(/({{[^}]*(?:}[^}]+)*}*}})/g)) {
                      item = eval(
                        _.trim(item.replace("{{", "").replace("}}", ""))
                      );
                    }

                    arr += item;
                    return arr;
                  },
                  ""
                )
              }}
            />
          ) : (
            <Fragment>
              {title.length ? (
                <div
                  className="notify-title"
                  dangerouslySetInnerHTML={{
                    __html: `${props.t ? props.t(title) : title}!`
                  }}
                />
              ) : null}
              {text.length ? (
                <div
                  className="notify-text"
                  dangerouslySetInnerHTML={{
                    __html: `${props.t ? props.t(text) : text}`
                  }}
                />
              ) : null}
            </Fragment>
          )}
        </div>
        {isProgressBar && ttl ? (
          <CSSTransition
            className="noty_progressbar"
            style={styleProgressBar}
          />
        ) : null}
        {isCloseButton ? (
          <div
            className="noty_close_button"
            onClick={this.onClose}
            data-type="2"
          >
            ×
          </div>
        ) : null}
      </div>
    );
  }
}

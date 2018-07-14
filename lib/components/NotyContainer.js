'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCssTransition = require('react-css-transition');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactCssTransition.CSSTransition.childContextTypes = {
  // this can be empty
};

var NotyContainer = function (_Component) {
  (0, _inherits3.default)(NotyContainer, _Component);

  function NotyContainer(props) {
    (0, _classCallCheck3.default)(this, NotyContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NotyContainer.__proto__ || Object.getPrototypeOf(NotyContainer)).call(this, props));

    _initialiseProps.call(_this);

    var ttl = _this.props.ttl;


    _this.state = {
      isShow: true,
      ttl: ttl / 1000,
      styleProgressBar: {
        width: '100%'
      }
    };
    return _this;
  }

  (0, _createClass3.default)(NotyContainer, [{
    key: 'componentDidCatch',
    value: function componentDidCatch(error, info) {
      console.error(error, info);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          emit = _props.emit,
          id = _props.id;


      this.setInterval();

      emit('onShow', id);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearInterval();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var ttl = this.props.ttl;
      var timeout = prevProps.ttl;


      if (ttl !== timeout) {
        this.setState({
          ttl: ttl / 1000
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          text = _props2.text,
          title = _props2.title,
          id = _props2.id,
          animate = _props2.animate,
          isProgressBar = _props2.isProgressBar,
          isCloseButton = _props2.isCloseButton,
          type = _props2.type,
          ttl = _props2.ttl,
          props = _props2.props,
          template = _props2.template,
          theme = _props2.theme;
      var _state = this.state,
          styleProgressBar = _state.styleProgressBar,
          isShow = _state.isShow;


      return _react2.default.createElement(
        'div',
        {
          id: id,
          onMouseEnter: this.resetTtl,
          onMouseLeave: this.setInterval,
          className: 'animated ' + (isShow ? animate.open : animate.close) + ' noty_bar noty_type__' + type + ' noty_theme__' + theme + ' noty_has_timeout noty_has_progressbar'
        },
        _react2.default.createElement(
          'div',
          { onClick: this.onClose, className: 'noty_body' },
          template ? _react2.default.createElement('div', {
            dangerouslySetInnerHTML: {
              __html: _lodash2.default.reduce(template.split(/({{[^}]*(?:}[^}]+)*}*}})/g).filter(Boolean), function (arr, item) {
                if (item.match(/({{[^}]*(?:}[^}]+)*}*}})/g)) {
                  item = eval(_lodash2.default.trim(item.replace('{{', '').replace('}}', '')));
                }

                arr += item;
                return arr;
              }, '')
            }
          }) : _react2.default.createElement(
            _react.Fragment,
            null,
            title.length ? _react2.default.createElement('div', {
              className: 'notify-title',
              dangerouslySetInnerHTML: {
                __html: (props.t ? props.t(title) : title) + '!'
              }
            }) : null,
            text.length ? _react2.default.createElement('div', {
              className: 'notify-text',
              dangerouslySetInnerHTML: {
                __html: '' + (props.t ? props.t(text) : text)
              }
            }) : null
          )
        ),
        isProgressBar && ttl ? _react2.default.createElement(_reactCssTransition.CSSTransition, {
          className: 'noty_progressbar',
          style: styleProgressBar
        }) : null,
        isCloseButton ? _react2.default.createElement(
          'div',
          { className: 'noty_close_button', onClick: this.onClose },
          '\xD7'
        ) : null
      );
    }
  }]);
  return NotyContainer;
}(_react.Component);

NotyContainer.propTypes = {
  onClose: _propTypes2.default.func.isRequired,
  emit: _propTypes2.default.func.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.setInterval = function () {
    var ttl = _this2.props.ttl;


    if (!ttl) return;

    _this2.interval = setInterval(function () {
      _this2.ttl();
    }, 1000);

    setTimeout(function () {
      _this2.setState({
        styleProgressBar: {
          transition: 'width ' + ttl + 'ms linear',
          width: '0%'
        }
      });
    }, 1000);
  };

  this.clearInterval = function () {
    var ttl = _this2.props.ttl;


    if (!ttl) return;

    clearInterval(_this2.interval);
  };

  this.ttl = function () {
    var ttl = _this2.state.ttl;


    if (ttl === 0) {
      _this2.clearInterval();
      _this2.onClose();
    } else {
      _this2.setState({
        ttl: --ttl
      });
    }
  };

  this.onClose = function (e) {
    if (e) e.preventDefault();

    var _props3 = _this2.props,
        id = _props3.id,
        onClose = _props3.onClose,
        isButton = _props3.isButton;


    _this2.setState({
      isShow: false
    });

    setTimeout(function () {
      if (!isButton) onClose(id, e && 1);else if (e.target.className.indexOf('noty_close_button') !== -1) onClose(id, 1);
    }, 500);
  };

  this.resetTtl = function () {
    var _props4 = _this2.props,
        ttl = _props4.ttl,
        emit = _props4.emit,
        id = _props4.id;


    if (ttl) {
      _this2.setState({
        ttl: ttl / 1000,
        styleProgressBar: {
          width: '100%',
          transition: 'width 0ms linear'
        }
      });

      _this2.clearInterval();
    }

    emit('onHover', id);
  };
};

exports.default = NotyContainer;
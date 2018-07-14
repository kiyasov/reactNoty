'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Noty = require('./Noty');

var _Noty2 = _interopRequireDefault(_Noty);

var _propTypes3 = require('./propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotyProvider = function (_Component) {
  (0, _inherits3.default)(NotyProvider, _Component);

  function NotyProvider() {
    (0, _classCallCheck3.default)(this, NotyProvider);
    return (0, _possibleConstructorReturn3.default)(this, (NotyProvider.__proto__ || Object.getPrototypeOf(NotyProvider)).apply(this, arguments));
  }

  (0, _createClass3.default)(NotyProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        noty: {
          show: function show() {
            var _noty;

            return (_noty = _this2.noty).show.apply(_noty, arguments);
          },
          on: function on() {
            var _noty2;

            return (_noty2 = _this2.noty).on.apply(_noty2, arguments);
          },
          closeAll: function closeAll() {
            var _noty3;

            return (_noty3 = _this2.noty).closeAll.apply(_noty3, arguments);
          }
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          rest = (0, _objectWithoutProperties3.default)(_props, ['children']);


      return _react2.default.createElement(
        _react.Fragment,
        null,
        children,
        _react2.default.createElement(_Noty2.default, (0, _extends3.default)({ ref: function ref(c) {
            return _this3.noty = c;
          } }, rest))
      );
    }
  }]);
  return NotyProvider;
}(_react.Component);

NotyProvider.childContextTypes = {
  noty: _propTypes4.default
};
NotyProvider.propTypes = {
  children: _propTypes2.default.node.isRequired
};
exports.default = NotyProvider;
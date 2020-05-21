"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Noty = _interopRequireDefault(require("./Noty"));

var _propTypes2 = _interopRequireDefault(require("./propTypes"));

var _jsxFileName = "/Users/islamkiasov/Desktop/\u041F\u0440\u043E\u0435\u043A\u0442\u044B/\u041C\u043E\u0434\u0443\u043B\u0438/reactNoty/src/NotyProvider.js";

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = (0, _getPrototypeOf2["default"])(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0, _possibleConstructorReturn2["default"])(this, result);
  };
}

var NotyProvider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(NotyProvider, _Component);

  var _super = _createSuper(NotyProvider);

  function NotyProvider() {
    (0, _classCallCheck2["default"])(this, NotyProvider);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(NotyProvider, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this = this;

      return {
        noty: {
          show: function show() {
            var _this$noty;

            return (_this$noty = _this.noty).show.apply(_this$noty, arguments);
          },
          on: function on() {
            var _this$noty2;

            return (_this$noty2 = _this.noty).on.apply(_this$noty2, arguments);
          },
          closeAll: function closeAll() {
            var _this$noty3;

            return (_this$noty3 = _this.noty).closeAll.apply(_this$noty3, arguments);
          }
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          rest = (0, _objectWithoutProperties2["default"])(_this$props, ["children"]);
      return (
        /*#__PURE__*/
        _react["default"].createElement(_react.Fragment, {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30,
            columnNumber: 7
          }
        }, children,
        /*#__PURE__*/
        _react["default"].createElement(_Noty["default"], (0, _extends2["default"])({
          ref: function ref(c) {
            return _this2.noty = c;
          }
        }, rest, {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32,
            columnNumber: 9
          }
        })))
      );
    }
  }]);
  return NotyProvider;
}(_react.Component);

exports["default"] = NotyProvider;
NotyProvider.childContextTypes = {
  noty: _propTypes2["default"]
};
NotyProvider.propTypes = {
  children: _propTypes["default"].node.isRequired
};
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = notyConnect;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _NotyContext = require("./NotyContext");

var _jsxFileName = "/Users/islamkiasov/Desktop/\u041F\u0440\u043E\u0435\u043A\u0442\u044B/\u041C\u043E\u0434\u0443\u043B\u0438/reactNoty/src/notyConnect.js";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

function notyConnect(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(_class, _Component);

    var _super = _createSuper(_class);

    function _class() {
      (0, _classCallCheck2["default"])(this, _class);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(_class, [{
      key: "render",
      value: function render() {
        var _this = this;

        return /*#__PURE__*/_react["default"].createElement(_NotyContext.NotyContext.Consumer, {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 14,
            columnNumber: 9
          }
        }, function (_ref) {
          var notyContext = _ref.notyContext;
          return /*#__PURE__*/_react["default"].createElement(WrappedComponent, (0, _extends2["default"])({}, _this.props, {
            noty: notyContext,
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 16,
              columnNumber: 20
            }
          }));
        });
      }
    }]);
    return _class;
  }(_react.Component), _class.displayName = "notyConnect(".concat(getDisplayName(WrappedComponent), ")"), _temp;
}
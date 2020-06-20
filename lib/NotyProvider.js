"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NotyProvider;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _Noty = _interopRequireDefault(require("./Noty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _NotyContext = require("./NotyContext");

var _jsxFileName = "/Users/islamkiasov/Desktop/\u041F\u0440\u043E\u0435\u043A\u0442\u044B/\u041C\u043E\u0434\u0443\u043B\u0438/reactNoty/src/NotyProvider.js";

function NotyProvider(props) {
  var _useState = (0, _react.useState)(_NotyContext.notyInterface),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      notyContext = _useState2[0],
      setNotyContext = _useState2[1];

  function changeContext(newContext) {
    if (_lodash["default"].get(notyContext, "show") !== newContext.show) {
      setNotyContext(newContext);
    }
  }

  return /*#__PURE__*/_react["default"].createElement(_NotyContext.NotyContext.Provider, {
    value: {
      notyContext: notyContext,
      changeContext: changeContext
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, props.children, /*#__PURE__*/_react["default"].createElement(_Noty["default"], (0, _extends2["default"])({}, props.rest, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }
  })));
}
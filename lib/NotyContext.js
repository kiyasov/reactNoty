"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotyContext = exports.notyInterface = void 0;

var _react = _interopRequireDefault(require("react"));

var notyInterface = null;
exports.notyInterface = notyInterface;

var NotyContext = _react["default"].createContext({
  notyInterface: notyInterface,
  changeContext: function changeContext() {}
});

exports.NotyContext = NotyContext;
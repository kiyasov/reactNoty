"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _default = _propTypes["default"].shape({
  show: _propTypes["default"].func.isRequired,
  on: _propTypes["default"].func.isRequired,
  closeAll: _propTypes["default"].func.isRequired
});

exports["default"] = _default;
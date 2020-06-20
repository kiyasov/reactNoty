"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _events = _interopRequireDefault(require("events"));

var _NotyContainer = _interopRequireDefault(require("./components/NotyContainer"));

var _lodash = _interopRequireDefault(require("lodash"));

var _jsxFileName = "/Users/js/proj/guys/reactNoty/src/Noty.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var positionList = ["topRight", "topLeft", "top", "bottom", "bottomLeft", "bottomRight", "topCenter", "center", "centerLeft", "centerRight", "bottomCenter"];

var Noty = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Noty, _Component);

  var _super = _createSuper(Noty);

  function Noty(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Noty);
    _this = _super.call(this, _props);

    _this.resetTtl = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          notyList = _assertThisInitialize.state.notyList,
          notyRef = _assertThisInitialize.notyRef;

      var _iterator = _createForOfIteratorHelper(notyList),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var noty = _step.value;
          notyRef[noty.id].resetTtl();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };

    _this.resumeAll = function () {
      var _assertThisInitialize2 = (0, _assertThisInitialized2["default"])(_this),
          notyList = _assertThisInitialize2.state.notyList,
          notyRef = _assertThisInitialize2.notyRef;

      var _iterator2 = _createForOfIteratorHelper(notyList),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var noty = _step2.value;
          notyRef[noty.id].setInterval();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };

    _this.show = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var settings,
            _assertThisInitialize3,
            _assertThisInitialize4,
            notyList,
            notyQueue,
            isFirst,
            maxVisible,
            notyRef,
            thisNoty,
            _args = arguments;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                settings = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _assertThisInitialize3 = (0, _assertThisInitialized2["default"])(_this), _assertThisInitialize4 = _assertThisInitialize3.state, notyList = _assertThisInitialize4.notyList, notyQueue = _assertThisInitialize4.notyQueue, isFirst = _assertThisInitialize4.isFirst, maxVisible = _assertThisInitialize3.props.maxVisible, notyRef = _assertThisInitialize3.notyRef;

                if (!isFirst) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 100);
                });

              case 5:
                _this.setState({
                  isFirst: false
                });

                _context.next = 10;
                break;

              case 8:
                _context.next = 10;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 100 * notyList.length);
                });

              case 10:
                thisNoty = _objectSpread(_objectSpread(_objectSpread({}, _this.props), settings), {}, {
                  id: _lodash["default"].uniqueId("noty_"),
                  emitter: new _events["default"](),
                  on: function on() {
                    var _this$emitter;

                    (_this$emitter = this.emitter).on.apply(_this$emitter, arguments);
                  },
                  off: function off() {
                    var _this$emitter2;

                    (_this$emitter2 = this.emitter).off.apply(_this$emitter2, arguments);
                  },
                  close: function close() {
                    notyRef[this.id].onClose();
                  },
                  stop: function stop() {
                    notyRef[this.id].resetTtl();
                  },
                  resume: function resume() {
                    notyRef[this.id].setInterval();
                  }
                });

                if (maxVisible === notyList.length) {
                  _this.setState({
                    notyQueue: _lodash["default"].concat(notyQueue, thisNoty)
                  });

                  _this.Emitter.emit("onQueue", {
                    type: "push",
                    noty: thisNoty
                  });
                } else {
                  _this.setState({
                    notyList: _lodash["default"].concat(notyList, thisNoty)
                  });
                }

                return _context.abrupt("return", thisNoty);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function () {
        return _ref.apply(this, arguments);
      };
    }();

    _this.queueShift = function () {
      var _this$state = _this.state,
          notyQueue = _this$state.notyQueue,
          notyList = _this$state.notyList;

      if (notyQueue.length > 0) {
        var noty = notyQueue.shift();

        _this.Emitter.emit("onQueue", {
          type: "shift",
          noty: noty
        });

        _this.setState({
          notyQueue: notyQueue,
          notyList: _lodash["default"].concat(notyList, noty)
        });
      }
    };

    _this.on = function () {
      var _this$Emitter;

      return (_this$Emitter = _this.Emitter).on.apply(_this$Emitter, arguments);
    };

    _this.onClose = function (id) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var notyList = _this.state.notyList;

      switch (type) {
        case 1:
          _this.emit("onClick", id);

          break;

        case 2:
          _this.emit("onClickCloseButton", id);

          break;
      }

      _this.emit("onClose", id);

      _this.setState({
        notyList: _lodash["default"].filter(notyList, function (e) {
          return e.id !== id;
        })
      });

      _this.queueShift();
    };

    _this.emit = function (alias, id) {
      var notyList = _this.state.notyList;

      var noty = _lodash["default"].find(notyList, ["id", id]);

      if (noty) {
        noty.emitter.emit(alias, noty);

        _this.Emitter.emit(alias, noty);
      }
    };

    _this.closeAll = function () {
      var notyList = _this.state.notyList;

      _this.setState({
        notyList: _lodash["default"].map(notyList, function (e) {
          e.ttl = 0;
          return e;
        })
      });

      _this.Emitter.emit("onCloseAll", notyList);
    };

    _this.state = {
      isFirst: true,
      notyList: [],
      notyQueue: []
    };
    _this.Emitter = new _events["default"]();
    _this.notyRef = {};
    return _this;
  }

  (0, _createClass2["default"])(Noty, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("blur", this.resetTtl);
      window.addEventListener("focus", this.resumeAll);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var notyList = this.state.notyList;
      return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 236,
          columnNumber: 7
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        id: "notyContainer",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 237,
          columnNumber: 9
        }
      }, positionList.map(function (position) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: position,
          id: "noty_layout__".concat(position),
          __self: _this2,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 239,
            columnNumber: 13
          }
        }, _lodash["default"].filter(notyList, ["position", position]).map(function (noty) {
          return /*#__PURE__*/_react["default"].createElement(_NotyContainer["default"], (0, _extends2["default"])({
            ref: function ref(e) {
              return _this2.notyRef[noty.id] = e;
            },
            key: noty.id
          }, noty, {
            onClose: _this2.onClose,
            emit: _this2.emit,
            __self: _this2,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 241,
              columnNumber: 17
            }
          }));
        }));
      })));
    }
  }]);
  return Noty;
}(_react.Component);

exports["default"] = Noty;
Noty.defaultProps = {
  maxVisible: 5,
  type: "alert",
  title: "",
  text: "",
  ttl: 4000,
  position: "topRight",
  animate: {
    open: "bounceInRight",
    close: "bounceOutRight"
  },
  isProgressBar: true,
  isCloseButton: true,
  isButton: true,
  isVisibility: true,
  template: false,
  props: {},
  theme: "relax"
};
Noty.propTypes = {
  maxVisible: _propTypes["default"].number,
  type: _propTypes["default"].string,
  ttl: function ttl(props, propName, componentName) {
    return !(_lodash["default"].toInteger(props[propName]) === 0 || _lodash["default"].toInteger(props[propName]) >= 1000) && new Error("Invalid prop ".concat(propName, " supplied to ").concat(componentName, " Validation failed. \n Minimal ttl 1000"));
  },
  template: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].bool]),
  position: _propTypes["default"].oneOf(positionList),
  animate: _propTypes["default"].shape({
    open: _propTypes["default"].string,
    close: _propTypes["default"].string
  }),
  isProgressBar: _propTypes["default"].bool,
  isCloseButton: _propTypes["default"].bool,
  isButton: _propTypes["default"].bool,
  text: _propTypes["default"].string,
  title: _propTypes["default"].string,
  isVisibility: _propTypes["default"].bool,
  props: _propTypes["default"].object,
  theme: _propTypes["default"].string
};
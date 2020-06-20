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

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _events = _interopRequireDefault(require("events"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactUse = require("react-use");

var _NotyContext = require("./NotyContext");

var _NotyContainer = _interopRequireDefault(require("./components/NotyContainer"));

var _useNoty3 = _interopRequireDefault(require("./hooks/useNoty"));

var _this = void 0,
    _jsxFileName = "/Users/islamkiasov/Desktop/\u041F\u0440\u043E\u0435\u043A\u0442\u044B/\u041C\u043E\u0434\u0443\u043B\u0438/reactNoty/src/Noty.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var positionList = ["topRight", "topLeft", "top", "bottom", "bottomLeft", "bottomRight", "topCenter", "center", "centerLeft", "centerRight", "bottomCenter"];
var useNotyList = (0, _reactUse.createGlobalState)([]);

var Noty = function Noty(props) {
  var _useContext = (0, _react.useContext)(_NotyContext.NotyContext),
      changeContext = _useContext.changeContext;

  var _useNotyList = useNotyList(),
      _useNotyList2 = (0, _slicedToArray2["default"])(_useNotyList, 2),
      notyList = _useNotyList2[0],
      setNotyList = _useNotyList2[1];

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      notyQueue = _useState2[0],
      setNotyQueue = _useState2[1];

  var emitter = new _events["default"]();
  var notyRef = {};

  var resetTtl = function resetTtl() {
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

  var resumeAll = function resumeAll() {
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

  var _show = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var settings,
          maxVisible,
          newNoty,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              settings = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              maxVisible = props.maxVisible;
              _context.next = 4;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100 * notyList.length);
              });

            case 4:
              newNoty = _objectSpread(_objectSpread(_objectSpread({}, props), settings), {}, {
                id: _lodash["default"].uniqueId("noty_"),
                emitter: new _events["default"](),
                on: function on() {
                  emitter.on.apply(emitter, arguments);
                },
                off: function off() {
                  emitter.off.apply(emitter, arguments);
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
                setNotyQueue(_lodash["default"].concat(notyQueue, newNoty));
                emitter.emit("onQueue", {
                  type: "push",
                  noty: newNoty
                });
              } else {
                setNotyList(_lodash["default"].concat(notyList, newNoty));
              }

              return _context.abrupt("return", newNoty);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function show() {
      return _ref.apply(this, arguments);
    };
  }();

  var queueShift = function queueShift() {
    if (notyQueue.length === 0) {
      return;
    }

    var noty = notyQueue.shift();
    emitter.emit("onQueue", {
      type: "shift",
      noty: noty
    });
    setNotyQueue(notyQueue);
    setNotyList(_lodash["default"].concat(notyList, noty));
  };

  var _on = function on() {
    return emitter.on.apply(emitter, arguments);
  };

  var emit = function emit(alias, id) {
    var noty = _lodash["default"].find(notyList, ["id", id]);

    if (noty) {
      noty.emitter.emit(alias, noty);
      emitter.emit(alias, noty);
    }
  };

  var onClose = function onClose(id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    switch (type) {
      case 1:
        emit("onClick", id);
        break;

      case 2:
        emit("onClickCloseButton", id);
        break;
    }

    emit("onClose", id);
    setNotyList(_lodash["default"].filter(notyList, function (e) {
      return e.id !== id;
    }));
    queueShift();
  };

  var _closeAll = function closeAll() {
    setNotyList(_lodash["default"].map(notyList, function (e) {
      e.ttl = 0;
      return e;
    }));
    emitter.emit("onCloseAll", notyList);
  };

  (0, _react.useEffect)(function () {
    window.addEventListener("blur", resetTtl);
    window.addEventListener("focus", resumeAll);

    var _useNoty = (0, _useNoty3["default"])(),
        setInterface = _useNoty.setInterface;

    setInterface({
      show: function show() {
        return _show.apply(void 0, arguments);
      },
      on: function on() {
        return _on.apply(void 0, arguments);
      },
      closeAll: function closeAll() {
        return _closeAll.apply(void 0, arguments);
      }
    });
  }, []);
  (0, _react.useEffect)(function () {
    var _useNoty2 = (0, _useNoty3["default"])(),
        setInterface = _useNoty2.setInterface;

    setInterface({
      show: function show() {
        return _show.apply(void 0, arguments);
      },
      on: function on() {
        return _on.apply(void 0, arguments);
      },
      closeAll: function closeAll() {
        return _closeAll.apply(void 0, arguments);
      }
    });
    changeContext({
      show: function show() {
        return _show.apply(void 0, arguments);
      },
      on: function on() {
        return _on.apply(void 0, arguments);
      },
      closeAll: function closeAll() {
        return _closeAll.apply(void 0, arguments);
      }
    });
  }, [notyList.length]);
  (0, _reactUse.useMount)(function () {
    changeContext({
      show: function show() {
        return _show.apply(void 0, arguments);
      },
      on: function on() {
        return _on.apply(void 0, arguments);
      },
      closeAll: function closeAll() {
        return _closeAll.apply(void 0, arguments);
      }
    });
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "notyContainer",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 5
    }
  }, positionList.map(function (position) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: position,
      id: "noty_layout__".concat(position),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 176,
        columnNumber: 9
      }
    }, _lodash["default"].filter(notyList, ["position", position]).map(function (noty) {
      return /*#__PURE__*/_react["default"].createElement(_NotyContainer["default"], (0, _extends2["default"])({
        ref: function ref(e) {
          return notyRef[noty.id] = e;
        },
        key: noty.id
      }, noty, {
        onClose: onClose,
        emit: emit,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178,
          columnNumber: 13
        }
      }));
    }));
  }));
};

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
var _default = Noty;
exports["default"] = _default;
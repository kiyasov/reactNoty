"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _NotyContainer = require("./components/NotyContainer");

var _NotyContainer2 = _interopRequireDefault(_NotyContainer);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var positionList = ["topRight", "topLeft", "top", "bottom", "bottomLeft", "bottomRight", "topCenter", "center", "centerLeft", "centerRight", "bottomCenter"];

var Noty = function (_Component) {
  (0, _inherits3.default)(Noty, _Component);

  function Noty(props) {
    (0, _classCallCheck3.default)(this, Noty);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Noty.__proto__ || Object.getPrototypeOf(Noty)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      isFirst: true,
      notyList: [],
      notyQueue: []
    };

    _this.Emitter = new _events2.default();
    _this.notyRef = {};
    return _this;
  }

  (0, _createClass3.default)(Noty, [{
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


      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          "div",
          { id: "notyContainer" },
          positionList.map(function (position) {
            return _react2.default.createElement(
              "div",
              { key: position, id: "noty_layout__" + position },
              _lodash2.default.filter(notyList, ["position", position]).map(function (noty) {
                return _react2.default.createElement(_NotyContainer2.default, (0, _extends3.default)({
                  ref: function ref(e) {
                    return _this2.notyRef[noty.id] = e;
                  },
                  key: noty.id
                }, noty, {
                  onClose: _this2.onClose,
                  emit: _this2.emit
                }));
              })
            );
          })
        )
      );
    }
  }]);
  return Noty;
}(_react.Component);

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
  maxVisible: _propTypes2.default.number,
  type: _propTypes2.default.string,
  ttl: function ttl(props, propName, componentName) {
    return !(_lodash2.default.toInteger(props[propName]) === 0 || _lodash2.default.toInteger(props[propName]) >= 1000) && new Error("Invalid prop " + propName + " supplied to " + componentName + " Validation failed. \n Minimal ttl 1000");
  },
  template: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
  position: _propTypes2.default.oneOf(positionList),
  animate: _propTypes2.default.shape({
    open: _propTypes2.default.string,
    close: _propTypes2.default.string
  }),
  isProgressBar: _propTypes2.default.bool,
  isCloseButton: _propTypes2.default.bool,
  isButton: _propTypes2.default.bool,
  text: _propTypes2.default.string,
  title: _propTypes2.default.string,
  isVisibility: _propTypes2.default.bool,
  props: _propTypes2.default.object,
  theme: _propTypes2.default.string
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.resetTtl = function () {
    var notyList = _this3.state.notyList,
        notyRef = _this3.notyRef;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

      for (var _iterator = notyList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var noty = _step.value;

        notyRef[noty.id].resetTtl();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  this.resumeAll = function () {
    var notyList = _this3.state.notyList,
        notyRef = _this3.notyRef;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {

      for (var _iterator2 = notyList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var noty = _step2.value;

        notyRef[noty.id].setInterval();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  };

  this.show = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _state, notyList, notyQueue, isFirst, maxVisible, notyRef, thisNoty;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _state = _this3.state, notyList = _state.notyList, notyQueue = _state.notyQueue, isFirst = _state.isFirst, maxVisible = _this3.props.maxVisible, notyRef = _this3.notyRef;

              if (!isFirst) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });

            case 4:

              _this3.setState({
                isFirst: false
              });
              _context.next = 9;
              break;

            case 7:
              _context.next = 9;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100 * notyList.length);
              });

            case 9:
              thisNoty = (0, _extends3.default)({}, _this3.props, settings, {
                id: _lodash2.default.uniqueId("noty_"),
                emitter: new _events2.default(),
                on: function on() {
                  var _emitter;

                  (_emitter = this.emitter).on.apply(_emitter, arguments);
                },
                off: function off() {
                  var _emitter2;

                  (_emitter2 = this.emitter).off.apply(_emitter2, arguments);
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
                _this3.setState({
                  notyQueue: _lodash2.default.concat(notyQueue, thisNoty)
                });

                _this3.Emitter.emit("onQueue", {
                  type: "push",
                  noty: thisNoty
                });
              } else {
                _this3.setState({
                  notyList: _lodash2.default.concat(notyList, thisNoty)
                });
              }

              return _context.abrupt("return", thisNoty);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this3);
    }));

    return function () {
      return _ref.apply(this, arguments);
    };
  }();

  this.queueShift = function () {
    var _state2 = _this3.state,
        notyQueue = _state2.notyQueue,
        notyList = _state2.notyList;


    if (notyQueue.length > 0) {
      var noty = notyQueue.shift();

      _this3.Emitter.emit("onQueue", {
        type: "shift",
        noty: noty
      });

      _this3.setState({
        notyQueue: notyQueue,
        notyList: _lodash2.default.concat(notyList, noty)
      });
    }
  };

  this.on = function () {
    var _Emitter;

    return (_Emitter = _this3.Emitter).on.apply(_Emitter, arguments);
  };

  this.onClose = function (id) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var notyList = _this3.state.notyList;


    switch (type) {
      case 1:
        _this3.emit("onClick", id);
        break;
      case 2:
        _this3.emit("onClickCloseButton", id);
        break;
    }

    _this3.emit("onClose", id);

    _this3.setState({
      notyList: _lodash2.default.filter(notyList, function (e) {
        return e.id !== id;
      })
    });

    _this3.queueShift();
  };

  this.emit = function (alias, id) {
    var notyList = _this3.state.notyList;

    var noty = _lodash2.default.find(notyList, ["id", id]);

    if (noty) {
      noty.emitter.emit(alias, noty);
      _this3.Emitter.emit(alias, noty);
    }
  };

  this.closeAll = function () {
    var notyList = _this3.state.notyList;


    _this3.setState({
      notyList: _lodash2.default.map(notyList, function (e) {
        e.ttl = 0;
        return e;
      })
    });

    _this3.Emitter.emit("onCloseAll", notyList);
  };
};

exports.default = Noty;
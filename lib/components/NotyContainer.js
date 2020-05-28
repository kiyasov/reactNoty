"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactCssTransition = require("react-css-transition");

var _jsxFileName = "/Users/js/proj/guys/reactNoty/src/components/NotyContainer.js";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

_reactCssTransition.CSSTransition.childContextTypes = {// this can be empty
}; // export default notyContainer({ ttl }) {
//   let [isShow, setIsShow] = useState(true);
//   let [notyLiveTime, setNotyLiveTime] = useState(ttl / 1000);
//   let [styleProgressBar, setStyleProgressBar] = useState({
//     width: `100%`
//   });
//
//
// }

var NotyContainer = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(NotyContainer, _Component);

  var _super = _createSuper(NotyContainer);

  function NotyContainer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, NotyContainer);
    _this = _super.call(this, props);

    _this.setInterval = function () {
      var ttl = _this.props.ttl;
      if (!ttl) return;
      _this.interval = setInterval(function () {
        _this.ttl();
      }, 1000);
      setTimeout(function () {
        _this.setState({
          styleProgressBar: {
            transition: "width ".concat(ttl, "ms linear"),
            width: "0%"
          }
        });
      }, 1000);
    };

    _this.clearInterval = function () {
      var ttl = _this.props.ttl;
      if (!ttl) return;
      clearInterval(_this.interval);
    };

    _this.ttl = function () {
      var ttl = _this.state.ttl;

      if (ttl === 0) {
        _this.clearInterval();

        _this.onClose();
      } else {
        _this.setState({
          ttl: --ttl
        });
      }
    };

    _this.onClose = function (e) {
      if (e) e.preventDefault();
      var _this$props = _this.props,
          id = _this$props.id,
          onClose = _this$props.onClose,
          isButton = _this$props.isButton;

      var type = _lodash["default"].toInteger(e ? e.currentTarget.getAttribute("data-type") : 0);

      if (!isButton && type === 1) return false;

      _this.setState({
        isShow: false
      });

      setTimeout(function () {
        onClose(id, type);
      }, 500);
    };

    _this.resetTtl = function () {
      var _this$props2 = _this.props,
          ttl = _this$props2.ttl,
          emit = _this$props2.emit,
          id = _this$props2.id;

      if (ttl) {
        _this.setState({
          ttl: ttl / 1000,
          styleProgressBar: {
            width: "100%",
            transition: "width 0ms linear"
          }
        });

        _this.clearInterval();
      }

      emit("onHover", id);
    };

    var _ttl = _this.props.ttl;
    _this.state = {
      isShow: true,
      ttl: _ttl / 1000,
      styleProgressBar: {
        width: "100%"
      }
    };
    return _this;
  }

  (0, _createClass2["default"])(NotyContainer, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      console.error(error, info);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
          emit = _this$props3.emit,
          id = _this$props3.id;
      this.setInterval();
      emit("onShow", id);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearInterval();
    }
  }, {
    key: "componentDidUpdate",
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
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          text = _this$props4.text,
          title = _this$props4.title,
          id = _this$props4.id,
          animate = _this$props4.animate,
          isProgressBar = _this$props4.isProgressBar,
          isCloseButton = _this$props4.isCloseButton,
          type = _this$props4.type,
          ttl = _this$props4.ttl,
          props = _this$props4.props,
          template = _this$props4.template,
          theme = _this$props4.theme;
      var _this$state = this.state,
          styleProgressBar = _this$state.styleProgressBar,
          isShow = _this$state.isShow;
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: id,
        onMouseEnter: this.resetTtl,
        onMouseLeave: this.setInterval,
        className: "animated ".concat(isShow ? animate.open : animate.close, " noty_bar noty_type__").concat(type, " noty_theme__").concat(theme, " noty_has_timeout noty_has_progressbar"),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163,
          columnNumber: 7
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        onClick: this.onClose,
        className: "noty_body",
        "data-type": "1",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 171,
          columnNumber: 9
        }
      }, template ? /*#__PURE__*/_react["default"].createElement("div", {
        dangerouslySetInnerHTML: {
          __html: _lodash["default"].reduce(template.split(/({{[^}]*(?:}[^}]+)*}*}})/g).filter(Boolean), function (arr, item) {
            if (item.match(/({{[^}]*(?:}[^}]+)*}*}})/g)) {
              item = eval(_lodash["default"].trim(item.replace("{{", "").replace("}}", "")));
            }

            arr += item;
            return arr;
          }, "")
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 173,
          columnNumber: 13
        }
      }) : /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192,
          columnNumber: 13
        }
      }, title.length ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "notify-title",
        dangerouslySetInnerHTML: {
          __html: "".concat(props.t ? props.t(title) : title, "!")
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 194,
          columnNumber: 17
        }
      }) : null, text.length ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "notify-text",
        dangerouslySetInnerHTML: {
          __html: "".concat(props.t ? props.t(text) : text)
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 202,
          columnNumber: 17
        }
      }) : null)), isProgressBar && ttl ? /*#__PURE__*/_react["default"].createElement(_reactCssTransition.CSSTransition, {
        className: "noty_progressbar",
        style: styleProgressBar,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 213,
          columnNumber: 11
        }
      }) : null, isCloseButton ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "noty_close_button",
        onClick: this.onClose,
        "data-type": "2",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219,
          columnNumber: 11
        }
      }, "\xD7") : null);
    }
  }]);
  return NotyContainer;
}(_react.Component);

exports["default"] = NotyContainer;
NotyContainer.propTypes = {
  onClose: _propTypes["default"].func.isRequired,
  emit: _propTypes["default"].func.isRequired
};
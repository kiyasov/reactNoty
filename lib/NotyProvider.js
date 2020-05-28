"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NotyProvider;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _Noty = _interopRequireDefault(require("./Noty"));

var _jsxFileName = "/Users/js/proj/guys/reactNoty/src/NotyProvider.js";

// import propTypes from './propTypes';
function NotyProvider(props) {
  var _this = this;

  var context = _react["default"].useContext({
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
  });

  return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 5
    }
  }, props.children, /*#__PURE__*/_react["default"].createElement(_Noty["default"], (0, _extends2["default"])({
    ref: function ref(c) {
      return _this.noty = c;
    }
  }, props.rest, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }
  })));
} // export default class NotyProvider extends Component {
//   static childContextTypes = {
//     noty: propTypes
//   };
//
//   static propTypes = {
//     children: PropTypes.node.isRequired
//   };
//
//   getChildContext() {
//     return {
//       noty: {
//         show: (...props) => this.noty.show(...props),
//         on: (...props) => this.noty.on(...props),
//         closeAll: (...props) => this.noty.closeAll(...props)
//       }
//     };
//   }
//
//   render() {
//     const { children, ...rest } = this.props;
//
//     return (
//       <Fragment>
//         {children}
//         <Noty ref={c => (this.noty = c)} {...rest} />
//       </Fragment>
//     );
//   }
// }
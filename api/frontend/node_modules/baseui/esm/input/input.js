function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { getSharedProps } from './utils.js';
import BaseInput from './base-input.js';
import { Root as StyledRoot, InputEnhancer as StyledInputEnhancer } from './styled-components.js';
import { SIZE, ADJOINED, ENHANCER_POSITION } from './constants.js';

var Input =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Input)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFocused: _this.props.autoFocus || false
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (e) {
      _this.setState({
        isFocused: true
      });

      _this.props.onFocus(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (e) {
      _this.setState({
        isFocused: false
      });

      _this.props.onBlur(e);
    });

    return _this;
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          startEnhancer = _this$props.startEnhancer,
          endEnhancer = _this$props.endEnhancer,
          _this$props$overrides = _this$props.overrides,
          RootOverride = _this$props$overrides.Root,
          StartEnhancerOverride = _this$props$overrides.StartEnhancer,
          EndEnhancerOverride = _this$props$overrides.EndEnhancer,
          restOverrides = _objectWithoutProperties(_this$props$overrides, ["Root", "StartEnhancer", "EndEnhancer"]),
          restProps = _objectWithoutProperties(_this$props, ["startEnhancer", "endEnhancer", "overrides"]);

      var _getOverrides = getOverrides(RootOverride, StyledRoot),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          Root = _getOverrides2[0],
          rootProps = _getOverrides2[1];

      var _getOverrides3 = getOverrides(StartEnhancerOverride, StyledInputEnhancer),
          _getOverrides4 = _slicedToArray(_getOverrides3, 2),
          StartEnhancer = _getOverrides4[0],
          startEnhancerProps = _getOverrides4[1];

      var _getOverrides5 = getOverrides(EndEnhancerOverride, StyledInputEnhancer),
          _getOverrides6 = _slicedToArray(_getOverrides5, 2),
          EndEnhancer = _getOverrides6[0],
          endEnhancerProps = _getOverrides6[1];

      var sharedProps = getSharedProps(this.props, this.state);

      if (process.env.NODE_ENV !== "production") {
        if (this.props.error && this.props.positive) {
          // eslint-disable-next-line no-console
          console.warn("[Input] `error` and `positive` are both set to `true`. `error` will take precedence but this may not be what you want.");
        }
      }

      return React.createElement(Root, _extends({
        "data-baseweb": "input"
      }, sharedProps, rootProps, {
        $adjoined: getAdjoinedProp(startEnhancer, endEnhancer),
        $hasIconTrailing: this.props.clearable || this.props.type == 'password'
      }), startEnhancer && React.createElement(StartEnhancer, _extends({}, sharedProps, startEnhancerProps, {
        $position: ENHANCER_POSITION.start
      }), typeof startEnhancer === 'function' ? startEnhancer(sharedProps) : startEnhancer), React.createElement(BaseInput, _extends({}, restProps, {
        overrides: restOverrides,
        adjoined: getAdjoinedProp(startEnhancer, endEnhancer),
        onFocus: this.onFocus,
        onBlur: this.onBlur
      })), endEnhancer && React.createElement(EndEnhancer, _extends({}, sharedProps, endEnhancerProps, {
        $position: ENHANCER_POSITION.end
      }), typeof endEnhancer === 'function' ? endEnhancer(sharedProps) : endEnhancer));
    }
  }]);

  return Input;
}(React.Component);

_defineProperty(Input, "defaultProps", {
  autoComplete: 'on',
  autoFocus: false,
  disabled: false,
  name: '',
  error: false,
  onBlur: function onBlur() {},
  onFocus: function onFocus() {},
  overrides: {},
  required: false,
  size: SIZE.default,
  startEnhancer: null,
  endEnhancer: null,
  clearable: false,
  type: 'text'
});

function getAdjoinedProp(startEnhancer, endEnhancer) {
  if (startEnhancer && endEnhancer) {
    return ADJOINED.both;
  } else if (startEnhancer) {
    return ADJOINED.left;
  } else if (endEnhancer) {
    return ADJOINED.right;
  }

  return ADJOINED.none;
}

export default Input;
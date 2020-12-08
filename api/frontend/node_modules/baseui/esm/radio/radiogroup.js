function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
import { RadioGroupRoot as StyledRadioGroupRoot } from './styled-components.js';
import { isFocusVisible } from '../utils/focusVisible.js';

var StatelessRadioGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StatelessRadioGroup, _React$Component);

  function StatelessRadioGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StatelessRadioGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StatelessRadioGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFocusVisible: false,
      focusedRadioIndex: -1
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (event, index) {
      if (isFocusVisible(event)) {
        _this.setState({
          isFocusVisible: true
        });
      }

      _this.setState({
        focusedRadioIndex: index
      });

      _this.props.onFocus && _this.props.onFocus(event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (event, index) {
      if (_this.state.isFocusVisible !== false) {
        _this.setState({
          isFocusVisible: false
        });
      }

      _this.setState({
        focusedRadioIndex: -1
      });

      _this.props.onBlur && _this.props.onBlur(event);
    });

    return _this;
  }

  _createClass(StatelessRadioGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (process.env.NODE_ENV !== "production" && this.props.isError) {
        console.warn('baseui:Radio Property "isError" will be removed in the next major version. Use "error" property instead.');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$overrides = this.props.overrides,
          overrides = _this$props$overrides === void 0 ? {} : _this$props$overrides;

      var _getOverrides = getOverrides(overrides.RadioGroupRoot, StyledRadioGroupRoot),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          RadioGroupRoot = _getOverrides2[0],
          radioGroupRootProps = _getOverrides2[1];

      if (process.env.NODE_ENV !== "production") {
        var overrideKeys = Object.keys(overrides); // TODO(v11)

        if (overrideKeys.length && !overrideKeys.includes('RadioGroupRoot')) {
          // eslint-disable-next-line no-console
          console.warn("All overrides beside 'RadioGroupRoot' will be deprecated in the next major version update.\n          Pass other overrides to the 'Radio' children instead.\n        ");
        }
      }

      return React.createElement(RadioGroupRoot, _extends({
        id: this.props.id,
        role: "radiogroup",
        "aria-describedby": this.props['aria-describedby'],
        "aria-errormessage": this.props['aria-errormessage'],
        "aria-invalid": this.props.error || this.props.isError || null,
        "aria-label": this.props['aria-label'],
        "aria-labelledby": this.props['aria-labelledby'],
        $align: this.props.align,
        $disabled: this.props.disabled,
        $isError: this.props.error || this.props.isError,
        $error: this.props.error || this.props.isError,
        $required: this.props.required
      }, radioGroupRootProps), React.Children.map(this.props.children, function (child, index) {
        if (!React.isValidElement(child)) {
          return null;
        }

        var checked = _this2.props.value === child.props.value;
        return React.cloneElement(child, {
          align: _this2.props.align,
          autoFocus: _this2.props.autoFocus,
          checked: checked,
          disabled: _this2.props.disabled || child.props.disabled,
          isError: _this2.props.isError,
          error: _this2.props.error,
          isFocused: _this2.state.focusedRadioIndex === index,
          isFocusVisible: _this2.state.isFocusVisible,
          tabIndex: index === 0 && !_this2.props.value || checked ? '0' : '-1',
          labelPlacement: _this2.props.labelPlacement,
          name: _this2.props.name,
          onBlur: function onBlur(e) {
            return _this2.handleBlur(e, index);
          },
          onFocus: function onFocus(e) {
            return _this2.handleFocus(e, index);
          },
          onChange: _this2.props.onChange,
          onMouseEnter: _this2.props.onMouseEnter,
          onMouseLeave: _this2.props.onMouseLeave,
          // will need to remove overrides pass-through on next major version
          overrides: _objectSpread({}, _this2.props.overrides, {}, child.props.overrides)
        });
      }));
    }
  }]);

  return StatelessRadioGroup;
}(React.Component);

_defineProperty(StatelessRadioGroup, "defaultProps", {
  name: '',
  value: '',
  disabled: false,
  autoFocus: false,
  labelPlacement: 'right',
  align: 'vertical',
  isError: false,
  error: false,
  required: false,
  onChange: function onChange() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  overrides: {}
});

export default StatelessRadioGroup;
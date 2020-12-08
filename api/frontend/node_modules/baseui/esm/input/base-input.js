function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

/* global window */
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { ADJOINED, SIZE, CUSTOM_INPUT_TYPE } from './constants.js';
import { InputContainer as StyledInputContainer, Input as StyledInput, StyledClearIcon, StyledClearIconContainer, StyledMaskToggleButton } from './styled-components.js';
import { getSharedProps } from './utils.js';
import Hide from '../icon/hide.js';
import Show from '../icon/show.js';
import createEvent from '../utils/create-event.js';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible.js';

var NullComponent = function NullComponent() {
  return null;
};

var BaseInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BaseInput, _React$Component);

  function BaseInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BaseInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BaseInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "inputRef", _this.props.inputRef || React.createRef());

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFocused: _this.props.autoFocus || false,
      isMasked: _this.props.type === 'password',
      initialType: _this.props.type,
      isFocusVisibleForClear: false,
      isFocusVisibleForMaskToggle: false
    });

    _defineProperty(_assertThisInitialized(_this), "onInputKeyDown", function (e) {
      if (_this.props.clearOnEscape && e.key === 'Escape' && _this.inputRef.current) {
        _this.clearValue(); // prevent event from closing modal or doing something unexpected


        e.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClearIconClick", function () {
      if (_this.inputRef.current) _this.clearValue(); // return focus to the input after click

      if (_this.inputRef.current) _this.inputRef.current.focus();
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

    _defineProperty(_assertThisInitialized(_this), "handleFocusForMaskToggle", function (event) {
      if (isFocusVisible(event)) {
        _this.setState({
          isFocusVisibleForMaskToggle: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlurForMaskToggle", function (event) {
      if (_this.state.isFocusVisibleForMaskToggle !== false) {
        _this.setState({
          isFocusVisibleForMaskToggle: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocusForClear", function (event) {
      if (isFocusVisible(event)) {
        _this.setState({
          isFocusVisibleForClear: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlurForClear", function (event) {
      if (_this.state.isFocusVisibleForClear !== false) {
        _this.setState({
          isFocusVisibleForClear: false
        });
      }
    });

    return _this;
  }

  _createClass(BaseInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          autoFocus = _this$props.autoFocus,
          clearable = _this$props.clearable;

      if (this.inputRef.current) {
        if (autoFocus) {
          this.inputRef.current.focus();
        }

        if (clearable) {
          this.inputRef.current.addEventListener('keydown', this.onInputKeyDown);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var clearable = this.props.clearable;

      if (clearable && this.inputRef.current) {
        this.inputRef.current.removeEventListener('keydown', this.onInputKeyDown);
      }
    }
  }, {
    key: "clearValue",
    value: function clearValue() {
      // trigger a fake input change event (as if all text was deleted)
      var input = this.inputRef.current;

      if (input) {
        var nativeInputValue = Object.getOwnPropertyDescriptor(this.props.type === CUSTOM_INPUT_TYPE.textarea ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype, 'value');

        if (nativeInputValue) {
          var nativeInputValueSetter = nativeInputValue.set;

          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(input, '');
            var event = createEvent('input');
            input.dispatchEvent(event);
          }
        }
      }
    }
  }, {
    key: "getInputType",
    value: function getInputType() {
      // If the type prop is equal to "password" we allow the user to toggle between
      // masked and non masked text. Internally, we toggle between type "password"
      // and "text".
      if (this.props.type === 'password') {
        return this.state.isMasked ? 'password' : 'text';
      } else {
        return this.props.type;
      }
    }
  }, {
    key: "renderMaskToggle",
    value: function renderMaskToggle() {
      var _SIZE$mini$SIZE$compa,
          _this2 = this;

      if (this.props.type !== 'password') return null;

      var _getOverrides = getOverrides(this.props.overrides.MaskToggleButton, StyledMaskToggleButton),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          MaskToggleButton = _getOverrides2[0],
          maskToggleButtonProps = _getOverrides2[1];

      var _getOverrides3 = getOverrides(this.props.overrides.MaskToggleShowIcon, Show),
          _getOverrides4 = _slicedToArray(_getOverrides3, 2),
          MaskToggleShowIcon = _getOverrides4[0],
          maskToggleIconShowProps = _getOverrides4[1];

      var _getOverrides5 = getOverrides(this.props.overrides.MaskToggleHideIcon, Hide),
          _getOverrides6 = _slicedToArray(_getOverrides5, 2),
          MaskToggleHideIcon = _getOverrides6[0],
          maskToggleIconHideProps = _getOverrides6[1];

      var label = this.state.isMasked ? 'Show password text' : 'Hide password text';
      var iconSize = (_SIZE$mini$SIZE$compa = {}, _defineProperty(_SIZE$mini$SIZE$compa, SIZE.mini, '12px'), _defineProperty(_SIZE$mini$SIZE$compa, SIZE.compact, '16px'), _defineProperty(_SIZE$mini$SIZE$compa, SIZE.default, '20px'), _defineProperty(_SIZE$mini$SIZE$compa, SIZE.large, '24px'), _SIZE$mini$SIZE$compa)[this.props.size];
      return React.createElement(MaskToggleButton, _extends({
        $size: this.props.size,
        $isFocusVisible: this.state.isFocusVisibleForMaskToggle,
        "aria-label": label,
        onClick: function onClick() {
          return _this2.setState(function (state) {
            return {
              isMasked: !state.isMasked
            };
          });
        },
        title: label,
        type: "button"
      }, maskToggleButtonProps, {
        onFocus: forkFocus(maskToggleButtonProps, this.handleFocusForMaskToggle),
        onBlur: forkBlur(maskToggleButtonProps, this.handleBlurForMaskToggle)
      }), this.state.isMasked ? React.createElement(MaskToggleShowIcon, _extends({
        size: iconSize,
        title: label
      }, maskToggleIconShowProps)) : React.createElement(MaskToggleHideIcon, _extends({
        size: iconSize,
        title: label
      }, maskToggleIconHideProps)));
    }
  }, {
    key: "renderClear",
    value: function renderClear() {
      var _SIZE$mini$SIZE$compa2,
          _this3 = this;

      var _this$props2 = this.props,
          clearable = _this$props2.clearable,
          value = _this$props2.value,
          disabled = _this$props2.disabled,
          _this$props2$override = _this$props2.overrides,
          overrides = _this$props2$override === void 0 ? {} : _this$props2$override;

      if (!clearable || !value || !value.length || disabled) {
        return null;
      }

      var _getOverrides7 = getOverrides(overrides.ClearIconContainer, StyledClearIconContainer),
          _getOverrides8 = _slicedToArray(_getOverrides7, 2),
          ClearIconContainer = _getOverrides8[0],
          clearIconContainerProps = _getOverrides8[1];

      var _getOverrides9 = getOverrides(overrides.ClearIcon, StyledClearIcon),
          _getOverrides10 = _slicedToArray(_getOverrides9, 2),
          ClearIcon = _getOverrides10[0],
          clearIconProps = _getOverrides10[1];

      var ariaLabel = 'Clear value';
      var sharedProps = getSharedProps(this.props, this.state);
      var iconSize = (_SIZE$mini$SIZE$compa2 = {}, _defineProperty(_SIZE$mini$SIZE$compa2, SIZE.mini, '14px'), _defineProperty(_SIZE$mini$SIZE$compa2, SIZE.compact, '20px'), _defineProperty(_SIZE$mini$SIZE$compa2, SIZE.default, '26px'), _defineProperty(_SIZE$mini$SIZE$compa2, SIZE.large, '32px'), _SIZE$mini$SIZE$compa2)[this.props.size];
      return React.createElement(ClearIconContainer, _extends({
        $alignTop: this.props.type === CUSTOM_INPUT_TYPE.textarea
      }, sharedProps, clearIconContainerProps), React.createElement(ClearIcon, _extends({
        size: iconSize,
        tabIndex: 0,
        title: ariaLabel,
        "aria-label": ariaLabel,
        onClick: this.onClearIconClick,
        onKeyDown: function onKeyDown(event) {
          if (event.key && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();

            _this3.onClearIconClick();
          }
        },
        role: "button",
        $isFocusVisible: this.state.isFocusVisibleForClear
      }, sharedProps, clearIconProps, {
        onFocus: forkFocus(clearIconProps, this.handleFocusForClear),
        onBlur: forkBlur(clearIconProps, this.handleBlurForClear)
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          value = _this$props3.value,
          type = _this$props3.type,
          _this$props3$override = _this$props3.overrides,
          InputContainerOverride = _this$props3$override.InputContainer,
          InputOverride = _this$props3$override.Input,
          BeforeOverride = _this$props3$override.Before,
          AfterOverride = _this$props3$override.After; // more here https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#Preventing_autofilling_with_autocompletenew-password

      var autoComplete = this.state.initialType === 'password' && this.props.autoComplete === BaseInput.defaultProps.autoComplete ? 'new-password' : this.props.autoComplete;
      var sharedProps = getSharedProps(this.props, this.state);

      var _getOverrides11 = getOverrides(InputContainerOverride, StyledInputContainer),
          _getOverrides12 = _slicedToArray(_getOverrides11, 2),
          InputContainer = _getOverrides12[0],
          inputContainerProps = _getOverrides12[1];

      var _getOverrides13 = getOverrides(InputOverride, StyledInput),
          _getOverrides14 = _slicedToArray(_getOverrides13, 2),
          Input = _getOverrides14[0],
          inputProps = _getOverrides14[1];

      var _getOverrides15 = getOverrides(BeforeOverride, NullComponent),
          _getOverrides16 = _slicedToArray(_getOverrides15, 2),
          Before = _getOverrides16[0],
          beforeProps = _getOverrides16[1];

      var _getOverrides17 = getOverrides(AfterOverride, NullComponent),
          _getOverrides18 = _slicedToArray(_getOverrides17, 2),
          After = _getOverrides18[0],
          afterProps = _getOverrides18[1];

      return React.createElement(InputContainer, _extends({
        "data-baseweb": this.props['data-baseweb'] || 'base-input'
      }, sharedProps, inputContainerProps), React.createElement(Before, _extends({}, sharedProps, beforeProps)), React.createElement(Input, _extends({
        ref: this.inputRef,
        "aria-activedescendant": this.props['aria-activedescendant'],
        "aria-autocomplete": this.props['aria-autocomplete'],
        "aria-controls": this.props['aria-controls'],
        "aria-errormessage": this.props['aria-errormessage'],
        "aria-label": this.props['aria-label'],
        "aria-labelledby": this.props['aria-labelledby'],
        "aria-describedby": this.props['aria-describedby'],
        "aria-invalid": this.props.error,
        "aria-required": this.props.required,
        autoComplete: autoComplete,
        disabled: this.props.disabled,
        id: this.props.id,
        inputMode: this.props.inputMode,
        maxLength: this.props.maxLength,
        name: this.props.name,
        onBlur: this.onBlur,
        onChange: this.props.onChange,
        onFocus: this.onFocus,
        onKeyDown: this.props.onKeyDown,
        onKeyPress: this.props.onKeyPress,
        onKeyUp: this.props.onKeyUp,
        pattern: this.props.pattern,
        placeholder: this.props.placeholder,
        type: this.getInputType(),
        required: this.props.required,
        value: this.props.value,
        min: this.props.min,
        max: this.props.max,
        step: this.props.step,
        rows: this.props.type === CUSTOM_INPUT_TYPE.textarea ? this.props.rows : null
      }, sharedProps, inputProps), type === CUSTOM_INPUT_TYPE.textarea ? value : null), this.renderClear(), this.renderMaskToggle(), React.createElement(After, _extends({}, sharedProps, afterProps)));
    }
  }]);

  return BaseInput;
}(React.Component);

_defineProperty(BaseInput, "defaultProps", {
  'aria-activedescendant': null,
  'aria-autocomplete': null,
  'aria-controls': null,
  'aria-errormessage': null,
  'aria-label': null,
  'aria-labelledby': null,
  'aria-describedby': null,
  adjoined: ADJOINED.none,
  autoComplete: 'on',
  autoFocus: false,
  disabled: false,
  error: false,
  positive: false,
  name: '',
  inputMode: 'text',
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  onKeyDown: function onKeyDown() {},
  onKeyPress: function onKeyPress() {},
  onKeyUp: function onKeyUp() {},
  onFocus: function onFocus() {},
  onClear: function onClear() {},
  clearable: false,
  clearOnEscape: true,
  overrides: {},
  pattern: null,
  placeholder: '',
  required: false,
  size: SIZE.default,
  type: 'text'
});

export default BaseInput;
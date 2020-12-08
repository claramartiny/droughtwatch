"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactRange = require("react-range");

var _focusVisible = require("../utils/focusVisible.js");

var _styledComponents = require("./styled-components.js");

var _overrides = require("../helpers/overrides.js");

var _themeProvider = require("../styles/theme-provider.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// value.length should not be bigger than two
// because our design doesn't support more than
// two thumbs
var limitValue = function limitValue(value) {
  if (value.length > 2 || value.length === 0) {
    throw new Error('the value prop represents positions of thumbs, so its length can be only one or two');
  }

  return value;
};

function Slider(_ref) {
  var _ref$overrides = _ref.overrides,
      overrides = _ref$overrides === void 0 ? {} : _ref$overrides,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$marks = _ref.marks,
      marks = _ref$marks === void 0 ? false : _ref$marks,
      _ref$onChange = _ref.onChange,
      _onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$onFinalChange = _ref.onFinalChange,
      _onFinalChange = _ref$onFinalChange === void 0 ? function () {} : _ref$onFinalChange,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 100 : _ref$max,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step,
      providedValue = _ref.value;

  var theme = React.useContext(_themeProvider.ThemeContext);

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isHovered0 = _React$useState2[0],
      setIsHovered0 = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isHovered1 = _React$useState4[0],
      setIsHovered1 = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      isFocusVisible = _React$useState6[0],
      setIsFocusVisible = _React$useState6[1];

  var _React$useState7 = React.useState(-1),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      focusedThumbIndex = _React$useState8[0],
      setFocusedThumbIndex = _React$useState8[1];

  var handleFocus = React.useCallback(function (event) {
    if ((0, _focusVisible.isFocusVisible)(event)) {
      setIsFocusVisible(true);
    }

    var index = // eslint-disable-next-line flowtype/no-weak-types
    event.target.parentNode.firstChild === event.target ? 0 : 1;
    setFocusedThumbIndex(index);
  }, []);
  var handleBlur = React.useCallback(function (event) {
    if (isFocusVisible !== false) {
      setIsFocusVisible(false);
    }

    setFocusedThumbIndex(-1);
  }, []);
  var value = limitValue(providedValue);
  var sharedProps = {
    $disabled: disabled,
    $step: step,
    $min: min,
    $max: max,
    $marks: marks,
    $value: value,
    $isFocusVisible: isFocusVisible
  };

  var _getOverrides = (0, _overrides.getOverrides)(overrides.Root, _styledComponents.Root),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      Root = _getOverrides2[0],
      rootProps = _getOverrides2[1];

  var _getOverrides3 = (0, _overrides.getOverrides)(overrides.Track, _styledComponents.Track),
      _getOverrides4 = _slicedToArray(_getOverrides3, 2),
      Track = _getOverrides4[0],
      trackProps = _getOverrides4[1];

  var _getOverrides5 = (0, _overrides.getOverrides)(overrides.InnerTrack, _styledComponents.InnerTrack),
      _getOverrides6 = _slicedToArray(_getOverrides5, 2),
      InnerTrack = _getOverrides6[0],
      innerTrackProps = _getOverrides6[1];

  var _getOverrides7 = (0, _overrides.getOverrides)(overrides.Thumb, _styledComponents.Thumb),
      _getOverrides8 = _slicedToArray(_getOverrides7, 2),
      Thumb = _getOverrides8[0],
      thumbProps = _getOverrides8[1];

  var _getOverrides9 = (0, _overrides.getOverrides)(overrides.InnerThumb, _styledComponents.InnerThumb),
      _getOverrides10 = _slicedToArray(_getOverrides9, 2),
      InnerThumb = _getOverrides10[0],
      innerThumbProps = _getOverrides10[1];

  var _getOverrides11 = (0, _overrides.getOverrides)(overrides.ThumbValue, _styledComponents.ThumbValue),
      _getOverrides12 = _slicedToArray(_getOverrides11, 2),
      ThumbValue = _getOverrides12[0],
      thumbValueProps = _getOverrides12[1];

  var _getOverrides13 = (0, _overrides.getOverrides)(overrides.Tick, _styledComponents.Tick),
      _getOverrides14 = _slicedToArray(_getOverrides13, 2),
      Tick = _getOverrides14[0],
      tickProps = _getOverrides14[1];

  var _getOverrides15 = (0, _overrides.getOverrides)(overrides.TickBar, _styledComponents.TickBar),
      _getOverrides16 = _slicedToArray(_getOverrides15, 2),
      TickBar = _getOverrides16[0],
      tickBarProps = _getOverrides16[1];

  var _getOverrides17 = (0, _overrides.getOverrides)(overrides.Mark, _styledComponents.Mark),
      _getOverrides18 = _slicedToArray(_getOverrides17, 2),
      Mark = _getOverrides18[0],
      markProps = _getOverrides18[1];

  return React.createElement(Root, _extends({
    "data-baseweb": "slider"
  }, sharedProps, rootProps, {
    onFocus: (0, _focusVisible.forkFocus)(rootProps, handleFocus),
    onBlur: (0, _focusVisible.forkBlur)(rootProps, handleBlur)
  }), React.createElement(_reactRange.Range, _extends({
    step: step,
    min: min,
    max: max,
    values: value,
    disabled: disabled,
    onChange: function onChange(value) {
      return _onChange({
        value: value
      });
    },
    onFinalChange: function onFinalChange(value) {
      return _onFinalChange({
        value: value
      });
    },
    rtl: theme.direction === 'rtl',
    renderTrack: function renderTrack(_ref2) {
      var props = _ref2.props,
          children = _ref2.children,
          isDragged = _ref2.isDragged;
      return React.createElement(Track, _extends({
        onMouseDown: props.onMouseDown,
        onTouchStart: props.onTouchStart,
        $isDragged: isDragged
      }, sharedProps, trackProps), React.createElement(InnerTrack, _extends({
        $isDragged: isDragged,
        ref: props.ref
      }, sharedProps, innerTrackProps), children));
    },
    renderThumb: function renderThumb(_ref3) {
      var props = _ref3.props,
          index = _ref3.index,
          isDragged = _ref3.isDragged;
      var displayLabel = (index && isHovered1 || !index && isHovered0 || isDragged) && !disabled;
      return React.createElement(Thumb, _extends({}, props, {
        onMouseEnter: function onMouseEnter() {
          if (index === 0) {
            setIsHovered0(true);
          } else {
            setIsHovered1(true);
          }
        },
        onMouseLeave: function onMouseLeave() {
          if (index === 0) {
            setIsHovered0(false);
          } else {
            setIsHovered1(false);
          }
        },
        $thumbIndex: index,
        $isDragged: isDragged,
        style: _objectSpread({}, props.style)
      }, sharedProps, thumbProps, {
        $isFocusVisible: isFocusVisible && focusedThumbIndex === index
      }), displayLabel && React.createElement(ThumbValue, _extends({
        $thumbIndex: index,
        $isDragged: isDragged
      }, sharedProps, thumbValueProps), value[index]), displayLabel && React.createElement(InnerThumb, _extends({
        $thumbIndex: index,
        $isDragged: isDragged
      }, sharedProps, innerThumbProps)));
    }
  }, marks ? {
    // eslint-disable-next-line react/display-name
    renderMark: function renderMark(_ref4) {
      var props = _ref4.props;
      return React.createElement(Mark, _extends({}, props, sharedProps, markProps));
    }
  } : {})), React.createElement(TickBar, _extends({}, sharedProps, tickBarProps), React.createElement(Tick, _extends({}, sharedProps, tickProps), min), React.createElement(Tick, _extends({}, sharedProps, tickProps), max)));
}

var _default = Slider;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _overrides = require("../helpers/overrides.js");

var _styledComponents = require("./styled-components.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function isLabelTopLeft(labelPlacement) {
  return labelPlacement === 'top' || labelPlacement === 'left';
}

function isLabelBottomRight(labelPlacement) {
  return labelPlacement === 'bottom' || labelPlacement === 'right';
}

var Radio =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Radio, _React$Component);

  function Radio() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Radio);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Radio)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isActive: false,
      isHovered: false
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (e) {
      _this.setState({
        isHovered: true
      });

      _this.props.onMouseEnter && _this.props.onMouseEnter(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (e) {
      _this.setState({
        isHovered: false
      });

      _this.props.onMouseLeave && _this.props.onMouseLeave(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (e) {
      _this.setState({
        isActive: true
      });

      _this.props.onMouseDown && _this.props.onMouseDown(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (e) {
      _this.setState({
        isActive: false
      });

      _this.props.onMouseUp && _this.props.onMouseUp(e);
    });

    return _this;
  }

  _createClass(Radio, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoFocus && this.props.inputRef.current) {
        this.props.inputRef.current.focus();
      }

      if (process.env.NODE_ENV !== "production" && this.props.isError) {
        console.warn('baseui:Radio Property "isError" will be removed in the next major version. Use "error" property instead.');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$overrides = this.props.overrides,
          overrides = _this$props$overrides === void 0 ? {} : _this$props$overrides;

      var _getOverrides = (0, _overrides.getOverrides)(overrides.Root, _styledComponents.Root),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          Root = _getOverrides2[0],
          rootProps = _getOverrides2[1];

      var _getOverrides3 = (0, _overrides.getOverrides)(overrides.Label, _styledComponents.Label),
          _getOverrides4 = _slicedToArray(_getOverrides3, 2),
          Label = _getOverrides4[0],
          labelProps = _getOverrides4[1];

      var _getOverrides5 = (0, _overrides.getOverrides)(overrides.Input, _styledComponents.Input),
          _getOverrides6 = _slicedToArray(_getOverrides5, 2),
          Input = _getOverrides6[0],
          inputProps = _getOverrides6[1];

      var _getOverrides7 = (0, _overrides.getOverrides)(overrides.Description, _styledComponents.Description),
          _getOverrides8 = _slicedToArray(_getOverrides7, 2),
          Description = _getOverrides8[0],
          descriptionProps = _getOverrides8[1];

      var _getOverrides9 = (0, _overrides.getOverrides)(overrides.RadioMarkInner, _styledComponents.RadioMarkInner),
          _getOverrides10 = _slicedToArray(_getOverrides9, 2),
          RadioMarkInner = _getOverrides10[0],
          radioMarkInnerProps = _getOverrides10[1];

      var _getOverrides11 = (0, _overrides.getOverrides)(overrides.RadioMarkOuter, _styledComponents.RadioMarkOuter),
          _getOverrides12 = _slicedToArray(_getOverrides11, 2),
          RadioMarkOuter = _getOverrides12[0],
          radioMarkOuterProps = _getOverrides12[1];

      var sharedProps = {
        $align: this.props.align,
        $checked: this.props.checked,
        $disabled: this.props.disabled,
        $hasDescription: !!this.props.description,
        $isActive: this.state.isActive,
        $isError: this.props.isError,
        $error: this.props.error,
        $isFocused: this.props.isFocused,
        $isFocusVisible: this.props.isFocused && this.props.isFocusVisible,
        $isHovered: this.state.isHovered,
        $labelPlacement: this.props.labelPlacement,
        $required: this.props.required,
        $value: this.props.value
      };
      var label = React.createElement(Label, _extends({}, sharedProps, labelProps), this.props.children);
      return React.createElement(React.Fragment, null, React.createElement(Root, _extends({
        "data-baseweb": "radio",
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp
      }, sharedProps, rootProps), isLabelTopLeft(this.props.labelPlacement) && label, React.createElement(RadioMarkOuter, _extends({}, sharedProps, radioMarkOuterProps), React.createElement(RadioMarkInner, _extends({}, sharedProps, radioMarkInnerProps))), React.createElement(Input, _extends({
        "aria-invalid": this.props.error || this.props.isError || null,
        checked: this.props.checked,
        disabled: this.props.disabled,
        name: this.props.name,
        onBlur: this.props.onBlur,
        onFocus: this.props.onFocus,
        onChange: this.props.onChange,
        ref: this.props.inputRef,
        required: this.props.required,
        tabIndex: this.props.tabIndex,
        type: "radio",
        value: this.props.value
      }, sharedProps, inputProps)), isLabelBottomRight(this.props.labelPlacement) && label), !!this.props.description && React.createElement(Description, _extends({}, sharedProps, descriptionProps), this.props.description));
    }
  }]);

  return Radio;
}(React.Component);

_defineProperty(Radio, "defaultProps", {
  overrides: {},
  checked: false,
  disabled: false,
  autoFocus: false,
  inputRef: React.createRef(),
  align: 'vertical',
  isError: false,
  error: false,
  onChange: function onChange() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},
  onMouseDown: function onMouseDown() {},
  onMouseUp: function onMouseUp() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {}
});

var _default = Radio;
exports.default = _default;
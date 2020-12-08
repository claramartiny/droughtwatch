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
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { Tab as StyledTab } from './styled-components.js';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible.js';

var TabComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TabComponent, _React$Component);

  function TabComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TabComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TabComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFocusVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (event) {
      if (isFocusVisible(event)) {
        _this.setState({
          isFocusVisible: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (event) {
      if (_this.state.isFocusVisible !== false) {
        _this.setState({
          isFocusVisible: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onSelect = _this$props.onSelect,
          onClick = _this$props.onClick;

      if (disabled) {
        return;
      }

      typeof onClick === 'function' && onClick(e);
      typeof onSelect === 'function' && onSelect();
      return;
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          onSelect = _this$props2.onSelect,
          onKeyDown = _this$props2.onKeyDown;

      if (disabled) {
        return;
      }

      typeof onKeyDown === 'function' && onKeyDown(e); // toggle on Enter or Space button pressed

      if (e.key === 'Enter' || e.which === 32) {
        typeof onSelect === 'function' && onSelect();
        e.which === 32 && e.preventDefault(); // prevent jumping scroll when using Space
      }

      return;
    });

    return _this;
  }

  _createClass(TabComponent, [{
    key: "getSharedProps",
    value: function getSharedProps() {
      var _this$props3 = this.props,
          disabled = _this$props3.disabled,
          active = _this$props3.active,
          $orientation = _this$props3.$orientation;
      return {
        $disabled: disabled,
        $active: active,
        $orientation: $orientation
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          active = _this$props4.active,
          disabled = _this$props4.disabled,
          id = _this$props4.id,
          _this$props4$override = _this$props4.overrides,
          overrides = _this$props4$override === void 0 ? {} : _this$props4$override,
          children = _this$props4.children;
      var sharedProps = this.getSharedProps();
      var TabOverride = overrides.Tab;

      var _getOverrides = getOverrides(TabOverride, StyledTab),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          Tab = _getOverrides2[0],
          tabProps = _getOverrides2[1];

      return React.createElement(Tab, _extends({
        $isFocusVisible: this.state.isFocusVisible,
        tabIndex: disabled ? -1 : 0,
        role: "tab",
        id: id,
        "aria-selected": active,
        "aria-disabled": disabled || null
      }, sharedProps, tabProps, {
        onFocus: forkFocus(tabProps, this.handleFocus),
        onBlur: forkBlur(tabProps, this.handleBlur),
        onClick: this.onClick,
        onKeyDown: this.onKeyDown
      }), children);
    }
  }]);

  return TabComponent;
}(React.Component);

_defineProperty(TabComponent, "defaultProps", {
  disabled: false,
  expanded: false,
  onSelect: function onSelect() {},
  onClick: function onClick() {},
  onKeyDown: function onKeyDown() {},
  title: ''
});

export default TabComponent;
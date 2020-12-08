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
import { StyledNavLink, StyledNavItem } from './styled-components.js';

var NavItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NavItem, _React$Component);

  function NavItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NavItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NavItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      var _this$props = _this.props,
          item = _this$props.item,
          onSelect = _this$props.onSelect;

      if (typeof onSelect === 'function') {
        onSelect({
          item: item,
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var _this$props2 = _this.props,
          item = _this$props2.item,
          onSelect = _this$props2.onSelect;

      if (event.key === 'Enter') {
        if (typeof onSelect === 'function') {
          onSelect({
            item: item,
            event: event
          });
        }
      }
    });

    return _this;
  }

  _createClass(NavItem, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          item = _this$props3.item,
          overrides = _this$props3.overrides,
          itemMemoizationComparator = _this$props3.itemMemoizationComparator,
          sharedProps = _objectWithoutProperties(_this$props3, ["item", "overrides", "itemMemoizationComparator"]);

      var _getOverrides = getOverrides(overrides.NavItem, StyledNavItem),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          NavItem = _getOverrides2[0],
          itemProps = _getOverrides2[1];

      var _getOverrides3 = getOverrides(overrides.NavLink, StyledNavLink),
          _getOverrides4 = _slicedToArray(_getOverrides3, 2),
          NavLink = _getOverrides4[0],
          linkProps = _getOverrides4[1];

      var tabIndex = {
        tabIndex: item.disabled ? -1 : undefined
      };
      return React.createElement(NavLink, _extends({
        $as: item.disabled ? 'span' : 'a',
        href: item.disabled ? null : item.itemId
      }, tabIndex, sharedProps, linkProps, item.itemId && !item.disabled ? {
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown
      } : {}), React.createElement(NavItem, _extends({
        item: item
      }, sharedProps, itemProps), item.title));
    }
  }]);

  return NavItem;
}(React.Component);

_defineProperty(NavItem, "defaultProps", {
  overrides: {},
  onSelect: function onSelect() {}
});

function compare(prevProps, nextProps) {
  if (nextProps.itemMemoizationComparator) {
    return nextProps.itemMemoizationComparator(prevProps, nextProps);
  }

  return false;
}

export default React.memo(NavItem, compare);
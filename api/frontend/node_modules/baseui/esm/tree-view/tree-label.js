function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { ThemeContext } from '../styles/theme-provider.js';
import { StyledIconContainer, StyledItemContent } from './styled-components.js';
import ChevronRight from '../icon/chevron-right.js';
import ChevronDown from '../icon/chevron-down.js';
import ChevronLeft from '../icon/chevron-left.js';
import BlankIcon from '../icon/blank.js';
import { getOverride, getOverrideProps, getOverrides } from '../helpers/overrides.js';

var TreeLabel = function TreeLabel(_ref) {
  var hasChildren = _ref.hasChildren,
      isExpanded = _ref.isExpanded,
      label = _ref.label,
      _ref$overrides = _ref.overrides,
      overrides = _ref$overrides === void 0 ? {} : _ref$overrides,
      node = _ref.node,
      isSelected = _ref.isSelected,
      isFocusVisible = _ref.isFocusVisible,
      props = _objectWithoutProperties(_ref, ["hasChildren", "isExpanded", "label", "overrides", "node", "isSelected", "isFocusVisible"]);

  var sharedProps = {
    $isExpanded: !!isExpanded,
    $isSelected: !!isSelected,
    $isFocusVisible: !!isFocusVisible,
    $hasChildren: !!hasChildren
  };
  var IconContainerOverride = overrides.IconContainer,
      ExpandIconOverride = overrides.ExpandIcon,
      CollapseIconOverride = overrides.CollapseIcon,
      LeafIconContainerOverride = overrides.LeafIconContainer,
      LeafIconOverride = overrides.LeafIcon,
      TreeItemContentOverride = overrides.TreeItemContent;
  var IconContainer = getOverride(IconContainerOverride) || StyledIconContainer;

  var _getOverrides = getOverrides(ExpandIconOverride, ChevronLeft),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      Left = _getOverrides2[0],
      LeftProps = _getOverrides2[1];

  var _getOverrides3 = getOverrides(ExpandIconOverride, ChevronRight),
      _getOverrides4 = _slicedToArray(_getOverrides3, 2),
      Right = _getOverrides4[0],
      RightProps = _getOverrides4[1];

  var CollapseIcon = getOverride(CollapseIconOverride) || ChevronDown;
  var LeafIconContainer = getOverride(LeafIconContainerOverride) || StyledIconContainer;
  var LeafIcon = getOverride(LeafIconOverride) || BlankIcon;
  var TreeItemContent = getOverride(TreeItemContentOverride) || StyledItemContent;
  return React.createElement(TreeItemContent, _extends({}, sharedProps, props), hasChildren && React.createElement(IconContainer, _extends({}, sharedProps, getOverrideProps(IconContainerOverride)), !isExpanded ? React.createElement(ThemeContext.Consumer, null, function (theme) {
    return theme.direction === 'rtl' ? React.createElement(Left, _extends({}, sharedProps, LeftProps)) : React.createElement(Right, _extends({}, sharedProps, RightProps));
  }) : React.createElement(CollapseIcon, _extends({}, sharedProps, getOverrideProps(CollapseIconOverride)))), !hasChildren && LeafIcon && React.createElement(LeafIconContainer, _extends({}, sharedProps, getOverrideProps(LeafIconContainerOverride)), React.createElement(LeafIcon, _extends({}, sharedProps, getOverrideProps(LeafIconOverride)))), typeof label === 'function' ? label(node) : label);
};

export default TreeLabel;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles/index.js';
import { getSvgStyles } from '../icon/styled-components.js';

/**
 * Main component container element
 */
export var Root = styled('ul', {
  listStyleType: 'none',
  marginBottom: 0,
  marginTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  width: '100%'
});
Root.displayName = "Root";
export var PanelContainer = styled('li', {
  listStyleType: 'none',
  width: '100%'
});
PanelContainer.displayName = "PanelContainer";
export var Header = styled('div', function (props) {
  var $disabled = props.$disabled,
      $expanded = props.$expanded,
      $isFocusVisible = props.$isFocusVisible,
      _props$$theme = props.$theme,
      colors = _props$$theme.colors,
      sizing = _props$$theme.sizing,
      typography = _props$$theme.typography;
  return _objectSpread({}, typography.font350, {
    color: colors.contentPrimary,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    backgroundColor: colors.listHeaderFill,
    paddingTop: sizing.scale600,
    paddingBottom: sizing.scale600,
    paddingLeft: sizing.scale700,
    paddingRight: sizing.scale700,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: $expanded ? colors.mono500 : colors.mono400,
    display: 'flex',
    alignItems: 'center',
    outline: $isFocusVisible ? "3px solid ".concat(colors.accent) : 'none',
    outlineOffset: '-3px',
    justifyContent: 'space-between',
    ':hover': {
      color: colors.primary
    }
  });
});
Header.displayName = "Header";
export var ToggleIcon = styled('svg', function (props) {
  var $theme = props.$theme,
      $disabled = props.$disabled,
      $color = props.$color;
  return _objectSpread({}, getSvgStyles(props), {
    flexShrink: 0,
    color: $color || $theme.colors.contentPrimary,
    cursor: $disabled ? 'not-allowed' : 'pointer'
  });
});
ToggleIcon.displayName = "ToggleIcon";
export var Content = styled('div', function (props) {
  var _props$$theme2 = props.$theme,
      animation = _props$$theme2.animation,
      colors = _props$$theme2.colors,
      sizing = _props$$theme2.sizing,
      typography = _props$$theme2.typography,
      $expanded = props.$expanded;
  return _objectSpread({}, typography.font200, {
    backgroundColor: colors.listBodyFill,
    color: colors.contentPrimary,
    paddingTop: $expanded ? sizing.scale800 : 0,
    paddingBottom: $expanded ? sizing.scale1000 : 0,
    paddingLeft: sizing.scale800,
    paddingRight: sizing.scale800,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottomWidth: '1px',
    borderBottomStyle: $expanded ? 'solid' : 'none',
    borderBottomColor: colors.border,
    boxSizing: 'border-box',
    height: $expanded ? 'auto' : 0,
    maxHeight: $expanded ? '100%' : 0,
    overflow: 'hidden',
    transitionProperty: 'all',
    transitionDuration: animation.timing400,
    transitionTimingFunction: animation.easeInOutCurve
  });
});
Content.displayName = "Content";
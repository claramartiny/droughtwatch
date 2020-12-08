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
import * as React from 'react';
import * as ReactIs from 'react-is';
import { StartEnhancer as StyledStartEnhancer, EndEnhancer as StyledEndEnhancer } from './styled-components.js';
import { getSharedProps } from './utils.js';
import { getOverrides } from '../helpers/overrides.js';

function RenderEnhancer(props) {
  var Enhancer = props.Enhancer,
      restProps = _objectWithoutProperties(props, ["Enhancer"]);

  if (typeof Enhancer === 'string') {
    return Enhancer;
  }

  if (ReactIs.isValidElementType(Enhancer)) {
    // $FlowFixMe
    return React.createElement(Enhancer, restProps);
  } // $FlowFixMe


  return Enhancer;
}

export default function ButtonInternals(props) {
  var children = props.children,
      _props$overrides = props.overrides,
      overrides = _props$overrides === void 0 ? {} : _props$overrides,
      startEnhancer = props.startEnhancer,
      endEnhancer = props.endEnhancer;

  var _getOverrides = getOverrides(overrides.StartEnhancer, StyledStartEnhancer),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      StartEnhancer = _getOverrides2[0],
      startEnhancerProps = _getOverrides2[1];

  var _getOverrides3 = getOverrides(overrides.EndEnhancer, StyledEndEnhancer),
      _getOverrides4 = _slicedToArray(_getOverrides3, 2),
      EndEnhancer = _getOverrides4[0],
      endEnhancerProps = _getOverrides4[1];

  var sharedProps = getSharedProps(props);
  return React.createElement(React.Fragment, null, startEnhancer !== null && startEnhancer !== undefined && React.createElement(StartEnhancer, _extends({}, sharedProps, startEnhancerProps), React.createElement(RenderEnhancer, {
    Enhancer: startEnhancer
  })), children, endEnhancer !== null && endEnhancer !== undefined && React.createElement(EndEnhancer, _extends({}, sharedProps, endEnhancerProps), React.createElement(RenderEnhancer, {
    Enhancer: endEnhancer
  })));
}
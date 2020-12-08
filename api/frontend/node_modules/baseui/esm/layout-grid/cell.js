function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { StyledCell as DefaultStyledCell } from './styled-components.js';
import { GridContext } from './grid.js';
export default function Cell(_ref) {
  var align = _ref.align,
      children = _ref.children,
      gridColumns = _ref.gridColumns,
      gridGaps = _ref.gridGaps,
      gridGutters = _ref.gridGutters,
      gridUnit = _ref.gridUnit,
      order = _ref.order,
      skip = _ref.skip,
      span = _ref.span,
      _ref$overrides = _ref.overrides,
      overrides = _ref$overrides === void 0 ? {} : _ref$overrides;

  var _getOverrides = getOverrides(overrides.Cell, DefaultStyledCell),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      StyledCell = _getOverrides2[0],
      overrideProps = _getOverrides2[1];

  var gridContext = React.useContext(GridContext);
  return React.createElement(StyledCell, _extends({
    $align: align // TODO(v11): Remove the four grid props, get them solely from GridContext
    ,
    $gridColumns: gridColumns || gridContext.gridColumns,
    $gridGaps: gridGaps || gridContext.gridGaps,
    $gridGutters: gridGutters || gridContext.gridGutters,
    $gridUnit: gridUnit || gridContext.gridUnit,
    $order: order,
    $skip: skip,
    $span: span
  }, overrideProps), children);
}
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
import React, { Children } from 'react';
import { LocaleContext } from '../locale/index.js';
import { ThemeContext } from '../styles/theme-provider.js';
import ChevronRight from '../icon/chevron-right.js';
import ChevronLeft from '../icon/chevron-left.js';
import { StyledRoot, StyledSeparator, StyledList, StyledListItem } from './styled-components.js';
import { getOverrides, mergeOverrides } from '../helpers/overrides.js';
export function Breadcrumbs(props) {
  var _props$overrides = props.overrides,
      overrides = _props$overrides === void 0 ? {} : _props$overrides,
      _props$showTrailingSe = props.showTrailingSeparator,
      showTrailingSeparator = _props$showTrailingSe === void 0 ? false : _props$showTrailingSe;
  var childrenArray = Children.toArray(props.children);
  var childrenWithSeparators = [];

  var _getOverrides = getOverrides(overrides.Root, StyledRoot),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      Root = _getOverrides2[0],
      baseRootProps = _getOverrides2[1];

  var _getOverrides3 = getOverrides(overrides.Icon, ChevronRight),
      _getOverrides4 = _slicedToArray(_getOverrides3, 2),
      Right = _getOverrides4[0],
      baseIconProps = _getOverrides4[1];

  var _getOverrides5 = getOverrides(overrides.Icon, ChevronLeft),
      _getOverrides6 = _slicedToArray(_getOverrides5, 1),
      Left = _getOverrides6[0];

  var _getOverrides7 = getOverrides(overrides.List, StyledList),
      _getOverrides8 = _slicedToArray(_getOverrides7, 2),
      List = _getOverrides8[0],
      baseListProps = _getOverrides8[1];

  var _getOverrides9 = getOverrides(overrides.ListItem, StyledListItem),
      _getOverrides10 = _slicedToArray(_getOverrides9, 2),
      ListItem = _getOverrides10[0],
      baseListItemProps = _getOverrides10[1];

  var _getOverrides11 = getOverrides(overrides.Separator, StyledSeparator),
      _getOverrides12 = _slicedToArray(_getOverrides11, 2),
      Separator = _getOverrides12[0],
      baseSeparatorProps = _getOverrides12[1];

  var iconOverrides = mergeOverrides({
    Svg: {
      style: {
        verticalAlign: 'text-bottom'
      }
    }
  }, // $FlowFixMe
  baseIconProps && baseIconProps.overrides); // $FlowFixMe

  baseIconProps.overrides = iconOverrides;
  childrenArray.forEach(function (child, index) {
    childrenWithSeparators.push(React.createElement(ListItem, _extends({
      key: "breadcrumb-item-".concat(index),
      $itemIndex: index
    }, baseListItemProps), child, (showTrailingSeparator || index !== childrenArray.length - 1) && React.createElement(Separator, _extends({}, baseSeparatorProps, {
      key: "separator-".concat(index)
    }), React.createElement(ThemeContext.Consumer, null, function (theme) {
      return theme.direction === 'rtl' ? React.createElement(Left, baseIconProps) : React.createElement(Right, baseIconProps);
    }))));
  });
  return React.createElement(LocaleContext.Consumer, null, function (locale) {
    return React.createElement(Root, _extends({
      "aria-label": props.ariaLabel || locale.breadcrumbs.ariaLabel,
      "data-baseweb": "breadcrumbs"
    }, baseRootProps), React.createElement(List, baseListProps, childrenWithSeparators));
  });
}
Breadcrumbs.defaultProps = {
  overrides: {},
  showTrailingSeparator: false
};
export default Breadcrumbs;
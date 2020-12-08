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
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { StyledNumberStep, StyledNumberIcon, StyledContent, StyledContentTitle, StyledNumberContentTail, StyledContentDescription } from './styled-components.js';
import StyledCheckIcon from '../icon/check.js';

function NumberedStep(_ref) {
  var _ref$overrides = _ref.overrides,
      overrides = _ref$overrides === void 0 ? {} : _ref$overrides,
      isCompleted = _ref.isCompleted,
      isActive = _ref.isActive,
      isLast = _ref.isLast,
      title = _ref.title,
      step = _ref.step,
      children = _ref.children;

  var _getOverrides = getOverrides(overrides.Root, StyledNumberStep),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      Root = _getOverrides2[0],
      rootProps = _getOverrides2[1];

  var _getOverrides3 = getOverrides(overrides.Icon, StyledNumberIcon),
      _getOverrides4 = _slicedToArray(_getOverrides3, 2),
      Icon = _getOverrides4[0],
      iconProps = _getOverrides4[1];

  var _getOverrides5 = getOverrides(overrides.Tail, StyledNumberContentTail),
      _getOverrides6 = _slicedToArray(_getOverrides5, 2),
      Tail = _getOverrides6[0],
      tailProps = _getOverrides6[1];

  var _getOverrides7 = getOverrides(overrides.Content, StyledContent),
      _getOverrides8 = _slicedToArray(_getOverrides7, 2),
      Content = _getOverrides8[0],
      contentProps = _getOverrides8[1];

  var _getOverrides9 = getOverrides(overrides.Title, StyledContentTitle),
      _getOverrides10 = _slicedToArray(_getOverrides9, 2),
      Title = _getOverrides10[0],
      titleProps = _getOverrides10[1];

  var _getOverrides11 = getOverrides(overrides.Description, StyledContentDescription),
      _getOverrides12 = _slicedToArray(_getOverrides11, 2),
      Description = _getOverrides12[0],
      descriptionProps = _getOverrides12[1];

  var _getOverrides13 = getOverrides(overrides.Icon, StyledCheckIcon),
      _getOverrides14 = _slicedToArray(_getOverrides13, 2),
      CheckIcon = _getOverrides14[0],
      checkIconProps = _getOverrides14[1];

  var sharedProps = {
    $isCompleted: isCompleted,
    $isActive: isActive
  };
  return React.createElement(Root, _extends({}, sharedProps, rootProps), React.createElement(Icon, _extends({}, sharedProps, iconProps), !isCompleted && React.createElement("span", null, step), isCompleted && React.createElement(CheckIcon, _extends({
    size: 28
  }, checkIconProps))), !isLast && React.createElement(Tail, _extends({}, sharedProps, tailProps)), React.createElement(Content, _extends({}, sharedProps, contentProps), React.createElement(Title, _extends({}, sharedProps, titleProps), title), React.createElement(Description, descriptionProps, isActive && children)));
}

NumberedStep.defaultProps = {
  isCompleted: false,
  isLast: false
};
export default NumberedStep;
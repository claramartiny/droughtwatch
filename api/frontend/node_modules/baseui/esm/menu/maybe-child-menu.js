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
import { NestedMenuContext } from './nested-menus.js';
import { Popover } from '../popover/index.js';
import { getOverrides, mergeOverrides } from '../helpers/overrides.js';
export default function MaybeChildMenu(props) {
  if (!props.getChildMenu) {
    return props.children;
  }

  var ChildMenu = props.getChildMenu(props.item);

  if (!ChildMenu) {
    return props.children;
  }

  var _props$overrides = props.overrides,
      overrides = _props$overrides === void 0 ? {} : _props$overrides;

  var _getOverrides = getOverrides(overrides.ChildMenuPopover, Popover),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      PopoverOverride = _getOverrides2[0],
      popoverProps = _getOverrides2[1];

  return React.createElement(NestedMenuContext.Consumer, null, function (ctx) {
    return React.createElement(PopoverOverride, _extends({
      focusLock: false,
      isOpen: props.isOpen,
      renderAll: props.renderAll,
      content: ChildMenu,
      ignoreBoundary: true,
      mountNode: ctx.mountRef.current ? ctx.mountRef.current : undefined,
      onMouseEnterDelay: 30,
      onMouseLeaveDelay: 30,
      onEsc: props.resetParentMenu,
      placement: "rightTop"
    }, popoverProps, {
      overrides: mergeOverrides({
        Body: {
          props: {
            // Adds mouseleave to popover body so that child menu closes when user mouses out.
            onMouseLeave: props.resetParentMenu,
            // Trap tabbing when focused on a child menu. Popover mounts the element at the end of
            // the html body by default. If a user was to tab to the next element it would navigate
            // to elements not within the immediate area surrounding the menu.
            onKeyDown: function onKeyDown(e) {
              if (e.keyCode === 9) {
                e.preventDefault();
              }
            }
          }
        }
      }, // $FlowFixMe - getOverrides' return type for props is {}
      popoverProps.overrides)
    }), props.children);
  });
}
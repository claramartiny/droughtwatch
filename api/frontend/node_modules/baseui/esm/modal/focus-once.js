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

/**
 * Wrap an element in FocusOnce that would normally not receive tab focus.
 * This is useful for placing initial focus in a Modal or FocusLock.
 * */
export default function FocusOnce(props) {
  var _React$useState = React.useState('0'),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      tabIndex = _React$useState2[0],
      setTabIndex = _React$useState2[1];

  var child = React.Children.only(props.children);
  return React.cloneElement(child, {
    tabIndex: tabIndex,
    onBlur: function onBlur() {
      return setTabIndex(null);
    }
  });
}
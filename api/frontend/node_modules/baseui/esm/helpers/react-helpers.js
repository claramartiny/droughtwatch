function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { isFragment } from 'react-is';
export var flattenFragments = function flattenFragments(children, ChildWrapper) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return React.Children.toArray(children).reduce(function (acc, child, i) {
    if (isFragment(child)) {
      acc.push.apply(acc, _toConsumableArray(flattenFragments(child.props.children, ChildWrapper, depth + 1)));
    } else if (React.isValidElement(child)) {
      if (ChildWrapper) {
        acc.push(React.createElement(ChildWrapper, {
          key: "".concat(depth, ".").concat(i)
        }, child));
      } else {
        acc.push(child);
      }
    }

    return acc;
  }, []);
};
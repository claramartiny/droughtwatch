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
import { ArrowLeft, ArrowRight, Check } from '../icon/index.js';
import { Button, KIND, SHAPE } from '../button/index.js';
import { useStyletron } from '../styles/index.js';
export function HelperSteps(_ref) {
  var index = _ref.index,
      length = _ref.length,
      onFinish = _ref.onFinish,
      onPrev = _ref.onPrev,
      onNext = _ref.onNext;

  var _useStyletron = useStyletron(),
      _useStyletron2 = _slicedToArray(_useStyletron, 2),
      css = _useStyletron2[0],
      theme = _useStyletron2[1];

  var isLast = index === length - 1;
  return React.createElement("div", {
    className: css({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between'
    })
  }, React.createElement(Button, {
    disabled: index === 0,
    kind: KIND.secondary,
    onClick: onPrev,
    shape: SHAPE.circle
  }, React.createElement(ArrowLeft, {
    size: 20
  })), React.createElement("div", {
    className: css({
      display: 'flex'
    })
  }, new Array(length).fill().map(function (_, i) {
    return React.createElement("div", {
      key: i,
      className: css({
        height: '8px',
        width: '8px',
        backgroundColor: i === index ? theme.colors.contentPrimary : theme.colors.backgroundTertiary,
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        borderBottomLeftRadius: '50%',
        ':not(:last-child)': {
          marginRight: '8px'
        }
      })
    });
  })), React.createElement(Button, {
    kind: isLast ? KIND.primary : KIND.secondary,
    onClick: isLast ? onFinish : onNext,
    shape: SHAPE.circle
  }, isLast ? React.createElement(Check, {
    size: 20
  }) : React.createElement(ArrowRight, {
    size: 20
  })));
}
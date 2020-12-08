function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
import { getOverrides } from '../helpers/overrides.js';
import { Root as StyledRoot } from './styled-components.js';

function StatelessAccordion(_ref) {
  var _ref$accordion = _ref.accordion,
      accordion = _ref$accordion === void 0 ? true : _ref$accordion,
      children = _ref.children,
      disabled = _ref.disabled,
      expanded = _ref.expanded,
      onChange = _ref.onChange,
      _ref$overrides = _ref.overrides,
      overrides = _ref$overrides === void 0 ? {} : _ref$overrides,
      renderAll = _ref.renderAll,
      renderPanelContent = _ref.renderPanelContent;

  var RootOverrides = overrides.Root,
      PanelOverrides = _objectWithoutProperties(overrides, ["Root"]);

  var _getOverrides = getOverrides(RootOverrides, StyledRoot),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      Root = _getOverrides2[0],
      rootProps = _getOverrides2[1];

  return React.createElement(Root, _extends({
    "data-baseweb": "accordion"
  }, rootProps), React.Children.map(children, function (child, index) {
    var key = child.key || String(index);
    return React.cloneElement(child, {
      disabled: child.props.disabled || disabled,
      expanded: expanded.includes(key),
      key: key,
      onChange: // Don't bother constructing the wrapper function if no one is listening
      onChange && typeof onChange === 'function' ? function () {
        var next;

        if (accordion) {
          if (expanded.includes(key)) {
            next = [];
          } else {
            next = [key];
          }
        } else {
          if (expanded.includes(key)) {
            next = expanded.filter(function (k) {
              return k !== key;
            });
          } else {
            next = [].concat(_toConsumableArray(expanded), [key]);
          }
        }

        onChange({
          key: key,
          expanded: next
        });
      } : onChange,
      overrides: child.props.overrides || PanelOverrides,
      renderAll: renderAll,
      renderPanelContent: renderPanelContent
    });
  }));
}

export default StatelessAccordion;
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// The `CountrySelect` component is not designed to be used
// as a standalone component and we should deprecate it
// in the next v11 major version in favor of `CountryPicker`.
// The `DialCode` rendering should be a part of the composed
// non-split phone input.
import React from 'react';
import { StyledDialCode, StyledCountrySelectContainer } from './styled-components.js';
import BaseCountryPicker from './base-country-picker.js';
import { SingleSelect as DefaultSelect } from '../select/index.js';
import { getOverrides, mergeOverrides } from '../helpers/overrides.js';
import defaultProps from './default-props.js';
CountrySelect.defaultProps = {
  disabled: defaultProps.disabled,
  inputRef: {
    current: null
  },
  maxDropdownHeight: defaultProps.maxDropdownHeight,
  maxDropdownWidth: defaultProps.maxDropdownWidth,
  overrides: {},
  size: defaultProps.size,
  error: defaultProps.error,
  positive: defaultProps.positive,
  required: defaultProps.required
};
export default function CountrySelect(props) {
  var country = props.country,
      disabled = props.disabled,
      error = props.error,
      overrides = props.overrides,
      positive = props.positive,
      required = props.required,
      size = props.size;
  var sharedProps = {
    $disabled: disabled,
    $error: error,
    $positive: positive,
    $required: required,
    $size: size
  };
  var baseSelectOverrides = {
    ControlContainer: {
      style: function style(props) {
        if (!props.$isFocused && !props.$isPseudoFocused) {
          return {
            backgroundColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent'
          };
        }
      }
    }
  };

  var _getOverrides = getOverrides(overrides.CountrySelect, DefaultSelect),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      Select = _getOverrides2[0],
      selectProps = _getOverrides2[1]; // $FlowFixMe


  var selectOverrides = mergeOverrides(baseSelectOverrides, {
    Dropdown: overrides.CountrySelectDropdown,
    DropdownListItem: overrides.CountrySelectDropdownListItem
  }); // $FlowFixMe

  selectProps.overrides = mergeOverrides(selectOverrides, // $FlowFixMe
  selectProps.overrides);

  var _getOverrides3 = getOverrides(overrides.CountrySelectContainer, StyledCountrySelectContainer),
      _getOverrides4 = _slicedToArray(_getOverrides3, 2),
      CountrySelectContainer = _getOverrides4[0],
      countrySelectContainerProps = _getOverrides4[1];

  var _getOverrides5 = getOverrides(overrides.DialCode, StyledDialCode),
      _getOverrides6 = _slicedToArray(_getOverrides5, 2),
      DialCode = _getOverrides6[0],
      dialCodeProps = _getOverrides6[1];

  return React.createElement(CountrySelectContainer, countrySelectContainerProps, React.createElement(BaseCountryPicker, _extends({}, props, {
    overrides: _objectSpread({}, overrides, {
      CountrySelect: {
        component: Select,
        props: selectProps
      }
    })
  })), React.createElement(DialCode, _extends({}, sharedProps, dialCodeProps), country.dialCode));
}
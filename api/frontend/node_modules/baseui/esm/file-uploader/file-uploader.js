function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
import Dropzone from 'react-dropzone';
import { LocaleContext } from '../locale/index.js';
import { Block } from '../block/index.js';
import { Button, KIND, SHAPE, SIZE as BUTTON_SIZE } from '../button/index.js';
import { getOverrides } from '../helpers/overrides.js';
import { ProgressBar } from '../progress-bar/index.js';
import { StyledSpinnerNext, SIZE as SPINNER_SIZE } from '../spinner/index.js';
import { StyledRoot, StyledFileDragAndDrop, StyledContentMessage, StyledContentSeparator, StyledErrorMessage, StyledHiddenInput } from './styled-components.js';

function prependStyleProps(styleProps) {
  return Object.keys(styleProps).reduce(function (nextStyleProps, currentKey) {
    nextStyleProps["$".concat(currentKey)] = styleProps[currentKey];
    return nextStyleProps;
  }, {});
}

function FileUploader(props) {
  var _props$overrides = props.overrides,
      overrides = _props$overrides === void 0 ? {} : _props$overrides;

  var _getOverrides = getOverrides(overrides.Root, StyledRoot),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      Root = _getOverrides2[0],
      rootProps = _getOverrides2[1];

  var _getOverrides3 = getOverrides(overrides.FileDragAndDrop, StyledFileDragAndDrop),
      _getOverrides4 = _slicedToArray(_getOverrides3, 2),
      FileDragAndDrop = _getOverrides4[0],
      fileDragAndDropProps = _getOverrides4[1];

  var _getOverrides5 = getOverrides(overrides.ContentMessage, StyledContentMessage),
      _getOverrides6 = _slicedToArray(_getOverrides5, 2),
      ContentMessage = _getOverrides6[0],
      contentMessageProps = _getOverrides6[1];

  var _getOverrides7 = getOverrides(overrides.ContentSeparator, StyledContentSeparator),
      _getOverrides8 = _slicedToArray(_getOverrides7, 2),
      ContentSeparator = _getOverrides8[0],
      contentSeparatorProps = _getOverrides8[1];

  var _getOverrides9 = getOverrides(overrides.ErrorMessage, StyledErrorMessage),
      _getOverrides10 = _slicedToArray(_getOverrides9, 2),
      ErrorMessage = _getOverrides10[0],
      errorMessageProps = _getOverrides10[1];

  var _getOverrides11 = getOverrides(overrides.HiddenInput, StyledHiddenInput),
      _getOverrides12 = _slicedToArray(_getOverrides11, 2),
      HiddenInput = _getOverrides12[0],
      hiddenInputProps = _getOverrides12[1];

  var _getOverrides13 = getOverrides(overrides.ButtonComponent, Button),
      _getOverrides14 = _slicedToArray(_getOverrides13, 2),
      ButtonComponent = _getOverrides14[0],
      buttonProps = _getOverrides14[1];

  var _getOverrides15 = getOverrides(overrides.Spinner, StyledSpinnerNext),
      _getOverrides16 = _slicedToArray(_getOverrides15, 2),
      SpinnerComponent = _getOverrides16[0],
      spinnerProps = _getOverrides16[1];

  var afterFileDrop = !!(props.progressAmount || props.progressMessage || props.errorMessage);
  return React.createElement(Dropzone, _extends({}, props, {
    disabled: props.disabled || afterFileDrop
  }), function (renderProps) {
    var getRootProps = renderProps.getRootProps,
        getInputProps = renderProps.getInputProps,
        open = renderProps.open,
        styleProps = _objectWithoutProperties(renderProps, ["getRootProps", "getInputProps", "open"]);

    var prefixedStyledProps = prependStyleProps(_objectSpread({}, styleProps, {
      isDisabled: props.disabled,
      afterFileDrop: afterFileDrop
    }));

    var getRootPropsArgs = _objectSpread({}, props.disableClick ? {
      onClick: function onClick(evt) {
        return evt.preventDefault();
      }
    } : {}, {
      tabIndex: '-1'
    });

    return React.createElement(LocaleContext.Consumer, null, function (locale) {
      return React.createElement(Root, _extends({
        "data-baseweb": "file-uploader"
      }, prefixedStyledProps, rootProps), React.createElement(FileDragAndDrop, _extends({}, getRootProps(getRootPropsArgs), prefixedStyledProps, fileDragAndDropProps), !afterFileDrop && React.createElement(React.Fragment, null, React.createElement(ContentMessage, _extends({}, prefixedStyledProps, contentMessageProps), locale.fileuploader.dropFilesToUpload), React.createElement(ContentSeparator, _extends({}, prefixedStyledProps, contentSeparatorProps), locale.fileuploader.or), React.createElement(ButtonComponent, _extends({
        disabled: props.disabled,
        kind: KIND.secondary,
        shape: SHAPE.pill,
        size: BUTTON_SIZE.compact,
        onClick: open,
        role: "button",
        overrides: {
          BaseButton: {
            style: function style(_ref) {
              var $theme = _ref.$theme;
              return {
                marginTop: $theme.sizing.scale500
              };
            }
          }
        }
      }, prefixedStyledProps, buttonProps), locale.fileuploader.browseFiles)), afterFileDrop && React.createElement(React.Fragment, null, typeof props.progressAmount === 'number' ? React.createElement(ProgressBar, {
        value: props.progressAmount,
        overrides: {
          BarProgress: {
            style: function style(_ref2) {
              var $theme = _ref2.$theme;
              return {
                backgroundColor: props.errorMessage ? $theme.colors.negative : $theme.colors.accent
              };
            }
          }
        }
      }) : props.errorMessage ? null : React.createElement(Block, {
        marginBottom: "scale300"
      }, React.createElement(SpinnerComponent, _extends({
        $size: SPINNER_SIZE.medium
      }, spinnerProps))), (props.errorMessage || props.progressMessage) && props.errorMessage ? React.createElement(ErrorMessage, _extends({}, prefixedStyledProps, errorMessageProps), props.errorMessage) : React.createElement(ContentMessage, _extends({}, prefixedStyledProps, contentMessageProps), props.progressMessage), props.errorMessage ? React.createElement(ButtonComponent, {
        kind: KIND.minimal,
        onClick: function onClick() {
          props.onRetry && props.onRetry();
        },
        "aria-invalid": Boolean(props.errorMessage),
        "aria-describedby": props['aria-describedby'],
        "aria-errormessage": props.errorMessage
      }, locale.fileuploader.retry) : React.createElement(ButtonComponent, {
        kind: KIND.minimal,
        onClick: function onClick() {
          props.onCancel && props.onCancel();
        },
        "aria-describedby": props['aria-describedby'],
        overrides: {
          BaseButton: {
            style: function style(_ref3) {
              var $theme = _ref3.$theme;
              return {
                color: $theme.colors.contentNegative
              };
            }
          }
        }
      }, locale.fileuploader.cancel))), React.createElement(HiddenInput, _extends({
        "aria-invalid": Boolean(props.errorMessage) || null,
        "aria-describedby": props['aria-describedby'],
        "aria-errormessage": props.errorMessage || null
      }, getInputProps(), prefixedStyledProps, hiddenInputProps)));
    });
  });
}

FileUploader.defaultProps = {
  disableClick: true,
  overrides: {}
};
export default FileUploader;
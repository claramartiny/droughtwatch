function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  return Object.keys(styleProps).reduce((nextStyleProps, currentKey) => {
    nextStyleProps[`$${currentKey}`] = styleProps[currentKey];
    return nextStyleProps;
  }, {});
}

function FileUploader(props) {
  const {
    overrides = {}
  } = props;
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [FileDragAndDrop, fileDragAndDropProps] = getOverrides(overrides.FileDragAndDrop, StyledFileDragAndDrop);
  const [ContentMessage, contentMessageProps] = getOverrides(overrides.ContentMessage, StyledContentMessage);
  const [ContentSeparator, contentSeparatorProps] = getOverrides(overrides.ContentSeparator, StyledContentSeparator);
  const [ErrorMessage, errorMessageProps] = getOverrides(overrides.ErrorMessage, StyledErrorMessage);
  const [HiddenInput, hiddenInputProps] = getOverrides(overrides.HiddenInput, StyledHiddenInput);
  const [ButtonComponent, buttonProps] = getOverrides(overrides.ButtonComponent, Button);
  const [SpinnerComponent, spinnerProps] = getOverrides(overrides.Spinner, StyledSpinnerNext);
  const afterFileDrop = !!(props.progressAmount || props.progressMessage || props.errorMessage);
  return React.createElement(Dropzone, _extends({}, props, {
    disabled: props.disabled || afterFileDrop
  }), renderProps => {
    const {
      getRootProps,
      getInputProps,
      open,
      ...styleProps
    } = renderProps;
    const prefixedStyledProps = prependStyleProps({ ...styleProps,
      isDisabled: props.disabled,
      afterFileDrop
    });
    const getRootPropsArgs = { ...(props.disableClick ? {
        onClick: evt => evt.preventDefault()
      } : {}),
      tabIndex: '-1'
    };
    return React.createElement(LocaleContext.Consumer, null, locale => React.createElement(Root, _extends({
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
          style: ({
            $theme
          }) => ({
            marginTop: $theme.sizing.scale500
          })
        }
      }
    }, prefixedStyledProps, buttonProps), locale.fileuploader.browseFiles)), afterFileDrop && React.createElement(React.Fragment, null, typeof props.progressAmount === 'number' ? React.createElement(ProgressBar, {
      value: props.progressAmount,
      overrides: {
        BarProgress: {
          style: ({
            $theme
          }) => ({
            backgroundColor: props.errorMessage ? $theme.colors.negative : $theme.colors.accent
          })
        }
      }
    }) : props.errorMessage ? null : React.createElement(Block, {
      marginBottom: "scale300"
    }, React.createElement(SpinnerComponent, _extends({
      $size: SPINNER_SIZE.medium
    }, spinnerProps))), (props.errorMessage || props.progressMessage) && props.errorMessage ? React.createElement(ErrorMessage, _extends({}, prefixedStyledProps, errorMessageProps), props.errorMessage) : React.createElement(ContentMessage, _extends({}, prefixedStyledProps, contentMessageProps), props.progressMessage), props.errorMessage ? React.createElement(ButtonComponent, {
      kind: KIND.minimal,
      onClick: () => {
        props.onRetry && props.onRetry();
      },
      "aria-invalid": Boolean(props.errorMessage),
      "aria-describedby": props['aria-describedby'],
      "aria-errormessage": props.errorMessage
    }, locale.fileuploader.retry) : React.createElement(ButtonComponent, {
      kind: KIND.minimal,
      onClick: () => {
        props.onCancel && props.onCancel();
      },
      "aria-describedby": props['aria-describedby'],
      overrides: {
        BaseButton: {
          style: ({
            $theme
          }) => ({
            color: $theme.colors.contentNegative
          })
        }
      }
    }, locale.fileuploader.cancel))), React.createElement(HiddenInput, _extends({
      "aria-invalid": Boolean(props.errorMessage) || null,
      "aria-describedby": props['aria-describedby'],
      "aria-errormessage": props.errorMessage || null
    }, getInputProps(), prefixedStyledProps, hiddenInputProps))));
  });
}

FileUploader.defaultProps = {
  disableClick: true,
  overrides: {}
};
export default FileUploader;
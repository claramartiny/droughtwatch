function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { Root as StyledRoot, Label as StyledLabel, Input as StyledInput, RadioMarkInner as StyledRadioMarkInner, RadioMarkOuter as StyledRadioMarkOuter, Description as StyledDescription } from './styled-components.js';

function isLabelTopLeft(labelPlacement) {
  return labelPlacement === 'top' || labelPlacement === 'left';
}

function isLabelBottomRight(labelPlacement) {
  return labelPlacement === 'bottom' || labelPlacement === 'right';
}

class Radio extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isActive: false,
      isHovered: false
    });

    _defineProperty(this, "onMouseEnter", e => {
      this.setState({
        isHovered: true
      });
      this.props.onMouseEnter && this.props.onMouseEnter(e);
    });

    _defineProperty(this, "onMouseLeave", e => {
      this.setState({
        isHovered: false
      });
      this.props.onMouseLeave && this.props.onMouseLeave(e);
    });

    _defineProperty(this, "onMouseDown", e => {
      this.setState({
        isActive: true
      });
      this.props.onMouseDown && this.props.onMouseDown(e);
    });

    _defineProperty(this, "onMouseUp", e => {
      this.setState({
        isActive: false
      });
      this.props.onMouseUp && this.props.onMouseUp(e);
    });
  }

  componentDidMount() {
    if (this.props.autoFocus && this.props.inputRef.current) {
      this.props.inputRef.current.focus();
    }

    if (process.env.NODE_ENV !== "production" && this.props.isError) {
      console.warn('baseui:Radio Property "isError" will be removed in the next major version. Use "error" property instead.');
    }
  }

  render() {
    const {
      overrides = {}
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Label, labelProps] = getOverrides(overrides.Label, StyledLabel);
    const [Input, inputProps] = getOverrides(overrides.Input, StyledInput);
    const [Description, descriptionProps] = getOverrides(overrides.Description, StyledDescription);
    const [RadioMarkInner, radioMarkInnerProps] = getOverrides(overrides.RadioMarkInner, StyledRadioMarkInner);
    const [RadioMarkOuter, radioMarkOuterProps] = getOverrides(overrides.RadioMarkOuter, StyledRadioMarkOuter);
    const sharedProps = {
      $align: this.props.align,
      $checked: this.props.checked,
      $disabled: this.props.disabled,
      $hasDescription: !!this.props.description,
      $isActive: this.state.isActive,
      $isError: this.props.isError,
      $error: this.props.error,
      $isFocused: this.props.isFocused,
      $isFocusVisible: this.props.isFocused && this.props.isFocusVisible,
      $isHovered: this.state.isHovered,
      $labelPlacement: this.props.labelPlacement,
      $required: this.props.required,
      $value: this.props.value
    };
    const label = React.createElement(Label, _extends({}, sharedProps, labelProps), this.props.children);
    return React.createElement(React.Fragment, null, React.createElement(Root, _extends({
      "data-baseweb": "radio",
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp
    }, sharedProps, rootProps), isLabelTopLeft(this.props.labelPlacement) && label, React.createElement(RadioMarkOuter, _extends({}, sharedProps, radioMarkOuterProps), React.createElement(RadioMarkInner, _extends({}, sharedProps, radioMarkInnerProps))), React.createElement(Input, _extends({
      "aria-invalid": this.props.error || this.props.isError || null,
      checked: this.props.checked,
      disabled: this.props.disabled,
      name: this.props.name,
      onBlur: this.props.onBlur,
      onFocus: this.props.onFocus,
      onChange: this.props.onChange,
      ref: this.props.inputRef,
      required: this.props.required,
      tabIndex: this.props.tabIndex,
      type: "radio",
      value: this.props.value
    }, sharedProps, inputProps)), isLabelBottomRight(this.props.labelPlacement) && label), !!this.props.description && React.createElement(Description, _extends({}, sharedProps, descriptionProps), this.props.description));
  }

}

_defineProperty(Radio, "defaultProps", {
  overrides: {},
  checked: false,
  disabled: false,
  autoFocus: false,
  inputRef: React.createRef(),
  align: 'vertical',
  isError: false,
  error: false,
  onChange: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onFocus: () => {},
  onBlur: () => {}
});

export default Radio;
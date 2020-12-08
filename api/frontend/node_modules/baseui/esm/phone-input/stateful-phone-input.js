/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import StatefulPhoneInputContainer from './stateful-phone-input-container.js';
import PhoneInput from './phone-input.js';
import defaultProps from './default-props.js';
StatefulPhoneInput.defaultProps = defaultProps;
export default function StatefulPhoneInput(props) {
  return React.createElement(StatefulPhoneInputContainer, props, function (childrenProps) {
    return React.createElement(PhoneInput, childrenProps);
  });
}
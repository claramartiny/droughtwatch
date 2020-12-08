function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import Menu from './menu.js';
import { NestedMenuContext } from './nested-menus.js';
import StatefulContainer from './stateful-container.js';
export default class StatefulMenu extends React.PureComponent {
  render() {
    const {
      overrides,
      ...props
    } = this.props;
    return React.createElement(NestedMenuContext.Consumer, null, ctx => React.createElement(StatefulContainer, _extends({}, ctx, props), renderProps => React.createElement(Menu, _extends({}, renderProps, {
      overrides: overrides
    }))));
  }

}
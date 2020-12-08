/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { LayersManager } from '../layer/index.js';
import { ThemeProvider } from '../styles/index.js';

const BaseProvider = props => {
  const {
    children,
    overrides,
    theme,
    zIndex
  } = props;
  return React.createElement(LayersManager, {
    zIndex: zIndex,
    overrides: overrides
  }, React.createElement(ThemeProvider, {
    theme: theme
  }, children));
};

export default BaseProvider;
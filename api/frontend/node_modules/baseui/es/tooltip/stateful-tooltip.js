/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-tooltip-container.js';
import Tooltip from './tooltip.js';

function StatefulTooltip(props) {
  const {
    children,
    ...restProps
  } = props;
  return React.createElement(StatefulContainer, restProps, tooltipProps => React.createElement(Tooltip, tooltipProps, children));
}

StatefulTooltip.defaultProps = StatefulContainer.defaultProps;
export default StatefulTooltip;
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Block } from '../block/index.js';
import { flattenFragments } from '../helpers/react-helpers.js';
import { getOverrides } from '../helpers/overrides.js';
export const BaseFlexGrid = React.forwardRef(({
  display,
  flexWrap,
  ...restProps
}, ref) => React.createElement(Block, _extends({
  display: display || 'flex',
  flexWrap: flexWrap || flexWrap === false ? flexWrap : true,
  "data-baseweb": "flex-grid"
}, restProps, {
  ref: ref
})));

const FlexGrid = ({
  forwardedRef,
  children,
  as,
  overrides,
  flexGridColumnCount,
  flexGridColumnGap,
  flexGridRowGap,
  ...restProps
}) => {
  const [FlexGrid, flexGridProps] = getOverrides(overrides && overrides.Block, BaseFlexGrid);
  return React.createElement(FlexGrid // coerced to any because because of how react components are typed.
  // cannot guarantee an html element
  // eslint-disable-next-line flowtype/no-weak-types
  , _extends({
    ref: forwardedRef,
    as: as
  }, restProps, flexGridProps), // flatten fragments so FlexGrid correctly iterates over fragments’ children
  flattenFragments(children).map((child, flexGridItemIndex, {
    length: flexGridItemCount
  }) => {
    // $FlowFixMe https://github.com/facebook/flow/issues/4864
    return React.cloneElement(child, {
      flexGridColumnCount,
      flexGridColumnGap,
      flexGridRowGap,
      flexGridItemIndex,
      flexGridItemCount
    });
  }));
};

const FlexGridComponent = React.forwardRef((props, ref) => React.createElement(FlexGrid, _extends({}, props, {
  forwardedRef: ref
})));
FlexGridComponent.displayName = 'FlexGrid';
export default FlexGridComponent;
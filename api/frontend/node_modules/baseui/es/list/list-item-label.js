/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { StyledLabelContent, StyledLabelDescription, StyledLabelSublistContent } from './styled-components.js';

function ListItemLabel(props) {
  const {
    overrides = {}
  } = props;
  const [LabelSublistContent, labelSublistContentProps] = getOverrides(overrides.LabelSublistContent, StyledLabelSublistContent);
  const [LabelContent, labelContentProps] = getOverrides(overrides.LabelContent, StyledLabelContent);
  const [LabelDescription, labelDescriptionProps] = getOverrides(overrides.LabelDescription, StyledLabelDescription);

  if (props.sublist) {
    return React.createElement(LabelSublistContent, labelSublistContentProps, props.children);
  }

  return React.createElement("div", null, React.createElement(LabelContent, labelContentProps, props.children), props.description && React.createElement(LabelDescription, labelDescriptionProps, props.description));
}

export default ListItemLabel;
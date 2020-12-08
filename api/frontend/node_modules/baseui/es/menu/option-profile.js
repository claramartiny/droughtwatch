function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react'; // Components

import MaybeChildMenu from './maybe-child-menu.js';
import { StyledListItemProfile, StyledProfileImgContainer, StyledProfileImg, StyledProfileLabelsContainer, StyledProfileTitle, StyledProfileSubtitle, StyledProfileBody } from './styled-components.js';
import { getOverrides } from '../helpers/overrides.js'; // Types

export default function OptionProfile(props) {
  const {
    item,
    getChildMenu,
    getProfileItemLabels,
    getProfileItemImg,
    getProfileItemImgText,
    overrides = {},
    resetMenu = () => {},
    $isHighlighted,
    renderAll,
    ...restProps
  } = props;
  const [ListItemProfile, listItemProfileProps] = getOverrides(overrides.ListItemProfile, StyledListItemProfile);
  const [ProfileImgContainer, profileImgContainerProps] = getOverrides(overrides.ProfileImgContainer, StyledProfileImgContainer);
  const [ProfileImg, profileImgProps] = getOverrides(overrides.ProfileImg, StyledProfileImg);
  const [ProfileLabelsContainer, profileLabelsContainerProps] = getOverrides(overrides.ProfileLabelsContainer, StyledProfileLabelsContainer);
  const [ProfileTitle, profileTitleProps] = getOverrides(overrides.ProfileTitle, StyledProfileTitle);
  const [ProfileSubtitle, profileSubtitleProps] = getOverrides(overrides.ProfileSubtitle, StyledProfileSubtitle);
  const [ProfileBody, profileBodyProps] = getOverrides(overrides.ProfileBody, StyledProfileBody);
  const ItemImg = getProfileItemImg(item);
  const {
    title,
    subtitle,
    body
  } = getProfileItemLabels(item);
  return React.createElement(MaybeChildMenu, {
    getChildMenu: getChildMenu,
    isOpen: !!$isHighlighted,
    item: item,
    resetParentMenu: resetMenu,
    renderAll: renderAll,
    overrides: overrides
  }, React.createElement(ListItemProfile, _extends({}, restProps, listItemProfileProps), React.createElement(ProfileImgContainer, profileImgContainerProps, ItemImg && (typeof ItemImg === 'string' ? // Render img src string wrapped with image component
  React.createElement(ProfileImg, _extends({
    src: ItemImg,
    alt: getProfileItemImgText(item)
  }, profileImgProps)) : // Or just render the entire component user specified
  React.createElement(ItemImg, profileImgProps))), React.createElement(ProfileLabelsContainer, profileLabelsContainerProps, title && React.createElement(ProfileTitle, profileTitleProps, title), subtitle && React.createElement(ProfileSubtitle, profileSubtitleProps, subtitle), body && React.createElement(ProfileBody, profileBodyProps, body))));
}
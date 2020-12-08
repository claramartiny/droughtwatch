function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { LocaleContext } from '../locale/index.js';
import { getOverrides } from '../helpers/overrides.js';
import { OPTION_LIST_SIZE } from './constants.js';
import MaybeChildMenu from './maybe-child-menu.js';
import { StyledListItem, StyledListItemAnchor } from './styled-components.js';

function OptionList(props, ref) {
  const {
    getChildMenu,
    getItemLabel = item => item ? item.label : '',
    item,
    onMouseEnter = () => {},
    overrides = {},
    renderHrefAsAnchor = true,
    resetMenu = () => {},
    size = OPTION_LIST_SIZE.default,
    $isHighlighted,
    renderAll,
    ...restProps
  } = props;
  const [ListItem, listItemProps] = getOverrides(overrides.ListItem, StyledListItem);
  const [ListItemAnchor, listItemAnchorProps] = getOverrides(overrides.ListItemAnchor, StyledListItemAnchor);

  const getItem = item => {
    if (item.href && renderHrefAsAnchor) {
      return React.createElement(ListItemAnchor, _extends({
        $item: item,
        href: item.href
      }, listItemAnchorProps), getItemLabel(item));
    } else {
      return React.createElement(React.Fragment, null, getItemLabel(item));
    }
  };

  return React.createElement(LocaleContext.Consumer, null, locale => React.createElement(MaybeChildMenu, {
    getChildMenu: getChildMenu,
    isOpen: !!$isHighlighted,
    item: item,
    resetParentMenu: resetMenu,
    renderAll: renderAll,
    overrides: overrides
  }, React.createElement(ListItem, _extends({
    ref: ref,
    "aria-label": getChildMenu && getChildMenu(item) ? locale.menu.parentMenuItemAriaLabel : null,
    item: item,
    onMouseEnter: onMouseEnter,
    $size: size,
    $isHighlighted: $isHighlighted
  }, restProps, listItemProps), getItem({
    isHighlighted: $isHighlighted,
    ...item
  }))));
}

function areEqualShallow(a, b) {
  if (!a || !b) return false;

  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}

function compare(prevProps, nextProps) {
  return prevProps.$isHighlighted === nextProps.$isHighlighted && prevProps.$isFocused === nextProps.$isFocused && areEqualShallow(prevProps.item, nextProps.item) && areEqualShallow(prevProps.overrides, nextProps.overrides) && prevProps.size === nextProps.size && prevProps.getItemLabel === nextProps.getItemLabel && prevProps.getChildMenu === nextProps.getChildMenu && prevProps.resetMenu === nextProps.resetMenu;
}

const forwarded = React.forwardRef(OptionList);
forwarded.displayName = 'OptionList';
export default React.memo(forwarded, compare);
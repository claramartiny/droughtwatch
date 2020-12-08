function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { LocaleContext } from '../locale/index.js';
import { getOverrides, mergeOverrides } from '../helpers/overrides.js';
import PlusIcon from '../icon/plus.js';
import CheckIndeterminateIcon from '../icon/check-indeterminate.js';
import { PanelContainer as StyledPanelContainer, Header as StyledHeader, Content as StyledContent, ToggleIcon as StyledToggleIcon } from './styled-components.js';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible.js';

class Panel extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isFocusVisible: false
    });

    _defineProperty(this, "handleFocus", event => {
      if (isFocusVisible(event)) {
        this.setState({
          isFocusVisible: true
        });
      }
    });

    _defineProperty(this, "handleBlur", event => {
      if (this.state.isFocusVisible !== false) {
        this.setState({
          isFocusVisible: false
        });
      }
    });

    _defineProperty(this, "onClick", e => {
      const {
        disabled,
        expanded,
        onChange,
        onClick
      } = this.props;

      if (disabled) {
        return;
      }

      typeof onChange === 'function' && onChange({
        expanded: !expanded
      });
      typeof onClick === 'function' && onClick(e);
      return;
    });

    _defineProperty(this, "onKeyDown", e => {
      const {
        disabled,
        expanded,
        onChange,
        onKeyDown
      } = this.props;

      if (disabled) {
        return;
      }

      const ENTER = 13;
      const SPACE = 32;

      if (e.keyCode === ENTER || e.keyCode === SPACE) {
        typeof onChange === 'function' && onChange({
          expanded: !expanded
        });

        if (e.keyCode === SPACE) {
          e.preventDefault(); // prevent jumping scroll when using Space
        }
      }

      typeof onKeyDown === 'function' && onKeyDown(e);
      return;
    });
  }

  getSharedProps() {
    const {
      disabled,
      expanded
    } = this.props;
    return {
      $disabled: disabled,
      $expanded: expanded,
      $isFocusVisible: this.state.isFocusVisible
    };
  }

  render() {
    const {
      expanded,
      disabled,
      overrides = {},
      children,
      'aria-controls': ariaControls,
      title,
      renderPanelContent,
      renderAll
    } = this.props;
    const sharedProps = this.getSharedProps();
    const {
      PanelContainer: PanelContainerOverride,
      Header: HeaderOverride,
      Content: ContentOverride,
      ToggleIcon: ToggleIconOverride
    } = overrides;
    const [PanelContainer, panelContainerProps] = getOverrides(PanelContainerOverride, StyledPanelContainer);
    const [Header, headerProps] = getOverrides(HeaderOverride, StyledHeader);
    const [Content, contentProps] = getOverrides(ContentOverride, StyledContent);
    const toggleIconOverrides = mergeOverrides({
      Svg: {
        component: StyledToggleIcon
      }
    }, // $FlowFixMe
    {
      Svg: ToggleIconOverride
    });
    return React.createElement(LocaleContext.Consumer, null, locale => React.createElement(PanelContainer, _extends({}, sharedProps, panelContainerProps), React.createElement(Header, _extends({
      tabIndex: 0,
      role: "button",
      "aria-expanded": expanded,
      "aria-disabled": disabled || null
    }, sharedProps, headerProps, ariaControls ? {
      'aria-controls': ariaControls
    } : {}, {
      onClick: this.onClick,
      onKeyDown: this.onKeyDown,
      onFocus: forkFocus(headerProps, this.handleFocus),
      onBlur: forkBlur(headerProps, this.handleBlur)
    }), title, expanded ? React.createElement(CheckIndeterminateIcon, _extends({
      size: 16,
      title: locale.accordion.collapse
    }, sharedProps, {
      overrides: toggleIconOverrides
    })) : React.createElement(PlusIcon, _extends({
      size: 16,
      title: locale.accordion.expand
    }, sharedProps, {
      overrides: toggleIconOverrides
    }))), React.createElement(Content, _extends({}, sharedProps, contentProps, ariaControls ? {
      id: ariaControls
    } : {}), expanded || renderPanelContent || renderAll ? children : null)));
  }

}

_defineProperty(Panel, "defaultProps", {
  disabled: false,
  expanded: false,
  onChange: () => {},
  onClick: () => {},
  onKeyDown: () => {},
  title: ''
});

export default Panel;
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { Avatar as StyledAvatar, Initials as StyledInitials, Root as StyledRoot } from './styled-components.js';

function getInitials(name) {
  const words = name.split(' ');
  const initials = words.map(word => word[0]);
  return initials.slice(0, 2).join('').toUpperCase();
}

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleError", () => {
      this.setState({
        noImageAvailable: true
      });
    });

    this.state = {
      noImageAvailable: !this.props.src
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src !== this.props.src) {
      this.setState({
        noImageAvailable: !this.props.src
      });
    }
  }

  render() {
    const {
      noImageAvailable
    } = this.state;
    const {
      name,
      overrides = {},
      size,
      src
    } = this.props;
    const [Avatar, avatarProps] = getOverrides(overrides.Avatar, StyledAvatar);
    const [Initials, initialsProps] = getOverrides(overrides.Initials, StyledInitials);
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    return React.createElement(Root, _extends({
      "aria-label": noImageAvailable ? name : null,
      role: noImageAvailable ? 'img' : null,
      $didImageFailToLoad: noImageAvailable,
      $size: size,
      "data-baseweb": "avatar"
    }, rootProps), noImageAvailable ? React.createElement(Initials, initialsProps, this.props.initials || getInitials(name)) : React.createElement(Avatar, _extends({
      alt: name,
      onError: this.handleError,
      src: src,
      $size: size
    }, avatarProps)));
  }

}

_defineProperty(Avatar, "defaultProps", {
  overrides: {},
  size: 'scale1000'
});
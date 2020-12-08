function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
  var words = name.split(' ');
  var initials = words.map(function (word) {
    return word[0];
  });
  return initials.slice(0, 2).join('').toUpperCase();
}

var Avatar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Avatar, _React$Component);

  function Avatar(props) {
    var _this;

    _classCallCheck(this, Avatar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Avatar).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleError", function () {
      _this.setState({
        noImageAvailable: true
      });
    });

    _this.state = {
      noImageAvailable: !_this.props.src
    };
    return _this;
  }

  _createClass(Avatar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.src !== this.props.src) {
        this.setState({
          noImageAvailable: !this.props.src
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var noImageAvailable = this.state.noImageAvailable;
      var _this$props = this.props,
          name = _this$props.name,
          _this$props$overrides = _this$props.overrides,
          overrides = _this$props$overrides === void 0 ? {} : _this$props$overrides,
          size = _this$props.size,
          src = _this$props.src;

      var _getOverrides = getOverrides(overrides.Avatar, StyledAvatar),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          Avatar = _getOverrides2[0],
          avatarProps = _getOverrides2[1];

      var _getOverrides3 = getOverrides(overrides.Initials, StyledInitials),
          _getOverrides4 = _slicedToArray(_getOverrides3, 2),
          Initials = _getOverrides4[0],
          initialsProps = _getOverrides4[1];

      var _getOverrides5 = getOverrides(overrides.Root, StyledRoot),
          _getOverrides6 = _slicedToArray(_getOverrides5, 2),
          Root = _getOverrides6[0],
          rootProps = _getOverrides6[1];

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
  }]);

  return Avatar;
}(React.Component);

_defineProperty(Avatar, "defaultProps", {
  overrides: {},
  size: 'scale1000'
});

export { Avatar as default };
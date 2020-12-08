"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserProfileTile;

var React = _interopRequireWildcard(require("react"));

var _index = require("../avatar/index.js");

var _overrides = require("../helpers/overrides.js");

var _index2 = require("../typography/index.js");

var _styledComponents = require("./styled-components.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function UserProfileTile(props) {
  var _props$overrides = props.overrides,
      overrides = _props$overrides === void 0 ? {} : _props$overrides,
      username = props.username,
      usernameSubtitle = props.usernameSubtitle,
      userImgUrl = props.userImgUrl;

  var _getOverrides = (0, _overrides.getOverrides)(overrides.UserProfileTileContainer, _styledComponents.StyledUserProfileTileContainer),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      UserProfileTileContainer = _getOverrides2[0],
      userProfileTileContainerProps = _getOverrides2[1];

  var _getOverrides3 = (0, _overrides.getOverrides)(overrides.UserProfilePictureContainer, _styledComponents.StyledUserProfilePictureContainer),
      _getOverrides4 = _slicedToArray(_getOverrides3, 2),
      UserProfilePictureContainer = _getOverrides4[0],
      userProfilePictureContainerProps = _getOverrides4[1];

  var _getOverrides5 = (0, _overrides.getOverrides)(overrides.UserProfileInfoContainer, _styledComponents.StyledUserProfileInfoContainer),
      _getOverrides6 = _slicedToArray(_getOverrides5, 2),
      UserProfileInfoContainer = _getOverrides6[0],
      userProfileInfoContainerProps = _getOverrides6[1];

  return (// Replace with a  profile tile renderer: renderUserProfileTile()
    React.createElement(UserProfileTileContainer, userProfileTileContainerProps, React.createElement(UserProfilePictureContainer, userProfilePictureContainerProps, React.createElement(_index.Avatar, {
      name: username || '',
      src: userImgUrl,
      size: '48px'
    })), React.createElement(UserProfileInfoContainer, userProfileInfoContainerProps, React.createElement(_index2.LabelMedium, null, username), usernameSubtitle ? React.createElement(_index2.ParagraphSmall, {
      marginTop: "0",
      marginBottom: "0"
    }, usernameSubtitle) : null))
  );
}
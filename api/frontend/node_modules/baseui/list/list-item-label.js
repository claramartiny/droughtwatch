"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _overrides = require("../helpers/overrides.js");

var _styledComponents = require("./styled-components.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ListItemLabel(props) {
  var _props$overrides = props.overrides,
      overrides = _props$overrides === void 0 ? {} : _props$overrides;

  var _getOverrides = (0, _overrides.getOverrides)(overrides.LabelSublistContent, _styledComponents.StyledLabelSublistContent),
      _getOverrides2 = _slicedToArray(_getOverrides, 2),
      LabelSublistContent = _getOverrides2[0],
      labelSublistContentProps = _getOverrides2[1];

  var _getOverrides3 = (0, _overrides.getOverrides)(overrides.LabelContent, _styledComponents.StyledLabelContent),
      _getOverrides4 = _slicedToArray(_getOverrides3, 2),
      LabelContent = _getOverrides4[0],
      labelContentProps = _getOverrides4[1];

  var _getOverrides5 = (0, _overrides.getOverrides)(overrides.LabelDescription, _styledComponents.StyledLabelDescription),
      _getOverrides6 = _slicedToArray(_getOverrides5, 2),
      LabelDescription = _getOverrides6[0],
      labelDescriptionProps = _getOverrides6[1];

  if (props.sublist) {
    return _react.default.createElement(LabelSublistContent, labelSublistContentProps, props.children);
  }

  return _react.default.createElement("div", null, _react.default.createElement(LabelContent, labelContentProps, props.children), props.description && _react.default.createElement(LabelDescription, labelDescriptionProps, props.description));
}

var _default = ListItemLabel;
exports.default = _default;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelperSteps = HelperSteps;

var React = _interopRequireWildcard(require("react"));

var _index = require("../icon/index.js");

var _index2 = require("../button/index.js");

var _index3 = require("../styles/index.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function HelperSteps(_ref) {
  var index = _ref.index,
      length = _ref.length,
      onFinish = _ref.onFinish,
      onPrev = _ref.onPrev,
      onNext = _ref.onNext;

  var _useStyletron = (0, _index3.useStyletron)(),
      _useStyletron2 = _slicedToArray(_useStyletron, 2),
      css = _useStyletron2[0],
      theme = _useStyletron2[1];

  var isLast = index === length - 1;
  return React.createElement("div", {
    className: css({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between'
    })
  }, React.createElement(_index2.Button, {
    disabled: index === 0,
    kind: _index2.KIND.secondary,
    onClick: onPrev,
    shape: _index2.SHAPE.circle
  }, React.createElement(_index.ArrowLeft, {
    size: 20
  })), React.createElement("div", {
    className: css({
      display: 'flex'
    })
  }, new Array(length).fill().map(function (_, i) {
    return React.createElement("div", {
      key: i,
      className: css({
        height: '8px',
        width: '8px',
        backgroundColor: i === index ? theme.colors.contentPrimary : theme.colors.backgroundTertiary,
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        borderBottomLeftRadius: '50%',
        ':not(:last-child)': {
          marginRight: '8px'
        }
      })
    });
  })), React.createElement(_index2.Button, {
    kind: isLast ? _index2.KIND.primary : _index2.KIND.secondary,
    onClick: isLast ? onFinish : onNext,
    shape: _index2.SHAPE.circle
  }, isLast ? React.createElement(_index.Check, {
    size: 20
  }) : React.createElement(_index.ArrowRight, {
    size: 20
  })));
}
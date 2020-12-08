function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
import valid from 'card-validator';
import { addGaps, getCaretPosition } from './utils.js';
import { getOverrides } from '../helpers/overrides.js';
import { Input, SIZE } from '../input/index.js';
import { ThemeContext } from '../styles/theme-provider.js';
import AmexIcon from './icons/amex.js';
import DinersClubIcon from './icons/dinersclub.js';
import DiscoverIcon from './icons/discover.js';
import EloIcon from './icons/elo.js';
import GenericIcon from './icons/generic.js';
import JcbIcon from './icons/jcb.js';
import MaestroIcon from './icons/maestro.js';
import MastercardIcon from './icons/mastercard.js';
import UnionPayIcon from './icons/unionpay.js';
import VisaIcon from './icons/visa.js';
import { IconWrapper as StyledIconWrapper } from './styled-components.js';
var CardTypeToComponent = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  'american-express': AmexIcon,
  'diners-club': DinersClubIcon,
  discover: DiscoverIcon,
  jcb: JcbIcon,
  unionpay: UnionPayIcon,
  maestro: MaestroIcon,
  elo: EloIcon,
  generic: GenericIcon
};

var PaymentCard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PaymentCard, _React$Component);

  function PaymentCard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PaymentCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PaymentCard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "caretPosition", 0);

    _defineProperty(_assertThisInitialized(_this), "inRef", null);

    return _this;
  }

  _createClass(PaymentCard, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.inRef && prevProps.value !== this.props.value) {
        this.inRef.setSelectionRange(this.caretPosition, this.caretPosition);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$overrides = _this$props.overrides,
          overrides = _this$props$overrides === void 0 ? {} : _this$props$overrides,
          _this$props$size = _this$props.size,
          size = _this$props$size === void 0 ? SIZE.default : _this$props$size,
          _onChange = _this$props.onChange,
          value = _this$props.value,
          _this$props$ariaLabe = _this$props['aria-label'],
          ariaLabel = _this$props$ariaLabe === void 0 ? 'Please enter a debit or credit card number.' : _this$props$ariaLabe,
          restProps = _objectWithoutProperties(_this$props, ["overrides", "size", "onChange", "value", "aria-label"]);

      var IconWrapperOverride = overrides.IconWrapper,
          restOverrides = _objectWithoutProperties(overrides, ["IconWrapper"]);

      var _getOverrides = getOverrides(IconWrapperOverride, StyledIconWrapper),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          IconWrapper = _getOverrides2[0],
          iconWrapperProps = _getOverrides2[1];

      var validatedValue = valid.number(value);
      var gaps = [];
      var type = undefined;

      if (validatedValue.card) {
        gaps = validatedValue.card.gaps || [];
        type = validatedValue.card.type;
      }

      var getBeforeComponent = function getBeforeComponent(theme) {
        var _iconSize;

        var iconSize = (_iconSize = {}, _defineProperty(_iconSize, SIZE.mini, theme.sizing.scale600), _defineProperty(_iconSize, SIZE.compact, theme.sizing.scale800), _defineProperty(_iconSize, SIZE.default, theme.sizing.scale900), _defineProperty(_iconSize, SIZE.large, theme.sizing.scale1000), _iconSize);
        return function () {
          return React.createElement(IconWrapper, _extends({
            $size: size
          }, iconWrapperProps), React.createElement(CardTypeToComponent[type || 'generic'] || GenericIcon, {
            size: iconSize[size]
          }));
        };
      };

      return React.createElement(ThemeContext.Consumer, null, function (theme) {
        return React.createElement(Input, _extends({
          size: size,
          "aria-label": ariaLabel,
          "data-baseweb": "payment-card-input",
          inputMode: "numeric",
          overrides: Object.freeze(_objectSpread({}, restOverrides, {
            Before: getBeforeComponent(theme)
          })),
          onChange: function onChange(e) {
            var _getCaretPosition = getCaretPosition(e.target.value, _this2.props.value ? String(_this2.props.value) : '', e.target.selectionStart),
                _getCaretPosition2 = _slicedToArray(_getCaretPosition, 2),
                position = _getCaretPosition2[0],
                value = _getCaretPosition2[1];

            _this2.caretPosition = position;
            _this2.inRef = e.target;
            e.target.value = value;
            _onChange && _onChange(e);
          },
          value: addGaps(gaps, String(value) || '')
        }, restProps));
      });
    }
  }]);

  return PaymentCard;
}(React.Component);

_defineProperty(PaymentCard, "defaultProps", {
  autoComplete: 'cc-number',
  autoFocus: false,
  disabled: false,
  name: '',
  error: false,
  onBlur: function onBlur() {},
  onFocus: function onFocus() {},
  overrides: {},
  required: false,
  size: 'default',
  startEnhancer: null,
  endEnhancer: null
});

export default PaymentCard;
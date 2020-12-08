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
import Day from './day.js';
import { StyledWeek } from './styled-components.js';
import { WEEKDAYS } from './constants.js';
import dateFnsAdapter from './utils/date-fns-adapter.js';
import DateHelpers from './utils/date-helpers.js';
import { getOverrides } from '../helpers/overrides.js';

var Week =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Week, _React$Component);

  function Week(props) {
    var _this;

    _classCallCheck(this, Week);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Week).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "dateHelpers", void 0);

    _defineProperty(_assertThisInitialized(_this), "renderDays", function () {
      var startOfWeek = _this.dateHelpers.getStartOfWeek(_this.props.date || _this.dateHelpers.date(), _this.props.locale);

      var days = []; // $FlowFixMe

      return days.concat(WEEKDAYS.map(function (offset) {
        var day = _this.dateHelpers.addDays(startOfWeek, offset);

        return (// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          React.createElement(Day, {
            adapter: _this.props.adapter,
            date: day,
            disabled: _this.dateHelpers.isDayDisabled(day, _this.props),
            excludeDates: _this.props.excludeDates,
            filterDate: _this.props.filterDate,
            highlightedDate: _this.props.highlightedDate,
            highlighted: _this.dateHelpers.isSameDay(day, _this.props.highlightedDate),
            includeDates: _this.props.includeDates,
            focusedCalendar: _this.props.focusedCalendar,
            range: _this.props.range,
            key: offset,
            locale: _this.props.locale,
            minDate: _this.props.minDate,
            maxDate: _this.props.maxDate,
            month: _this.props.month,
            onSelect: _this.props.onChange,
            onBlur: _this.props.onDayBlur,
            onFocus: _this.props.onDayFocus,
            onClick: _this.props.onDayClick,
            onMouseOver: _this.props.onDayMouseOver,
            onMouseLeave: _this.props.onDayMouseLeave,
            overrides: _this.props.overrides,
            peekNextMonth: _this.props.peekNextMonth,
            value: _this.props.value
          })
        );
      }));
    });

    _this.dateHelpers = new DateHelpers(props.adapter);
    return _this;
  }

  _createClass(Week, [{
    key: "render",
    value: function render() {
      var _this$props$overrides = this.props.overrides,
          overrides = _this$props$overrides === void 0 ? {} : _this$props$overrides;

      var _getOverrides = getOverrides(overrides.Week, StyledWeek),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          Week = _getOverrides2[0],
          weekProps = _getOverrides2[1];

      return React.createElement(Week, _extends({
        role: "row"
      }, weekProps), this.renderDays());
    }
  }]);

  return Week;
}(React.Component);

_defineProperty(Week, "defaultProps", {
  adapter: dateFnsAdapter,
  highlightedDate: null,
  onDayClick: function onDayClick() {},
  onDayFocus: function onDayFocus() {},
  onDayBlur: function onDayBlur() {},
  onDayMouseOver: function onDayMouseOver() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  onChange: function onChange() {},
  overrides: {},
  peekNextMonth: false
});

export { Week as default };
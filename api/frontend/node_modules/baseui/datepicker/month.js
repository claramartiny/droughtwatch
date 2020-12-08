"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _week = _interopRequireDefault(require("./week.js"));

var _styledComponents = require("./styled-components.js");

var _dateFnsAdapter = _interopRequireDefault(require("./utils/date-fns-adapter.js"));

var _dateHelpers = _interopRequireDefault(require("./utils/date-helpers.js"));

var _overrides = require("../helpers/overrides.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var defaultProps = {
  excludeDates: null,
  filterDate: null,
  highlightDates: null,
  includeDates: null,
  locale: null,
  maxDate: null,
  minDate: null,
  month: null,
  adapter: _dateFnsAdapter.default,
  onDayClick: function onDayClick() {},
  onDayFocus: function onDayFocus() {},
  onDayBlur: function onDayBlur() {},
  onDayMouseOver: function onDayMouseOver() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  overrides: {},
  peekNextMonth: false,
  value: null
};

var CalendarMonth =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CalendarMonth, _React$Component);

  function CalendarMonth(props) {
    var _this;

    _classCallCheck(this, CalendarMonth);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CalendarMonth).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "dateHelpers", void 0);

    _defineProperty(_assertThisInitialized(_this), "getDateProp", function () {
      return _this.props.date || _this.dateHelpers.date();
    });

    _defineProperty(_assertThisInitialized(_this), "isWeekInMonth", function (startOfWeek) {
      var date = _this.getDateProp();

      var endOfWeek = _this.dateHelpers.addDays(startOfWeek, 6);

      return _this.dateHelpers.isSameMonth(startOfWeek, date) || _this.dateHelpers.isSameMonth(endOfWeek, date);
    });

    _defineProperty(_assertThisInitialized(_this), "renderWeeks", function () {
      var weeks = [];

      var currentWeekStart = _this.dateHelpers.getStartOfWeek(_this.dateHelpers.getStartOfMonth(_this.getDateProp()), _this.props.locale);

      var i = 0;
      var isWithinMonth = true;

      while (isWithinMonth) {
        weeks.push(React.createElement(_week.default, {
          adapter: _this.props.adapter,
          date: currentWeekStart,
          excludeDates: _this.props.excludeDates,
          filterDate: _this.props.filterDate,
          highlightedDate: _this.props.highlightedDate,
          includeDates: _this.props.includeDates,
          focusedCalendar: _this.props.focusedCalendar,
          range: _this.props.range,
          key: i,
          locale: _this.props.locale,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          month: _this.dateHelpers.getMonth(_this.getDateProp()),
          onDayBlur: _this.props.onDayBlur,
          onDayFocus: _this.props.onDayFocus,
          onDayClick: _this.props.onDayClick,
          onDayMouseOver: _this.props.onDayMouseOver,
          onDayMouseLeave: _this.props.onDayMouseLeave,
          onChange: _this.props.onChange,
          overrides: _this.props.overrides,
          peekNextMonth: _this.props.peekNextMonth,
          value: _this.props.value
        }));
        i++;
        currentWeekStart = _this.dateHelpers.addWeeks(currentWeekStart, 1); // It will break on the next week if the week is out of the month

        isWithinMonth = _this.isWeekInMonth(currentWeekStart);
      }

      return weeks;
    });

    _this.dateHelpers = new _dateHelpers.default(props.adapter);
    return _this;
  }

  _createClass(CalendarMonth, [{
    key: "render",
    value: function render() {
      var _this$props$overrides = this.props.overrides,
          overrides = _this$props$overrides === void 0 ? {} : _this$props$overrides;

      var _getOverrides = (0, _overrides.getOverrides)(overrides.Month, _styledComponents.StyledMonth),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          Month = _getOverrides2[0],
          monthProps = _getOverrides2[1];

      return React.createElement(Month, monthProps, this.renderWeeks());
    }
  }]);

  return CalendarMonth;
}(React.Component);

exports.default = CalendarMonth;

_defineProperty(CalendarMonth, "defaultProps", defaultProps);
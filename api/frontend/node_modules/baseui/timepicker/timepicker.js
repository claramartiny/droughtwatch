"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _overrides = require("../helpers/overrides.js");

var _index = require("../locale/index.js");

var _index2 = require("../select/index.js");

var _dateHelpers = _interopRequireDefault(require("../datepicker/utils/date-helpers.js"));

var _dateFnsAdapter = _interopRequireDefault(require("../datepicker/utils/date-fns-adapter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var MINUTE = 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var NOON = DAY / 2;

var TimePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props) {
    var _this;

    _classCallCheck(this, TimePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "dateHelpers", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      steps: [],
      value: null
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (params) {
      _this.setState({
        value: params.value[0]
      });

      if (params.value.length === 0) {
        if (_this.props.nullable) {
          _this.props.onChange && _this.props.onChange(null);
        }

        return;
      }

      var seconds = typeof params.value[0].id === 'string' ? parseInt(params.value[0].id, 10) : params.value[0].id || 0;

      _this.handleChange(seconds);
    });

    _defineProperty(_assertThisInitialized(_this), "secondsToLabel", function (seconds, format) {
      var _this$dateHelpers$sec = _this.dateHelpers.secondsToHourMinute(seconds),
          _this$dateHelpers$sec2 = _slicedToArray(_this$dateHelpers$sec, 2),
          hours = _this$dateHelpers$sec2[0],
          minutes = _this$dateHelpers$sec2[1];

      var zeroPrefix = function zeroPrefix(n) {
        return n < 10 ? "0".concat(n) : n;
      };

      if (format === '12') {
        var isAfterNoon = seconds >= NOON;

        if (isAfterNoon) {
          hours -= 12;
        }

        if (hours === 0) {
          hours = 12;
        }

        return "".concat(hours, ":").concat(zeroPrefix(minutes), " ").concat(isAfterNoon ? 'PM' : 'AM');
      }

      return "".concat(zeroPrefix(hours), ":").concat(zeroPrefix(minutes));
    });

    _defineProperty(_assertThisInitialized(_this), "stringToOptions", function (str) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '12';
      // leading zero is optional, AM/PM is optional
      var twelveHourRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]?)?$/; // leading zero is optional

      var twentyFourHourRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
      var regex = format === '12' ? twelveHourRegex : twentyFourHourRegex;
      var match = str.match(regex);

      if (!match) {
        return [];
      }

      var hours = Number(match[1]);
      var minutes = Number(match[2]);
      var hoursMinutes = [];

      switch (format) {
        case '24':
          {
            hoursMinutes = [{
              hours: hours,
              minutes: minutes
            }];
            break;
          }

        case '12':
        default:
          {
            var twelveHours = hours % 12;
            var meridiem = match[3]; // if there's no AM/PM, add both AM and PM options

            if (!meridiem) {
              hoursMinutes = [{
                hours: twelveHours,
                minutes: minutes
              }, {
                hours: twelveHours + 12,
                minutes: minutes
              }];
            } else {
              var twentyFourHours = meridiem.toLowerCase()[0] === 'a' ? twelveHours : twelveHours + 12;
              hoursMinutes = [{
                hours: twentyFourHours,
                minutes: minutes
              }];
            }

            break;
          }
      }

      return hoursMinutes.map(function (_ref) {
        var hours = _ref.hours,
            minutes = _ref.minutes;
        var secs = hours * 3600 + minutes * 60;
        return {
          id: secs,
          label: _this.secondsToLabel(secs, format)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (seconds) {
      var date = _this.props.adapter.date(_this.props.value || undefined);

      var _this$dateHelpers$sec3 = _this.dateHelpers.secondsToHourMinute(seconds),
          _this$dateHelpers$sec4 = _slicedToArray(_this$dateHelpers$sec3, 2),
          hours = _this$dateHelpers$sec4[0],
          minutes = _this$dateHelpers$sec4[1];

      var hourDate = _this.props.adapter.setHours(date, hours);

      var minuteDate = _this.props.adapter.setMinutes(hourDate, minutes);

      var updatedDate = _this.props.adapter.setSeconds(minuteDate, 0);

      _this.props.onChange && _this.props.onChange(updatedDate);
    });

    _defineProperty(_assertThisInitialized(_this), "buildSteps", function () {
      var _this$props$step = _this.props.step,
          step = _this$props$step === void 0 ? 900 : _this$props$step;
      var stepCount = DAY / step;

      if (!Number.isInteger(stepCount)) {
        var previousStepCount = stepCount;
        stepCount = Math.round(stepCount);

        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("Provided step value (".concat(step, ") does not spread evenly across a day. Rounding from ").concat(previousStepCount, " total steps to ").concat(stepCount, "."));
        }
      }

      var options = [];

      for (var i = 0; i < DAY; i += step) {
        options.push(i);
      }

      return options;
    });

    _defineProperty(_assertThisInitialized(_this), "creatableFilterOptions", function (options, filterValue, excludeOptions, newProps) {
      var result = _this.stringToOptions(filterValue, _this.props.format);

      if (result.length) {
        return result;
      }

      return (0, _index2.filterOptions)(options, filterValue, excludeOptions, newProps);
    });

    _defineProperty(_assertThisInitialized(_this), "buildSelectedOption", function (value) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '12';

      var secs = _this.dateHelpers.dateToSeconds(value);

      return {
        id: secs,
        label: _this.secondsToLabel(secs, format || '12')
      };
    });

    _this.dateHelpers = new _dateHelpers.default(props.adapter);
    return _this;
  }

  _createClass(TimePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var steps = this.buildSteps();

      if (this.props.value && this.props.adapter.isValid(this.props.value)) {
        this.setState({
          steps: steps,
          value: this.buildSelectedOption(this.props.value, this.props.format)
        });
      } else {
        var seconds = this.dateHelpers.dateToSeconds(this.props.adapter.date());
        var closestStep = NOON;
        steps.forEach(function (step) {
          if (Math.abs(step - seconds) < Math.abs(closestStep - seconds)) {
            closestStep = step;
          }
        });
        this.setState({
          steps: steps,
          value: this.props.nullable ? undefined : {
            id: closestStep,
            label: this.secondsToLabel(closestStep, undefined)
          }
        });

        if (this.props.value || !this.props.nullable && !this.props.value) {
          this.handleChange(closestStep);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var formatChanged = prevProps.format !== this.props.format;
      var stepChanged = prevProps.step !== this.props.step;
      var adapterChanged = prevProps.adapter !== this.props.adapter;

      if (adapterChanged) {
        this.dateHelpers = new _dateHelpers.default(this.props.adapter);
      }

      if (formatChanged || stepChanged) {
        var steps = this.buildSteps();
        this.setState({
          steps: steps
        });
      }

      if (prevProps.value && !this.props.value) {
        this.setState({
          value: null
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          format = _this$props.format,
          _this$props$overrides = _this$props.overrides,
          overrides = _this$props$overrides === void 0 ? {} : _this$props$overrides,
          adapter = _this$props.adapter;

      var _getOverrides = (0, _overrides.getOverrides)(overrides.Select, _index2.Select),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          OverriddenSelect = _getOverrides2[0],
          selectProps = _getOverrides2[1];

      var selectOverrides = (0, _overrides.mergeOverrides)({
        Dropdown: {
          style: {
            maxHeight: '126px'
          }
        }
      }, // $FlowFixMe
      selectProps.overrides); // $FlowFixMe

      selectProps.overrides = selectOverrides;
      var value = this.props.value && adapter.isValid(this.props.value) ? this.buildSelectedOption(this.props.value, this.props.format) : this.state.value;
      return React.createElement(_index.LocaleContext.Consumer, null, function (locale) {
        var ariaLabel;

        if (locale.datepicker.timePickerAriaLabel) {
          ariaLabel = locale.datepicker.timePickerAriaLabel;
        } else {
          ariaLabel = format === '12' ? locale.datepicker.timePickerAriaLabel12Hour : locale.datepicker.timePickerAriaLabel24Hour;
        }

        return React.createElement(OverriddenSelect, _extends({
          "aria-label": ariaLabel,
          disabled: _this2.props.disabled,
          error: _this2.props.error,
          positive: _this2.props.positive,
          size: _this2.props.size,
          placeholder: _this2.props.placeholder || 'HH:mm',
          options: _this2.state.steps.map(function (n) {
            return {
              id: n,
              label: _this2.secondsToLabel(n, _this2.props.format)
            };
          }),
          filterOptions: _this2.props.creatable ? _this2.creatableFilterOptions : undefined,
          onChange: _this2.onChange // if value is defined, it should be an array type
          ,
          value: value ? [value] : value,
          clearable: false,
          backspaceRemoves: false
        }, selectProps));
      });
    }
  }]);

  return TimePicker;
}(React.Component);

_defineProperty(TimePicker, "defaultProps", {
  format: '12',
  step: 900,
  creatable: false,
  adapter: _dateFnsAdapter.default
});

var _default = TimePicker;
exports.default = _default;
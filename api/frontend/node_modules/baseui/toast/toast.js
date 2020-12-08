"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _overrides = require("../helpers/overrides.js");

var _delete = _interopRequireDefault(require("../icon/delete.js"));

var _styledComponents = require("./styled-components.js");

var _constants = require("./constants.js");

var _index = require("../locale/index.js");

var _focusVisible = require("../utils/focusVisible.js");

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

var Toast =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Toast, _React$Component);

  function Toast(props) {
    var _this;

    _classCallCheck(this, Toast);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Toast).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "autoHideTimeout", void 0);

    _defineProperty(_assertThisInitialized(_this), "animateInTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "animateOutCompleteTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "closeRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "previouslyFocusedElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isVisible: false,
      isRendered: true,
      isFocusVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (event) {
      if ((0, _focusVisible.isFocusVisible)(event)) {
        _this.setState({
          isFocusVisible: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (event) {
      if (_this.state.isFocusVisible !== false) {
        _this.setState({
          isFocusVisible: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "animateIn", function () {
      // Defer to next event loop
      _this.animateInTimer = setTimeout(function () {
        _this.setState({
          isVisible: true
        });
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "animateOut", function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      _this.setState({
        isVisible: false
      }); // Remove the toast from the DOM after animation finishes


      _this.animateOutCompleteTimer = setTimeout(function () {
        _this.setState({
          isRendered: false
        });

        callback();
      }, 600);
    });

    _defineProperty(_assertThisInitialized(_this), "dismiss", function () {
      _this.animateOut(_this.props.onClose);

      if (_this.props.autoFocus && _this.previouslyFocusedElement) {
        _this.previouslyFocusedElement.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (e) {
      if (!_this.state.isVisible) return;
      clearTimeout(_this.autoHideTimeout);
      clearTimeout(_this.animateOutCompleteTimer);
      typeof _this.props.onFocus === 'function' && _this.props.onFocus(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (e) {
      if (!_this.state.isVisible) return;
      clearTimeout(_this.autoHideTimeout);
      clearTimeout(_this.animateOutCompleteTimer);
      typeof _this.props.onMouseEnter === 'function' && _this.props.onMouseEnter(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (e) {
      _this.startTimeout();

      typeof _this.props.onBlur === 'function' && _this.props.onBlur(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (e) {
      _this.startTimeout();

      typeof _this.props.onMouseLeave === 'function' && _this.props.onMouseLeave(e);
    });

    _this.closeRef = React.createRef();
    _this.previouslyFocusedElement = null;
    return _this;
  }

  _createClass(Toast, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.animateIn();
      this.startTimeout();

      if (typeof document !== 'undefined' && this.props.autoFocus && this.closeRef && this.closeRef.current && this.closeRef.current.focus && typeof this.closeRef.current.focus === 'function') {
        this.previouslyFocusedElement = document.activeElement; // $FlowFixMe: CloseIcon is `mixed` type so doesn't like `focus` call.

        this.closeRef.current.focus();
        this.setState({
          isFocusVisible: true
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.autoHideDuration !== prevProps.autoHideDuration || this.props.__updated !== prevProps.__updated) {
        this.startTimeout();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearTimeout();
    }
  }, {
    key: "startTimeout",
    value: function startTimeout() {
      if (this.props.autoHideDuration) {
        if (this.autoHideTimeout) {
          clearTimeout(this.autoHideTimeout);
        }

        this.autoHideTimeout = setTimeout(this.dismiss, this.props.autoHideDuration);
      }
    }
  }, {
    key: "clearTimeout",
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function () {
      [this.autoHideTimeout, this.animateInTimer, this.animateOutCompleteTimer].forEach(function (timerId) {
        if (timerId) {
          clearTimeout(timerId);
        }
      });
    })
  }, {
    key: "getSharedProps",
    value: function getSharedProps() {
      var _this$props = this.props,
          kind = _this$props.kind,
          notificationType = _this$props.notificationType,
          closeable = _this$props.closeable;
      var _this$state = this.state,
          isRendered = _this$state.isRendered,
          isVisible = _this$state.isVisible;
      return {
        $kind: kind,
        $type: notificationType,
        $closeable: closeable,
        $isRendered: isRendered,
        $isVisible: isVisible
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          closeable = _this$props2.closeable;
      var isRendered = this.state.isRendered;
      var _this$props$overrides = this.props.overrides,
          BodyOverride = _this$props$overrides.Body,
          CloseIconOverride = _this$props$overrides.CloseIcon,
          InnerContainerOverride = _this$props$overrides.InnerContainer;

      var _getOverrides = (0, _overrides.getOverrides)(BodyOverride, _styledComponents.Body),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          Body = _getOverrides2[0],
          bodyProps = _getOverrides2[1];

      var _getOverrides3 = (0, _overrides.getOverrides)(InnerContainerOverride, _styledComponents.InnerContainer),
          _getOverrides4 = _slicedToArray(_getOverrides3, 2),
          InnerContainer = _getOverrides4[0],
          innerContainerProps = _getOverrides4[1];

      var _getOverrides5 = (0, _overrides.getOverrides)(CloseIconOverride, _styledComponents.CloseIconSvg),
          _getOverrides6 = _slicedToArray(_getOverrides5, 2),
          CloseIcon = _getOverrides6[0],
          closeIconProps = _getOverrides6[1];

      var closeIconOverrides = (0, _overrides.mergeOverrides)({
        Svg: {
          component: CloseIcon
        }
      }, // $FlowFixMe
      {
        Svg: CloseIconOverride
      });
      var sharedProps = this.getSharedProps();

      if (!isRendered) {
        return null;
      }

      return React.createElement(_index.LocaleContext.Consumer, null, function (locale) {
        return React.createElement(Body, _extends({
          role: "alert",
          "data-baseweb": _this2.props['data-baseweb'] || 'toast'
        }, sharedProps, bodyProps, {
          // the properties below have to go after overrides
          onBlur: _this2.onBlur,
          onFocus: _this2.onFocus,
          onMouseEnter: _this2.onMouseEnter,
          onMouseLeave: _this2.onMouseLeave
        }), React.createElement(InnerContainer, _extends({}, sharedProps, innerContainerProps), typeof children === 'function' ? children({
          dismiss: _this2.dismiss
        }) : children), closeable ? React.createElement(_delete.default, _extends({
          ref: _this2.closeRef,
          role: "button",
          tabIndex: 0,
          $isFocusVisible: _this2.state.isFocusVisible,
          onClick: _this2.dismiss,
          onKeyPress: function onKeyPress(event) {
            if (event.key === 'Enter') {
              _this2.dismiss();
            }
          },
          title: locale.toast.close
        }, sharedProps, closeIconProps, {
          onFocus: (0, _focusVisible.forkFocus)(closeIconProps, _this2.handleFocus),
          onBlur: (0, _focusVisible.forkBlur)(closeIconProps, _this2.handleBlur),
          overrides: closeIconOverrides
        })) : null);
      });
    }
  }]);

  return Toast;
}(React.Component);

_defineProperty(Toast, "defaultProps", {
  autoFocus: false,
  autoHideDuration: 0,
  closeable: true,
  kind: _constants.KIND.info,
  notificationType: _constants.TYPE.toast,
  // Do we need a separate handler for
  // when a notification dismisses automatically
  onClose: function onClose() {},
  onBlur: function onBlur() {},
  onFocus: function onFocus() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},
  overrides: {}
});

var _default = Toast;
exports.default = _default;
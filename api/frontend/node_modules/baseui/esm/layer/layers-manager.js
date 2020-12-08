function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
import { styled } from '../styles/index.js';
import { getOverrides } from '../helpers/overrides.js';
import { initFocusVisible } from '../utils/focusVisible.js';
var StyledAppContainer = styled('div', {});
StyledAppContainer.displayName = "StyledAppContainer";
var StyledLayersContainer = styled('div', {});
StyledLayersContainer.displayName = "StyledLayersContainer";

function defaultEventHandlerFn() {
  if (process.env.NODE_ENV !== "production") {
    console.warn('`LayersManager` was not found. This occurs if you are attempting to use a component requiring `Layer` without using the `BaseProvider` at the root of your app. Please visit https://baseweb.design/components/base-provider/ for more information');
  }
}

export var LayersContext = React.createContext({
  addEscapeHandler: defaultEventHandlerFn,
  removeEscapeHandler: defaultEventHandlerFn,
  addDocClickHandler: defaultEventHandlerFn,
  removeDocClickHandler: defaultEventHandlerFn,
  host: undefined,
  zIndex: undefined
});
export var Provider = LayersContext.Provider;
export var Consumer = LayersContext.Consumer;

var LayersManager =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LayersManager, _React$Component);

  function LayersManager(props) {
    var _this;

    _classCallCheck(this, LayersManager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LayersManager).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "host", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "containerRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "onDocumentClick", function (event) {
      var docClickHandler = _this.state.docClickHandlers[_this.state.docClickHandlers.length - 1];

      if (docClickHandler) {
        docClickHandler(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      if (event.key === 'Escape') {
        var escapeKeyHandler = _this.state.escapeKeyHandlers[_this.state.escapeKeyHandlers.length - 1];

        if (escapeKeyHandler) {
          escapeKeyHandler();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onAddEscapeHandler", function (escapeKeyHandler) {
      _this.setState(function (prev) {
        return {
          escapeKeyHandlers: [].concat(_toConsumableArray(prev.escapeKeyHandlers), [escapeKeyHandler])
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveEscapeHandler", function (escapeKeyHandler) {
      _this.setState(function (prev) {
        return {
          escapeKeyHandlers: prev.escapeKeyHandlers.filter(function (handler) {
            return handler !== escapeKeyHandler;
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddDocClickHandler", function (docClickHandler) {
      _this.setState(function (prev) {
        return {
          docClickHandlers: [].concat(_toConsumableArray(prev.docClickHandlers), [docClickHandler])
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveDocClickHandler", function (docClickHandler) {
      _this.setState(function (prev) {
        return {
          docClickHandlers: prev.docClickHandlers.filter(function (handler) {
            return handler !== docClickHandler;
          })
        };
      });
    });

    _this.state = {
      escapeKeyHandlers: [],
      docClickHandlers: []
    };
    return _this;
  }

  _createClass(LayersManager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.forceUpdate();
      initFocusVisible(this.containerRef.current);

      if (typeof document !== 'undefined') {
        document.addEventListener('keyup', this.onKeyUp); // using mousedown event so that callback runs before events on children inside of the layer

        document.addEventListener('mousedown', this.onDocumentClick);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keyup', this.onKeyUp);
        document.removeEventListener('mousedown', this.onDocumentClick);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$overrides = this.props.overrides,
          overrides = _this$props$overrides === void 0 ? {} : _this$props$overrides;

      var _getOverrides = getOverrides(overrides.AppContainer, StyledAppContainer),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          AppContainer = _getOverrides2[0],
          appContainerProps = _getOverrides2[1];

      var _getOverrides3 = getOverrides(overrides.LayersContainer, StyledLayersContainer),
          _getOverrides4 = _slicedToArray(_getOverrides3, 2),
          LayersContainer = _getOverrides4[0],
          layersContainerProps = _getOverrides4[1];

      return React.createElement(Consumer, null, function (_ref) {
        var host = _ref.host;

        if (process.env.NODE_ENV !== "production") {
          if (host !== undefined) {
            // eslint-disable-next-line no-console
            console.warn('There is a LayersManager already exists in your application. It is not recommended to have more than one LayersManager in an application.');
          }
        }

        return React.createElement(Provider, {
          value: {
            host: host || _this2.host.current,
            zIndex: _this2.props.zIndex,
            addEscapeHandler: _this2.onAddEscapeHandler,
            removeEscapeHandler: _this2.onRemoveEscapeHandler,
            addDocClickHandler: _this2.onAddDocClickHandler,
            removeDocClickHandler: _this2.onRemoveDocClickHandler
          }
        }, React.createElement(AppContainer, _extends({}, appContainerProps, {
          ref: _this2.containerRef
        }), _this2.props.children), React.createElement(LayersContainer, _extends({}, layersContainerProps, {
          ref: _this2.host
        })));
      });
    }
  }]);

  return LayersManager;
}(React.Component);

export { LayersManager as default };
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import * as React from 'react'; // Files

import { STATE_CHANGE_TYPE } from './constants.js';
import { clamp } from './utils.js'; // Types

var initialState = {
  currentPage: 1
};

var PaginationStatefulContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PaginationStatefulContainer, _React$Component);

  function PaginationStatefulContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PaginationStatefulContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PaginationStatefulContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", _this.props.initialState || initialState);

    _defineProperty(_assertThisInitialized(_this), "onPageChange", function (_ref) {
      var nextPage = _ref.nextPage;
      var _this$props = _this.props,
          numPages = _this$props.numPages,
          onPageChange = _this$props.onPageChange;
      var currentPage = _this.state.currentPage;
      var clamped = clamp(nextPage, 1, numPages);

      if (clamped !== currentPage) {
        onPageChange && onPageChange({
          nextPage: clamped,
          prevPage: currentPage
        });

        _this.internalSetState(STATE_CHANGE_TYPE.changePage, {
          currentPage: clamped
        });
      }
    });

    return _this;
  }

  _createClass(PaginationStatefulContainer, [{
    key: "internalSetState",
    // Internal set state function that will also invoke stateReducer
    value: function internalSetState(changeType, changes) {
      var stateReducer = this.props.stateReducer;

      if (stateReducer) {
        this.setState(stateReducer(changeType, changes, this.state));
      } else {
        this.setState(changes);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var currentPage = this.state.currentPage;
      var children = this.props.children;
      return children({
        currentPage: currentPage,
        onPageChange: this.onPageChange
      });
    }
  }]);

  return PaginationStatefulContainer;
}(React.Component);

_defineProperty(PaginationStatefulContainer, "defaultProps", {
  initialState: initialState,
  stateReducer: function stateReducer(changeType, changes) {
    return changes;
  }
});

export { PaginationStatefulContainer as default };
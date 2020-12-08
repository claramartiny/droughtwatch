"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _overrides = require("../helpers/overrides.js");

var _styledComponents = require("./styled-components.js");

var _reactMovable = require("react-movable");

var _grab = _interopRequireDefault(require("../icon/grab.js"));

var _delete = _interopRequireDefault(require("../icon/delete.js"));

var _focusVisible = require("../utils/focusVisible.js");

var _index = require("../layer/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var ItemLayer = function ItemLayer(_ref) {
  var children = _ref.children,
      dragged = _ref.dragged;

  if (!dragged) {
    return children;
  }

  return React.createElement(_index.Layer, null, children);
};

var StatelessList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StatelessList, _React$Component);

  function StatelessList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StatelessList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StatelessList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
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

    return _this;
  }

  _createClass(StatelessList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$overrides = _this$props.overrides,
          overrides = _this$props$overrides === void 0 ? {} : _this$props$overrides,
          items = _this$props.items,
          onChange = _this$props.onChange,
          removable = _this$props.removable;
      var RootOverride = overrides.Root,
          ListOverride = overrides.List,
          ItemOverride = overrides.Item,
          DragHandleOverride = overrides.DragHandle,
          CloseHandleOverride = overrides.CloseHandle,
          LabelOverride = overrides.Label;

      var _getOverrides = (0, _overrides.getOverrides)(RootOverride, _styledComponents.Root),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          Root = _getOverrides2[0],
          rootProps = _getOverrides2[1];

      var _getOverrides3 = (0, _overrides.getOverrides)(ListOverride, _styledComponents.List),
          _getOverrides4 = _slicedToArray(_getOverrides3, 2),
          List = _getOverrides4[0],
          listProps = _getOverrides4[1];

      var _getOverrides5 = (0, _overrides.getOverrides)(ItemOverride, _styledComponents.Item),
          _getOverrides6 = _slicedToArray(_getOverrides5, 2),
          Item = _getOverrides6[0],
          itemProps = _getOverrides6[1];

      var _getOverrides7 = (0, _overrides.getOverrides)(DragHandleOverride, _styledComponents.DragHandle),
          _getOverrides8 = _slicedToArray(_getOverrides7, 2),
          DragHandle = _getOverrides8[0],
          dragHandleProps = _getOverrides8[1];

      var _getOverrides9 = (0, _overrides.getOverrides)(CloseHandleOverride, _styledComponents.CloseHandle),
          _getOverrides10 = _slicedToArray(_getOverrides9, 2),
          CloseHandle = _getOverrides10[0],
          closeHandleProps = _getOverrides10[1];

      var _getOverrides11 = (0, _overrides.getOverrides)(LabelOverride, _styledComponents.Label),
          _getOverrides12 = _slicedToArray(_getOverrides11, 2),
          Label = _getOverrides12[0],
          labelProps = _getOverrides12[1];

      var isRemovable = this.props.removable || false;
      var isRemovableByMove = this.props.removableByMove || false;
      return React.createElement(Root, _extends({
        $isRemovable: isRemovable,
        "data-baseweb": "dnd-list"
      }, rootProps, {
        onFocus: (0, _focusVisible.forkFocus)(rootProps, this.handleFocus),
        onBlur: (0, _focusVisible.forkBlur)(rootProps, this.handleBlur)
      }), React.createElement(_reactMovable.List, {
        removableByMove: isRemovableByMove,
        values: items,
        onChange: onChange,
        renderList: function renderList(_ref2) {
          var children = _ref2.children,
              props = _ref2.props,
              isDragged = _ref2.isDragged;
          return React.createElement(List, _extends({
            $isRemovable: isRemovable,
            $isDragged: isDragged,
            ref: props.ref
          }, listProps), children);
        },
        renderItem: function renderItem(_ref3) {
          var value = _ref3.value,
              props = _ref3.props,
              isDragged = _ref3.isDragged,
              isSelected = _ref3.isSelected,
              isOutOfBounds = _ref3.isOutOfBounds,
              index = _ref3.index;
          var sharedProps = {
            $isRemovable: isRemovable,
            $isRemovableByMove: isRemovableByMove,
            $isDragged: isDragged,
            $isSelected: isSelected,
            $isFocusVisible: _this2.state.isFocusVisible,
            $isOutOfBounds: isOutOfBounds,
            $value: value,
            $index: index
          };
          return React.createElement(ItemLayer, {
            dragged: isDragged,
            key: props.key
          }, React.createElement(Item, _extends({}, sharedProps, {
            ref: props.ref,
            tabIndex: props.tabIndex,
            "aria-roledescription": props['aria-roledescription'],
            onKeyDown: props.onKeyDown,
            onWheel: props.onWheel
          }, itemProps, {
            style: _objectSpread({}, props.style, {
              display: 'flex'
            })
          }), React.createElement(DragHandle, _extends({}, sharedProps, dragHandleProps), React.createElement(_grab.default, {
            size: 24,
            color: "#CCC"
          })), React.createElement(Label, _extends({}, sharedProps, labelProps), value), removable && React.createElement(CloseHandle, _extends({}, sharedProps, {
            onClick: function onClick(evt) {
              evt.preventDefault();
              onChange && onChange({
                oldIndex: typeof index !== 'undefined' ? index : 0,
                newIndex: -1
              });
            }
          }, closeHandleProps), React.createElement(_delete.default, {
            size: 24,
            color: "#CCC"
          }))));
        }
      }));
    }
  }]);

  return StatelessList;
}(React.Component);

_defineProperty(StatelessList, "defaultProps", {
  items: [],
  onChange: function onChange() {}
});

var _default = StatelessList;
exports.default = _default;
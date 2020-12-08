"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _styledComponents = require("./styled-components.js");

var _overrides = require("../helpers/overrides.js");

var _focusVisible = require("../utils/focusVisible.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var TableBuilder =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TableBuilder, _React$Component);

  function TableBuilder() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TableBuilder);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TableBuilder)).call.apply(_getPrototypeOf2, [this].concat(args)));

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

  _createClass(TableBuilder, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$overrides = _this$props.overrides,
          overrides = _this$props$overrides === void 0 ? {} : _this$props$overrides,
          children = _this$props.children,
          data = _this$props.data,
          horizontalScrollWidth = _this$props.horizontalScrollWidth,
          sortColumn = _this$props.sortColumn,
          _this$props$sortOrder = _this$props.sortOrder,
          sortOrder = _this$props$sortOrder === void 0 ? 'ASC' : _this$props$sortOrder,
          onSort = _this$props.onSort,
          isLoading = _this$props.isLoading,
          loadingMessage = _this$props.loadingMessage,
          emptyMessage = _this$props.emptyMessage,
          rest = _objectWithoutProperties(_this$props, ["overrides", "children", "data", "horizontalScrollWidth", "sortColumn", "sortOrder", "onSort", "isLoading", "loadingMessage", "emptyMessage"]);

      var _getOverrides = (0, _overrides.getOverrides)(overrides.Root, _styledComponents.StyledRoot),
          _getOverrides2 = _slicedToArray(_getOverrides, 2),
          Root = _getOverrides2[0],
          rootProps = _getOverrides2[1];

      var _getOverrides3 = (0, _overrides.getOverrides)(overrides.Table, _styledComponents.StyledTable),
          _getOverrides4 = _slicedToArray(_getOverrides3, 2),
          Table = _getOverrides4[0],
          tableProps = _getOverrides4[1];

      var _getOverrides5 = (0, _overrides.getOverrides)(overrides.TableHead, _styledComponents.StyledTableHead),
          _getOverrides6 = _slicedToArray(_getOverrides5, 2),
          TableHead = _getOverrides6[0],
          tableHeadProps = _getOverrides6[1];

      var _getOverrides7 = (0, _overrides.getOverrides)(overrides.TableHeadRow, _styledComponents.StyledTableHeadRow),
          _getOverrides8 = _slicedToArray(_getOverrides7, 2),
          TableHeadRow = _getOverrides8[0],
          tableHeadRowProps = _getOverrides8[1];

      var _getOverrides9 = (0, _overrides.getOverrides)(overrides.TableHeadCell, _styledComponents.StyledTableHeadCell),
          _getOverrides10 = _slicedToArray(_getOverrides9, 2),
          TableHeadCell = _getOverrides10[0],
          tableHeadCellProps = _getOverrides10[1];

      var _getOverrides11 = (0, _overrides.getOverrides)(overrides.TableHeadCellSortable, _styledComponents.StyledTableHeadCellSortable),
          _getOverrides12 = _slicedToArray(_getOverrides11, 2),
          TableHeadCellSortable = _getOverrides12[0],
          tableHeadCellSortableProps = _getOverrides12[1];

      var _getOverrides13 = (0, _overrides.getOverrides)(overrides.TableBody, _styledComponents.StyledTableBody),
          _getOverrides14 = _slicedToArray(_getOverrides13, 2),
          TableBody = _getOverrides14[0],
          tableBodyProps = _getOverrides14[1];

      var _getOverrides15 = (0, _overrides.getOverrides)(overrides.TableBodyRow, _styledComponents.StyledTableBodyRow),
          _getOverrides16 = _slicedToArray(_getOverrides15, 2),
          TableBodyRow = _getOverrides16[0],
          tableBodyRowProps = _getOverrides16[1];

      var _getOverrides17 = (0, _overrides.getOverrides)(overrides.TableBodyCell, _styledComponents.StyledTableBodyCell),
          _getOverrides18 = _slicedToArray(_getOverrides17, 2),
          TableBodyCell = _getOverrides18[0],
          tableBodyCellProps = _getOverrides18[1];

      var _getOverrides19 = (0, _overrides.getOverrides)(overrides.TableLoadingMessage, _styledComponents.StyledTableLoadingMessage),
          _getOverrides20 = _slicedToArray(_getOverrides19, 2),
          TableLoadingMessage = _getOverrides20[0],
          tableLoadingMessageProps = _getOverrides20[1];

      var _getOverrides21 = (0, _overrides.getOverrides)(overrides.TableEmptyMessage, _styledComponents.StyledTableEmptyMessage),
          _getOverrides22 = _slicedToArray(_getOverrides21, 2),
          TableEmptyMessage = _getOverrides22[0],
          tableEmptyMessageProps = _getOverrides22[1];

      var _getOverrides23 = (0, _overrides.getOverrides)(overrides.SortAscIcon, _styledComponents.StyledSortAscIcon),
          _getOverrides24 = _slicedToArray(_getOverrides23, 2),
          SortAscIcon = _getOverrides24[0],
          sortAscIconProps = _getOverrides24[1];

      var _getOverrides25 = (0, _overrides.getOverrides)(overrides.SortDescIcon, _styledComponents.StyledSortDescIcon),
          _getOverrides26 = _slicedToArray(_getOverrides25, 2),
          SortDescIcon = _getOverrides26[0],
          sortDescIconProps = _getOverrides26[1];

      var _getOverrides27 = (0, _overrides.getOverrides)(overrides.SortNoneIcon, _styledComponents.StyledSortNoneIcon),
          _getOverrides28 = _slicedToArray(_getOverrides27, 2),
          SortNoneIcon = _getOverrides28[0],
          sortNoneIconProps = _getOverrides28[1];

      var columns = React.Children.toArray(children).filter(Boolean).map(function (child) {
        return child.props;
      });

      function renderHeader(col, colIndex, isFocusVisible) {
        var colOverrides = col.overrides || {};

        if (!col.sortable) {
          var _getOverrides29 = (0, _overrides.getOverrides)(colOverrides.TableHeadCell, TableHeadCell),
              _getOverrides30 = _slicedToArray(_getOverrides29, 2),
              ColTableHeadCell = _getOverrides30[0],
              colTableHeadCellProps = _getOverrides30[1];

          return React.createElement(ColTableHeadCell, _extends({
            key: colIndex,
            $col: col,
            $colIndex: colIndex
          }, tableHeadCellProps, colTableHeadCellProps), col.header);
        }

        var _getOverrides31 = (0, _overrides.getOverrides)(colOverrides.TableHeadCellSortable, TableHeadCellSortable),
            _getOverrides32 = _slicedToArray(_getOverrides31, 2),
            ColTableHeadCellSortable = _getOverrides32[0],
            colTableHeadCellSortableProps = _getOverrides32[1];

        var sortIcon = null;
        var sortLabel = 'not sorted';

        switch (col.id === sortColumn && sortOrder) {
          case 'ASC':
            sortIcon = React.createElement(SortAscIcon, _extends({
              "aria-hidden": true,
              role: "presentation"
            }, sortAscIconProps));
            sortLabel = 'ascending sorting';
            break;

          case 'DESC':
            sortIcon = React.createElement(SortDescIcon, _extends({
              "aria-hidden": true,
              role: "presentation"
            }, sortDescIconProps));
            sortLabel = 'descending sorting';
            break;

          default:
            sortIcon = React.createElement(SortNoneIcon, _extends({
              "aria-hidden": true,
              role: "presentation"
            }, sortNoneIconProps));
            break;
        }

        return React.createElement(ColTableHeadCellSortable, _extends({
          key: colIndex,
          $col: col,
          $colIndex: colIndex,
          role: "button",
          tabIndex: "0",
          "aria-label": "".concat(col.tableHeadAriaLabel || col.header, ", ").concat(sortLabel),
          $isFocusVisible: isFocusVisible,
          onClick: function onClick() {
            return onSort && onSort(col.id);
          },
          onKeyDown: function onKeyDown(e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSort && onSort(col.id);
            }
          }
        }, tableHeadCellSortableProps, colTableHeadCellSortableProps), col.header, sortIcon);
      }

      function renderCell(col, colIndex, row, rowIndex) {
        var colOverrides = col.overrides || {};

        var _getOverrides33 = (0, _overrides.getOverrides)(colOverrides.TableBodyCell, TableBodyCell),
            _getOverrides34 = _slicedToArray(_getOverrides33, 2),
            ColTableBodyCell = _getOverrides34[0],
            colTableBodyCellProps = _getOverrides34[1];

        return React.createElement(ColTableBodyCell, _extends({
          key: colIndex,
          $col: col,
          $colIndex: colIndex,
          $row: row,
          $rowIndex: rowIndex,
          $isNumeric: col.numeric
        }, tableBodyCellProps, colTableBodyCellProps), col.children(row, rowIndex));
      }

      var isEmpty = !isLoading && data.length === 0;
      var isRendered = !isLoading && !isEmpty;
      return React.createElement(Root, _extends({
        "data-baseweb": "table-builder-semantic"
      }, rootProps, rest), React.createElement(Table, _extends({
        $width: horizontalScrollWidth
      }, tableProps, {
        onBlur: (0, _focusVisible.forkBlur)(tableProps, this.handleBlur),
        onFocus: (0, _focusVisible.forkFocus)(tableProps, this.handleFocus)
      }), React.createElement(TableHead, tableHeadProps, React.createElement(TableHeadRow, tableHeadRowProps, columns.map(function (col, colIndex) {
        return renderHeader(col, colIndex, _this2.state.isFocusVisible);
      }))), React.createElement(TableBody, tableBodyProps, isLoading && React.createElement("tr", null, React.createElement("td", {
        colSpan: columns.length
      }, React.createElement(TableLoadingMessage, tableLoadingMessageProps, typeof loadingMessage === 'function' ? loadingMessage() : loadingMessage))), isEmpty && emptyMessage && React.createElement("tr", null, React.createElement("td", {
        colSpan: columns.length
      }, React.createElement(TableEmptyMessage, tableEmptyMessageProps, typeof emptyMessage === 'function' ? emptyMessage() : emptyMessage))), isRendered && data.map(function (row, rowIndex) {
        return React.createElement(TableBodyRow, _extends({
          key: rowIndex,
          $row: row,
          $rowIndex: rowIndex
        }, tableBodyRowProps), columns.map(function (col, colIndex) {
          return renderCell(col, colIndex, row, rowIndex);
        }));
      }))));
    }
  }]);

  return TableBuilder;
}(React.Component);

exports.default = TableBuilder;

_defineProperty(TableBuilder, "defaultProps", {
  data: [],
  loadingMessage: 'Loading...'
});
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Button, SHAPE as BUTTON_SHAPES, SIZE as BUTTON_SIZES, KIND as BUTTON_KINDS } from '../button/index.js';
import Search from '../icon/search.js';
import { Input, SIZE as INPUT_SIZES } from '../input/index.js';
import { Popover } from '../popover/index.js';
import { useStyletron } from '../styles/index.js';
import { Tag } from '../tag/index.js';
import FilterMenu from './filter-menu.js';
import { DataTable } from './data-table.js';
import { StatefulContainer } from './stateful-container.js';
import { LocaleContext } from '../locale/index.js';

function useResizeObserver(ref, callback) {
  React.useLayoutEffect(function () {
    if (typeof document !== 'undefined') {
      if (ref.current) {
        //$FlowFixMe
        var observer = new ResizeObserver(callback);
        observer.observe(ref.current);
        return function () {
          return observer.disconnect();
        };
      }
    }
  }, [ref]);
}

function QueryInput(props) {
  var _useStyletron = useStyletron(),
      _useStyletron2 = _slicedToArray(_useStyletron, 2),
      css = _useStyletron2[0],
      theme = _useStyletron2[1];

  var locale = React.useContext(LocaleContext);

  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  React.useEffect(function () {
    var timeout = setTimeout(function () {
      return props.onChange(value);
    }, 250);
    return function () {
      return clearTimeout(timeout);
    };
  }, [value]);
  return React.createElement("div", {
    className: css({
      width: '375px',
      marginBottom: theme.sizing.scale500
    })
  }, React.createElement(Input, {
    "aria-label": locale.datatable.searchAriaLabel,
    overrides: {
      Before: function Before() {
        return React.createElement("div", {
          className: css({
            alignItems: 'center',
            display: 'flex',
            paddingLeft: theme.sizing.scale500
          })
        }, React.createElement(Search, {
          size: "18px"
        }));
      }
    },
    size: INPUT_SIZES.compact,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    },
    value: value,
    clearable: true
  }));
}

function FilterTag(props) {
  var _useStyletron3 = useStyletron(),
      _useStyletron4 = _slicedToArray(_useStyletron3, 2),
      theme = _useStyletron4[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isOpen = _React$useState4[0],
      setIsOpen = _React$useState4[1];

  var columnIndex = props.columns.findIndex(function (c) {
    return c.title === props.title;
  });
  var column = props.columns[columnIndex];

  if (!column) {
    return null;
  }

  var data = props.rows.map(function (r) {
    return column.mapDataToValue(r.data);
  });
  var Filter = column.renderFilter;
  return React.createElement(Popover, {
    focusLock: true,
    returnFocus: true,
    key: props.title,
    isOpen: isOpen,
    onClickOutside: function onClickOutside() {
      return setIsOpen(false);
    },
    content: function content() {
      return React.createElement(Filter, {
        close: function close() {
          return setIsOpen(false);
        },
        data: data,
        filterParams: props.filter,
        setFilter: function setFilter(filterParams) {
          return props.onFilterAdd(props.title, filterParams);
        }
      });
    }
  }, React.createElement("div", null, React.createElement(Tag, {
    onClick: function onClick() {
      return setIsOpen(!isOpen);
    },
    onActionClick: function onActionClick() {
      return props.onFilterRemove(props.title);
    },
    overrides: {
      Root: {
        style: {
          borderTopLeftRadius: '36px',
          borderTopRightRadius: '36px',
          borderBottomLeftRadius: '36px',
          borderBottomRightRadius: '36px',
          height: '36px',
          marginTop: null,
          marginBottom: theme.sizing.scale500
        }
      },
      Action: {
        style: {
          borderTopRightRadius: '36px',
          borderBottomRightRadius: '36px',
          height: '22px'
        }
      }
    }
  }, props.title, ": ", props.filter.description)));
}

export function StatefulDataTable(props) {
  var _useStyletron5 = useStyletron(),
      _useStyletron6 = _slicedToArray(_useStyletron5, 2),
      css = _useStyletron6[0],
      theme = _useStyletron6[1];

  var headlineRef = React.useRef(null);

  var _React$useState5 = React.useState(64),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      headlineHeight = _React$useState6[0],
      setHeadlineHeight = _React$useState6[1];

  useResizeObserver(headlineRef, function (entries) {
    setHeadlineHeight(entries[0].contentRect.height);
  });
  var filterable = props.filterable === undefined ? true : props.filterable;
  var searchable = props.searchable === undefined ? true : props.searchable;
  return React.createElement(StatefulContainer, {
    batchActions: props.batchActions,
    columns: props.columns,
    initialFilters: props.initialFilters,
    initialSelectedRowIds: props.initialSelectedRowIds,
    initialSortIndex: props.initialSortIndex,
    initialSortDirection: props.initialSortDirection,
    onFilterAdd: props.onFilterAdd,
    onFilterRemove: props.onFilterRemove,
    onIncludedRowsChange: props.onIncludedRowsChange,
    onRowHighlightChange: props.onRowHighlightChange,
    onSelectionChange: props.onSelectionChange,
    rows: props.rows,
    rowActions: props.rowActions,
    rowHighlightIndex: props.rowHighlightIndex
  }, function (_ref) {
    var filters = _ref.filters,
        onFilterAdd = _ref.onFilterAdd,
        onFilterRemove = _ref.onFilterRemove,
        onIncludedRowsChange = _ref.onIncludedRowsChange,
        onRowHighlightChange = _ref.onRowHighlightChange,
        onSelectMany = _ref.onSelectMany,
        onSelectNone = _ref.onSelectNone,
        onSelectOne = _ref.onSelectOne,
        onSort = _ref.onSort,
        onTextQueryChange = _ref.onTextQueryChange,
        rowHighlightIndex = _ref.rowHighlightIndex,
        selectedRowIds = _ref.selectedRowIds,
        sortIndex = _ref.sortIndex,
        sortDirection = _ref.sortDirection,
        textQuery = _ref.textQuery;
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: css({
        height: "".concat(headlineHeight, "px")
      })
    }, React.createElement("div", {
      ref: headlineRef
    }, !selectedRowIds.size && React.createElement("div", {
      className: css({
        alignItems: 'end',
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: theme.sizing.scale500
      })
    }, searchable && React.createElement(QueryInput, {
      onChange: onTextQueryChange
    }), filterable && React.createElement(React.Fragment, null, React.createElement(FilterMenu, {
      columns: props.columns,
      filters: filters,
      rows: props.rows,
      onSetFilter: onFilterAdd
    }), Array.from(filters).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          title = _ref3[0],
          filter = _ref3[1];

      return React.createElement(FilterTag, {
        key: title,
        columns: props.columns,
        filter: filter,
        onFilterAdd: onFilterAdd,
        onFilterRemove: onFilterRemove,
        rows: props.rows,
        title: title
      });
    }))), Boolean(selectedRowIds.size) && props.batchActions && React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.sizing.scale400,
        paddingBottom: theme.sizing.scale400
      }
    }, props.batchActions.map(function (action) {
      function onClick(event) {
        action.onClick({
          clearSelection: onSelectNone,
          event: event,
          selection: props.rows.filter(function (r) {
            return selectedRowIds.has(r.id);
          })
        });
      }

      if (action.renderIcon) {
        var Icon = action.renderIcon;
        return React.createElement(Button, {
          key: action.label,
          overrides: {
            BaseButton: {
              props: {
                'aria-label': action.label
              }
            }
          },
          onClick: onClick,
          kind: BUTTON_KINDS.tertiary,
          shape: BUTTON_SHAPES.round
        }, React.createElement(Icon, {
          size: 16
        }));
      }

      return React.createElement(Button, {
        key: action.label,
        onClick: onClick,
        kind: BUTTON_KINDS.secondary,
        size: BUTTON_SIZES.compact
      }, action.label);
    })))), React.createElement("div", {
      style: {
        width: '100%',
        height: "calc(100% - ".concat(headlineHeight, "px)")
      }
    }, React.createElement(DataTable, {
      batchActions: props.batchActions,
      columns: props.columns,
      emptyMessage: props.emptyMessage,
      filters: filters,
      loading: props.loading,
      loadingMessage: props.loadingMessage,
      onIncludedRowsChange: onIncludedRowsChange,
      onRowHighlightChange: onRowHighlightChange,
      onSelectionChange: props.onSelectionChange,
      onSelectMany: onSelectMany,
      onSelectNone: onSelectNone,
      onSelectOne: onSelectOne,
      onSort: onSort,
      rowHighlightIndex: rowHighlightIndex,
      rows: props.rows,
      rowActions: props.rowActions,
      rowHeight: props.rowHeight,
      selectedRowIds: selectedRowIds,
      sortDirection: sortDirection,
      sortIndex: sortIndex,
      textQuery: textQuery
    })));
  });
}
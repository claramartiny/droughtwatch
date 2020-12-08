function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
import { Button, SIZE, KIND } from '../button/index.js';
import { ButtonGroup } from '../button-group/index.js';
import { Checkbox, StyledLabel } from '../checkbox/index.js';
import Search from '../icon/search.js';
import { Input, SIZE as INPUT_SIZE } from '../input/index.js';
import { useStyletron, withStyle } from '../styles/index.js';
import { Label3 } from '../typography/index.js';
import Column from './column.js';
import { COLUMNS } from './constants.js';
import { LocaleContext } from '../locale/index.js';
import FilterShell from './filter-shell.js';
import { matchesQuery, splitByQuery, HighlightCellText } from './text-search.js';

function InputBefore() {
  var _useStyletron = useStyletron(),
      _useStyletron2 = _slicedToArray(_useStyletron, 2),
      css = _useStyletron2[0],
      theme = _useStyletron2[1];

  return React.createElement("div", {
    className: css({
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.sizing.scale500
    })
  }, React.createElement(Search, {
    size: "18px"
  }));
}

function FilterQuickControls(props) {
  var locale = React.useContext(LocaleContext);
  return React.createElement(ButtonGroup, {
    size: SIZE.mini,
    kind: KIND.minimal
  }, React.createElement(Button, {
    type: "button",
    onClick: props.onSelectAll
  }, locale.datatable.categoricalFilterSelectAll), React.createElement(Button, {
    type: "button",
    onClick: props.onClearSelection
  }, locale.datatable.categoricalFilterSelectClear));
}

var StyledHighlightLabel = withStyle(StyledLabel, function (props) {
  var style = {
    whiteSpace: 'pre',
    color: props.$isActive ? props.$theme.colors.contentPrimary : props.$theme.colors.contentSecondary
  };

  if (!props.$isFirst) {
    // $FlowFixMe
    style.paddingLeft = null;
  }

  return style;
});
StyledHighlightLabel.displayName = "StyledHighlightLabel";

function HighlightCheckboxLabel(props) {
  var children = props.children,
      restProps = _objectWithoutProperties(props, ["children"]);

  if (!props.query) {
    return React.createElement(StyledLabel, restProps, children);
  }

  return splitByQuery(children, props.query).map(function (el, i) {
    if (matchesQuery(el, props.query)) {
      return React.createElement(StyledHighlightLabel, _extends({}, restProps, {
        key: i,
        $isFirst: !i,
        $isActive: true
      }), el);
    }

    return React.createElement(StyledHighlightLabel, _extends({}, restProps, {
      key: i,
      $isFirst: !i
    }), el);
  });
}

export function CategoricalFilter(props) {
  var _useStyletron3 = useStyletron(),
      _useStyletron4 = _slicedToArray(_useStyletron3, 2),
      css = _useStyletron4[0],
      theme = _useStyletron4[1];

  var locale = React.useContext(LocaleContext);

  var _React$useState = React.useState(props.filterParams ? props.filterParams.selection : new Set()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selection = _React$useState2[0],
      setSelection = _React$useState2[1];

  var _React$useState3 = React.useState(props.filterParams ? props.filterParams.exclude : false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      exclude = _React$useState4[0],
      setExclude = _React$useState4[1];

  var _React$useState5 = React.useState(''),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      query = _React$useState6[0],
      setQuery = _React$useState6[1];

  var categories = React.useMemo(function () {
    return props.data.reduce(function (set, category) {
      return set.add(category);
    }, new Set());
  }, [props.data]);
  var checkboxStyles = css({
    marginBottom: theme.sizing.scale200
  });
  var showQuery = Boolean(categories.size >= 10);
  var filteredCategories = Array.from(categories, function (c) {
    return c;
  }).filter(function (c) {
    return matchesQuery(c, query);
  });
  return React.createElement(FilterShell, {
    exclude: exclude,
    onExcludeChange: function onExcludeChange() {
      return setExclude(!exclude);
    },
    onApply: function onApply() {
      props.setFilter({
        description: Array.from(selection).join(', '),
        exclude: exclude,
        selection: selection
      });
      props.close();
    }
  }, showQuery && React.createElement(Input, {
    size: INPUT_SIZE.compact,
    overrides: {
      Before: InputBefore
    },
    value: query,
    onChange: function onChange(event) {
      return setQuery(event.target.value);
    },
    clearable: true
  }), !query && React.createElement("div", {
    style: {
      marginTop: showQuery ? theme.sizing.scale600 : null
    }
  }, React.createElement(FilterQuickControls, {
    onSelectAll: function onSelectAll() {
      categories.forEach(function (c) {
        return selection.add(c);
      });
      setSelection(new Set(selection));
    },
    onClearSelection: function onClearSelection() {
      setSelection(new Set());
    }
  })), React.createElement("div", {
    className: css({
      maxHeight: '256px',
      overflowY: 'auto',
      marginTop: theme.sizing.scale600
    })
  }, !filteredCategories.length && React.createElement(Label3, null, locale.datatable.categoricalFilterEmpty), Boolean(filteredCategories.length) && filteredCategories.map(function (category, i) {
    return React.createElement("div", {
      className: checkboxStyles,
      key: i
    }, React.createElement(Checkbox, {
      checked: selection.has(category),
      onChange: function onChange() {
        if (selection.has(category)) {
          selection.delete(category);
        } else {
          selection.add(category);
        }

        setSelection(new Set(selection));
      },
      overrides: {
        Label: {
          component: HighlightCheckboxLabel,
          props: {
            query: query
          }
        }
      }
    }, category));
  })));
}

function CategoricalCell(props) {
  var _useStyletron5 = useStyletron(),
      _useStyletron6 = _slicedToArray(_useStyletron5, 1),
      css = _useStyletron6[0];

  return React.createElement("div", {
    className: css({
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    })
  }, props.textQuery ? React.createElement(HighlightCellText, {
    text: props.value,
    query: props.textQuery
  }) : props.value);
}

function CategoricalColumn(options) {
  return Column({
    kind: COLUMNS.CATEGORICAL,
    buildFilter: function buildFilter(params) {
      return function (data) {
        var included = params.selection.has(data);
        return params.exclude ? !included : included;
      };
    },
    cellBlockAlign: options.cellBlockAlign,
    fillWidth: options.fillWidth,
    filterable: options.filterable === undefined ? true : options.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: CategoricalCell,
    renderFilter: CategoricalFilter,
    sortable: options.sortable === undefined ? true : options.sortable,
    sortFn: function sortFn(a, b) {
      return a.localeCompare(b);
    },
    textQueryFilter: function textQueryFilter(textQuery, data) {
      return data.toLowerCase().includes(textQuery.toLowerCase());
    },
    title: options.title
  });
}

export default CategoricalColumn;
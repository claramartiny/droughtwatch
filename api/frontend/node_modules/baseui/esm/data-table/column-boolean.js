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
import { useStyletron } from '../styles/index.js';
import { CategoricalFilter } from './column-categorical.js';
import Column from './column.js';
import { COLUMNS } from './constants.js';
import { LocaleContext } from '../locale/index.js';

function mapSelection(selection, transform) {
  var coercedSelection = new Set();
  selection.forEach(function (item) {
    return coercedSelection.add(transform(item));
  });
  return coercedSelection;
}

function BooleanFilter(props) {
  var locale = React.useContext(LocaleContext);
  var selectionString = new Set();

  if (props.filterParams && props.filterParams.selection) {
    selectionString = mapSelection(props.filterParams.selection, function (i) {
      return i ? locale.datatable.booleanFilterTrue : locale.datatable.booleanFilterFalse;
    });
  }

  return React.createElement(CategoricalFilter, {
    close: props.close,
    data: [locale.datatable.booleanFilterTrue, locale.datatable.booleanFilterFalse],
    filterParams: props.filterParams ? {
      selection: selectionString,
      description: props.filterParams.description,
      exclude: props.filterParams.exclude
    } : undefined,
    setFilter: function setFilter(params) {
      props.setFilter({
        selection: mapSelection(params.selection, function (i) {
          return i === locale.datatable.booleanFilterTrue;
        }),
        exclude: params.exclude,
        description: params.description
      });
    }
  });
}

function BooleanCell(props) {
  var _useStyletron = useStyletron(),
      _useStyletron2 = _slicedToArray(_useStyletron, 2),
      css = _useStyletron2[0],
      theme = _useStyletron2[1];

  var locale = React.useContext(LocaleContext);
  return React.createElement("div", {
    className: css({
      textAlign: props.value ? 'right' : 'left',
      minWidth: theme.sizing.scale1400,
      width: '100%'
    })
  }, props.value ? locale.datatable.booleanColumnTrueShort : locale.datatable.booleanColumnFalseShort);
}

function BooleanColumn(options) {
  return Column({
    kind: COLUMNS.BOOLEAN,
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
    renderCell: BooleanCell,
    renderFilter: BooleanFilter,
    sortable: options.sortable === undefined ? true : options.sortable,
    sortFn: function sortFn(a, b) {
      if (a === b) return 0;
      return a ? -1 : 1;
    },
    title: options.title
  });
}

export default BooleanColumn;
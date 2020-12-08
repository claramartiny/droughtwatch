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
import Column from './column.js';
import { COLUMNS } from './constants.js';

function RowIndexFilter() {
  return React.createElement("div", null, "not implemented for row index column");
}

function RowIndexCell(props) {
  var _useStyletron = useStyletron(),
      _useStyletron2 = _slicedToArray(_useStyletron, 2),
      css = _useStyletron2[0],
      theme = _useStyletron2[1];

  return React.createElement("div", {
    className: css({
      display: 'flex',
      justifyContent: theme.direction !== 'rtl' ? 'flex-end' : 'flex-start',
      width: '100%'
    })
  }, props.y + 1);
}

function RowIndexColumn() {
  return Column({
    kind: COLUMNS.ROW_INDEX,
    buildFilter: function buildFilter() {
      return function () {
        return true;
      };
    },
    cellBlockAlign: 'start',
    // how to configure?
    fillWidth: false,
    filterable: false,
    mapDataToValue: function mapDataToValue() {
      return null;
    },
    renderCell: RowIndexCell,
    renderFilter: RowIndexFilter,
    sortable: false,
    sortFn: function sortFn() {
      return 0;
    },
    title: ''
  });
}

export default RowIndexColumn;
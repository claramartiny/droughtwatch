function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import { HighlightCellText } from './text-search.js';

function StringFilter(props) {
  return React.createElement("div", null, "not implemented for string column");
}

function StringCell(props) {
  var _useStyletron = useStyletron(),
      _useStyletron2 = _slicedToArray(_useStyletron, 1),
      css = _useStyletron2[0];

  return React.createElement("div", {
    className: css({
      display: '-webkit-box',
      WebkitLineClamp: props.lineClamp || 1,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    })
  }, props.textQuery ? React.createElement(HighlightCellText, {
    text: props.value,
    query: props.textQuery
  }) : props.value);
}

function StringColumn(options) {
  return Column({
    kind: COLUMNS.STRING,
    cellBlockAlign: options.cellBlockAlign,
    buildFilter: function buildFilter(params) {
      return function (data) {
        return true;
      };
    },
    fillWidth: options.fillWidth,
    filterable: false,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: function RenderStringCell(props) {
      return React.createElement(StringCell, _extends({}, props, {
        lineClamp: options.lineClamp
      }));
    },
    renderFilter: StringFilter,
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

export default StringColumn;
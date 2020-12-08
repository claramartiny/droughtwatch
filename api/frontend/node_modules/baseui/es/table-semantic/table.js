function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { StyledRoot, StyledTable, StyledTableHead, StyledTableHeadRow, StyledTableHeadCell, StyledTableBody, StyledTableBodyRow, StyledTableBodyCell, StyledTableLoadingMessage, StyledTableEmptyMessage } from './styled-components.js';
import { getOverrides } from '../helpers/overrides.js';
export default class Table extends React.Component {
  render() {
    const {
      overrides = {},
      columns,
      data,
      horizontalScrollWidth,
      isLoading,
      loadingMessage,
      emptyMessage,
      ...rest
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Table, tableProps] = getOverrides(overrides.Table, StyledTable);
    const [TableHead, tableHeadProps] = getOverrides(overrides.TableHead, StyledTableHead);
    const [TableHeadRow, tableHeadRowProps] = getOverrides(overrides.TableHeadRow, StyledTableHeadRow);
    const [TableHeadCell, tableHeadCellProps] = getOverrides(overrides.TableHeadCell, StyledTableHeadCell);
    const [TableBody, tableBodyProps] = getOverrides(overrides.TableBody, StyledTableBody);
    const [TableBodyRow, tableBodyRowProps] = getOverrides(overrides.TableBodyRow, StyledTableBodyRow);
    const [TableBodyCell, tableBodyCellProps] = getOverrides(overrides.TableBodyCell, StyledTableBodyCell);
    const [TableLoadingMessage, tableLoadingMessageProps] = getOverrides(overrides.TableLoadingMessage, StyledTableLoadingMessage);
    const [TableEmptyMessage, tableEmptyMessageProps] = getOverrides(overrides.TableEmptyMessage, StyledTableEmptyMessage);
    const isEmpty = !isLoading && data.length === 0;
    const isRendered = !isLoading && !isEmpty;
    return React.createElement(Root, _extends({
      "data-baseweb": "table-semantic"
    }, rootProps, rest), React.createElement(Table, _extends({
      $width: horizontalScrollWidth
    }, tableProps), React.createElement(TableHead, tableHeadProps, React.createElement(TableHeadRow, tableHeadRowProps, columns.map((col, colIndex) => React.createElement(TableHeadCell, _extends({
      key: colIndex,
      $col: col,
      $colIndex: colIndex
    }, tableHeadCellProps), col)))), React.createElement(TableBody, tableBodyProps, isLoading && React.createElement("tr", null, React.createElement("td", {
      colSpan: columns.length
    }, React.createElement(TableLoadingMessage, tableLoadingMessageProps, typeof loadingMessage === 'function' ? loadingMessage() : loadingMessage))), isEmpty && emptyMessage && React.createElement("tr", null, React.createElement("td", {
      colSpan: columns.length
    }, React.createElement(TableEmptyMessage, tableEmptyMessageProps, typeof emptyMessage === 'function' ? emptyMessage() : emptyMessage))), isRendered && data.map((row, rowIndex) => React.createElement(TableBodyRow, _extends({
      key: rowIndex,
      $row: row,
      $rowIndex: rowIndex
    }, tableBodyRowProps), columns.map((col, colIndex) => React.createElement(TableBodyCell, _extends({
      key: colIndex,
      $col: col,
      $colIndex: colIndex,
      $row: row,
      $rowIndex: rowIndex
    }, tableBodyCellProps), row[colIndex])))))));
  }

}

_defineProperty(Table, "defaultProps", {
  columns: [],
  data: [[]],
  loadingMessage: 'Loading...'
});
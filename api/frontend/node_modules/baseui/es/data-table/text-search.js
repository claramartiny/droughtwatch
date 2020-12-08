/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { useStyletron } from '../styles/index.js';
export function matchesQuery(text, query) {
  return text.toLowerCase().includes(query.toLowerCase());
}
export function splitByQuery(text, query) {
  return text.split(new RegExp(`(${query})`, 'i'));
}
export function HighlightCellText(props) {
  const [css, theme] = useStyletron();

  if (!props.query) {
    return props.text;
  }

  return React.createElement(React.Fragment, null, splitByQuery(props.text, props.query).map((el, i) => {
    if (matchesQuery(el, props.query)) {
      return React.createElement("span", {
        className: css({ ...theme.typography.font150
        }),
        key: i
      }, el);
    }

    return el;
  }));
}
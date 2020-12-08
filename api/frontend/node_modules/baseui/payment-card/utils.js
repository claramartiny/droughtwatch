"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCaretPosition = exports.sanitizeNumber = exports.addGaps = void 0;

var _cardValidator = _interopRequireDefault(require("card-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
var addGaps = function addGaps(gaps, value) {
  return gaps.reduce(function (prev, gap, index) {
    return "".concat(prev.slice(0, gap + index), " ").concat(prev.slice(gap + index)).trim();
  }, "".concat(value));
};

exports.addGaps = addGaps;

var sanitizeNumber = function sanitizeNumber(input) {
  var number = input.replace(/[^0-9]/gi, '');

  var validatedValue = _cardValidator.default.number(number);

  if (validatedValue.card && Array.isArray(validatedValue.card.lengths)) {
    return number.slice(0, validatedValue.card.lengths[validatedValue.card.lengths.length - 1]);
  } // CC number NEVER can have more than 19 digits


  return number.slice(0, 19);
};

exports.sanitizeNumber = sanitizeNumber;

var getCaretPosition = function getCaretPosition(value, prevValue, position) {
  var cleanValue = sanitizeNumber(value);

  var validatedValue = _cardValidator.default.number(cleanValue); // skipping over a gap


  if (validatedValue.card && Array.isArray(validatedValue.card.gaps)) {
    var gaps = validatedValue.card.gaps;
    var valueWithGaps = addGaps(gaps, cleanValue);

    if (cleanValue.length > prevValue.length && valueWithGaps[position - 1] === ' ') {
      return [position + 1, cleanValue];
    }
  } // deleting a gap


  var prevValidatedValue = _cardValidator.default.number(prevValue);

  if (prevValidatedValue.card && Array.isArray(prevValidatedValue.card.gaps)) {
    var _gaps = prevValidatedValue.card.gaps;

    var _valueWithGaps = addGaps(_gaps, prevValue);

    if (prevValue === cleanValue && _valueWithGaps.length > value.length) {
      var newValue = _valueWithGaps.slice(0, position - 1) + _valueWithGaps.slice(position);

      return [position - 1, sanitizeNumber(newValue)];
    }
  } // change without crossing a gap


  return [position, cleanValue];
};

exports.getCaretPosition = getCaretPosition;
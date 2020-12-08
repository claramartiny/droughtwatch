"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iso2FlagEmoji = iso2FlagEmoji;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// country code regex
var ISO_REGEX = /^[a-z]{2}$/i; // offset between uppercase ascii and regional indicator symbols

var OFFSET = 127397; // convert country code to corresponding emoji flag

function iso2FlagEmoji(iso) {
  if (!ISO_REGEX.test(iso)) {
    var type = _typeof(iso);

    if (process.env.NODE_ENV !== "production") {
      console.warn("iso argument must be an ISO 3166-1 alpha-2 string, but got '".concat(type === 'string' ? iso : type, "' instead."));
    }

    return;
  }

  var chars = Array.from(iso.toUpperCase()).map(function (char) {
    return char.charCodeAt(0) + OFFSET;
  });
  return String.fromCodePoint.apply(String, _toConsumableArray(chars));
}
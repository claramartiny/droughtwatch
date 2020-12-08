#!/usr/bin/env node

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

/* eslint-env node*/
"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');

var path = require('path');

var prettier = require('prettier');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function pascalCase(str) {
  return str.split('-').map(capitalize).join('');
}

function titleCase(str) {
  return str.split('-').map(capitalize).join(' ');
} // handle the exception from Chevrons, where we do not want the word Chevron in the title


function removeChevronFromTitle(str) {
  return str.replace('Chevron ', '');
} // transform svg string to properly styled jsx


function reactify(svgString) {
  return svgString.replace(/<!--.*-->\n/gm, '').replace(/<\/?svg[^>]*>/gm, '').replace(/^\s*\n/gm, '').replace(/\n$/, '').replace(/\t/g, '  ').replace(/fill-rule/g, 'fillRule').replace(/clip-rule/g, 'clipRule').replace(/fill-opacity/g, 'fillOpacity').trim();
}

function cleanOldIcons() {
  var allJsFiles = fs.readdirSync(path.resolve(__dirname)).filter(function (f) {
    return f.endsWith('.js');
  });
  allJsFiles.forEach(function (f) {
    if (fs.readFileSync(path.resolve(__dirname, f), 'utf8').match(/^\/\/ BASEUI-GENERATED-REACT-ICON/m)) {
      fs.unlinkSync(path.resolve(__dirname, f));
    }
  });
}

function generateNewIcons() {
  var iconTemplate, svgs, prettierOptions, iconExports;
  return _regenerator.default.async(function generateNewIcons$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          iconTemplate = fs.readFileSync(path.resolve(__dirname, './icon-template.txt'), 'utf8');
          svgs = fs.readdirSync(path.resolve(__dirname, './svg')).filter(function (f) {
            return f.endsWith('.svg');
          });
          _context2.next = 4;
          return _regenerator.default.awrap(prettier.resolveConfig(__dirname));

        case 4:
          _context2.t0 = _context2.sent;

          if (_context2.t0) {
            _context2.next = 7;
            break;
          }

          _context2.t0 = {};

        case 7:
          prettierOptions = _context2.t0;
          iconExports = [];
          svgs.forEach(function _callee(svgFilename) {
            var svgFile, componentName, svgFileContents, title, viewboxRegex, viewBox, result;
            return _regenerator.default.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    svgFile = svgFilename.split('.')[0];
                    componentName = pascalCase(svgFile);
                    iconExports.push("export {default as ".concat(componentName, "} from './").concat(svgFile, ".js';"));
                    svgFileContents = fs.readFileSync(path.resolve(__dirname, "./svg/".concat(svgFilename)), 'utf8');
                    title = removeChevronFromTitle(titleCase(svgFile));
                    viewboxRegex = svgFileContents.match(/viewBox="([^"]+)"/);
                    viewBox = null;

                    if (viewboxRegex && viewboxRegex[1]) {
                      viewBox = viewboxRegex[1];
                    }

                    result = iconTemplate.replace('%%ICON_PATH%%', reactify(svgFileContents)).replace(new RegExp('%%ICON_NAME%%', 'g'), componentName).replace(new RegExp('%%SVG_TITLE%%', 'g'), title).replace(new RegExp('%%SVG_VIEWBOX%%', 'g'), viewBox && viewboxRegex[1] ? "viewBox=\"".concat(viewBox, "\"") : '');
                    fs.writeFileSync(path.resolve(__dirname, "./".concat(svgFile, ".js")), prettier.format(result, _objectSpread({
                      parser: 'flow'
                    }, prettierOptions)));

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          fs.writeFileSync(path.resolve(__dirname, "./icon-exports.js"), "/*\nCopyright (c) 2018-2020 Uber Technologies, Inc.\n\nThis source code is licensed under the MIT license found in the\nLICENSE file in the root directory of this source tree.\n*/\n// @flow\n".concat(iconExports.join('\n'), "\n")); // eslint-disable-next-line no-console

          console.log("Wrote ".concat(svgs.length, " icon(s)"));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}

cleanOldIcons();
generateNewIcons();
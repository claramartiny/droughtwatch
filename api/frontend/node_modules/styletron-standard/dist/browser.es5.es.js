function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Note: $Shape is needed to make polymorphic withStyle refinements work correctly
// It seems functions satisfy this type without $Shape
// See: https://github.com/facebook/flow/issues/6784
//
//
//
//
//
//
function driver(style, styletron) {
  var tx = renderDeclarativeRules(style, styletron);
  return styletron.renderStyle(tx);
}
function getInitialStyle() {
  return {};
}
function renderDeclarativeRules(style, styletron) {
  for (var key in style) {
    var val = style[key];

    if (key === "animationName" && typeof val !== "string") {
      style.animationName = styletron.renderKeyframes(val);
      continue;
    }

    if (key === "fontFamily" && typeof val !== "string") {
      if (Array.isArray(val)) {
        var result = "";

        for (var _iterator = val, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var _font = _ref;

          if (_typeof(_font) === "object") {
            result += styletron.renderFontFace(_font) + ",";
          } else if (typeof _font === "string") {
            result += _font + ",";
          }
        }

        style.fontFamily = result.slice(0, -1);
        continue;
      } else {
        style.fontFamily = styletron.renderFontFace(val);
        continue;
      }
    }

    if (_typeof(val) === "object" && val !== null) {
      renderDeclarativeRules(val, styletron);
    }
  }

  return style;
}

export { driver, getInitialStyle, renderDeclarativeRules };
//# sourceMappingURL=browser.es5.es.js.map

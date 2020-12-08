import { prefix } from 'inline-style-prefixer';

var SequentialIDGenerator =
/*#__PURE__*/
function () {
  function SequentialIDGenerator(prefix$$1) {
    if (prefix$$1 === void 0) {
      prefix$$1 = "";
    }

    // ensure start with "ae" so "ad" is never produced
    this.prefix = prefix$$1;
    this.count = 0;
    this.offset = 374;
    this.msb = 1295;
    this.power = 2;
  }

  var _proto = SequentialIDGenerator.prototype;

  _proto.next = function next() {
    var id = this.increment().toString(36);
    return this.prefix ? "" + this.prefix + id : id;
  };

  _proto.increment = function increment() {
    var id = this.count + this.offset;

    if (id === this.msb) {
      this.offset += (this.msb + 1) * 9;
      this.msb = Math.pow(36, ++this.power) - 1;
    }

    this.count++;
    return id;
  };

  return SequentialIDGenerator;
}();

// adapted from https://github.com/dutchenkoOleg/sort-css-media-queries
var minMaxWidth = /(!?\(\s*min(-device-)?-width).+\(\s*max(-device)?-width/i;
var minWidth = /\(\s*min(-device)?-width/i;
var maxMinWidth = /(!?\(\s*max(-device)?-width).+\(\s*min(-device)?-width/i;
var maxWidth = /\(\s*max(-device)?-width/i;

var isMinWidth = _testQuery(minMaxWidth, maxMinWidth, minWidth);

var isMaxWidth = _testQuery(maxMinWidth, minMaxWidth, maxWidth);

var minMaxHeight = /(!?\(\s*min(-device)?-height).+\(\s*max(-device)?-height/i;
var minHeight = /\(\s*min(-device)?-height/i;
var maxMinHeight = /(!?\(\s*max(-device)?-height).+\(\s*min(-device)?-height/i;
var maxHeight = /\(\s*max(-device)?-height/i;

var isMinHeight = _testQuery(minMaxHeight, maxMinHeight, minHeight);

var isMaxHeight = _testQuery(maxMinHeight, minMaxHeight, maxHeight);

var isPrint = /print/i;
var isPrintOnly = /^print$/i;
var maxValue = Number.MAX_VALUE;

function _getQueryLength(length) {
  var matches = /(-?\d*\.?\d+)(ch|em|ex|px|rem)/.exec(length);

  if (matches === null) {
    return maxValue;
  }

  var number = matches[1];
  var unit = matches[2];

  switch (unit) {
    case "ch":
      number = parseFloat(number) * 8.8984375;
      break;

    case "em":
    case "rem":
      number = parseFloat(number) * 16;
      break;

    case "ex":
      number = parseFloat(number) * 8.296875;
      break;

    case "px":
      number = parseFloat(number);
      break;
  }

  return +number;
}

function _testQuery(doubleTestTrue, doubleTestFalse, singleTest) {
  return function (query) {
    if (doubleTestTrue.test(query)) {
      return true;
    } else if (doubleTestFalse.test(query)) {
      return false;
    }

    return singleTest.test(query);
  };
}

function _testIsPrint(a, b) {
  var isPrintA = isPrint.test(a);
  var isPrintOnlyA = isPrintOnly.test(a);
  var isPrintB = isPrint.test(b);
  var isPrintOnlyB = isPrintOnly.test(b);

  if (isPrintA && isPrintB) {
    if (!isPrintOnlyA && isPrintOnlyB) {
      return 1;
    }

    if (isPrintOnlyA && !isPrintOnlyB) {
      return -1;
    }

    return a.localeCompare(b);
  }

  if (isPrintA) {
    return 1;
  }

  if (isPrintB) {
    return -1;
  }

  return null;
}

function sortCSSmq(a, b) {
  if (a === "") {
    return -1;
  }

  if (b === "") {
    return 1;
  }

  var testIsPrint = _testIsPrint(a, b);

  if (testIsPrint !== null) {
    return testIsPrint;
  }

  var minA = isMinWidth(a) || isMinHeight(a);
  var maxA = isMaxWidth(a) || isMaxHeight(a);
  var minB = isMinWidth(b) || isMinHeight(b);
  var maxB = isMaxWidth(b) || isMaxHeight(b);

  if (minA && maxB) {
    return -1;
  }

  if (maxA && minB) {
    return 1;
  }

  var lengthA = _getQueryLength(a);

  var lengthB = _getQueryLength(b);

  if (lengthA === maxValue && lengthB === maxValue) {
    return a.localeCompare(b);
  } else if (lengthA === maxValue) {
    return 1;
  } else if (lengthB === maxValue) {
    return -1;
  }

  if (lengthA > lengthB) {
    if (maxA) {
      return -1;
    }

    return 1;
  }

  if (lengthA < lengthB) {
    if (maxA) {
      return 1;
    }

    return -1;
  }

  return a.localeCompare(b);
}

var MultiCache =
/*#__PURE__*/
function () {
  function MultiCache(idGenerator, onNewCache, onNewValue) {
    this.idGenerator = idGenerator;
    this.onNewCache = onNewCache;
    this.onNewValue = onNewValue;
    this.sortedCacheKeys = [];
    this.caches = {};
  }

  var _proto = MultiCache.prototype;

  _proto.getCache = function getCache(key) {
    if (!this.caches[key]) {
      var _cache = new Cache(this.idGenerator, this.onNewValue);

      _cache.key = key;
      this.sortedCacheKeys.push(key);
      this.sortedCacheKeys.sort(sortCSSmq);
      var keyIndex = this.sortedCacheKeys.indexOf(key);
      var insertBeforeMedia = keyIndex < this.sortedCacheKeys.length - 1 ? this.sortedCacheKeys[keyIndex + 1] : void 0;
      this.caches[key] = _cache;
      this.onNewCache(key, _cache, insertBeforeMedia);
    }

    return this.caches[key];
  };

  _proto.getSortedCacheKeys = function getSortedCacheKeys() {
    return this.sortedCacheKeys;
  };

  return MultiCache;
}();
var Cache =
/*#__PURE__*/
function () {
  function Cache(idGenerator, onNewValue) {
    this.cache = {};
    this.idGenerator = idGenerator;
    this.onNewValue = onNewValue;
  }

  var _proto2 = Cache.prototype;

  _proto2.addValue = function addValue(key, value) {
    var cached = this.cache[key];

    if (cached) {
      return cached;
    }

    var id = this.idGenerator.next();
    this.cache[key] = id;
    this.onNewValue(this, id, value);
    return id;
  };

  return Cache;
}();

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};
function hyphenateStyleName(prop) {
  return prop in cache ? cache[prop] : cache[prop] = prop.replace(uppercasePattern, "-$&").toLowerCase().replace(msPattern, "-ms-");
}

/**
 * Adapted from https://github.com/gilmoreorless/css-shorthand-properties
 */
var shorthandMap = {
  // CSS 2.1: https://www.w3.org/TR/CSS2/propidx.html
  "list-style": ["list-style-type", "list-style-position", "list-style-image"],
  margin: ["margin-top", "margin-right", "margin-bottom", "margin-left"],
  outline: ["outline-width", "outline-style", "outline-color"],
  padding: ["padding-top", "padding-right", "padding-bottom", "padding-left"],
  // CSS Backgrounds and Borders Module Level 3: https://www.w3.org/TR/css3-background/
  background: ["background-image", "background-position", "background-size", "background-repeat", "background-origin", "background-clip", "background-attachment", "background-color"],
  border: ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-width", "border-top-style", "border-right-style", "border-bottom-style", "border-left-style", "border-style", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "border-color"],
  "border-color": ["border-top-color", "border-right-color", "border-bottom-color", "border-left-color"],
  "border-style": ["border-top-style", "border-right-style", "border-bottom-style", "border-left-style"],
  "border-width": ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"],
  "border-top": ["border-top-width", "border-top-style", "border-top-color"],
  "border-right": ["border-right-width", "border-right-style", "border-right-color"],
  "border-bottom": ["border-bottom-width", "border-bottom-style", "border-bottom-color"],
  "border-left": ["border-left-width", "border-left-style", "border-left-color"],
  "border-radius": ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"],
  "border-image": ["border-image-source", "border-image-slice", "border-image-width", "border-image-outset", "border-image-repeat"],
  // CSS Fonts Module Level 3: https://www.w3.org/TR/css3-fonts/
  font: ["font-style", "font-variant-ligatures", "font-variant-alternates", "font-variant-caps", "font-variant-numeric", "font-variant-east-asian", "font-variant", "font-weight", "font-stretch", "font-size", "line-height", "font-family"],
  "font-variant": ["font-variant-ligatures", "font-variant-alternates", "font-variant-caps", "font-variant-numeric", "font-variant-east-asian"],
  // CSS Flexible Box Layout Module Level 1: https://www.w3.org/TR/css3-flexbox-1/
  flex: ["flex-grow", "flex-shrink", "flex-basis"],
  "flex-flow": ["flex-direction", "flex-wrap"],
  // CSS Grid Layout Module Level 1: https://www.w3.org/TR/css-grid-1/
  grid: ["grid-template-rows", "grid-template-columns", "grid-template-areas", "grid-auto-rows", "grid-auto-columns", "grid-auto-flow"],
  "grid-template": ["grid-template-rows", "grid-template-columns", "grid-template-areas"],
  "grid-row": ["grid-row-start", "grid-row-end"],
  "grid-column": ["grid-column-start", "grid-column-end"],
  "grid-area": ["grid-row-start", "grid-column-start", "grid-row-end", "grid-column-end"],
  "grid-gap": ["grid-row-gap", "grid-column-gap"],
  // CSS Masking Module Level 1: https://www.w3.org/TR/css-masking/
  mask: ["mask-image", "mask-mode", "mask-position", "mask-size", "mask-repeat", "mask-origin", "mask-clip"],
  "mask-border": ["mask-border-source", "mask-border-slice", "mask-border-width", "mask-border-outset", "mask-border-repeat", "mask-border-mode"],
  // CSS Multi-column Layout Module: https://www.w3.org/TR/css3-multicol/
  columns: ["column-width", "column-count"],
  "column-rule": ["column-rule-width", "column-rule-style", "column-rule-color"],
  // CSS Scroll Snap Module Level 1: https://www.w3.org/TR/css-scroll-snap-1/
  "scroll-padding": ["scroll-padding-top", "scroll-padding-right", "scroll-padding-bottom", "scroll-padding-left"],
  "scroll-padding-block": ["scroll-padding-block-start", "scroll-padding-block-end"],
  "scroll-padding-inline": ["scroll-padding-inline-start", "scroll-padding-inline-end"],
  "scroll-snap-margin": ["scroll-snap-margin-top", "scroll-snap-margin-right", "scroll-snap-margin-bottom", "scroll-snap-margin-left"],
  "scroll-snap-margin-block": ["scroll-snap-margin-block-start", "scroll-snap-margin-block-end"],
  "scroll-snap-margin-inline": ["scroll-snap-margin-inline-start", "scroll-snap-margin-inline-end"],
  // CSS Speech Module: https://www.w3.org/TR/css3-speech/
  cue: ["cue-before", "cue-after"],
  pause: ["pause-before", "pause-after"],
  rest: ["rest-before", "rest-after"],
  // CSS Text Decoration Module Level 3: https://www.w3.org/TR/css-text-decor-3/
  "text-decoration": ["text-decoration-line", "text-decoration-style", "text-decoration-color"],
  "text-emphasis": ["text-emphasis-style", "text-emphasis-color"],
  // CSS Animations (WD): https://www.w3.org/TR/css3-animations
  animation: ["animation-name", "animation-duration", "animation-timing-function", "animation-delay", "animation-iteration-count", "animation-direction", "animation-fill-mode", "animation-play-state"],
  // CSS Transitions (WD): https://www.w3.org/TR/css3-transitions/
  transition: ["transition-property", "transition-duration", "transition-timing-function", "transition-delay"]
};
function validateNoMixedHand(style) {
  var hyphenatedProperties = Object.keys(style).reduce(function (acc, property) {
    acc[hyphenateStyleName(property)] = property;
    return acc;
  }, {});
  var mixed = [];

  for (var property in hyphenatedProperties) {
    if (property in shorthandMap) {
      for (var _iterator = shorthandMap[property], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var _longhand = _ref;

        if (_longhand in hyphenatedProperties) {
          var long = hyphenatedProperties[_longhand];
          var short = hyphenatedProperties[property];
          mixed.push({
            shorthand: {
              property: short,
              value: style[short]
            },
            longhand: {
              property: long,
              value: style[long]
            }
          });
        }
      }
    }
  }

  return mixed;
}

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function injectStylePrefixed(styleCache, styles, media, pseudo) {
  var cache = styleCache.getCache(media);
  var classString = "";

  for (var originalKey in styles) {
    var originalVal = styles[originalKey];

    if (originalVal === void 0 || originalVal === null) {
      continue;
    }

    if (_typeof(originalVal) !== "object") {
      // Non-null and non-undefined primitive value
      if (process.env.NODE_ENV !== "production") {
        validateValueType(originalVal, originalKey);
      }

      var propValPair = hyphenateStyleName(originalKey) + ":" + originalVal;
      var key = "" + pseudo + propValPair;
      var cachedId = cache.cache[key];

      if (cachedId !== void 0) {
        // cache hit
        classString += " " + cachedId;
        continue;
      } else {
        var _prefix;

        // cache miss
        var block = "";
        var prefixed = prefix((_prefix = {}, _prefix[originalKey] = originalVal, _prefix));

        for (var prefixedKey in prefixed) {
          var prefixedVal = prefixed[prefixedKey];

          var prefixedValType = _typeof(prefixedVal);

          if (prefixedValType === "string" || prefixedValType === "number") {
            var prefixedPair = hyphenateStyleName(prefixedKey) + ":" + prefixedVal;

            if (prefixedPair !== propValPair) {
              block += prefixedPair + ";";
            }
          } else if (Array.isArray(prefixedVal)) {
            var hyphenated = hyphenateStyleName(prefixedKey);

            for (var i = 0; i < prefixedVal.length; i++) {
              var _prefixedPair = hyphenated + ":" + prefixedVal[i];

              if (_prefixedPair !== propValPair) {
                block += _prefixedPair + ";";
              }
            }
          }
        }

        block += propValPair; // ensure original prop/val is last (for hydration)

        var id = cache.addValue(key, {
          pseudo: pseudo,
          block: block
        });
        classString += " " + id;
      }
    } else {
      // Non-null object value
      if (originalKey[0] === ":") {
        classString += " " + injectStylePrefixed(styleCache, originalVal, media, pseudo + originalKey);
      } else if (originalKey.substring(0, 6) === "@media") {
        classString += " " + injectStylePrefixed(styleCache, originalVal, originalKey.substr(7), pseudo);
      }
    }
  }

  if (process.env.NODE_ENV !== "production") {
    var conflicts = validateNoMixedHand(styles);

    if (conflicts.length) {
      conflicts.forEach(function (_ref) {
        var _JSON$stringify, _JSON$stringify2;

        var shorthand = _ref.shorthand,
            longhand = _ref.longhand;
        var short = JSON.stringify((_JSON$stringify = {}, _JSON$stringify[shorthand.property] = shorthand.value, _JSON$stringify));
        var long = JSON.stringify((_JSON$stringify2 = {}, _JSON$stringify2[longhand.property] = longhand.value, _JSON$stringify2)); // eslint-disable-next-line no-console

        console.warn("Styles `" + short + "` and `" + long + "` in object yielding class \"" + classString.slice(1) + "\" may result in unexpected behavior. Mixing shorthand and longhand properties within the same style object is unsupported with atomic rendering.");
      });
    }
  } // remove leading space


  return classString.slice(1);
}

function validateValueType(value, key) {
  if (value === null || Array.isArray(value) || typeof value !== "number" && typeof value !== "string") {
    throw new Error("Unsupported style value: " + JSON.stringify(value) + " used in property " + JSON.stringify(key));
  }
}

function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

/* eslint-disable no-console */
var validAnimationState = /^(from|to|\+?(\d*\.)?\d+%)(\s*,\s*(from|to|\+?(\d*\.)?\d+%))*$/;
function validateKeyframesObject(keyframes) {
  var valid = true;

  for (var animationState in keyframes) {
    var value = keyframes[animationState];

    if (!validAnimationState.test(animationState)) {
      valid = false;
      console.warn("Warning: property \"" + animationState + "\" in keyframes object " + JSON.stringify(keyframes) + " is not a valid. Must be \"from\", \"to\", or a percentage.");
    }

    if (_typeof$1(value) !== "object") {
      valid = false;
      console.warn("Warning: value for \"" + animationState + "\" property in keyframes object " + JSON.stringify(keyframes) + " must be an object. Instead it was a " + _typeof$1(value) + ".");
    }

    if (!valid) {
      console.warn("Warning: object used as value for \"animationName\" style is invalid:", keyframes);
    }
  }
}

function atomicSelector(id, pseudo) {
  var selector = "." + id;

  if (pseudo) {
    selector += pseudo;
  }

  return selector;
}
function keyframesToBlock(keyframes) {
  if (process.env.NODE_ENV !== "production") {
    validateKeyframesObject(keyframes);
  }

  if (process.env.NODE_ENV !== "production" && typeof Object.getPrototypeOf(keyframes) !== "undefined") {
    if (Object.getPrototypeOf(keyframes) !== Object.getPrototypeOf({})) {
      // eslint-disable-next-line no-console
      console.warn("Only plain objects should be used as animation values. Unexpectedly recieved:", keyframes);
    }
  }

  var result = "";

  for (var animationState in keyframes) {
    result += animationState + "{" + declarationsToBlock(keyframes[animationState]) + "}";
  }

  return result;
}
function declarationsToBlock(style) {
  var css = "";

  for (var prop in style) {
    var val = style[prop];

    if (typeof val === "string" || typeof val === "number") {
      css += hyphenateStyleName(prop) + ":" + val + ";";
    }
  } // trim trailing semicolon


  return css.slice(0, -1);
}
function keyframesBlockToRule(id, block) {
  return "@keyframes " + id + "{" + block + "}";
}
function fontFaceBlockToRule(id, block) {
  return "@font-face{font-family:" + id + ";" + block + "}";
}
function styleBlockToRule(selector, block) {
  return selector + "{" + block + "}";
}

/* eslint-env browser */
var insertRuleIntoDevtools = function insertRuleIntoDevtools(selector, block) {
  // start after the . combinator and cut at the first : if there is one to cut out the pseudo classes
  var key = selector.substring(1, selector.indexOf(":") !== -1 ? selector.indexOf(":") : selector.length);
  var styles = {}; // split the declaration to catch vendor prefixing

  for (var _iterator = block.split(";"), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var _decl = _ref;
    if (_decl.trim() !== "" && !window.__STYLETRON_DEVTOOLS__.atomicMap[key]) styles[_decl.substring(0, _decl.indexOf(":"))] = _decl.substring(_decl.indexOf(":") + 1, _decl.length);
  }

  window.__STYLETRON_DEVTOOLS__.atomicMap[key] = styles;
};
var hydrateDevtoolsRule = function hydrateDevtoolsRule(cssString) {
  var id = cssString.substring(0, 3);
  var block = cssString.substring(4, cssString.length - 1);
  insertRuleIntoDevtools(id, block);
};

/* eslint-env browser */
var STYLES_HYDRATOR = /\.([^{:]+)(:[^{]+)?{(?:[^}]*;)?([^}]*?)}/g;
var KEYFRAMES_HYRDATOR = /@keyframes ([^{]+)\{((?:[^{]+\{[^}]*\})*)\}/g;
var FONT_FACE_HYDRATOR = /@font-face\{font-family:([^;]+);([^}]*)\}/g;

function hydrateStyles(cache, hydrator, css) {
  var match;

  while (match = hydrator.exec(css)) {
    var _match = match,
        id = _match[1],
        pseudo = _match[2],
        key = _match[3];

    if (true && process.env.NODE_ENV !== "production" && window.__STYLETRON_DEVTOOLS__) {
      hydrateDevtoolsRule(match[0]);
    }

    var fullKey = pseudo ? "" + pseudo + key : key;
    cache.cache[fullKey] = id; // set cache without triggering side effects

    cache.idGenerator.increment(); // increment id
  }
}

function hydrate(cache, hydrator, css) {
  var match;

  while (match = hydrator.exec(css)) {
    var _match2 = match,
        id = _match2[1],
        key = _match2[2];

    if (true && process.env.NODE_ENV !== "production" && window.__STYLETRON_DEVTOOLS__) {
      hydrateDevtoolsRule(match[0]);
    }

    cache.cache[key] = id; // set cache without triggering side effects

    cache.idGenerator.increment(); // increment id
  }
}

var StyletronClient =
/*#__PURE__*/
function () {
  function StyletronClient(opts) {
    var _this = this;

    if (opts === void 0) {
      opts = {};
    }

    this.styleElements = {};
    var styleIdGenerator = new SequentialIDGenerator(opts.prefix);

    var onNewStyle = function onNewStyle(cache, id, value) {
      var pseudo = value.pseudo,
          block = value.block;
      var sheet = _this.styleElements[cache.key].sheet;
      var selector = atomicSelector(id, pseudo);
      var rule = styleBlockToRule(selector, block);

      try {
        sheet.insertRule(rule, sheet.cssRules.length);

        if (true && process.env.NODE_ENV !== "production" && window.__STYLETRON_DEVTOOLS__) {
          insertRuleIntoDevtools(selector, block);
        }
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("Failed to inject CSS: \"" + rule + "\". Perhaps this has invalid or un-prefixed properties?");
        }
      }
    }; // Setup style cache


    this.styleCache = new MultiCache(styleIdGenerator, function (media, _cache, insertBeforeMedia) {
      var styleElement = document.createElement("style");
      styleElement.media = media;

      if (insertBeforeMedia === void 0) {
        _this.container.appendChild(styleElement);
      } else {
        var insertBeforeIndex = findSheetIndexWithMedia(_this.container.children, insertBeforeMedia);

        _this.container.insertBefore(styleElement, _this.container.children[insertBeforeIndex]);
      }

      _this.styleElements[media] = styleElement;
    }, onNewStyle);
    this.keyframesCache = new Cache(new SequentialIDGenerator(opts.prefix), function (cache, id, value) {
      _this.styleCache.getCache("");

      var sheet = _this.styleElements[""].sheet;
      var rule = keyframesBlockToRule(id, keyframesToBlock(value));

      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("Failed to inject CSS: \"" + rule + "\". Perhaps this has invalid or un-prefixed properties?");
        }
      }
    });
    this.fontFaceCache = new Cache(new SequentialIDGenerator(opts.prefix), function (cache, id, value) {
      _this.styleCache.getCache("");

      var sheet = _this.styleElements[""].sheet;
      var rule = fontFaceBlockToRule(id, declarationsToBlock(value));

      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("Failed to inject CSS: \"" + rule + "\". Perhaps this has invalid or un-prefixed properties?");
        }
      }
    });

    if (opts.container) {
      this.container = opts.container;
    } // Hydrate


    if (opts.hydrate && opts.hydrate.length > 0) {
      // infer container from parent element
      if (!this.container) {
        var parentElement = opts.hydrate[0].parentElement;

        if (parentElement !== null && parentElement !== void 0) {
          this.container = parentElement;
        }
      }

      for (var i = 0; i < opts.hydrate.length; i++) {
        var element = opts.hydrate[i];
        var hydrateType = element.getAttribute("data-hydrate");

        if (hydrateType === "font-face") {
          hydrate(this.fontFaceCache, FONT_FACE_HYDRATOR, element.textContent);
          continue;
        }

        if (hydrateType === "keyframes") {
          hydrate(this.keyframesCache, KEYFRAMES_HYRDATOR, element.textContent);
          continue;
        }

        var key = element.media ? element.media : "";
        this.styleElements[key] = element;
        var cache = new Cache(styleIdGenerator, onNewStyle);
        cache.key = key;
        hydrateStyles(cache, STYLES_HYDRATOR, element.textContent);
        this.styleCache.sortedCacheKeys.push(key);
        this.styleCache.caches[key] = cache;
      }
    }

    if (!this.container) {
      if (document.head === null) {
        throw new Error("No container provided and `document.head` was null");
      }

      this.container = document.head;
    }
  }

  var _proto = StyletronClient.prototype;

  _proto.renderStyle = function renderStyle(style) {
    return injectStylePrefixed(this.styleCache, style, "", "");
  };

  _proto.renderFontFace = function renderFontFace(fontFace) {
    var key = declarationsToBlock(fontFace);
    return this.fontFaceCache.addValue(key, fontFace);
  };

  _proto.renderKeyframes = function renderKeyframes(keyframes) {
    var key = keyframesToBlock(keyframes);
    return this.keyframesCache.addValue(key, keyframes);
  };

  return StyletronClient;
}();

function findSheetIndexWithMedia(children, media) {
  var index = 0;

  for (; index < children.length; index++) {
    var child = children[index];

    if (child.tagName === "STYLE" && child.media === media) {
      return index;
    }
  }

  return -1;
}

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var StyletronServer =
/*#__PURE__*/
function () {
  function StyletronServer(opts) {
    var _this = this;

    if (opts === void 0) {
      opts = {};
    }

    this.styleRules = {
      "": ""
    };
    this.styleCache = new MultiCache(new SequentialIDGenerator(opts.prefix), function (media) {
      _this.styleRules[media] = "";
    }, function (cache, id, value) {
      var pseudo = value.pseudo,
          block = value.block;
      _this.styleRules[cache.key] += styleBlockToRule(atomicSelector(id, pseudo), block);
    });
    this.fontFaceRules = "";
    this.fontFaceCache = new Cache(new SequentialIDGenerator(opts.prefix), function (cache, id, value) {
      _this.fontFaceRules += fontFaceBlockToRule(id, declarationsToBlock(value));
    });
    this.keyframesRules = "";
    this.keyframesCache = new Cache(new SequentialIDGenerator(opts.prefix), function (cache, id, value) {
      _this.keyframesRules += keyframesBlockToRule(id, keyframesToBlock(value));
    });
  }

  var _proto = StyletronServer.prototype;

  _proto.renderStyle = function renderStyle(style) {
    return injectStylePrefixed(this.styleCache, style, "", "");
  };

  _proto.renderFontFace = function renderFontFace(fontFace) {
    var key = JSON.stringify(fontFace);
    return this.fontFaceCache.addValue(key, fontFace);
  };

  _proto.renderKeyframes = function renderKeyframes(keyframes) {
    var key = JSON.stringify(keyframes);
    return this.keyframesCache.addValue(key, keyframes);
  };

  _proto.getStylesheets = function getStylesheets() {
    return [].concat(this.keyframesRules.length ? [{
      css: this.keyframesRules,
      attrs: {
        "data-hydrate": "keyframes"
      }
    }] : [], this.fontFaceRules.length ? [{
      css: this.fontFaceRules,
      attrs: {
        "data-hydrate": "font-face"
      }
    }] : [], sheetify(this.styleRules, this.styleCache.getSortedCacheKeys()));
  };

  _proto.getStylesheetsHtml = function getStylesheetsHtml(className) {
    if (className === void 0) {
      className = "_styletron_hydrate_";
    }

    return generateHtmlString(this.getStylesheets(), className);
  };

  _proto.getCss = function getCss() {
    return this.keyframesRules + this.fontFaceRules + stringify(this.styleRules, this.styleCache.getSortedCacheKeys());
  };

  return StyletronServer;
}();

function generateHtmlString(sheets, className) {
  var html = "";

  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];

    var _sheet$attrs = sheet.attrs,
        originalClassName = _sheet$attrs.class,
        rest = _objectWithoutProperties(_sheet$attrs, ["class"]);

    var attrs = Object.assign({
      class: originalClassName ? className + " " + originalClassName : className
    }, rest);
    html += "<style" + attrsToString(attrs) + ">" + sheet.css + "</style>";
  }

  return html;
}

function attrsToString(attrs) {
  var result = "";

  for (var attr in attrs) {
    var value = attrs[attr];

    if (value === true) {
      result += " " + attr;
    } else if (value !== false) {
      result += " " + attr + "=\"" + value + "\"";
    }
  }

  return result;
}

function stringify(styleRules, sortedCacheKeys) {
  var result = "";
  sortedCacheKeys.forEach(function (cacheKey) {
    var rules = styleRules[cacheKey];

    if (cacheKey !== "") {
      result += "@media " + cacheKey + "{" + rules + "}";
    } else {
      result += rules;
    }
  });
  return result;
}

function sheetify(styleRules, sortedCacheKeys) {
  if (sortedCacheKeys.length === 0) {
    return [{
      css: "",
      attrs: {}
    }];
  }

  var sheets = [];
  sortedCacheKeys.forEach(function (cacheKey) {
    // omit media (cacheKey) attribute if empty
    var attrs = cacheKey === "" ? {} : {
      media: cacheKey
    };
    sheets.push({
      css: styleRules[cacheKey],
      attrs: attrs
    });
  });
  return sheets;
}

export { StyletronClient as Client, StyletronServer as Server };
//# sourceMappingURL=browser.es5.es.js.map

import { prefix } from 'inline-style-prefixer';

class SequentialIDGenerator {
  constructor(prefix$$1 = "") {
    // ensure start with "ae" so "ad" is never produced
    this.prefix = prefix$$1;
    this.count = 0;
    this.offset = 374;
    this.msb = 1295;
    this.power = 2;
  }

  next() {
    const id = this.increment().toString(36);
    return this.prefix ? `${this.prefix}${id}` : id;
  }

  increment() {
    const id = this.count + this.offset;

    if (id === this.msb) {
      this.offset += (this.msb + 1) * 9;
      this.msb = Math.pow(36, ++this.power) - 1;
    }

    this.count++;
    return id;
  }

}

// adapted from https://github.com/dutchenkoOleg/sort-css-media-queries
const minMaxWidth = /(!?\(\s*min(-device-)?-width).+\(\s*max(-device)?-width/i;
const minWidth = /\(\s*min(-device)?-width/i;
const maxMinWidth = /(!?\(\s*max(-device)?-width).+\(\s*min(-device)?-width/i;
const maxWidth = /\(\s*max(-device)?-width/i;

const isMinWidth = _testQuery(minMaxWidth, maxMinWidth, minWidth);

const isMaxWidth = _testQuery(maxMinWidth, minMaxWidth, maxWidth);

const minMaxHeight = /(!?\(\s*min(-device)?-height).+\(\s*max(-device)?-height/i;
const minHeight = /\(\s*min(-device)?-height/i;
const maxMinHeight = /(!?\(\s*max(-device)?-height).+\(\s*min(-device)?-height/i;
const maxHeight = /\(\s*max(-device)?-height/i;

const isMinHeight = _testQuery(minMaxHeight, maxMinHeight, minHeight);

const isMaxHeight = _testQuery(maxMinHeight, minMaxHeight, maxHeight);

const isPrint = /print/i;
const isPrintOnly = /^print$/i;
const maxValue = Number.MAX_VALUE;

function _getQueryLength(length) {
  const matches = /(-?\d*\.?\d+)(ch|em|ex|px|rem)/.exec(length);

  if (matches === null) {
    return maxValue;
  }

  let number = matches[1];
  const unit = matches[2];

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
  const isPrintA = isPrint.test(a);
  const isPrintOnlyA = isPrintOnly.test(a);
  const isPrintB = isPrint.test(b);
  const isPrintOnlyB = isPrintOnly.test(b);

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

  const testIsPrint = _testIsPrint(a, b);

  if (testIsPrint !== null) {
    return testIsPrint;
  }

  const minA = isMinWidth(a) || isMinHeight(a);
  const maxA = isMaxWidth(a) || isMaxHeight(a);
  const minB = isMinWidth(b) || isMinHeight(b);
  const maxB = isMaxWidth(b) || isMaxHeight(b);

  if (minA && maxB) {
    return -1;
  }

  if (maxA && minB) {
    return 1;
  }

  const lengthA = _getQueryLength(a);

  const lengthB = _getQueryLength(b);

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

class MultiCache {
  constructor(idGenerator, onNewCache, onNewValue) {
    this.idGenerator = idGenerator;
    this.onNewCache = onNewCache;
    this.onNewValue = onNewValue;
    this.sortedCacheKeys = [];
    this.caches = {};
  }

  getCache(key) {
    if (!this.caches[key]) {
      const cache = new Cache(this.idGenerator, this.onNewValue);
      cache.key = key;
      this.sortedCacheKeys.push(key);
      this.sortedCacheKeys.sort(sortCSSmq);
      const keyIndex = this.sortedCacheKeys.indexOf(key);
      const insertBeforeMedia = keyIndex < this.sortedCacheKeys.length - 1 ? this.sortedCacheKeys[keyIndex + 1] : void 0;
      this.caches[key] = cache;
      this.onNewCache(key, cache, insertBeforeMedia);
    }

    return this.caches[key];
  }

  getSortedCacheKeys() {
    return this.sortedCacheKeys;
  }

}
class Cache {
  constructor(idGenerator, onNewValue) {
    this.cache = {};
    this.idGenerator = idGenerator;
    this.onNewValue = onNewValue;
  }

  addValue(key, value) {
    const cached = this.cache[key];

    if (cached) {
      return cached;
    }

    const id = this.idGenerator.next();
    this.cache[key] = id;
    this.onNewValue(this, id, value);
    return id;
  }

}

const uppercasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
const cache = {};
function hyphenateStyleName(prop) {
  return prop in cache ? cache[prop] : cache[prop] = prop.replace(uppercasePattern, "-$&").toLowerCase().replace(msPattern, "-ms-");
}

/**
 * Adapted from https://github.com/gilmoreorless/css-shorthand-properties
 */
const shorthandMap = {
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
  const hyphenatedProperties = Object.keys(style).reduce((acc, property) => {
    acc[hyphenateStyleName(property)] = property;
    return acc;
  }, {});
  const mixed = [];

  for (const property in hyphenatedProperties) {
    if (property in shorthandMap) {
      for (const longhand of shorthandMap[property]) {
        if (longhand in hyphenatedProperties) {
          const long = hyphenatedProperties[longhand];
          const short = hyphenatedProperties[property];
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

function injectStylePrefixed(styleCache, styles, media, pseudo) {
  const cache = styleCache.getCache(media);
  let classString = "";

  for (const originalKey in styles) {
    const originalVal = styles[originalKey];

    if (originalVal === void 0 || originalVal === null) {
      continue;
    }

    if (typeof originalVal !== "object") {
      // Non-null and non-undefined primitive value
      if (process.env.NODE_ENV !== "production") {
        validateValueType(originalVal, originalKey);
      }

      const propValPair = `${hyphenateStyleName(originalKey)}:${originalVal}`;
      const key = `${pseudo}${propValPair}`;
      const cachedId = cache.cache[key];

      if (cachedId !== void 0) {
        // cache hit
        classString += " " + cachedId;
        continue;
      } else {
        // cache miss
        let block = "";
        const prefixed = prefix({
          [originalKey]: originalVal
        });

        for (const prefixedKey in prefixed) {
          const prefixedVal = prefixed[prefixedKey];
          const prefixedValType = typeof prefixedVal;

          if (prefixedValType === "string" || prefixedValType === "number") {
            const prefixedPair = `${hyphenateStyleName(prefixedKey)}:${prefixedVal}`;

            if (prefixedPair !== propValPair) {
              block += `${prefixedPair};`;
            }
          } else if (Array.isArray(prefixedVal)) {
            const hyphenated = hyphenateStyleName(prefixedKey);

            for (let i = 0; i < prefixedVal.length; i++) {
              const prefixedPair = `${hyphenated}:${prefixedVal[i]}`;

              if (prefixedPair !== propValPair) {
                block += `${prefixedPair};`;
              }
            }
          }
        }

        block += propValPair; // ensure original prop/val is last (for hydration)

        const id = cache.addValue(key, {
          pseudo,
          block
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
    const conflicts = validateNoMixedHand(styles);

    if (conflicts.length) {
      conflicts.forEach(({
        shorthand,
        longhand
      }) => {
        const short = JSON.stringify({
          [shorthand.property]: shorthand.value
        });
        const long = JSON.stringify({
          [longhand.property]: longhand.value
        }); // eslint-disable-next-line no-console

        console.warn(`Styles \`${short}\` and \`${long}\` in object yielding class "${classString.slice(1)}" may result in unexpected behavior. Mixing shorthand and longhand properties within the same style object is unsupported with atomic rendering.`);
      });
    }
  } // remove leading space


  return classString.slice(1);
}

function validateValueType(value, key) {
  if (value === null || Array.isArray(value) || typeof value !== "number" && typeof value !== "string") {
    throw new Error(`Unsupported style value: ${JSON.stringify(value)} used in property ${JSON.stringify(key)}`);
  }
}

/* eslint-disable no-console */
const validAnimationState = /^(from|to|\+?(\d*\.)?\d+%)(\s*,\s*(from|to|\+?(\d*\.)?\d+%))*$/;
function validateKeyframesObject(keyframes) {
  let valid = true;

  for (const animationState in keyframes) {
    const value = keyframes[animationState];

    if (!validAnimationState.test(animationState)) {
      valid = false;
      console.warn(`Warning: property "${animationState}" in keyframes object ${JSON.stringify(keyframes)} is not a valid. Must be "from", "to", or a percentage.`);
    }

    if (typeof value !== "object") {
      valid = false;
      console.warn(`Warning: value for "${animationState}" property in keyframes object ${JSON.stringify(keyframes)} must be an object. Instead it was a ${typeof value}.`);
    }

    if (!valid) {
      console.warn(`Warning: object used as value for "animationName" style is invalid:`, keyframes);
    }
  }
}

function atomicSelector(id, pseudo) {
  let selector = `.${id}`;

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

  let result = "";

  for (const animationState in keyframes) {
    result += `${animationState}{${declarationsToBlock(keyframes[animationState])}}`;
  }

  return result;
}
function declarationsToBlock(style) {
  let css = "";

  for (const prop in style) {
    const val = style[prop];

    if (typeof val === "string" || typeof val === "number") {
      css += `${hyphenateStyleName(prop)}:${val};`;
    }
  } // trim trailing semicolon


  return css.slice(0, -1);
}
function keyframesBlockToRule(id, block) {
  return `@keyframes ${id}{${block}}`;
}
function fontFaceBlockToRule(id, block) {
  return `@font-face{font-family:${id};${block}}`;
}
function styleBlockToRule(selector, block) {
  return `${selector}{${block}}`;
}

/* eslint-env browser */
const insertRuleIntoDevtools = (selector, block) => {
  // start after the . combinator and cut at the first : if there is one to cut out the pseudo classes
  const key = selector.substring(1, selector.indexOf(":") !== -1 ? selector.indexOf(":") : selector.length);
  const styles = {}; // split the declaration to catch vendor prefixing

  for (const decl of block.split(";")) {
    if (decl.trim() !== "" && !window.__STYLETRON_DEVTOOLS__.atomicMap[key]) styles[decl.substring(0, decl.indexOf(":"))] = decl.substring(decl.indexOf(":") + 1, decl.length);
  }

  window.__STYLETRON_DEVTOOLS__.atomicMap[key] = styles;
};
const hydrateDevtoolsRule = cssString => {
  const id = cssString.substring(0, 3);
  const block = cssString.substring(4, cssString.length - 1);
  insertRuleIntoDevtools(id, block);
};

/* eslint-env browser */
const STYLES_HYDRATOR = /\.([^{:]+)(:[^{]+)?{(?:[^}]*;)?([^}]*?)}/g;
const KEYFRAMES_HYRDATOR = /@keyframes ([^{]+)\{((?:[^{]+\{[^}]*\})*)\}/g;
const FONT_FACE_HYDRATOR = /@font-face\{font-family:([^;]+);([^}]*)\}/g;

function hydrateStyles(cache, hydrator, css) {
  let match;

  while (match = hydrator.exec(css)) {
    const [, id, pseudo, key] = match;

    if (true && process.env.NODE_ENV !== "production" && window.__STYLETRON_DEVTOOLS__) {
      hydrateDevtoolsRule(match[0]);
    }

    const fullKey = pseudo ? `${pseudo}${key}` : key;
    cache.cache[fullKey] = id; // set cache without triggering side effects

    cache.idGenerator.increment(); // increment id
  }
}

function hydrate(cache, hydrator, css) {
  let match;

  while (match = hydrator.exec(css)) {
    const [, id, key] = match;

    if (true && process.env.NODE_ENV !== "production" && window.__STYLETRON_DEVTOOLS__) {
      hydrateDevtoolsRule(match[0]);
    }

    cache.cache[key] = id; // set cache without triggering side effects

    cache.idGenerator.increment(); // increment id
  }
}

class StyletronClient {
  constructor(opts = {}) {
    this.styleElements = {};
    const styleIdGenerator = new SequentialIDGenerator(opts.prefix);

    const onNewStyle = (cache, id, value) => {
      const {
        pseudo,
        block
      } = value;
      const sheet = this.styleElements[cache.key].sheet;
      const selector = atomicSelector(id, pseudo);
      const rule = styleBlockToRule(selector, block);

      try {
        sheet.insertRule(rule, sheet.cssRules.length);

        if (true && process.env.NODE_ENV !== "production" && window.__STYLETRON_DEVTOOLS__) {
          insertRuleIntoDevtools(selector, block);
        }
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn(`Failed to inject CSS: "${rule}". Perhaps this has invalid or un-prefixed properties?`);
        }
      }
    }; // Setup style cache


    this.styleCache = new MultiCache(styleIdGenerator, (media, _cache, insertBeforeMedia) => {
      const styleElement = document.createElement("style");
      styleElement.media = media;

      if (insertBeforeMedia === void 0) {
        this.container.appendChild(styleElement);
      } else {
        const insertBeforeIndex = findSheetIndexWithMedia(this.container.children, insertBeforeMedia);
        this.container.insertBefore(styleElement, this.container.children[insertBeforeIndex]);
      }

      this.styleElements[media] = styleElement;
    }, onNewStyle);
    this.keyframesCache = new Cache(new SequentialIDGenerator(opts.prefix), (cache, id, value) => {
      this.styleCache.getCache("");
      const sheet = this.styleElements[""].sheet;
      const rule = keyframesBlockToRule(id, keyframesToBlock(value));

      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn(`Failed to inject CSS: "${rule}". Perhaps this has invalid or un-prefixed properties?`);
        }
      }
    });
    this.fontFaceCache = new Cache(new SequentialIDGenerator(opts.prefix), (cache, id, value) => {
      this.styleCache.getCache("");
      const sheet = this.styleElements[""].sheet;
      const rule = fontFaceBlockToRule(id, declarationsToBlock(value));

      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn(`Failed to inject CSS: "${rule}". Perhaps this has invalid or un-prefixed properties?`);
        }
      }
    });

    if (opts.container) {
      this.container = opts.container;
    } // Hydrate


    if (opts.hydrate && opts.hydrate.length > 0) {
      // infer container from parent element
      if (!this.container) {
        const parentElement = opts.hydrate[0].parentElement;

        if (parentElement !== null && parentElement !== void 0) {
          this.container = parentElement;
        }
      }

      for (let i = 0; i < opts.hydrate.length; i++) {
        const element = opts.hydrate[i];
        const hydrateType = element.getAttribute("data-hydrate");

        if (hydrateType === "font-face") {
          hydrate(this.fontFaceCache, FONT_FACE_HYDRATOR, element.textContent);
          continue;
        }

        if (hydrateType === "keyframes") {
          hydrate(this.keyframesCache, KEYFRAMES_HYRDATOR, element.textContent);
          continue;
        }

        const key = element.media ? element.media : "";
        this.styleElements[key] = element;
        const cache = new Cache(styleIdGenerator, onNewStyle);
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

  renderStyle(style) {
    return injectStylePrefixed(this.styleCache, style, "", "");
  }

  renderFontFace(fontFace) {
    const key = declarationsToBlock(fontFace);
    return this.fontFaceCache.addValue(key, fontFace);
  }

  renderKeyframes(keyframes) {
    const key = keyframesToBlock(keyframes);
    return this.keyframesCache.addValue(key, keyframes);
  }

}

function findSheetIndexWithMedia(children, media) {
  let index = 0;

  for (; index < children.length; index++) {
    const child = children[index];

    if (child.tagName === "STYLE" && child.media === media) {
      return index;
    }
  }

  return -1;
}

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

class StyletronServer {
  constructor(opts = {}) {
    this.styleRules = {
      "": ""
    };
    this.styleCache = new MultiCache(new SequentialIDGenerator(opts.prefix), media => {
      this.styleRules[media] = "";
    }, (cache, id, value) => {
      const {
        pseudo,
        block
      } = value;
      this.styleRules[cache.key] += styleBlockToRule(atomicSelector(id, pseudo), block);
    });
    this.fontFaceRules = "";
    this.fontFaceCache = new Cache(new SequentialIDGenerator(opts.prefix), (cache, id, value) => {
      this.fontFaceRules += fontFaceBlockToRule(id, declarationsToBlock(value));
    });
    this.keyframesRules = "";
    this.keyframesCache = new Cache(new SequentialIDGenerator(opts.prefix), (cache, id, value) => {
      this.keyframesRules += keyframesBlockToRule(id, keyframesToBlock(value));
    });
  }

  renderStyle(style) {
    return injectStylePrefixed(this.styleCache, style, "", "");
  }

  renderFontFace(fontFace) {
    const key = JSON.stringify(fontFace);
    return this.fontFaceCache.addValue(key, fontFace);
  }

  renderKeyframes(keyframes) {
    const key = JSON.stringify(keyframes);
    return this.keyframesCache.addValue(key, keyframes);
  }

  getStylesheets() {
    return [...(this.keyframesRules.length ? [{
      css: this.keyframesRules,
      attrs: {
        "data-hydrate": "keyframes"
      }
    }] : []), ...(this.fontFaceRules.length ? [{
      css: this.fontFaceRules,
      attrs: {
        "data-hydrate": "font-face"
      }
    }] : []), ...sheetify(this.styleRules, this.styleCache.getSortedCacheKeys())];
  }

  getStylesheetsHtml(className = "_styletron_hydrate_") {
    return generateHtmlString(this.getStylesheets(), className);
  }

  getCss() {
    return this.keyframesRules + this.fontFaceRules + stringify(this.styleRules, this.styleCache.getSortedCacheKeys());
  }

}

function generateHtmlString(sheets, className) {
  let html = "";

  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];

    const _sheet$attrs = sheet.attrs,
          {
      class: originalClassName
    } = _sheet$attrs,
          rest = _objectWithoutPropertiesLoose(_sheet$attrs, ["class"]);

    const attrs = Object.assign({
      class: originalClassName ? `${className} ${originalClassName}` : className
    }, rest);
    html += `<style${attrsToString(attrs)}>${sheet.css}</style>`;
  }

  return html;
}

function attrsToString(attrs) {
  let result = "";

  for (const attr in attrs) {
    const value = attrs[attr];

    if (value === true) {
      result += " " + attr;
    } else if (value !== false) {
      result += ` ${attr}="${value}"`;
    }
  }

  return result;
}

function stringify(styleRules, sortedCacheKeys) {
  let result = "";
  sortedCacheKeys.forEach(cacheKey => {
    const rules = styleRules[cacheKey];

    if (cacheKey !== "") {
      result += `@media ${cacheKey}{${rules}}`;
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

  const sheets = [];
  sortedCacheKeys.forEach(cacheKey => {
    // omit media (cacheKey) attribute if empty
    const attrs = cacheKey === "" ? {} : {
      media: cacheKey
    };
    sheets.push({
      css: styleRules[cacheKey],
      attrs
    });
  });
  return sheets;
}

export { StyletronClient as Client, StyletronServer as Server };
//# sourceMappingURL=browser.es2015.es.js.map

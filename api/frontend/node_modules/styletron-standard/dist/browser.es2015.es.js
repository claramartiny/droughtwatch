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
  const tx = renderDeclarativeRules(style, styletron);
  return styletron.renderStyle(tx);
}
function getInitialStyle() {
  return {};
}
function renderDeclarativeRules(style, styletron) {
  for (const key in style) {
    const val = style[key];

    if (key === "animationName" && typeof val !== "string") {
      style.animationName = styletron.renderKeyframes(val);
      continue;
    }

    if (key === "fontFamily" && typeof val !== "string") {
      if (Array.isArray(val)) {
        let result = "";

        for (const font of val) {
          if (typeof font === "object") {
            result += `${styletron.renderFontFace(font)},`;
          } else if (typeof font === "string") {
            result += `${font},`;
          }
        }

        style.fontFamily = result.slice(0, -1);
        continue;
      } else {
        style.fontFamily = styletron.renderFontFace(val);
        continue;
      }
    }

    if (typeof val === "object" && val !== null) {
      renderDeclarativeRules(val, styletron);
    }
  }

  return style;
}

export { driver, getInitialStyle, renderDeclarativeRules };
//# sourceMappingURL=browser.es2015.es.js.map

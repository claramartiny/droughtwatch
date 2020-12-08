"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledLabel = exports.StyledBarProgress = exports.StyledBar = exports.StyledBarContainer = exports.StyledRoot = void 0;

var _index = require("../styles/index.js");

var _constants = require("./constants.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getBarHeight(size) {
  var _SIZE$small$SIZE$medi;

  return (_SIZE$small$SIZE$medi = {}, _defineProperty(_SIZE$small$SIZE$medi, _constants.SIZE.small, '2px'), _defineProperty(_SIZE$small$SIZE$medi, _constants.SIZE.medium, '4px'), _defineProperty(_SIZE$small$SIZE$medi, _constants.SIZE.large, '8px'), _SIZE$small$SIZE$medi)[size];
}

var StyledRoot = (0, _index.styled)('div', function (props) {
  return {
    width: '100%'
  };
});
exports.StyledRoot = StyledRoot;
StyledRoot.displayName = "StyledRoot";
var StyledBarContainer = (0, _index.styled)('div', function (props) {
  var $theme = props.$theme;
  var sizing = $theme.sizing;
  return {
    marginLeft: sizing.scale500,
    marginRight: sizing.scale500,
    marginTop: sizing.scale500,
    marginBottom: sizing.scale500
  };
});
exports.StyledBarContainer = StyledBarContainer;
StyledBarContainer.displayName = "StyledBarContainer";
var StyledBar = (0, _index.styled)('div', function (props) {
  var $theme = props.$theme,
      $size = props.$size,
      $steps = props.$steps;
  var colors = $theme.colors,
      sizing = $theme.sizing,
      borders = $theme.borders;
  var borderRadius = borders.useRoundedCorners ? sizing.scale0 : 0;
  return _objectSpread({
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    backgroundColor: (0, _index.hexToRgb)(colors.progressbarTrackFill, '0.16'),
    height: getBarHeight($size),
    position: 'relative',
    overflow: 'hidden'
  }, $steps < 2 ? {} : {
    display: 'inline-block',
    width: "calc((100% - ".concat(sizing.scale300, " * ").concat($steps - 1, ")/").concat($steps, ")"),
    marginLeft: sizing.scale300,
    ':first-child': {
      marginLeft: '0'
    }
  });
});
exports.StyledBar = StyledBar;
StyledBar.displayName = "StyledBar";
var StyledBarProgress = (0, _index.styled)('div', function (props) {
  var $theme = props.$theme,
      $value = props.$value,
      $successValue = props.$successValue,
      $steps = props.$steps,
      $index = props.$index,
      $infinite = props.$infinite;
  var colors = $theme.colors,
      sizing = $theme.sizing,
      borders = $theme.borders;
  var width = "".concat($value / $successValue * 100, "%");
  var stepStates = {
    default: 'default',
    awaits: 'awaits',
    inProgress: 'inProgress',
    completed: 'completed'
  };
  var stepState = stepStates.default;

  if ($steps > 1) {
    var stepValue = $successValue / $steps;
    var currentValue = $value / $successValue * 100;
    var completedSteps = Math.floor(currentValue / stepValue);

    if ($index < completedSteps) {
      stepState = stepStates.completed;
    } else if ($index === completedSteps) {
      stepState = stepStates.inProgress;
    } else {
      stepState = stepStates.awaits;
    }
  }

  var borderRadius = borders.useRoundedCorners ? sizing.scale0 : 0;
  var animationStyles = $infinite ? {
    width: '100%',
    position: 'absolute',
    animationDuration: '2.1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'cubic-bezier(0.65, 0.815, 0.735, 0.395)',
    animationName: {
      '0%': {
        left: '-200%',
        right: '100%'
      },
      '60%': {
        left: '107%',
        right: '-8%'
      },
      '100%': {
        left: '107%',
        right: '-8%'
      }
    }
  } : {
    width: width,
    transition: 'width 0.5s'
  };
  var stepAnimationStyles = stepState === stepStates.inProgress ? {
    position: 'absolute',
    animationDuration: '2.1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: $theme.animation.linearCurve,
    animationName: {
      '0%': {
        width: '0%',
        opacity: 1
      },
      '50%': {
        width: '100%',
        opacity: 1
      },
      '100%': {
        width: '100%',
        opacity: 0
      }
    }
  } : stepState === stepStates.completed ? {
    width: '100%',
    transition: 'width 0.5s'
  } : {
    width: '0%'
  };
  return _objectSpread({
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    backgroundColor: colors.accent,
    height: '100%'
  }, $steps > 1 ? stepAnimationStyles : animationStyles);
});
exports.StyledBarProgress = StyledBarProgress;
StyledBarProgress.displayName = "StyledBarProgress";
var StyledLabel = (0, _index.styled)('div', function (props) {
  return _objectSpread({
    textAlign: 'center'
  }, props.$theme.typography.font150, {
    color: props.$theme.colors.contentTertiary
  });
});
exports.StyledLabel = StyledLabel;
StyledLabel.displayName = "StyledLabel";
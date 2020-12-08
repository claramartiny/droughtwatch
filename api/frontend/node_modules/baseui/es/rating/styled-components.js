/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles/index.js';
import { starSVG, angryRatingSVG, sadRatingSVG, neutralRatingSVG, happyRatingSVG, veryHappyRatingSVG } from './svg-icons.js';
export const StyledRoot = styled('ul', ({
  $theme
}) => {
  return {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    display: 'inline-block',
    ':focus': {
      outline: 'none'
    }
  };
});
StyledRoot.displayName = "StyledRoot";
export const StyledStar = styled('li', ({
  $theme,
  $isActive,
  $isSelected,
  $isFocusVisible,
  $isReadOnly,
  $size
}) => {
  let starStroke = $theme.colors.mono500;
  let starFill = $theme.colors.mono300;

  if ($isActive) {
    starStroke = starFill = $theme.colors.rating400;
  }

  const styles = {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    display: 'inline-block',
    transition: `transform ${$theme.animation.timing400}`,
    cursor: $isReadOnly ? 'default' : 'pointer',
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    marginRight: $theme.sizing.scale300,
    width: `${$size}px`,
    height: `${$size}px`,
    transform: $isSelected ? 'scale(1.35)' : null,
    outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
    outlineOffset: '2px',
    ':after': {
      transition: `all ${$theme.animation.timing400}`,
      content: `url('data:image/svg+xml,` + starSVG(starFill, starStroke, $size) + `')`
    }
  };
  return styles;
});
StyledStar.displayName = "StyledStar";
export const StyledEmoticon = styled('li', ({
  $theme,
  $isActive,
  $isSelected,
  $index = 1,
  $isFocusVisible,
  $isReadOnly,
  $size
}) => {
  let emoticonFill = $theme.colors.mono500;

  if ($isActive) {
    emoticonFill = $theme.colors.rating400;
  }

  const ratingIcons = [angryRatingSVG(emoticonFill, $size), sadRatingSVG(emoticonFill, $size), neutralRatingSVG(emoticonFill, $size), happyRatingSVG(emoticonFill, $size), veryHappyRatingSVG(emoticonFill, $size)];
  const styles = {
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    display: 'inline-block',
    transition: `transform ${$theme.animation.timing400}`,
    cursor: $isReadOnly ? 'default' : 'pointer',
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    marginRight: $theme.sizing.scale300,
    width: `${$size}px`,
    height: `${$size}px`,
    transform: $isSelected ? 'scale(1.1)' : null,
    outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
    outlineOffset: '2px',
    ':after': {
      transition: `all ${$theme.animation.timing400}`,
      content: `url('data:image/svg+xml,` + ratingIcons[$index - 1] + `')`
    }
  };
  return styles;
});
StyledEmoticon.displayName = "StyledEmoticon";
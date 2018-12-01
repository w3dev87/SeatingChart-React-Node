import React from 'react';
import * as defaults from '../config/defaults';

const getCssRgbaFromColor = (color) => {
  if (color && color.r && color.g && color.b && color.a) {
    return `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`;
  } else {
    return null;
  }
};

export default function Icon({
  glyph,
  width = 50,
  height = 50,
  rotate = 0,
  className = 'icon',
  style,
  onClick,
  isSelected = false,
  strokeSize,
  color,
  itemType
}) {

  var defaultFillColor, defaultStrokeColor, defaultStrokeWidth;

  switch (itemType)
  {
    case 'itemTable':
      defaultFillColor = defaults.itemTableDefaultFillColor;
      defaultStrokeColor = defaults.itemTableDefaultStrokeColor;
      defaultStrokeWidth = '0';
      break;
    case 'itemChair':
      defaultFillColor = defaults.itemChairDefaultFillColor;
      defaultStrokeColor = defaults.itemChairDefaultStrokeColor;
      defaultStrokeWidth = '0';
      break;
    case 'iconTable':
    case 'iconChair':
    default:
      defaultFillColor = defaults.iconDefaultFillColor;
      defaultStrokeColor = defaults.iconDefaultStrokeColor;
      defaultStrokeWidth = '1';
  }

  const fillColor = getCssRgbaFromColor(color) || defaultFillColor;

  const strokeWidth = isSelected
    ? strokeSize || '1'
    : defaultStrokeWidth;

  // const strokeWidth = isSelected
  //   ? strokeSize || '1'
  //   : '0';

  // const strokeWidth = isSelected
  //   ? strokeSize || '3'
  //   : '1';

  const strokeColor = defaultStrokeColor;

  return (
    <div
      style={{
        position: 'relative',
        WebkitTransform: `rotate(${ rotate }deg)`,
        transform: `rotate(${ rotate }deg)`,
        ...style
      }}
      onClick={ onClick }
    >
      <div className='svgHack' />
      <svg
        preserveAspectRatio='none'
        className={ className }
        width={ `${ width }px` }
        height={ `${ height }px` }
        viewBox={ `0 0 200 200`}
        fill={ fillColor }
        stroke={ strokeColor }
        strokeWidth={ strokeWidth }
      >
        <use xlinkHref={ glyph } />
      </svg>

    </div>
  );
};

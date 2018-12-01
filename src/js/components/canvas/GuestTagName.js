import React from 'react';

export default ({ name, align = 'top', zoomFactor = 1 }) => {
  const spacing = zoomFactor * 27;
  const fontSize = 9 * zoomFactor;

  let rotation = 0;
  switch(align) {
    case 'right':
      rotation = 90;
      break;
    case 'left':
      rotation = 270;
  }

  const style = {
    position: 'absolute',
    [align]: `-${ spacing }px`,
    transform: `rotate(${ rotation }deg)`,
    padding: '2px',
    letterSpacing: '1px',
    background: '#eee',
    fontSize: `${ fontSize }px`,
    fontWeight: 'bold',
    borderRadius: '5px'
  };
  return (
    <div style={ style }>
      { name }
    </div>
  );
}

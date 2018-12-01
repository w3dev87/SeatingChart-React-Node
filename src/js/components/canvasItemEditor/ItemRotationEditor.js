import React from 'react';

export default ({ onChange, value }) => {
  return (
    <div className="control-wrapper">
      <span>Rotation: </span>
      <input
        type='number'
        step='10'
        value={ value }
        onChange={ onChange }
        className='canvas-item-editor__number-input'
      />
    </div>
  );
};

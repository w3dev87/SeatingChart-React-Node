import React from 'react';

export default ({
  canvasItemSetDisplayName,
  canvasItemSetFontSize,
  dispatch,
  activeId,
  activeFloor,
  displayNameValue = '',
  fontSizeValue = 8
}) => {
  return (
    <div className="control-wrapper">
      <span>Name:</span>
      <input
        placeholder='Name'
        type='text'
        value={ displayNameValue }
        onChange={ (e) => dispatch(
          canvasItemSetDisplayName(
            e.target.value,
            activeId,
            activeFloor
          )
        )}
        className='canvas-item-editor__text-input'
      />

      <select
        value={ fontSizeValue }
        onChange={ (e) => dispatch(
          canvasItemSetFontSize(
            e.target.value,
            activeId,
            activeFloor
          )
        )}
        className='canvas-item-editor__select'
      >
        <option>8</option>
        <option>12</option>
        <option>15</option>
        <option>18</option>
        <option>22</option>
        <option>34</option>
        <option>46</option>
      </select>

    </div>
  );
};

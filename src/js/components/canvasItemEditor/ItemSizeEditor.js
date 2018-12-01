import React from 'react';

export default ({ paramName, action, dispatch, activeId, activeFloor, value }) => {
  return (
    <div className="control-wrapper">
      <span>{ paramName  + ': ' }</span>
      <input
        type='number'
        step='0.2'
        value={ value }
        onInput={ (e) => dispatch(
          action(
            e.target.value,
            activeId,
            activeFloor
          )
        )}
        className='canvas-item-editor__number-input'
      />
    </div>
  );
};

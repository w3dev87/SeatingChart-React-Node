import React from 'react';
import { Grid, Cell } from 'react-flexr';

export default ({ updateSeats, dispatch, activeId, seats }) => {
  const itemSeats = seats[activeId] || {};
  return (
    <div className="control-wrapper">
      <span>Chairs: </span>
      <input
        type='number'
        step='1'
        value={ itemSeats.all }
        onChange={ (e) => dispatch(
            updateSeats(
              e.target.value,
              activeId,
              'all'
            )
          )}
        className='canvas-item-editor__number-input'
      />
    </div>
  );
};

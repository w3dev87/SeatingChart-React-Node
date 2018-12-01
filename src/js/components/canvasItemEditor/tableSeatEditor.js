import React from 'react';
import { Grid, Cell } from 'react-flexr';

export default ({ updateSeats, dispatch, activeId, activeFloor, seats }) => {
  const itemSeats = seats[activeId] || {};
  return (
    <Grid style={{ margin: '0' }} align='center'>
      <Cell gutter='0' size={100}>
        <span style={{ marginRight: '5px' }}>Chairs: </span>
        <input
          type='number'
          step='1'
          value={ itemSeats.left }
          onInput={ (e) => dispatch(
            updateSeats(
              e.target.value,
              activeId,
              'left'
            )
          )}
          className='canvas-item-editor__number-input small-inp'
        />
      </Cell>
      <Cell gutter='0'>
        <Cell gutter='2'>
        <input
          type='number'
          step='1'
          value={ itemSeats.top }
          onInput={ (e) => dispatch(
            updateSeats(
              e.target.value,
              activeId,
              'top'
            )
          )}
          className='canvas-item-editor__number-input small-inp'
        />
        </Cell>
        <Cell gutter='2'>
        <input
          type='number'
          step='1'
          value={ itemSeats.bottom }
          onInput={ (e) => dispatch(
            updateSeats(
              e.target.value,
              activeId,
              'bottom'
            )
          )}
          className='canvas-item-editor__number-input small-inp'
        />
        </Cell>
      </Cell>
      <Cell gutter='0'>
        <input
          type='number'
          step='1'
          value={ itemSeats.right }
          onInput={ (e) => dispatch(
            updateSeats(
              e.target.value,
              activeId,
              'right'
            )
          )}
          className='canvas-item-editor__number-input small-inp'
        />
      </Cell>
    </Grid>
  );
};

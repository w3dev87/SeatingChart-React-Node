import React from 'react';
import { Grid, Cell } from 'react-flexr';
import * as actions from '../../actions/floors-actions';

// Turn floors number to array for easier iteration in react component
// Having floors as number is a bad practice, later when we turned it into array we may remove this func
const floorsAsArray = (floorsNumber) => {
  let current = 0, floorsArr = [];
  while( current < floorsNumber ) {
    floorsArr.push(current++)
  }
  return floorsArr;
};

export default ({ floorsCount, currentFloor, dispatch, editable }) => {
  return (
    <div className='floors-bar'>
      <Grid>
        {
          floorsAsArray(floorsCount).map((floorIdx, idx) =>
            <Cell key={ idx }>
              <span>
                { editable &&
                  <button
                    onClick={ () => dispatch(actions.floorRemove(floorIdx)) }
                    className='floors-bar__delete'
                  >
                    <i className='fa fa-close fa-lg'></i>
                  </button>
                }
              </span>
              <span
                className={ currentFloor === floorIdx? 'floors-bar__item selected': 'floors-bar__item' }
                onClick={ () => dispatch(actions.floorChange(floorIdx)) }
              >
                { `Floor ${ floorIdx + 1 }` }
              </span>
            </Cell>
          )
        }

        <Cell>
          { editable &&
            <button
              className='floors-bar__new'
              onClick={ () => dispatch(actions.floorAdd()) }
            >
              Add New Floor
            </button>
          }
        </Cell>
      </Grid>
    </div>
  );
};

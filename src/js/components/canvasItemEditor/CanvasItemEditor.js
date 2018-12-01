import React from 'react';
import * as canvasActions from './../../actions/canvas-actions';
import * as seatActions from './../../actions/seatActions';
import { Grid, Cell } from 'react-flexr';
import ItemSizeEditor from './ItemSizeEditor';
import ItemRotationEditor from './ItemRotationEditor';
import { TABLE_TYPES, SQUARE_TABLES, RECTANGLE_TABLES, CIRCLE_TABLES } from '../../config/tableTypes';
import { includes } from '../../../../node_modules/lodash/collection';
import TableSeatEditor from './tableSeatEditor';
import CircularTableSeatEditor from './circularTableSeatEditor';
import ColorPicker from './ColorPicker';
import RemoveButton from './RemoveButton';
import DuplicateButton from './DuplicateButton';
import DisplayNameEditor from './displayNameEditor.js';
import { defaultFontSize } from '../../config/defaults';

export default ({
  activeItem,
  activeFloor,
  dispatch,
  seats,
  isMultiSelect
}) => {
  const { categoryId } = activeItem;
  return (
    <div className='canvas-item-editor'>
      <Grid className='canvas-item-editor__editors'>
        {/* Table Seat Editor */}
        {
          ((categoryId === SQUARE_TABLES || categoryId === RECTANGLE_TABLES) && !isMultiSelect) &&
            <Cell size={250} align={'center'}>
              <TableSeatEditor
                dispatch={ dispatch }
                updateSeats={ seatActions.updateSeats }
                activeId={ activeItem.id }
                activeFloor={ activeFloor}
                seats={ seats }
              />
            </Cell>
        }
        {
          (categoryId === CIRCLE_TABLES && !isMultiSelect) &&
            <Cell size={180} align={'center'}>
              <CircularTableSeatEditor
                dispatch={ dispatch }
                updateSeats={ seatActions.updateSeats }
                activeId={ activeItem.id }
                seats={ seats }
              />
            </Cell>
        }

        {/* Rotation Editor */}
        {
          (categoryId !== CIRCLE_TABLES || isMultiSelect) &&
            <Cell size={194} align={'center'}>
              <ItemRotationEditor
                onChange={ (e) => dispatch(
                  isMultiSelect ?
                    canvasActions.canvasMultiSelectSetRotation(
                      e.target.value,
                      activeFloor
                    )
                  :
                    canvasActions.canvasItemSetRotation(
                      e.target.value,
                      activeItem.id,
                      activeFloor
                    )
                )}
                value={ activeItem.rotation }
              />
            </Cell>
        }

        {/* Name Editor */}
        { !isMultiSelect &&
            <Cell size={260} align={'center'}>
              <DisplayNameEditor
                dispatch={ dispatch }
                canvasItemSetDisplayName={ canvasActions.canvasItemSetDisplayName }
                canvasItemSetFontSize={ canvasActions.canvasItemSetFontSize }
                activeId={ activeItem.id }
                activeFloor={ activeFloor}
                displayNameValue={ activeItem.displayName }
                fontSizeValue={ activeItem.fontSize || defaultFontSize }
              />
            </Cell>
        }

        {/* Item Size Editor */}
        {
          (categoryId === RECTANGLE_TABLES && !isMultiSelect) &&
            <Cell size={160} align={'center'}>
              <ItemSizeEditor
                paramName='Width'
                dispatch={ dispatch }
                action={ canvasActions.canvasItemSetWidth }
                activeId={ activeItem.id }
                activeFloor={ activeFloor }
                value={ activeItem.itemWidth }
              />
            </Cell>
        }
        {
          (categoryId === RECTANGLE_TABLES && !isMultiSelect) &&
            <Cell size={160} align={'center'}>
              <ItemSizeEditor
                paramName='Height'
                dispatch={ dispatch }
                action={ canvasActions.canvasItemSetHeight }
                activeId={ activeItem.id }
                activeFloor={ activeFloor}
                value={ activeItem.itemHeight }
              />
            </Cell>
        }

        {
          ((categoryId === SQUARE_TABLES || categoryId === CIRCLE_TABLES) && !isMultiSelect) &&
            <Cell size={160} align={'center'}>
              <ItemSizeEditor
                paramName='Size'
                dispatch={ dispatch }
                action={ canvasActions.canvasItemSetSize }
                activeId={ activeItem.id }
                activeFloor={ activeFloor}
                value={ activeItem.itemWidth }
              />
            </Cell>
        }

        {/* Color Editor */}
        <Cell size={172} align={'center'}>
          <ColorPicker
            value={ activeItem.color }
            itemId={ activeItem.id }
            onChange={ (changedColor) =>
              isMultiSelect ?
                dispatch(
                  canvasActions.canvasMultiSelectSetColor(changedColor, activeFloor)
                )
              :
                dispatch(
                  canvasActions.canvasItemSetColor(changedColor, activeItem.id, activeFloor)
                )
            }
          />
        </Cell>


        { isMultiSelect &&
            <Cell>
              <button
                onClick={ () => dispatch(
                  canvasActions.canvasItemsAlign({ align: 'top' })
                ) }
                className='button small'
              >
                Align Up
              </button>
              <button
                onClick={ () => dispatch(
                  canvasActions.canvasItemsAlign({ align: 'bottom' })
                ) }
                className='button small'
              >
                Align Bottom
              </button>
            </Cell>
        }

        { isMultiSelect &&
            <Cell>
              <button
                onClick={ () => dispatch(
                  canvasActions.canvasHSpacing()
                ) }
                className='button small'
              >
                H Spacing
              </button>
              <button
                onClick={ () => dispatch(
                  canvasActions.canvasVSpacing()
                ) }
                className='button small'
              >
                V Spacing
              </button>
            </Cell>
        }

      </Grid>

      <div className='canvas-item-editor__sidebox'>
        <RemoveButton
          isMultiSelect={ isMultiSelect }
          removeAction={ () => dispatch(
              isMultiSelect ?
                canvasActions.canvasMultiSelectRemove(activeFloor)
              :
                canvasActions.canvasItemRemove(activeItem.id, activeFloor)
            )
          }
        />

        <DuplicateButton
          onClick={ () => dispatch(
            isMultiSelect ?
              canvasActions.canvasMultiSelectDuplicate(activeFloor)
            :
              canvasActions.canvasItemDuplicate(activeItem.id, activeFloor)
        )}
        />
      </div>
    </div>
  );
}

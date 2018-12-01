import React from 'react';
import Icon from './../Icon';
import { Grid, Cell } from 'react-flexr';
import { chairDefaultSize } from '../../config/defaults';
import * as seatingTypes from '../../constants/seatingTypes';
import GuestTagName from './GuestTagName';

const getAllChairs = ({
  seats,
  chairSvg,
  chairSize,
  position,
  selectSeat,
  reservedFor,
  bookedFor,
  panelType,
  item,
  zoomFactor,
  getGuestFromId,
  activeSeat
}) => {
  let chairs = [];
  for(let seatNumber = 1; seatNumber <= seats; seatNumber++) {
    const reservedGuestId = reservedFor? reservedFor[seatNumber]: undefined;
    chairs.push(
      <Cell
        key={ seatNumber }
        gutter='0'
        size='2/2'
        onClick={ () => selectSeat(seatNumber, item.id, position, seatingTypes.ON_TABLE) }
        style={{ position: 'relative', height: chairSize }}
      >
        <div style={
          position === 'right' ?
          {
            position: 'absolute',
            top: '0',
            left: '0'
          }
          :
          {
            position: 'absolute',
            top: '0',
            right: '0'
          }
        }>
          {
            (reservedFor && reservedGuestId) && panelType === 'WEDDING_PANEL' ||
            (bookedFor && bookedFor[seatNumber.toString()]) && panelType === 'BOOKING_PANEL' ?
              <div style={{ fontSize: `${ chairSize * 1.3 }px` }}>
                <GuestTagName
                  name={ getGuestFromId(reservedGuestId).userName }
                  align={ position === 'all'? 'top': position }
                  zoomFactor={ zoomFactor }
                />
                <i
                  style={{
                    position: 'absolute',
                    top: `0px`,
                    zIndex: '1'
                  }}
                  className='fa fa-user'
                  aria-hidden
                />
              </div>
            : null
          }
          <Icon
            glyph={ chairSvg }
            width={ chairSize }
            height={ chairSize }
            rotate={ position === 'right'? '90': '270' }
            color={ item.color }
            isSelected={
              activeSeat &&
              activeSeat.itemId === item.id &&
              activeSeat.position === position &&
              activeSeat.seatNumber === seatNumber
            }
            strokeSize={ 3 }
            itemType={ 'itemChair' }
          />
        </div>
      </Cell>
    );
  }

  return chairs;
};

export default (props) => {
  const { seats, zoomFactor, height } = props;
  const chairSize = Math.min(chairDefaultSize, height / (seats * zoomFactor)) * zoomFactor;

  return (
    <Grid
      style={{
        margin: '0',
        width: `${ chairSize }px`,
        height: `${ height }px`,
        WebkitBoxOrient: 'vertical',
        cursor: 'pointer'
      }}
      align='center'
    >

      {
        getAllChairs({
          ...props,
          chairSize
        })
      }

    </Grid>
  );
}

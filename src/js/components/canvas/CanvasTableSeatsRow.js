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
      <Cell key={ seatNumber } gutter="0" onClick={() =>
        selectSeat(seatNumber, item.id, position, seatingTypes.ON_TABLE)
      }>
        {
          (reservedFor && reservedFor[seatNumber.toString()]) && panelType === 'WEDDING_PANEL' ||
          (bookedFor && bookedFor[seatNumber.toString()]) && panelType === 'BOOKING_PANEL' ?
            <div style={{
              fontSize: `${ chairSize * 1.3 }px`,
              position: 'relative',
              width: `${ chairSize }px`
            }}>
              <GuestTagName
                name={ getGuestFromId(reservedGuestId).userName }
                align={ position === 'all'? 'top': position }
                zoomFactor={ zoomFactor }
              />
              <i
                style={{
                  position: 'absolute',
                  top: `-5px`,
                  left: '0',
                  right: '0',
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
          rotate={ position === 'top'? '0': '180' }
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
      </Cell>
    );
  }

  return chairs;
};

export default (props) => {
  const { seats, zoomFactor, width } = props;
  const chairSize = Math.min(chairDefaultSize, width / (seats * zoomFactor)) * zoomFactor;

  return (
    <Grid
      style={{
        margin: '0',
        height: `${ chairSize }px`,
        width: width,
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

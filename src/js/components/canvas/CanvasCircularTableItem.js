import React from 'react';
import Icon from './../Icon';
import { Grid, Cell } from 'react-flexr';
import CanvasTableSeatsRow from './CanvasTableSeatsRow';
import CanvasTableSeatsColumn from './CanvasTableSeatsColumn';
import { chairDefaultSize } from '../../config/defaults';
import * as seatingTypes from '../../constants/seatingTypes';
import GuestTagName from './GuestTagName';

const getAllSeats = ({
  tableSeats,
  chairSize,
  diameterInPixel,
  chairSvg,
  selectSeat,
  item,
  reservedFor,
  bookedFor,
  panelType,
  getGuestFromId,
  zoomFactor,
  activeSeat
}) => {
  let allSeats = [];
  for (let seatNumber = 1; seatNumber <= tableSeats; seatNumber++) {
    const reservedGuestId = reservedFor? reservedFor[seatNumber]: undefined;
    allSeats.push(
      <div
        key={ seatNumber }
        style={{
          position: 'absolute',
          top: `-${ chairSize }px`,
          left: `${ (diameterInPixel / 2) - (chairSize / 2)}px`,
          zIndex: '1',
          cursor: 'pointer',
          height: `${ (diameterInPixel / 2) + chairSize }px`,
          transform: `rotate(${ (seatNumber - 1) * (365 / tableSeats) }deg)`,
          WebkitTransform: `rotate(${ (seatNumber - 1) * (365 / tableSeats) }deg)`,
          transformOrigin: 'bottom',
          WebkitTransformOrigin: 'bottom'
        }}
      >
        {
          (reservedFor && reservedFor[seatNumber.toString()]) && panelType === 'WEDDING_PANEL' ||
          (bookedFor && bookedFor[seatNumber.toString()]) && panelType === 'BOOKING_PANEL' ?
            <div
              style={{
                fontSize: `${ chairSize * 1.3 }px`,
                position: 'relative',
                width: `${ chairSize }px`
              }}
              onClick={ () => selectSeat(seatNumber, item.id, 'all', seatingTypes.ON_TABLE) }
            >
              <GuestTagName
                name={ getGuestFromId(reservedGuestId).userName }
                align='top'
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
          color={ item.color }
          style={{ cursor: 'pointer' }}
          onClick={ () => selectSeat(seatNumber, item.id, 'all', seatingTypes.ON_TABLE) }
          isSelected={
            activeSeat &&
            activeSeat.itemId === item.id &&
            activeSeat.position === 'all' &&
            activeSeat.seatNumber === seatNumber
          }
          strokeSize={ 3 }
          itemType= { 'itemChair' }
        />
      </div>
    );
  }

  return allSeats;
};

export default ({
  diameterInPixel,
  emptyTable,
  chairSvg,
  zoomFactor,
  selectSeat,
  reservedFor = {},
  bookedFor = {},
  panelType,
  item,
  seats,
  isSelected,
  getGuestFromId,
  activeSeat
}) => {
  const tableSeats = seats[item.id]? seats[item.id].all : 0;
  const chairSize = chairDefaultSize * zoomFactor;
  return (
    <div style={{ position: 'relative' }}>

      { getAllSeats({
          tableSeats,
          chairSize,
          diameterInPixel,
          chairSvg,
          selectSeat,
          reservedFor: reservedFor.all,
          bookedFor: bookedFor.all,
          panelType,
          item,
          getGuestFromId,
          zoomFactor,
          activeSeat
        })
      }

      <Icon
        glyph={ emptyTable }
        width={ diameterInPixel }
        height={ diameterInPixel }
        color={ item.color }
        isSelected={ isSelected }
        itemType={ 'itemTable' }
      />
    </div>
  );
}

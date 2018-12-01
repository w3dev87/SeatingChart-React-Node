import React from 'react';
import Icon from './../Icon';
import CanvasTableSeatsRow from './CanvasTableSeatsRow';
import CanvasTableSeatsColumn from './CanvasTableSeatsColumn';

export default ({
  widthInPixel,
  heightInPixel,
  emptyTable,
  chairSvg,
  zoomFactor,
  seats,
  item,
  selectSeat,
  reservedFor = {},
  bookedFor = {},
  panelType,
  isSelected,
  getGuestFromId,
  activeSeat
}) => {

  const generalTableProps = {
    width: widthInPixel,
    height: heightInPixel,
    zoomFactor,
    chairSvg,
    selectSeat,
    panelType,
    getGuestFromId,
    item,
    activeSeat
  };

  const itemSeats = seats[item.id] || {};

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ float: 'left' }}>
        <CanvasTableSeatsColumn
          { ...generalTableProps }
          position='left'
          seats={ itemSeats.left }
          reservedFor={ reservedFor.left }
          bookedFor={ bookedFor.left }
        />
      </div>
      <div style={{ float: 'left' }}>
        <CanvasTableSeatsRow
          { ...generalTableProps }
          position='top'
          seats={ itemSeats.top }
          reservedFor={ reservedFor.top }
          bookedFor={ bookedFor.top }
        />
        <div>
          <Icon
            glyph={ emptyTable }
            width={ widthInPixel }
            height={ heightInPixel }
            isSelected={ isSelected }
            color={ item.color }
            itemType={ 'itemTable' }
          />
        </div>
        <CanvasTableSeatsRow
          { ...generalTableProps }
          position='bottom'
          seats={ itemSeats.bottom }
          reservedFor={ reservedFor.bottom }
          bookedFor={ bookedFor.bottom }
        />
      </div>
      <div style={{ float: 'left' }}>
        <CanvasTableSeatsColumn
          { ...generalTableProps }
          position='right'
          seats={ itemSeats.right }
          reservedFor={ reservedFor.right }
          bookedFor={ bookedFor.right }
        />
      </div>

    </div>
  );
}

import React from 'react';
import { includes } from '../../../../node_modules/lodash/collection';
import Icon from './../Icon';
import CanvasTableItem from './CanvasTableItem';
import CanvasCircularTableItem from './CanvasCircularTableItem';
import CanvasSingleChair from './CanvasSingleChair';
import { TABLE_TYPES, CIRCLE_TABLES, RECTANGLE_TABLES, SQUARE_TABLES } from '../../config/tableTypes';
import * as seatingTypes from '../../constants/seatingTypes';
import * as panelTypes from '../../constants/panelTypes';
import { chairDefaultSize, defaultSizeMultiplier, singleChairType, defaultFontSize } from '../../config/defaults';
import { getEmptyTable, getChairSvg } from '../../helpers/svgHelpers';

export default class CanvasItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMouseUp(e) {
    e.stopPropagation(0);
    const isMultiSelect = e.shiftKey;
    const { canvasItemSelect, floorSelected, item } = this.props;
    canvasItemSelect(item.id, floorSelected, isMultiSelect);
  };

  render() {
    const {
      isSelected,
      image,
      item,
      zoomFactor,
      reservedFor,
      bookedFor,
      selectSeat,
      panelType,
      getGuestFromId
    } = this.props;

    const transform = `rotate(${ item.rotation }deg)`;

    const canvasItemStyle = {
      zIndex : (isSelected ? '2' : '1'),
      transform: transform,
      WebkitTransform: transform,
      borderColor : (isSelected ? '#bbb' : '')
    };

    const widthInPixel = item.itemWidth * zoomFactor * defaultSizeMultiplier;
    const heightInPixel = item.itemHeight * zoomFactor * defaultSizeMultiplier;

    const chairSize = chairDefaultSize * zoomFactor;

    const isBookingPanel = panelType === panelTypes.BOOKING_PANEL;
    const isWeddingPanel = panelType === panelTypes.WEDDING_PANEL;

    return (
      <div
        onMouseUp={ (e) => this.handleMouseUp(e) }
        className='canvas-item'
        style={ canvasItemStyle }
      >
        <div style={{
          position: 'absolute',
          pointerEvents: 'none',
          top: '20px',
          left:'0',
          right: '0',
          bottom: '0',
          zIndex: '10',
          textAlign: 'center',
          fontSize: `${ item.fontSize || defaultFontSize }px`
        }}>
          { item.displayName }
        </div>
        { (item.categoryId === SQUARE_TABLES || item.categoryId === RECTANGLE_TABLES) &&
          <CanvasTableItem
            { ...this.props }
            emptyTable={ getEmptyTable(item.categoryId) }
            chairSvg={ getChairSvg() }
            widthInPixel={ widthInPixel }
            heightInPixel={ heightInPixel }
          />
        }

        {
          item.categoryId === CIRCLE_TABLES &&
            <CanvasCircularTableItem
              { ...this.props }
              emptyTable={ getEmptyTable(item.categoryId) }
              chairSvg={ getChairSvg() }
              diameterInPixel={ widthInPixel }
              reservedFor={ reservedFor }
              bookedFor={ bookedFor }
            />
        }

        { /* Regular items that are not table */ }
        { !includes(TABLE_TYPES, item.categoryId) ?
            item.type === singleChairType ?
              // TODO: refactor into a separate component later
              <CanvasSingleChair
                onClick={ () => selectSeat(undefined, item.id, undefined, seatingTypes.SINGLE_CHAIR) }
                showGuest={ (isBookingPanel && bookedFor || isWeddingPanel && reservedFor) }
                guestName={ getGuestFromId(reservedFor).userName }
                image={ image }
                color={ item.color }
                size={ chairSize }
                isSelected={ isSelected }
                zoomFactor={ zoomFactor }
              />
            :
              <div className='canvas-item__object'>
                <Icon
                  glyph={ image }
                  width={ widthInPixel }
                  height={ heightInPixel }
                  isSelected={ isSelected }
                  color={ item.color }
                  size={ chairSize }
                  itemType={ 'itemChair' }
                />
              </div>
          : null
        }

      </div>
    );
  }
}

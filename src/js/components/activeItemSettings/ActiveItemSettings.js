import React from 'react';
import * as panelTypes from '../../constants/panelTypes';
import BookTheSeat from './BookTheSeat';
import ItemProperties from './ItemProperties';
import { TABLE_TYPES } from '../../config/tableTypes';
import { includes } from '../../../../node_modules/lodash/collection';

export default (props) => {
  const { panelType, activeSeat, itemId } = props;

  const isChairSelected = activeSeat.itemId === itemId && itemId != undefined;
  const isWeddingPanel = panelType === panelTypes.WEDDING_PANEL;
  const isBookingPanel = panelType === panelTypes.BOOKING_PANEL;
  const isAdminPanel = panelType === panelTypes.ADMIN_PANEL;

  return (
    <div>
      {
        isBookingPanel && isChairSelected &&
          <BookTheSeat { ...props } />
      }
      {
        !isChairSelected || isAdminPanel &&
          <ItemProperties { ...props } />
      }
    </div>
  );
}

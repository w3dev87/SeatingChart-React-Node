import * as types from './../constants/actionTypes';
import { find } from 'lodash/collection';
import { defaultSizeMultiplier } from '../config/defaults';
import {
  getLowestPosX,
  getLowestPosY,
  getHighestPosX,
  getHighestPosY,
  sortBasedOnPosX,
  sortBasedOnPosY,
  getCumulativeItemsWidth,
  getCumulativeItemsHeight
} from './canvasActionsHelpers';

export function canvasItemAdd(data, seats, floorIndex) {
  return {
    type : types.CANVAS_ITEM_ADD,
    data,
    seats,
    floorIndex
  };
}

export function canvasItemRemove(id, floorIndex) {
  return {
    type : types.CANVAS_ITEM_REMOVE,
    id,
    floorIndex
  };
}

export function canvasMultiSelectRemove(floorIndex) {
  return (dispatch, getState) => {
    const { canvasGroup } = getState();
    canvasGroup.currentSelection.forEach(itemId => {
      dispatch(
        canvasItemRemove(itemId, floorIndex)
      );
    });
  }
}

export function canvasItemSetPosition(id, deltaX, deltaY, floorIndex) {
  return {
    type : types.CANVAS_ITEM_SET_POSITION,
    id,
    deltaX,
    deltaY,
    floorIndex
  }
}

export function canvasMultiSelectSetPosition(deltaX, deltaY, floorIndex) {
  return (dispatch, getState) => {
    const { canvasGroup } = getState();
    canvasGroup.currentSelection.forEach(itemId => {
      dispatch(
        canvasItemSetPosition(itemId, deltaX, deltaY, floorIndex)
      );
    });
  }
}

export const canvasItemSetDisplayName = (displayName, id, floorIndex) => {
  return {
    type: types.CANVAS_ITEM_SET_DISPLAY_NAME,
    id,
    displayName,
    floorIndex
  }
};

export const canvasItemSetFontSize = (fontSize, id, floorIndex) => {
  return {
    type: types.CANVAS_ITEM_SET_FONT_SIZE,
    id,
    fontSize,
    floorIndex
  }
};


export function canvasItemSelect(id, floorIndex, isMultiSelect = false) {
  return {
    type : types.CANVAS_ITEM_SELECTED,
    id,
    floorIndex,
    isMultiSelect
  };
}

export function canvasItemDeselect(id = null) {
  return {
    type : types.CANVAS_ITEM_DESELECTED,
    id
  };
}

export function canvasItemSetWidth(width, id, floorIndex) {
  return {
    type : types.CANVAS_ITEM_SET_WIDTH,
    id,
    floorIndex,
    width
  };
}

export function canvasItemSetHeight(height, id, floorIndex) {
  return {
    type : types.CANVAS_ITEM_SET_HEIGHT,
    id,
    floorIndex,
    height
  };
}

export function canvasItemSetSize(size, id, floorIndex) {
  return {
    type : types.CANVAS_ITEM_SET_SIZE,
    id,
    floorIndex,
    size
  };
}

export function canvasItemSetRotation(rotation, id, floorIndex) {
  return {
    type : types.CANVAS_ITEM_SET_ROTATION,
    id,
    floorIndex,
    rotation
  };
}

export function canvasMultiSelectSetRotation(rotation, floorIndex) {
  return (dispatch, getState) => {
    const { canvasGroup } = getState();
    canvasGroup.currentSelection.forEach(itemId => {
      dispatch(
        canvasItemSetRotation(rotation, itemId, floorIndex)
      );
    });
  }
}

export const canvasItemDuplicate = (id, floorIndex) => {
  const newId = 'id-' + new Date().getTime() + Math.floor(Math.random() * 1000);

  return {
    type: types.CANVAS_ITEM_DUPLICATE,
    id,
    floorIndex,
    newId
  }
};

export const canvasMultiSelectDuplicate = (floorIndex) => {
  return (dispatch, getState) => {
    const { canvasGroup } = getState();
    canvasGroup.currentSelection.forEach(itemId => {
      dispatch(
        canvasItemDuplicate(itemId, floorIndex)
      );
    });
  }
};

export const canvasItemSetColor = (color, id, floorIndex) => {
  return {
    type : types.CANVAS_ITEM_SET_COLOR,
    id,
    floorIndex,
    color
  }
};

export function canvasMultiSelectSetColor(color, floorIndex) {
  return (dispatch, getState) => {
    const { canvasGroup } = getState();
    canvasGroup.currentSelection.forEach(itemId => {
      dispatch(
        canvasItemSetColor(color, itemId, floorIndex)
      );
    });
  }
}

export const canvasItemsAlign = (floorIndex, options = {}) => {
  return (dispatch, getState) => {
    const { canvasGroup, canvas, canvasActiveItem } = getState();
    const { floorIndex } = canvasActiveItem;
    let apexOfPosY;
    const mapPosYToId = {};

    canvasGroup.currentSelection.forEach(itemId => {
      // find the lowest posY between selected items
      const currentPosY = canvas[floorIndex].filter(canvasItem => canvasItem.id === itemId).pop().posY;

      if(!apexOfPosY) {
        apexOfPosY = currentPosY;
      } else if(options.align === 'top' && apexOfPosY > currentPosY) {
        apexOfPosY = currentPosY;
      } else if(options.align === 'bottom' && apexOfPosY < currentPosY) {
        apexOfPosY = currentPosY;
      }
      mapPosYToId[itemId] = currentPosY;
    });

    canvasGroup.currentSelection.forEach(itemId => {
      const deltaY = apexOfPosY - mapPosYToId[itemId];
      dispatch(
        canvasItemSetPosition(itemId, 0, deltaY, floorIndex)
      )
    });
  }
};

export const canvasHSpacing = () => {
  return (dispatch, getState) => {
    const state = getState();

    if(state.canvasGroup.currentSelection.length < 3) {
      return null;
    }

    const sortedItems = sortBasedOnPosX(state);
    const lastItemWidth = sortedItems[sortedItems.length - 1].itemWidth * defaultSizeMultiplier;

    const cumulativeWidth = (getHighestPosX(state) + lastItemWidth) - getLowestPosX(state);
    const cumulativeItemsWidth = getCumulativeItemsWidth(sortedItems, defaultSizeMultiplier);

    const equalSpacing = (cumulativeWidth - cumulativeItemsWidth) / (state.canvasGroup.currentSelection.length - 1);

    // Find the difference of spacing between sorted items and apply to item
    sortedItems.forEach((item, idx) => {
      if(idx === 0 || idx === sortedItems.length - 1) {
        return null;
      }
      const prevItem = sortedItems[idx - 1];

      // deltaX is the difference of current position of the item with the position which is-
      // supposed to be with an equal spacing
      const deltaX = equalSpacing - ((item.posX - prevItem.posX) - prevItem.itemWidth * defaultSizeMultiplier);
      dispatch(
        canvasItemSetPosition(item.id, deltaX, 0, state.canvasActiveItem.floorIndex)
      );

      // Updating sortedItems to make the next calculation accurate with the state
      // sortedItems is a duplicate and has nothing to do with state so mutating it is fine
      sortedItems[idx].posX = sortedItems[idx].posX + deltaX;

    });
  }
};

export const canvasVSpacing = () => {
  return (dispatch, getState) => {
    const state = getState();

    if(state.canvasGroup.currentSelection.length < 3) {
      return null;
    }

    const sortedItems = sortBasedOnPosY(state);
    const lastItemHeight = sortedItems[sortedItems.length - 1].itemHeight * defaultSizeMultiplier;

    const cumulativeHeight = (getHighestPosY(state) + lastItemHeight) - getLowestPosY(state);
    const cumulativeItemsHeight = getCumulativeItemsHeight(sortedItems, defaultSizeMultiplier);

    const equalSpacing = (cumulativeHeight - cumulativeItemsHeight) / (state.canvasGroup.currentSelection.length - 1);

    // Find the difference of spacing between sorted items and apply to item
    sortedItems.forEach((item, idx) => {
      if(idx === 0 || idx === sortedItems.length - 1) {
        return null;
      }
      const prevItem = sortedItems[idx - 1];

      // deltaY is the difference of current position of the item with the position which is-
      // supposed to be with an equal spacing
      const deltaY = equalSpacing - ((item.posY - prevItem.posY) - prevItem.itemHeight * defaultSizeMultiplier);
      dispatch(
        canvasItemSetPosition(item.id, 0, deltaY, state.canvasActiveItem.floorIndex)
      );

      // Updating sortedItems to make the next calculation accurate with the state
      // sortedItems is a duplicate and has nothing to do with state so mutating it is fine
      sortedItems[idx].posY = sortedItems[idx].posY + deltaY;

    });
  }
};


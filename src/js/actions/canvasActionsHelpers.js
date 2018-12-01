import { find } from 'lodash/collection';

const getLowestAttr = (state, attrName) => {
  const { canvasGroup, canvasActiveItem, canvas } = state;
  const { floorIndex } = canvasActiveItem;
  let lowestAttr;

  canvasGroup.currentSelection.forEach(itemId => {
    const currentAttr = find(canvas[floorIndex], { id: itemId })[attrName];

    if(!lowestAttr) {
      lowestAttr = currentAttr;
    } else if(lowestAttr > currentAttr) {
      lowestAttr = currentAttr;
    }
  });

  return lowestAttr;
};

const getHighestAttr = (state, attrName) => {
  const { canvasGroup, canvasActiveItem, canvas } = state;
  const { floorIndex } = canvasActiveItem;
  let highestAttr;

  canvasGroup.currentSelection.forEach(itemId => {
    const currentAttr = find(canvas[floorIndex], { id: itemId })[attrName];

    if(!highestAttr) {
      highestAttr = currentAttr;
    } else if(highestAttr < currentAttr) {
      highestAttr = currentAttr;
    }
  });

  return highestAttr;
};

const sortBasedOnAttr = (state, attrName) => {
  const { canvasGroup, canvasActiveItem, canvas } = state;
  const { floorIndex } = canvasActiveItem;

  const canvasSelectedItems = canvasGroup.currentSelection.map(itemId => {
    return find(canvas[floorIndex], { id: itemId });
  });

  return canvasSelectedItems.sort((itemA, itemB) => {
    return itemA[attrName] > itemB[attrName];
  });
};

export const getCumulativeItemsWidth = (collection, defaultSizeMultiplier) => {
  return collection.reduce((total, current) => {
    return total + (current.itemWidth * defaultSizeMultiplier);
  }, 0);
};

export const getCumulativeItemsHeight = (collection, defaultSizeMultiplier) => {
  return collection.reduce((total, current) => {
    return total + (current.itemHeight * defaultSizeMultiplier);
  }, 0);
};

export const getLowestPosX = (state) => {
  return getLowestAttr(state, 'posX');
};

export const getLowestPosY = (state) => {
  return getLowestAttr(state, 'posY');
};

export const getHighestPosX = (state) => {
  return getHighestAttr(state, 'posX');
};

export const getHighestPosY = (state) => {
  return getHighestAttr(state, 'posY');
};

export const sortBasedOnPosX = (state) => {
  return sortBasedOnAttr(state, 'posX');
};

export const sortBasedOnPosY = (state) => {
  return sortBasedOnAttr(state, 'posY');
};


import * as types from './../constants/actionTypes';

// maximum and minimum for canvas objects scale
const minimumScaleLimit = 0.2;
const maximumScaleLimit = 3;

export default (state = {}, action) => {
  switch(action.type) {
    case types.CANVAS_ITEM_SET_HEIGHT:
      const newHeight = Math.max(minimumScaleLimit, Math.min(action.height, maximumScaleLimit));
      return {
        ...state,
        itemHeight: newHeight
      };
    case types.CANVAS_ITEM_SET_WIDTH:
      const newWidth = Math.max(minimumScaleLimit, Math.min(action.width, maximumScaleLimit));
      return {
        ...state,
        itemWidth: newWidth
      };
    case types.CANVAS_ITEM_SET_SIZE:
      const newSize = Math.max(minimumScaleLimit, Math.min(action.size, maximumScaleLimit));
      return {
        ...state,
        itemWidth: newSize,
        itemHeight: newSize
      };
    case types.CANVAS_ITEM_SET_ROTATION:
      const newRotation = Math.max(0, Math.min(action.rotation, 360));
      return {
        ...state,
        rotation: newRotation
      };
    case types.CANVAS_ITEM_SET_COLOR:
      return {
        ...state,
        color: action.color
      };
    case types.CANVAS_ITEM_SET_POSITION:
      return {
        ...state,
        posX: state.posX + action.deltaX,
        posY: state.posY + action.deltaY
      };
    case types.CANVAS_ITEM_SET_DISPLAY_NAME:
      return {
        ...state,
        displayName: action.displayName
      };
    case types.CANVAS_ITEM_SET_FONT_SIZE:
      return {
        ...state,
        fontSize: action.fontSize
      }
    default:
      return state;
  }
}

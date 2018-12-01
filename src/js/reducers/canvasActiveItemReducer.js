import * as types from '../constants/actionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case types.CANVAS_ITEM_SELECTED :
      return {
        id : action.id,
        floorIndex : action.floorIndex
      };
    case types.CANVAS_ITEM_DESELECTED : 
      return null;
    case types.CANVAS_ITEM_DUPLICATE:
      return {
        id : action.newId,
        floorIndex : action.floorIndex
      };
    case types.CANVAS_ITEM_REMOVE:
      if(action.id === state.id) {
        return null;
      }
    default :
      return state;
  }
}

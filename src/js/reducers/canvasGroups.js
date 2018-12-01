import * as types from './../constants/actionTypes';
import { findIndex } from 'lodash/array';

const initialState = {
  currentSelection: []
};


export default function(state = initialState, action) {
  switch (action.type) {
    case types.CANVAS_ITEM_SELECTED:
    case types.CANVAS_ITEM_REMOVE:
    case types.CANVAS_ITEM_DESELECTED:
      return {
        ...state,
        currentSelection: canvasGroup(state.currentSelection, action)
      };
    default :
      return state;
  }
}

const canvasGroup = (state = [], action) => {
  switch (action.type) {
    case types.CANVAS_ITEM_SELECTED:
      if(action.isMultiSelect) {
        const repeatedId = state.indexOf(action.id);
        if (state.indexOf(action.id) !== -1) {
          return [
            ...state.slice(0, repeatedId),
            ...state.slice(repeatedId + 1)
          ];
        }
        return [
          ...state,
          action.id
        ];
      } else {
        return [
          action.id
        ];
      }
    case types.CANVAS_ITEM_REMOVE:
      const target = state.indexOf(action.id);
      return [
        ...state.slice(0, target),
        ...state.slice(target + 1)
      ];
    case types.CANVAS_ITEM_DESELECTED:
      if (action.id === null) {
        console.log('all');
        return [];
      } else {
        const target = state.indexOf(action.id);
        return [
          ...state.slice(0, target),
          ...state.slice(target + 1)
        ];
      }
    default:
      return state;
  }
};

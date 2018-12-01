import * as types from './../constants/actionTypes';
import canvasItemReducer from './canvasItemReducer';
import findIndex from 'lodash/findIndex';

export default function(state = [[]], action) {
  switch (action.type) {
    case types.FETCH_INITIAL_DATA :
      if(action.payload.canvas) {
        return action.payload.canvas;
      }
      else {
        return state;
      }
    case types.CANVAS_ITEM_ADD : {
      let currentLayer = state[action.floorIndex];
      let newLayer = [...currentLayer, action.data];
      return [
        ...state.slice(0, action.floorIndex),
        newLayer,
        ...state.slice(action.floorIndex + 1)
      ];
    }
    case types.CANVAS_ITEM_REMOVE : {
      let currentLayer = state[action.floorIndex];
      let targetIndex = findIndex(currentLayer, {id : action.id});
      let newLayer = [
        ...currentLayer.slice(0, targetIndex),
        ...currentLayer.slice(targetIndex + 1)
      ];

      return [
        ...state.slice(0, action.floorIndex),
        newLayer,
        ...state.slice(action.floorIndex + 1)
      ];

    }
    case types.CANVAS_ITEM_SELECTED : {
      let currentLayer = state[action.floorIndex];
      let updatedLayer = currentLayer.map((el) => {
        if(el.id == action.id) return { ...el, isLastSelected : true };
        return { ...el, isLastSelected : false };
      });

      return [
        ...state.slice(0, action.floorIndex),
        updatedLayer,
        ...state.slice(action.floorIndex + 1)
      ];
    }

    case types.FLOOR_ADD :
      return state.concat([[]]);
    case types.FLOOR_REMOVE :
      return [
        ...state.slice(0, action.floorIndex),
        ...state.slice(action.floorIndex + 1)
      ];
    case types.CANVAS_ITEM_SET_HEIGHT:
    case types.CANVAS_ITEM_SET_WIDTH:
    case types.CANVAS_ITEM_SET_SIZE:
    case types.CANVAS_ITEM_SET_ROTATION:
    case types.CANVAS_ITEM_SET_COLOR:
    case types.CANVAS_ITEM_SET_POSITION:
    case types.CANVAS_ITEM_SET_DISPLAY_NAME:
    case types.CANVAS_ITEM_SET_FONT_SIZE:
      const canvasItemIndex = findIndex(state[action.floorIndex], { id: action.id });
      const canvasItem = state[action.floorIndex][canvasItemIndex];
      return [
        ...state.slice(0, action.floorIndex),
        [
          ...state[action.floorIndex].slice(0, canvasItemIndex),
          canvasItemReducer(canvasItem, action),
          ...state[action.floorIndex].slice(canvasItemIndex + 1)
        ],
        ...state.slice(action.floorIndex + 1)
      ];
    case types.CANVAS_ITEM_DUPLICATE:
      const idIndex = findIndex(state[action.floorIndex], {id : action.id});
      const currentCanvasItem = state[action.floorIndex][idIndex];

      const newCanvasItem = {
        ...currentCanvasItem,
        id: action.newId,
        posX: currentCanvasItem.posX + 20,
        posY: currentCanvasItem.posY + 20
      };

      return [
        ...state.slice(0, action.floorIndex),
        [
          ...state[action.floorIndex],
          newCanvasItem
        ],
        ...state.slice(action.floorIndex + 1)
        ];
    default :
      return state;
  }
}

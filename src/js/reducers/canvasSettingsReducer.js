import * as types from '../constants/actionTypes';

const initialState = {
  zoomFactor: 1,
  posX: 380,
  posY: 100
};

export default (state = initialState, action) => {
  const movementStep = 25 * state.zoomFactor;
  const zoomStep = 0.25;
  const minZoomFactor = 0.5;
  const maxZoomFactor = 4;

  switch(action.type) {
    case types.CANVAS_ZOOM_IN:
      return {
        ...state,
        zoomFactor: Math.min(maxZoomFactor, state.zoomFactor + zoomStep)
      };
    case types.CANVAS_ZOOM_OUT:
      return {
        ...state,
        zoomFactor: Math.max(minZoomFactor, state.zoomFactor - zoomStep)
      };
    case types.CANVAS_ZOOM_RESET:
      return {
        ...state,
        posX: initialState.posX,
        posY: initialState.posY,
        zoomFactor: initialState.zoomFactor
      };
    case types.CANVAS_MOVE_RIGHT:
      return {
        ...state,
        posX: state.posX + movementStep
      };
    case types.CANVAS_MOVE_DOWN:
      return {
        ...state,
        posY: state.posY + movementStep
      };
    case types.CANVAS_MOVE_LEFT:
      return {
        ...state,
        posX: state.posX - movementStep
      };
    case types.CANVAS_MOVE_UP:
      return {
        ...state,
        posY: state.posY - movementStep
      };
    default:
      return state;
  }
};

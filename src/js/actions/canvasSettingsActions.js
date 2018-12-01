import * as types from './../constants/actionTypes';

export const canvasZoomIn = () => {
  return {
    type: types.CANVAS_ZOOM_IN
  }
};

export const canvasZoomOut = () => {
  return {
    type: types.CANVAS_ZOOM_OUT
  }
};

export const canvasResetZoom = () => {
  return {
    type: types.CANVAS_ZOOM_RESET
  }
};

export const canvasMoveUp = () => {
  return {
    type: types.CANVAS_MOVE_UP
  }
};

export const canvasMoveRight = () => {
  return {
    type: types.CANVAS_MOVE_RIGHT
  }
};

export const canvasMoveDown = () => {
  return {
    type: types.CANVAS_MOVE_DOWN
  }
};

export const canvasMoveLeft = () => {
  return {
    type: types.CANVAS_MOVE_LEFT
  }
};

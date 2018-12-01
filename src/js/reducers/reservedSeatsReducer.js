import * as actionTypes from '../constants/actionTypes';
import { omit } from 'lodash/object';

const initialTable = {
  top: {},
  right: {},
  left: {},
  bottom: {},
  all: {}
};

export default (state = {}, action) => {
  switch(action.type) {
    case actionTypes.SEAT_RESERVE:
    case actionTypes.SEAT_RESERVE_SINGLE_CHAIR:
    case actionTypes.UNSEAT_RESERVE:
      return {
        ...state,
        [action.itemId]: reserveSeatItem(state[action.itemId], action)
      };
    case actionTypes.CANVAS_ITEM_REMOVE:
      return omit(state, action.id);
    case actionTypes.UNSEAT_RESERVE_SINGLE_CHAIR:
      return omit(state, action.itemId);
    default:
      return state;
  }
};

const reserveSeatItem = (state = initialTable, action) => {
  switch(action.type) {
    case actionTypes.SEAT_RESERVE:
    case actionTypes.UNSEAT_RESERVE:
      return {
        ...state,
        [action.position]: reserveSeatItemPosition(state[action.position], action)
      };
    case actionTypes.SEAT_RESERVE_SINGLE_CHAIR:
      return action.guestId;
    default:
      return state;
  }
};

const reserveSeatItemPosition = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.SEAT_RESERVE:
      return {
        ...state,
        [action.seatNumber]: action.guestId
      };
    case actionTypes.UNSEAT_RESERVE:
      return omit(state, action.seatNumber.toString());
    default:
      return state;
  }
};

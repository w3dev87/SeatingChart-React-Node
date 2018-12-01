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
    case actionTypes.SEAT_BOOK:
    case actionTypes.SEAT_BOOK_CANCEL:
    case actionTypes.SEAT_BOOK_SINGLE_CHAIR:
      return {
        ...state,
        [action.itemId]: bookSeatItem(state[action.itemId], action)
      };
    case actionTypes.SEAT_BOOK_CANCEL_SINGLE_CHAIR:
      return omit(state, action.itemId);
    case actionTypes.CANVAS_ITEM_REMOVE:
      return omit(state, action.id);
    default:
      return state;
  }
};

const bookSeatItem = (state = initialTable, action) => {
  switch(action.type) {
    case actionTypes.SEAT_BOOK:
    case actionTypes.SEAT_BOOK_CANCEL:
      return {
        ...state,
        [action.position]: bookSeatItemPosition(state[action.position], action)
      };
    case actionTypes.SEAT_BOOK_SINGLE_CHAIR:
      return 'BOOKED';
    default:
      return state;
  }
};

const bookSeatItemPosition = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.SEAT_BOOK:
      return {
        ...state,
        [action.seatNumber]: 'BOOKED'
      };
    case actionTypes.SEAT_BOOK_CANCEL:
      return omit(state, action.seatNumber);
    default:
      return state;
  }
};

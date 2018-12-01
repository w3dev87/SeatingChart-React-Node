import * as types from '../constants/actionTypes';
import { findIndex } from 'lodash/array';

export default (state = [], action) => {
  switch(action.type) {
    case types.LOAD_GUESTS:
      return action.payload.map(guest => {
        return {
          ...guest,
          isNotSeated: true,
          seat: {}
        }
      });
    case types.SEAT_RESERVE:
    case types.SEAT_RESERVE_SINGLE_CHAIR:
    case types.UNSEAT_RESERVE:
    case types.UNSEAT_RESERVE_SINGLE_CHAIR:
      const targetIdx = findIndex(state, { userId: action.guestId });

      return [
        ...state.slice(0, targetIdx),
        guestItem(state[targetIdx], action),
        ...state.slice(targetIdx + 1)
      ];
    case types.CANVAS_ITEM_REMOVE:
      return state.map(guest => {
        if(guest.seat.itemId === action.id) {
          return guestItem(guest, action);
        } else {
          return guest;
        }
      });
    default:
      return state;
  }
};

const guestItem = (state = {}, action) => {
  switch (action.type) {
    case types.SEAT_RESERVE:
    case types.SEAT_RESERVE_SINGLE_CHAIR:
      return {
        ...state,
        isNotSeated: false,
        seat: guestItemSeat(state.seat, action)
      };
    case types.UNSEAT_RESERVE:
    case types.UNSEAT_RESERVE_SINGLE_CHAIR:
    case types.CANVAS_ITEM_REMOVE:
      return {
        ...state,
        isNotSeated: true,
        seat: guestItemSeat(state.seat, action)
      };
    default:
      return state;
  }
};

const guestItemSeat = (state = {}, action) => {
  switch(action.type) {
    case types.SEAT_RESERVE:
      return {
        itemId: action.itemId,
        seatNumber: action.seatNumber,
        position: action.position
      };
    case types.SEAT_RESERVE_SINGLE_CHAIR:
      return {
        itemId: action.itemId
      };
    case types.UNSEAT_RESERVE:
    case types.UNSEAT_RESERVE_SINGLE_CHAIR:
    case types.CANVAS_ITEM_REMOVE:
      return {};
    default:
      return state;
  }
};

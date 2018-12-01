import * as actionTypes from '../constants/actionTypes';

export const seats = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.FETCH_INITIAL_DATA:
      return {
        ...state,
        ...action.payload.seats
      };
    case actionTypes.SEAT_UPDATE:
      return {
        ...state,
        [action.itemId]: seatsTableItem(state[action.itemId], action)
      };
    case actionTypes.CANVAS_ITEM_ADD:
      if(!action.seats) {
        return state;
      }

      const itemId = action.data.id;
      return {
        ...state,
        [itemId]: { ...action.seats }
      };
    case actionTypes.CANVAS_ITEM_DUPLICATE:
      const newTableSeatings = { ...state[action.id] };
      if (Object.keys(newTableSeatings).length) {
        return {
          ...state,
          [action.newId]: newTableSeatings
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export const seatsTableItem = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.SEAT_UPDATE:
      return {
        ...state,
        [action.position]: action.seatsNumber
      };
    default:
      return state;
  }
};

export const activeSeat = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.SEAT_SELECT:
      const { seatNumber, itemId, position, seatingType } = action;
      return {
        seatNumber,
        itemId,
        position,
        seatingType
      };
    case actionTypes.SEAT_UPDATE:
      if (action.itemId === state.itemId &&
        action.position === state.position &&
        state.seatNumber > action.seatsNumber) {
        return {}
      } else {
        return state;
      }
    case actionTypes.CANVAS_ITEM_REMOVE:
      if(action.id === state.itemId) {
        return {};
      }
    default:
      return state;
  }
};





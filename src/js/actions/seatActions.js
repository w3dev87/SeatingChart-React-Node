import * as actionTypes from './../constants/actionTypes';
import * as seatingTypes from './../constants/seatingTypes';

export const reserveSeat = (seatNumber, position, itemId, guestId) => {
  return function(dispatch, getState) {
    const { reservedSeats } = getState();

    const currentGuestId = reservedSeats[itemId] && reservedSeats[itemId][position][seatNumber];
    if(currentGuestId) {
      // Seat is already occupied by another guest - Unseat first!
      dispatch(
        reserveUnseat(seatNumber, position, itemId, currentGuestId)
      );
    }

    dispatch({
      type: actionTypes.SEAT_RESERVE,
      seatNumber,
      position,
      itemId,
      guestId
    });
  }
};

export const reserveSingleChairSeat = (itemId, guestId) => {
  return function(dispatch, getState) {
    const { reservedSeats } = getState();

    const currentGuestId = reservedSeats[itemId];
    if(currentGuestId) {
      // Seat is already occupied by another guest - Unseat first!
      dispatch(
        reserveSingleChairUnseat(itemId, currentGuestId)
      );
    }

    dispatch({
      type: actionTypes.SEAT_RESERVE_SINGLE_CHAIR,
      itemId,
      guestId
    });
  }
};

export const reserveUnseat = (seatNumber, position, itemId, guestId) => {
  return {
    type: actionTypes.UNSEAT_RESERVE,
    seatNumber,
    position,
    itemId,
    guestId
  }
};

export const reserveSingleChairUnseat = (itemId, guestId) => {
  return {
    type: actionTypes.UNSEAT_RESERVE_SINGLE_CHAIR,
    itemId,
    guestId
  }
};

export const bookSeat = (seatNumber, position, itemId) => {
  return {
    type: actionTypes.SEAT_BOOK,
    seatNumber,
    position,
    itemId
  }
};

export const bookSingleChairSeat = (itemId) => {
  return {
    type: actionTypes.SEAT_BOOK_SINGLE_CHAIR,
    itemId
  }
};

export const cancelBookSeat = (seatNumber, position, itemId) => {
  return {
    type: actionTypes.SEAT_BOOK_CANCEL,
    seatNumber,
    position,
    itemId
  }
};

export const cancelBookSingleChairSeat = (itemId) => {
  return {
    type: actionTypes.SEAT_BOOK_CANCEL_SINGLE_CHAIR,
    itemId
  }
};

export const updateSeats = (seatsNumber, itemId, position) => {
  return function(dispatch, getState) {
    const { reservedSeats } = getState();
    // find out if any seat with reserved guests are removed from canvas and unseat them
    const seats = reservedSeats[itemId]? reservedSeats[itemId][position]: {};
    for (let seat in seats) {
      if(seat > seatsNumber) {
        dispatch( reserveUnseat(seat, position, itemId, seats[seat]) );
      }
    }

    dispatch({
      type: actionTypes.SEAT_UPDATE,
      itemId,
      position,
      seatsNumber
    });
  }
};

export const selectSeat = (seatNumber, itemId, position, seatingType) => {
  return {
    type: actionTypes.SEAT_SELECT,
    seatNumber,
    itemId,
    position,
    seatingType
  }
};

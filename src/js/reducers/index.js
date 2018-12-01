import { combineReducers } from 'redux';

import canvas from './canvas-reducer';
import canvasActiveItem from './canvasActiveItemReducer';
import floors from './floor-reducer';
import canvasSettings from './canvasSettingsReducer';
import reservedSeats from './reservedSeatsReducer';
import bookedSeats from './bookedSeatsReducer';
import { seats, activeSeat } from './seatsReducer';
import guestsList from './guestsListReducer';
import canvasGroup from './canvasGroups';

const rootReducer = combineReducers({
  canvas,
  canvasActiveItem,
  canvasGroup,
  floors,
  canvasSettings,
  reservedSeats,
  bookedSeats,
  seats,
  activeSeat,
  guestsList
});

export default rootReducer;

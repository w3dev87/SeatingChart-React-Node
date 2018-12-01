import * as types from '../constants/actionTypes';
import * as endpoints from '../config/endpoints';
import 'whatwg-fetch';

export function fetchInitialData() {
  let DataTransfer = require('../modules/data-transfer');
  let data = new DataTransfer({cacheName : 'seatingChartV0.2'}).getInitialAppData();

  return {
    type : types.FETCH_INITIAL_DATA,
    payload : data
  };
}

export function saveAppData(data) {
  let DataTransfer = require('../modules/data-transfer');
  new DataTransfer({cacheName : 'seatingChartV0.2'}).saveAppData(data);
  
  return {
    type : types.SAVE_DATA
    // state : data
  };
}

export const loadGuests = (guestsList) => {
  return {
    type: types.LOAD_GUESTS,
    payload: guestsList
  }
};

export const loadGuestsFromAPI = (loggedUserId) => {
  return (dispatch) => {
    return fetch(`${ endpoints.GUESTS_LIST_ENDPOINT }?uid=${ loggedUserId }`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch( loadGuests( json ) );
      })
      .catch(err => {
        console.log('Error in retrieving JSON %s', err);
      });
  };
};

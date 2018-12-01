import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
  // starts from 1 because it is a length prop of the array
  floors : 1,
  // starts from 0 because it is a position in the array
  current : 0, 
};

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {

    case types.FETCH_INITIAL_DATA :
      if(action.payload.canvas) {
        return { ...state, floors : action.payload.canvas.length};
      }
      else {
        return state;
      }


    case types.FLOOR_ADD : 
      return {...state, floors : state.floors + 1};


    case types.FLOOR_REMOVE : 
      if(state.floors > 1) return {...state, floors : state.floors - 1};
      return state;



    case types.FLOOR_CHANGE : 
      
      return {...state, current : action.floorIndex || 0};


    default :
      return state;
  }

}

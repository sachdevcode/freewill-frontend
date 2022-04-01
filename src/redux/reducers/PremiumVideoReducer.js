import { FETCH_PREMIUM_VIDEOS_SUCCESS, CLEAR_PREMIUM_VIDEOS } from '../actionTypes';
  
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
   
    case FETCH_PREMIUM_VIDEOS_SUCCESS: {
      return [...action.payload];
    }
   
    case CLEAR_PREMIUM_VIDEOS: {
      return [];
    }
  
    default:
      return state;
  }
};
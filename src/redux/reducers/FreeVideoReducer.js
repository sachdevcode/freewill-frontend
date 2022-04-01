import { FETCH_FREE_VIDEOS_SUCCESS, CLEAR_FREE_VIDEOS } from '../actionTypes';
  
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
   
    case FETCH_FREE_VIDEOS_SUCCESS: {
      return [...action.payload];
    }
   
    case CLEAR_FREE_VIDEOS: {
      return [];
    }
  
    default:
      return state;
  }
};
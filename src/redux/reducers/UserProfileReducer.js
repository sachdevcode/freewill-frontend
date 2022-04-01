  import { PAYMENT_SUBMISSION_SUCCESS, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from '../actionTypes';
  
  const initialState = {
    username:""
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
     
      case SIGN_IN_SUCCESS: {
        return { ...state, ...action.payload };
      }
      case PAYMENT_SUBMISSION_SUCCESS:{
        return { ...state, ...action.payload }
      }
     
      case SIGN_OUT_SUCCESS: {
        return { ...action.payload };
      }
    
      default:
        return state;
    }
  };
import {
  ACCOUNT_PAID,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from '../../actionTypes';

export const initialState = { paid: false };

const UserProfileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return payload;
    case SIGN_OUT_SUCCESS:
      return initialState;

    case ACCOUNT_PAID:
      return { ...state, paid: true };
    default:
      return state;
  }
};

export default UserProfileReducer;

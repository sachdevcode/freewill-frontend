import React from 'react';
import UserProfileReducer from './UserProfileReducer';
const combineReducers = (slices) => (prevState, action) =>
  // I like to use array.reduce, you can also just write a for..in loop
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action),
    }),
    prevState
  );
export const initialState = { UserProfileReducer: { paid: false } }; // some state for props a, b
export default rootReducer = combineReducers({
  UserProfileReducer,
}); // here we create the reducer slices

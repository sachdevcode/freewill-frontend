import { combineReducers } from 'redux';
import UserProfileReducer from './UserProfileReducer';
import FreeVideoReducer from './FreeVideoReducer';
import PremiumVideoReducer from './PremiumVideoReducer';

export default combineReducers({
  UserProfileReducer,
  FreeVideoReducer,
  PremiumVideoReducer,
});

import { takeLatest, all, take } from 'redux-saga/effects';

import {
  CONTACT_FORM,
  FETCH_FREE_VIDEOS,
  FETCH_PREMIUM_VIDEOS,
  PAYMENT_SUBMISSION,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from '../actionTypes';
import { contactSaga } from './ContactSaga';

import { fetchFreeVideosSaga } from './FetchFreeVideos';
import { fetchPremiumVideosSaga } from './FetchPremiumVideos';
import { paymentSaga } from './PaymentSaga';
import { signinSaga } from './SigninSaga';
import { signoutSaga } from './SignoutSaga';
import { signupSaga } from './SignupSaga';

function* actionWatcher() {
  yield takeLatest(SIGN_IN, signinSaga);
  yield takeLatest(SIGN_UP, signupSaga);
  yield takeLatest(SIGN_OUT, signoutSaga);
  yield takeLatest(FETCH_FREE_VIDEOS, fetchFreeVideosSaga);
  yield takeLatest(FETCH_PREMIUM_VIDEOS, fetchPremiumVideosSaga);
  yield takeLatest(CONTACT_FORM,contactSaga)
  yield takeLatest(PAYMENT_SUBMISSION,paymentSaga)
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}

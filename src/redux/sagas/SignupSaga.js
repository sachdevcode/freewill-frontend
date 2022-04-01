import { Alert } from 'react-native';
import { put, call, all, select } from 'redux-saga/effects';
import { API_ENDPOINTS } from '../../constant/network';
import { RestClient } from '../../network/RestClient';
import { SIGN_UP_FAILURE, SIGN_UP_SUCCESS } from '../actionTypes';
import * as NavigationService from '../../../NavigationService';

export function* signupSaga({ payload }) {
  try {
    const {
      username,
      password,
      name = 'default',
      email = 'default@default.com',
    } = payload;
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signup, {
        username: username.toLowerCase(),
        password,
        name,
        email,
      })
    );
    if (response.problem === 'NETWORK_ERROR') {
      Alert.alert('Network Error');
    }
    const {
      data: { data: res, message },
    } = response;
    if (response.data.response) {
      Alert.alert(message?.toString());
      yield put({ type: SIGN_UP_SUCCESS, payload: response.data.data });
      payload.navigate('signin');
    } else {
      Alert.alert(message?.toString());
      yield put({ type: SIGN_UP_FAILURE, payload: null });
    }
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, error });
  } finally {
  }
}

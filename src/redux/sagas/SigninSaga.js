import { Alert } from 'react-native';
import { put, call, all, select } from 'redux-saga/effects';
import { API_ENDPOINTS } from '../../constant/network';
import { RestClient } from '../../network/RestClient';
import {
  FETCH_FREE_VIDEOS,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
} from '../actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionWithoutPayload } from '../actions';

export function* signinSaga({ payload }) {
  try {
    const {
      username = '',
      password = '',
      navigation,
      savedCredentials = false,
    } = payload;
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signin, {
        username: username.toLowerCase(),
        password,
      })
    );
    if (savedCredentials) {
      yield AsyncStorage.setItem(
        '@credentials',
        JSON.stringify({
          username: payload.username || '',
          password: payload.password || '',
          savedCredentials: savedCredentials,
        })
      );
    } else {
      yield AsyncStorage.setItem('@credentials', JSON.stringify({}));
    }
    if (response.problem === 'NETWORK_ERROR') {
      Alert.alert('Network Error');
    }
    const {
      data: { data: res, message },
    } = response;
    console.log('user', response);
    if (response.data.response) {
      yield put(ActionWithoutPayload(FETCH_FREE_VIDEOS));

      RestClient.setHeader(
        'Authorization',
        `Bearer ${response?.data?.data?.token}`
      );

      yield put({ type: SIGN_IN_SUCCESS, payload: response.data.data });
      navigation.replace('BottomTab', { screen: 'waiting' });
    } else {
      Alert.alert(message?.toString());
      yield put({ type: SIGN_IN_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: SIGN_IN_FAILURE, error });
  } finally {
  }
}

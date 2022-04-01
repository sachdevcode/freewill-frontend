import { Alert } from 'react-native';
import { put, call, all, select } from 'redux-saga/effects';
import { RestClient } from '../../network/RestClient';
import { SIGN_OUT_FAILURE, SIGN_OUT_SUCCESS } from '../actionTypes';
import AsyncStorage from '@react-native-community/async-storage';

export function* signoutSaga({ payload }) {
  const { navigation } = payload;
  try {
    yield AsyncStorage.setItem('@credentials', JSON.stringify({}));
    RestClient.setHeader('Authorization', ``);

    yield put({ type: SIGN_OUT_SUCCESS, payload: null });
    navigation.replace('Auth', { screen: 'signin' });
  } catch (error) {
    yield put({ type: SIGN_OUT_FAILURE, error });
  } finally {
  }
}

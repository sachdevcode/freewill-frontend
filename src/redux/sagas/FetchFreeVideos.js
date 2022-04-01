import { Alert } from 'react-native';
import { put, call, all, select } from 'redux-saga/effects';
import { API_ENDPOINTS } from '../../constant/network';
import { RestClient } from '../../network/RestClient';
import {
  FETCH_FREE_VIDEOS_FAILURE,
  FETCH_FREE_VIDEOS_SUCCESS,
} from '../actionTypes';
import * as NavigationService from '../../../NavigationService';

export function* fetchFreeVideosSaga({ payload }) {
  try {
    const response = yield call(() =>
      RestClient.get(`${API_ENDPOINTS.video_free}`)
    );
    if (response.problem === 'NETWORK_ERROR') {
      Alert.alert('Network Error');
    }
    const {
      data: { data: res, message },
    } = response;
    console.log('videos', response);
    if (response.data.status) {
      console.log(response?.data?.data?.length,"THIS IS DATA")
      yield put({
        type: FETCH_FREE_VIDEOS_SUCCESS,
        payload: response.data.data,
      });
    } else {
      yield put({ type: FETCH_FREE_VIDEOS_FAILURE, payload: null });
    }
  } catch (error) {
    yield put({ type: FETCH_FREE_VIDEOS_FAILURE, error });
  } finally {
  }
}

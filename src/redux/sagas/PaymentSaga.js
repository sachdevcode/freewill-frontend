import { Alert } from 'react-native';
import { put, call, all, select } from 'redux-saga/effects';
import { API_ENDPOINTS } from '../../constant/network';
import { RestClient } from '../../network/RestClient';
import { PAYMENT_SUBMISSION_FAILURE, PAYMENT_SUBMISSION_SUCCESS } from '../actionTypes';
import * as NavigationService from '../../../NavigationService';
import AsyncStorage from '@react-native-community/async-storage';

export function* paymentSaga({ payload }) {
  try {
    const {
        type
    } = payload;
    
    const {UserProfileReducer} = yield select(store=>{
        return{
            UserProfileReducer:store.UserProfileReducer
        }
    });
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.payment, {
        type,
        token:UserProfileReducer.token
      })
    );
    console.log("START ",response)
    if (response.problem === 'NETWORK_ERROR') {
      Alert.alert('Network Error');
    }
    if (response.data.status) {
      Alert.alert("Payment completed");
      yield put({ type: PAYMENT_SUBMISSION_SUCCESS, payload: {...UserProfileReducer,isPaid:true}});
      payload.navigate('BottomTab',{screen:'videos'});
    } else {
      Alert.alert("Something went wrong");
      yield put({ type: PAYMENT_SUBMISSION_FAILURE, payload: null });
    }
  } catch (error) {
    yield put({ type: PAYMENT_SUBMISSION_FAILURE, error });
  } finally {
  }
}

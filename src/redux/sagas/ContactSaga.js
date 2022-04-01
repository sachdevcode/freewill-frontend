import { Alert } from 'react-native';
import { put, call, all, select } from 'redux-saga/effects';
import { API_ENDPOINTS } from '../../constant/network';
import { RestClient } from '../../network/RestClient';
import { CONTACT_FORM_FAILURE, CONTACT_FORM_SUCCESS } from '../actionTypes';
import * as NavigationService from '../../../NavigationService';
import AsyncStorage from '@react-native-community/async-storage';

export function* contactSaga({ payload }) {
  try {
    const {
      name,
      subject,
      message
    } = payload;
    
    const {UserProfileReducer} = yield select(store=>{
        return{
            UserProfileReducer:store.UserProfileReducer
        }
    });
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.contact, {
        name,
        subject,
        message,
        token:UserProfileReducer.token
      })
    );
    if (response.problem === 'NETWORK_ERROR') {
      Alert.alert('Network Error');
    }
    if (response.data.response) {
      Alert.alert("Contact form submitted");
      yield put({ type: CONTACT_FORM_SUCCESS, payload: response.data.data });
      payload.navigate('videoscreen');
    } else {
      Alert.alert("Something went wrong");
      console.log(UserProfileReducer,"res",response)
      yield put({ type: CONTACT_FORM_FAILURE, payload: null });
    }
  } catch (error) {
    yield put({ type: CONTACT_FORM_FAILURE, error });
  } finally {
  }
}

import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { Screen } from '../../components';
import { styles } from './style';

import { globalStateValue } from '../../context/GlobalState';
import { useDispatch, useSelector } from 'react-redux';
import { ActionWithoutPayload } from '../../redux/actions';
import {
  FETCH_FREE_VIDEOS,
  FETCH_PREMIUM_VIDEOS,
} from '../../redux/actionTypes';

const LogoScreen = (props) => {
  const {} = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ActionWithoutPayload(FETCH_FREE_VIDEOS));
    dispatch(ActionWithoutPayload(FETCH_PREMIUM_VIDEOS));
  }, []);
  const { UserProfileReducer } = useSelector((store) => {
    return {
      UserProfileReducer: store.UserProfileReducer,
    };
  });
  useEffect(() => {
    setTimeout(() => {
      if (UserProfileReducer?.username) {
        props.navigation.replace('BottomTab', { screen: 'contactscreen' });
      } else {
        props.navigation.replace('Auth', { screen: 'signin' });
      }
    }, 2000);
  }, []);
  return (
    <Screen>
      <View style={styles.mainContainer}>
        <View style={{ width: '100%', aspectRatio: 1 }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default LogoScreen;

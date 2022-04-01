/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Signin from './src/containers/signinscreen';
import Signup from './src/containers/signupscreen';
import WaitingScreen from './src/containers/waitingscreen';
import Logoscreen from './src/containers/logoscreen';
import ContactScreen from './src/containers/contactscreen';
import SocialScreen from './src/containers/socialscreen';
import VideoScreen from './src/containers/videoscreen';
import PaymentScreen from './src/containers/paymentscreen';
import MembershipScreen from './src/containers/membershipscreen';
import Navigator from './src/navigation';
import { Provider } from './src/context/GlobalState';
import reducer, { initialState } from './src/context/reducer';
const App = () => {
  return (
    <Provider initialState={initialState} reducer={reducer}>
      <Navigator />
    </Provider>
  );
};

export default App;
//

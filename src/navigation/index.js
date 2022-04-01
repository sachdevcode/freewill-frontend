import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from './bottomtab';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import LogoScreen from '../containers/logoscreen';
import SigninScreen from '../containers/signinscreen';
import SignupScreen from '../containers/signupscreen';
import WaitingScreen from '../containers/waitingscreen';
import ContactScreen from '../containers/contactscreen';
import SocialScreen from '../containers/socialscreen';
import VideosScreen from '../containers/videoscreen';
import MembershipScreen from '../containers/membershipscreen';
import PaymentScreen from '../containers/paymentscreen';

function Auth() {
  return (
    <Stack.Navigator
      initialRouteName={'splash'}
      screenOptions={{
        headerShown: false,
        // cardStyle: {backgroundColor: 'transparent'},
        // cardStyleInterpolator: ({current: {progress}}) => ({
        //   cardStyle: {
        //     opacity: progress.interpolate({
        //       inputRange: [0, 1],
        //       outputRange: [0, 1],
        //     }),
        //   },
        //   overlayStyle: {
        //     opacity: progress.interpolate({
        //       inputRange: [0, 1],
        //       outputRange: [0, 0.5],
        //       extrapolate: 'clamp',
        //     }),
        //   },
        // }),
      }}
    >
      <Stack.Screen name="splash" component={LogoScreen} headerShown={false} />
      <Stack.Screen name="signin" component={SigninScreen} />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        headerShown={false}
      />
    </Stack.Navigator>
  );
}

export function Homes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="waiting" component={WaitingScreen} />
      <Stack.Screen name="contact" component={ContactScreen} />
      <Stack.Screen name="social" component={SocialScreen} />
      <Stack.Screen name="videos" component={VideosScreen} />
      <Stack.Screen name="membership" component={MembershipScreen} />
      <Stack.Screen name="payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}

export function BottomTab({ style }) {
  return (
    <View
      style={[
        {
          flex: 1,
          overflow: 'hidden',
          //   borderColor: theme.bordersColor.GoldenBorder,
          // borderRadius: 7,
          elevation: 5,
        },
        style,
      ]}
    >
      <Tab.Navigator
        lazy={false}
        sceneAnimationEnabled={false}
        tabBar={(props) => <CustomBottomTab {...props} />}
        options={{
          headerShown: false,
          //   sceneAnimationEnabled: false,
        }}
      >

<Tab.Screen
          name="videos"
          component={VideosScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="waiting"
          component={WaitingScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="contact"
          component={ContactScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="social"
          component={SocialScreen}
          options={{ headerShown: false }}
        />
        {/* <Tab.Screen
          name="videos"
          component={VideosScreen}
          options={{ headerShown: false }}
        /> */}
        <Tab.Screen
          name="membership"
          component={MembershipScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="payment"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer headerMode="none">
      <Stack.Navigator sceneAnimationEnabled={false} initialRouteName={'Auth'}>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Homes"
          component={Homes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

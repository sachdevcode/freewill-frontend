import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import {
  Screen,
  InputComponent,
  AuthHeader,
  RadioButton,
  AppText,
  AuthFooter,
} from '../../components';
import { styles } from './style';
import { AppButton } from '../../components/appbutton';
import { colors } from '../../constant/theme';
import { useDispatch } from 'react-redux';
import { ActionWithPayload } from '../../redux/actions';
import { SIGN_UP } from '../../redux/actionTypes';

const SignupScreen = (props) => {
  const [state, setState] = React.useState({
    username: '',
    password: '',
    confirm_password: '',
    navigate: props.navigation.navigate,
  });
  const {} = props;
  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };
  const dispatch = useDispatch();

  const validateIsTrue = (key, message) => {
    if (!key) {
      Alert.alert(message);
      return false;
    }
    return true;
  };
  const validateFields = () => {
    return (
      validateIsTrue(state.username, 'Username is missing') &&
      validateIsTrue(state.password, 'Password is missing') &&
      validateIsTrue(state.confirm_password, 'Confirm Password is missing') &&
      validateIsTrue(
        state.password === state.confirm_password,
        'Password doesnt match'
      )
    );
  };

  const onSignUpPress = () => {
    if (validateFields()) {
      dispatch(ActionWithPayload(SIGN_UP,state))
    }
  };

  return (
    <Screen>
      <View style={styles.mainContainer}>
        <AuthHeader title="Sign up" />
        <View style={styles.textInputContainer}>
          <InputComponent
            value={state.username}
            onChangeText={(text) => handleChange('username', text)}
            placeholder="Username"
          />
        </View>
        <View style={styles.textInputContainer}>
          <InputComponent
            value={state.password}
            onChangeText={(text) => handleChange('password', text)}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <View style={styles.textInputContainer}>
          <InputComponent
            value={state.confirm_password}
            onChangeText={(text) => handleChange('confirm_password', text)}
            placeholder="Confirm Password"
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton text="Sign up" white onPress={() => onSignUpPress()} />
        </View>
        <View style={styles.footerContainer}>
          <AuthFooter
            text="Already have an account? "
            linkTitle="Sign in"
            onPress={() => props.navigation.navigate('signin')}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SignupScreen;

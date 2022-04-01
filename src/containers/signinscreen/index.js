import React, { useEffect } from 'react';
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
import { SIGN_IN, SIGN_IN_SUCCESS } from '../../context/actionTypes';
import AsyncStorage from '@react-native-community/async-storage';

const SigninScreen = (props) => {
  const [state, setState] = React.useState({
    username: '',
    isPaid:false,
    password: '',
    navigation: props.navigation,
    savedCredentials: false,
  });

const validateIsTrue = (key,message) => {
  if(!key){
    Alert.alert(message)
    return false
  }
  return true
}


const validateFields = () =>{
  return(
    validateIsTrue(state.username,"Kindly enter the username")&&
    validateIsTrue(state.password,"Kindly enter password")
  )
}

  const {} = props;
  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      AsyncStorage.getItem('@credentials').then((data) => {
        if(JSON.parse(data).username){
          setState({ ...JSON.parse(data), navigation: props.navigation });

        }
      });
    }
    fetchData()
  }, []);

  const onSignIn = () => {
    if(validateFields()){
      dispatch(ActionWithPayload(SIGN_IN, state));
    }

  };

  return (
    <Screen>
      <View style={styles.mainContainer}>
        <AuthHeader title="Login" />
        <View style={styles.textInputContainer}>
          <InputComponent
            value={state?.username}
            onChangeText={(text) => handleChange('username', text)}
            placeholder="Email"
          />
        </View>
        <View style={styles.textInputContainer}>
          <InputComponent
            value={state?.password}
            onChangeText={(text) => handleChange('password', text)}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <View style={styles.forgetPasswordContainer}>
          <TouchableOpacity
            style={styles.rememberContainer}
            activeOpacity={0.7}
            onPress={() =>
              handleChange('savedCredentials', !state?.savedCredentials)
            }
          >
            <RadioButton
              selected={state?.savedCredentials}
            />
            <AppText
              text="Remember Me"
              size={11}
              containerStyle={{ marginLeft: -5 }}
            />
          </TouchableOpacity>
          <View>
            <AppText
              size={11}
              text="Forgot Password?"
              fontColor={colors.textColors.blueText}
              containerStyle={{ paddingHorizontal: 5 }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            text="Sign in"
            white
            onPress={
              () => onSignIn()
            }
          />
        </View>
        <View style={styles.footerContainer}>
          <AuthFooter
            text="Don't have an account? "
            linkTitle="Register"
            onPress={() => props.navigation.navigate('signup')}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SigninScreen;

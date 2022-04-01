import React from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { InputComponent, AppButton, AppHeader, Screen } from '../../components';
import { ActionWithPayload } from '../../redux/actions';
import { CONTACT_FORM } from '../../redux/actionTypes';

const ContactScreen = (props) => {
  const {} = props;
  const [state, setState] = useState({
    name: '',
    subject: '',
    message: '',
  });
  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };
  const dispatch = useDispatch()
  const onContactSubmit  = props => {
    // Alert.alert("CNTAC")
    dispatch(ActionWithPayload(CONTACT_FORM,state))
  }
  return (
    <Screen>
      <View style={styles.mainContainer}>
        <AppHeader leftIcon text="Contact us" bold />
        <View style={styles.imageContainer}>
          <Image
            // resizeMode="cover"
            source={require('../../assets/images/CatImage.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={styles.textInputContainer}>
          <InputComponent
            value={state.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Name"
          />
        </View>
        <View style={styles.textInputContainer}>
          <InputComponent
            value={state.subject}
            onChangeText={(text) => handleChange('subject', text)}
            placeholder="Subject"
          />
        </View>
        <View style={styles.textAreaContainer}>
          <InputComponent
            multiline
            value={state.message}
            // selection={{start:0}}
            onChangeText={(text) => handleChange('message', text)}
            placeholder="Message"
            containerStyle={{ width: '100%', height: 150 }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton text="Sent" white  onPress={()=>onContactSubmit()}/>
        </View>
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    paddingBottom: 30,
  },
  imageContainer: {
    width: '95%',
    aspectRatio: 1.5,
    marginVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textInputContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  textAreaContainer: {
    width: '90%',
    height: 150,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  buttonContainer: {
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
  },
});
export default ContactScreen;

import React, { useState } from 'react';
import { Alert } from 'react-native';
import { View, Image, StyleSheet, BackHandler } from 'react-native';
import {
  AppButton,
  AppHeader,
  AppText,
  RadioButton,
  Screen,
} from '../../components';
import { colors } from '../../constant/theme';

const MembershipComponent = (props) => {
  const { selected, onPress, price, title, description } = props;
  return (
    <View style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
      <View
        style={{
          width: '20%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <RadioButton
          onPress={onPress}
          selected={selected}
          iconSize={12}
          iconColor={selected ? colors.selectedRed : colors.borderColors.grey}
        />
      </View>
      <View style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
        <AppText text={title} bold size={15} />
        <AppText
          text={description}
          size={8}
          containerStyle={{ width: '90%' }}
        />
      </View>
      <View
        style={{
          width: '30%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AppText
          text={`$ ${price}`}
          size={18}
          bold
          containerStyle={{ paddingRight: 5 }}
        />
      </View>
    </View>
  );
};
const PLANTYPES = [
  {
    id: 1,
    label: 'Weekly',
    price: '3.99',
    description:
      'Lorem ipsum is a placeholder text commonly used to demonstrate the visual.',
  },
  {
    id: 2,
    label: 'Monthly',
    price: '9.99',
    description:
      'Lorem ipsum is a placeholder text commonly used to demonstrate the visual.',
  },
  {
    id: 3,
    label: 'Yearly',
    price: '119.99',
    description:
      'Lorem ipsum is a placeholder text commonly used to demonstrate the visual.',
  },
];

const MembershipScreen = (props) => {
  const {} = props;
  const [state, setState] = useState({ planType: {} });

  const handleChange = (key, value) => setState({ ...state, [key]: value });

  const onPressNext = () => {
    if (state.planType.label) {
      props.navigation.navigate('payment', { planType: state.planType });
    } else {
      Alert.alert('Kindly select a plan first');
    }
  };
  return (
    <Screen>
      <View style={styles.mainContainer}>
        <AppHeader
          leftIcon
          text="Membership Plan"
          bold
          goBack={() => BackHandler.exitApp()}
        />
        <View style={styles.mainContent}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: '80%', aspectRatio: 0.9 }}
            />
          </View>
          <AppText
            text="Select a Plan"
            bold
            size={16}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              paddingBottom: 20,
            }}
          />
        </View>

        <View style={styles.membershipContainer}>
          {PLANTYPES.map((item, index) => {
            return (
              <View style={{ width: '100%', height: 70 }} key={index}>
                <MembershipComponent
                  selected={state.planType.label === item.label}
                  onPress={() => handleChange('planType', item)}
                  price={item.price}
                  title={item.label}
                  description={item.description}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <AppButton text="Next" white onPress={() => onPressNext()} />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexGrow: 1,
    alignSelf: 'center',
    paddingBottom: 30,
  },
  mainContent: {
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    //   paddingVertical:20
  },
  imageContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  membershipContainer: {
    width: '90%',
    paddingVertical: 5,
    paddingBottom: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
  },

  buttonContainer: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 20,
  },
});

export default MembershipScreen;

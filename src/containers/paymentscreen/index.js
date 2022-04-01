import React, { useState } from 'react';
import { Alert } from 'react-native';
import { View, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import {
  AppButton,
  AppHeader,
  AppText,
  InputComponent,
  PaymentModal,
  RadioButton,
  Screen,
} from '../../components';
import { colors } from '../../constant/theme';
import { ACCOUNT_PAID, SIGN_IN_SUCCESS } from '../../context/actionTypes';
import { ActionWithPayload } from '../../redux/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStateValue } from '../../context/GlobalState';
import { useDispatch } from 'react-redux';
import { PAYMENT_SUBMISSION } from '../../redux/actionTypes';

const PaymentMethodComponent = (props) => {
  const { selected, onPress, title, image } = props;
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
          selected={selected}
          iconSize={17}
          onPress={onPress}
          iconColor={selected ? 'black' : colors.borderColors.grey}
        />
      </View>
      <View style={{ width: '60%', height: '100%', justifyContent: 'center' }}>
        <AppText text={title} />
      </View>
      <View style={{ width: '20%', height: '100%', justifyContent: 'center' }}>
        <View style={{ width: 48, aspectRatio: 1.6 }}>
          <Image source={image} style={{ width: '100%', height: '100%' }} />
        </View>
      </View>
    </View>
  );
};

const InputWithLable = (props) => {
  const { text, value, placeholder, keyboardType, onChangeText } = props;
  return (
    <View style={{ width: '100%' }}>
      <AppText text={text} size={12} bold containerStyle={{ padding: 10 }} />
      <View style={{ width: '100%', height: 51 }}>
        <InputComponent
          keyboardType={keyboardType}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const PaymentScreen = (props) => {
  const [state, setState] = useState({
    paymentMethod: '',
    cardName: '',
    cardNumber: '',
    cvv: '',
    dateExpiry: '',
    isVisible: 'false',
    isTimeVisible: false,
  });
  const selectedPlanType = props?.route?.params?.planType || {};
  const handleChange = (key, value) => setState({ ...state, [key]: value });
  const onPaymentMethodSelect = (id) => {
    setState({
      ...state,
      paymentMethod: '',
      cardName: '',
      cardNumber: '',
      cvv: '',
      paymentMethod: id,
      dateExpiry: '',
    });
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
      validateIsTrue(state.paymentMethod, 'Kindly select payment method') &&
      validateIsTrue(state.cardName, 'Kindly enter card name') &&
      validateIsTrue(state.cardNumber, 'Kindly enter card number') &&
      validateIsTrue(state.dateExpiry, 'Kindly enter expiry date') &&
      validateIsTrue(
        state.cardNumber.length === 16,
        'Card number should be of 16 digits'
      ) &&
      validateIsTrue(state.cvv, 'Kindly enter security code')
    );
  };

  const onConfirmPayment = () => {
    if (!validateFields()) {
      return false;
    }
    setState({ ...state, isVisible: true });
  };

  const handleDateEntry = (e, d) => {
    setState({ ...state, dateExpiry: Date.parse(d), isTimeVisible: false });
  };
  const handleNumberInput = (key, value, maxLimit) => {
    if (isNaN(value)) {
      return setState(state);
    } else {
      if (value.length > maxLimit) {
        setState(state);
      } else {
        setState({ ...state, [key]: value.replace(' ', '') });
      }
    }
  };
  return (
    <Screen>
      <Modal visible={state.isVisible} transparent>
        <PaymentModal
          onConfirm={() => {
            dispatch(
              ActionWithPayload(PAYMENT_SUBMISSION, {
                type:selectedPlanType.id,
                navigate:props.navigation.navigate,
              })
            );
            setState({ ...state, isVisible: false });

            // props.navigation.replace('BottomTab', { screen: 'videoscreen' });

            // props.navigation.navigate('BottomTab', { screen: 'videos' });
          }}
          onCancel={() => handleChange('isVisible', false)}
        />
      </Modal>
      <View style={styles.mainContainer}>
        <AppHeader
          leftIcon
          text="Payment"
          bold
          goBack={() => props.navigation.goBack()}
        />

        <View style={styles.cardContainer}>
          <View style={styles.cardContainerItem}>
            <PaymentMethodComponent
              onPress={() => onPaymentMethodSelect('visa')}
              image={require('../../assets/images/visa.png')}
              title="Visa Card"
              selected={state.paymentMethod === 'visa'}
            />
          </View>
          <View style={styles.cardContainerItem}>
            <PaymentMethodComponent
              onPress={() => onPaymentMethodSelect('master')}
              selected={state.paymentMethod === 'master'}
              image={require('../../assets/images/mastercard.png')}
              title="Master Card"
            />
          </View>
          <View style={styles.cardContainerItem}>
            <PaymentMethodComponent
              onPress={() => onPaymentMethodSelect('paypal')}
              selected={state.paymentMethod === 'paypal'}
              image={require('../../assets/images/paypal.png')}
              title="Paypal"
            />
          </View>
        </View>
        <View style={styles.row} />
        <View style={{ width: '90%', alignSelf: 'center', marginVertical: 10 }}>
          <InputWithLable
            text="Name on Card"
            placeholder="Name"
            value={state.cardName}
            onChangeText={(text) => setState({ ...state, cardName: text })}
          />
        </View>

        <View style={{ width: '90%', alignSelf: 'center', marginVertical: 10 }}>
          <InputWithLable
            text="Card Number"
            placeholder="1234***"
            keyboardType="number-pad"
            value={state.cardNumber}
            onChangeText={(text) => handleNumberInput('cardNumber', text, 16)}
          />
        </View>
        {state.isTimeVisible ? (
          <DateTimePicker
            minimumDate={new Date()}
            mode="date"
            value={state.dateExpiry ? new Date(state.dateExpiry) : new Date()}
            onChange={(e, date) => handleDateEntry(e, date)}
          />
        ) : null}
        <View
          style={{
            width: '90%',
            paddingBottom: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
          }}
        >
          <View style={{ width: '45%', justifyContent: 'flex-end' }}>
            <AppText
              text={'Expiry Date'}
              size={12}
              bold
              containerStyle={{ padding: 10 }}
            />
            <TouchableOpacity
              style={{
                borderRadius: 8,
                width: '100%',
                height: 61,
                justifyContent: 'center',
                paddingLeft: 10,
                alignSelf: 'flex-end',
                backgroundColor: 'white',
              }}
              onPress={() => setState({ ...state, isTimeVisible: true })}
            >
              {console.log(state.dateExpiry, 'this')}
              <AppText
                text={
                  state.dateExpiry
                    ? `${new Date(state.dateExpiry).getDate()}/${new Date(
                        state.dateExpiry
                      ).getMonth()}/${new Date(state.dateExpiry).getFullYear()}`
                    : 'Expiry Date'
                }
                size={12}
                bold={false}
                fontColor={
                  state.dateExpiry ? 'black' : colors.textColors.placeholder
                }
                containerStyle={{ padding: 10 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{ width: '45%', alignSelf: 'center', marginVertical: 10 }}
          >
            <InputWithLable
              text="CVV"
              value={state.cvv}
              keyboardType="number-pad"
              onChangeText={(text) => handleNumberInput('cvv', text, 3)}
            />
          </View>
        </View>
        <View style={styles.row} />
        <AppText
          bold
          text="Selected Plan"
          size={16}
          containerStyle={{
            paddingVertical: 20,
            width: '90%',
            alignSelf: 'center',
          }}
        />

        <View style={styles.selectedPackageContainer}>
          <View style={styles.leftSelectedPackageContainer}>
            <AppText
              text="Monthly"
              bold
              size={15}
              containerStyle={{ paddingHorizontal: 5, paddingVertical: 4 }}
            />
            <AppText
              size={8}
              text="Lorem ipsum is a placeholder text commonly used to demonstrate the visual."
              containerStyle={{ paddingHorizontal: 5, paddingVertical: 2 }}
            />
          </View>
          <View style={styles.rightSelectedPackageContainer}>
            <AppText
              text={`$ ${selectedPlanType.price}`}
              fontColor={colors.selectedRed}
              bold
              size={25}
              containerStyle={{ paddingHorizontal: 5, paddingVertical: 4 }}
            />
          </View>
        </View>
        <View style={styles.selectButtonContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              height: 28,
              backgroundColor: 'white',
              width: 75,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AppText text="Change" bold size={10} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center',
            height: 40,
            backgroundColor: 'white',
          }}
        >
          <AppText
            text="Total Amount"
            size={10}
            containerStyle={{ paddingHorizontal: 20 }}
          />
          <AppText
            text={`$ ${selectedPlanType.price}`}
            size={15}
            bold
            containerStyle={{ paddingHorizontal: 20 }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton text="Pay Now" white onPress={() => onConfirmPayment()} />
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
  row: {
    height: 5,
    backgroundColor: colors.borderColors.grey,
    width: '90%',
    alignSelf: 'center',
  },
  cardContainer: {
    marginVertical: 20,
    borderRadius: 8,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  cardContainerItem: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
  },
  selectedPackageContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 53,
  },
  leftSelectedPackageContainer: {
    width: '60%',
    height: '100%',
  },
  rightSelectedPackageContainer: {
    height: '100%',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    width: '100%',
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 20,
  },
});

export default PaymentScreen;

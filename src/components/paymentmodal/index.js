import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { colors } from '../../constant/theme';
import { AppText } from '../apptext';

const PaymentModal = (props) => {
  const { onConfirm, onCancel } = props;
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.modalContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/tick.png')}
            style={{ width: 92, aspectRatio: 1 }}
          />
        </View>
        <View
          style={{ width: '100%', alignItems: 'center', paddingBottom: 20 }}
        >
          <AppText text="Are you sure?" bold size={20} />
          <AppText
            text="You want to proceed with this order?"
            size={12}
            fontColor={colors.textColors.placeholder}
          />
        </View>
        <View
          style={{
            width: '90%',
            justifyContent: 'space-between',
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => onConfirm()}
            style={{
              width: '49%',
              borderRadius: 8,
              backgroundColor: colors.primary,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: colors.primary,
              borderWidth: 1,
            }}
          >
            <AppText text="Confirm" size={14} white />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCancel}
            style={{
              width: '49%',
              borderRadius: 8,
              backgroundColor: 'white',
              height: 50,
              justifyContent: 'center',
              borderColor: colors.primary,
              borderWidth: 1,
              alignItems: 'center',
            }}
          >
            <AppText text="Cancel" size={14} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingVertical: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: 300,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { PaymentModal };

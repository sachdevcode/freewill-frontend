import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../constant/theme';
import { AppText } from '../apptext';

const AppButton = (props) => {
  const { containerStyle, onPress, activeOpacity } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.mainContainer, containerStyle]}
      activeOpacity={activeOpacity || 0.7}
    >
      <AppText {...props} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
});
export { AppButton };

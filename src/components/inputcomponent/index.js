import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../constant/theme';

const InputComponent = (props) => {
  const {
    containerStyle,
    placeholder,
    value,
    textAlignVertical,
    onChangeText,
    keyboardType,
    multiline,
    secureTextEntry,
  } = props;
  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <TextInput
        placeholder={placeholder || ''}
        textAlignVertical={textAlignVertical || 'center'}
        textAlign="left"
        multiline={multiline}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.textColors.placeholder}
        style={{ width: '100%', height: '100%', paddingHorizontal: 20,color:'black' }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 63,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export { InputComponent };

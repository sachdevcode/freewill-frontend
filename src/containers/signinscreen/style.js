import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    width: '90%',
    flexGrow: 1,
    alignSelf: 'center',
    paddingBottom: 140,
  },
  textInputContainer: {
    paddingVertical: 10,
  },
  forgetPasswordContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rememberContainer: {
    // width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  buttonContainer: {},
  footerContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 20,
  },
});

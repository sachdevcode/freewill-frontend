import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AppText } from '../apptext';

const AuthHeader = (props) => {
  const { title } = props;
  return (
    <View style={styles.mainContainer}>
      <View style={{ width: 40, aspectRatio: 1.4 }}>
        <Image
          source={require('../../assets/images/FW.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <AppText heading text={title} bold r />
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingVertical: 40,
  },
});

export { AuthHeader };

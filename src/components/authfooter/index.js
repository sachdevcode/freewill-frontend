import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, TouchableOpacity } from 'react-native';
import { colors } from '../../constant/theme';
import { AppText } from '../apptext';

const AuthFooter = (props) => {
  const { text, linkTitle, onPress } = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.imageComponent}>
          <Image
            source={require('../../assets/images/Facebook.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={styles.imageComponent}>
          <Image
            source={require('../../assets/images/Google.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <AppText
          text={text}
          size={12}
          containerStyle={{ paddingHorizontal: 5 }}
        />
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <AppText
            text={linkTitle}
            size={12}
            fontColor={colors.textColors.blueText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    height: '100%',
  },
  imageContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageComponent: {
    width: 44,
    aspectRatio: 1,
    marginHorizontal: 3,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    flexDirection: 'row',
  },
});
export { AuthFooter };

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors } from '../../constant/theme';
import { AppText } from '../apptext';
import { RadioButton } from '../radiobutton';

const SocialComponent = (props) => {
  const { imageStyles, title, selected, image, onPressIcon } = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={[{ width: 10, aspectRatio: 0.5 }, imageStyles]}
        />
      </View>
      <View style={styles.textContainer}>
        <AppText text={title} size={14} fontColor={colors.textColors.primary} />
      </View>
      <View style={styles.imageContainer}>
        <RadioButton
          iconColor={
            selected ? colors.selectedRed : colors.backgroundColors.primaryBg
          }
          iconSize={18}
          selected={selected}
          onPress={onPressIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
  },
  textContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
export { SocialComponent };

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppText } from '../apptext';

const AppHeader = (props) => {
  const { goBack, leftIcon, leftIconPress, text, fontSize } = props;
  return (
    <View style={styles.mainContainer}>
      {leftIcon && (
        <View style={styles.leftIconContainer}>
          <Icon
            name="chevron-left"
            type="entypo"
            onPress={goBack || leftIconPress}
          />
        </View>
      )}
      <View style={styles.textConainer}>
        <AppText text={text} {...props} size={fontSize || 18} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: 58,
    flexDirection: 'row',
  },
  leftIconContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  textConainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export { AppHeader };

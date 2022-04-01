import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constant/theme';

const Screen = (props) => {
  const { containerStyle, children } = props;
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.backgroundColors.primaryBg, flex: 1 }}
    >
      <ScrollView style={[styles.mainContainer, containerStyle]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    // width:'100%',
    // backgroundColor:'#F5F5F5'
  },
});

export { Screen };

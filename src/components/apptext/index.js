import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../constant/theme';

const AppText = (props) => {
  const {
    text,
    containerStyle,
    textStyle,
    bolderFont,
    heading,
    subHeading,
    paragraph,
    bolder,
    paragraph_bigger,
    white,
    black,
    primary,
    secondary,
    fontColor,
    size,
    bold,
    italic,
    underline,
    line_through,
  } = props;
  return (
    <TouchableOpacity
      style={[{}, containerStyle]}
      disabled={true}
      activeOpacity={1}
    >
      <Text

        style={[
          styles.textStyle,
          primary && { color: colors.textColors.primary },
          heading && { fontSize: 28 },
          white && { color: 'white' },
          subHeading && { fontSize: 24 },
          secondary && { color: colors.textColors.secondary },
          fontColor && { color: fontColor },
          bold && { fontWeight: 'bold' },
          bolder && { fontWeight: '900' },
          size && { fontSize: size },
          textStyle
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: colors.textColors.primary,
    fontSize: 16,
    // fontFamily:'impact'
  },
});
export { AppText };

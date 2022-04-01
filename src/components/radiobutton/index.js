import React from 'react';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

const RadioButton = (props) => {
  const { selected, onPress, iconColor, iconName, iconSize, iconType } = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        width: 40,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon
        color={iconColor || 'black'}
        //   onPress={onPress}
        size={iconSize || 14}
        name={iconName || selected ? 'dot-circle-o' : 'circle-o'}
        type={iconType || 'font-awesome'}
      />
    </TouchableOpacity>
  );
};

export { RadioButton };

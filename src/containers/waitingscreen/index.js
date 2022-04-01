import React, { useEffect } from 'react';
import { Image,Text, View } from 'react-native';
import { AppText, Screen } from '../../components';
import { colors } from '../../constant/theme';
import { styles } from './style';

var Sound = require('react-native-sound');

const WaitingScreen = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('videos');
    }, 8000);
  });
  return (
    <Screen>
      <View style={styles.textContainer}>
        <AppText
          text="Welcome to"
          fontColor="#B9B9B9"
          size={26}
          containerStyle={{ marginBottom: -5 }}
        />
        <Text
        style={{fontSize:52,fontFamily:'impact'
        ,color:colors.textColors.primary
        ,marginTop:-10,
      fontWeight:'600'
      }}
        >Free Will</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={{ width: '100%', aspectRatio: 1 }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default WaitingScreen;

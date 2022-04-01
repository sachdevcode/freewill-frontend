import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Screen,
  AppHeader,
  SocialComponent,
  AppButton,
} from '../../components';

const SocialScreen = (props) => {
  const {} = props;
  const [selected, setSeleted] = useState('');

  const onSelect = (id) => {
    if (selected === id) {
      setSeleted('');
    } else {
      setSeleted(id);
    }
  };
  return (
    <Screen>
      <View style={styles.mainContainer}>
        <AppHeader leftIcon text="Social Links" bold />
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/PeopleImage.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.socialScreenComponentContainer}>
              <SocialComponent
                image={require('../../assets/images/Facebook-2.png')}
                title="Facebook"
                onPressIcon={() => onSelect('Facebook')}
                selected={selected === 'Facebook'}
              />
            </View>
            <View style={styles.socialScreenComponentContainer}>
              <SocialComponent
                image={require('../../assets/images/Twitter-2.png')}
                title="Twitter"
                imageStyles={{ aspectRatio: 1.2 }}
                onPressIcon={() => onSelect('Twitter')}
                selected={selected === 'Twitter'}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.socialScreenComponentContainer}>
              <SocialComponent
                image={require('../../assets/images/Insta.png')}
                title="Instagram"
                onPressIcon={() => onSelect('Instagram')}
                selected={selected === 'Instagram'}
                imageStyles={{ aspectRatio: 1 }}
              />
            </View>
            <View style={styles.socialScreenComponentContainer}>
              <SocialComponent
                image={require('../../assets/images/Linkedin.png')}
                title="LinkedIn"
                imageStyles={{ aspectRatio: 1.1 }}
                onPressIcon={() => onSelect('LinkedIn')}
                selected={selected === 'LinkedIn'}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.socialScreenComponentContainer}>
              <SocialComponent
                image={require('../../assets/images/youtube.png')}
                title="Youtube"
                imageStyles={{ aspectRatio: 1.4 }}
                onPressIcon={() => onSelect('Youtube')}
                selected={selected === 'Youtube'}
              />
            </View>
            <View style={styles.socialScreenComponentContainer}>
              <SocialComponent
                image={require('../../assets/images/Tiktok.png')}
                title="Tiktok"
                imageStyles={{ aspectRatio: 0.9 }}
                onPressIcon={() => onSelect('Tiktok')}
                selected={selected === 'Tiktok'}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            text="Connect"
            white
            onPress={() => props.navigation.navigate('videos')}
          />
        </View>
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexGrow: 1,
    alignSelf: 'center',
    paddingBottom: 140,
  },
  imageContainer: {
    width: '95%',
    aspectRatio: 1.5,
    marginVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  content: {},
  socialScreenComponentContainer: {
    width: '45%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    // paddingVertical:20,
    alignSelf: 'center',
  },
});
export default SocialScreen;

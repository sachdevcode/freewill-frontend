import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import Video from 'react-native-video';
import { AppHeader, AppText, Screen } from '../../components';
import { colors } from '../../constant/theme';
import { Icon } from 'react-native-elements';
import { globalStateValue } from '../../context/GlobalState';
import VideoPlayer from 'react-native-video-player';
import { useSelector } from 'react-redux';


const VideoComponent = (props) => {
  const {
    isPlaying,
    renderToPayment,
    giveURlBack,
    selectedURI,
    setIsPlaying,
    paid,
    uri,
    keys,
    id,
  } = props;

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden',
      }}
      key={id}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: '90%',
          backgroundColor: 'RED',
          alignSelf: 'center',
        }}
        onPress={() =>
          renderToPayment
            ? props.navigation.replace('Homes', { screen: 'membership' })
            : console.log('Asd')
        }
      >
        {paid ? (
          <VideoPlayer
            video={{ uri: uri }}
            resizeMode="contain"
            onPlayPress={() => giveURlBack(uri)}
            paused={selectedURI !== uri}
            fullScreenOnLongPress
            endWithThumbnail={require('../../assets/images/CatImage.png')}
            endThumbnail={require('../../assets/images/CatImage.png')}
            thumbnail={require('../../assets/images/CatImage.png')}
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: 300,
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}
          ></View>
        )}
        {!isPlaying && (
          <TouchableOpacity
            style={{
              borderRadius: 8,
              overflow: 'hidden',
              flex: 1,
              position: 'absolute',
              justifyContent: 'center',
              marginVertical: -20,
              marginHorizontal: '-5%',
              width: '105%',
              height: 340,
              alignItems: 'center',
            }}
            activeOpacity={1}
            onPress={() =>
              renderToPayment
                ? props.navigation.replace('Homes', { screen: 'membership' })
                : console.log('Asd')
            }
          >
            {/* {paid && <Icon name="play" type="ant-design" size={40} />} */}
            {paid && (
              <TouchableOpacity
                style={{ width: '100%', height: '100%' }}
                onPress={() => giveURlBack(uri)}
              />
            )}
            {!paid && (
              <View
                style={{
                  overflow: 'hidden',
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 20,
                  left: '3.5%',
                  width: '90%',
                  height: 100,
                  width: '18%',
                  height: 40,
                }}
              >
                <Icon name="locked" type="fontisto" size={20} color="white" />
              </View>
            )}
            {!paid && (
              <View
                style={{
                  overflow: 'hidden',
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.selectedRed,
                  position: 'absolute',
                  bottom: 20,
                  left: '3.5%',
                  width: '98%',
                  height: 40,
                }}
              >
                <AppText white text="Subscribe to Play" size={14} />
              </View>
            )}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const VideoScreen = (props) => {
  
  const {

    FreeVideoReducer:FreeVideos, PremiumVideoReducer:PremiumVideos,
    UserProfileReducer,
  } = useSelector((store) => {
    return {
      UserProfileReducer: store.UserProfileReducer,
      FreeVideoReducer: store.FreeVideoReducer,
      PremiumVideoReducer: store.PremiumVideoReducer,
    };
  });

  
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setVideos(FreeVideos);
  }, [FreeVideos]);
  const handleTabChange = async (id) => {
    try {
      setLoader(true);
      if (id === 'free') {
        setVideos(FreeVideos);
        handleChange('selectedTab', 'free');
      } else {
        setVideos(PremiumVideos);
        handleChange('selectedTab', 'premium');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 500);
    }
  };
  const [state, setState] = useState({ selectedTab: 'free' });

  const handleChange = (key, value) => {
    setState({ ...state, [key]: value });
  };
  const [isPlaying, setIsPlaying] = useState('');

  const handleOnPlay = (uri) => {
    if (isPlaying !== uri) {
      setIsPlaying(uri);
    } else {
      setIsPlaying('');
    }
  };
  useEffect(
    () => {
      handleOnPlay('');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.selectedTab]
  );
  useEffect(
    () => {
      console.log(UserProfileReducer);
      setTimeout(() => {
        if (isPlaying !== '' && !UserProfileReducer.isPaid) {
          // setIsPlaying('');
          props.navigation.replace('Homes', { screen: 'membership' });
        }
      }, 15000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPlaying]
  );

  return (
    <Screen>
      <View style={styles.mainContainer}>
        <AppHeader leftIcon text="Videos" bold />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabComponent,
              state.selectedTab === 'free' && {
                borderColor: colors.selectedRed,
              },
            ]}
            onPress={() => handleTabChange('free')}
            activeOpacity={0.7}
          >
            <AppText
              text="Free Videos"
              size={14}
              color={colors.textColors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabComponent,
              state.selectedTab === 'premium' && {
                borderColor: colors.selectedRed,
              },
            ]}
            onPress={() => handleTabChange('premium')}
            activeOpacity={0.7}
          >
            <AppText
              text="Premium Videos"
              size={14}
              color={colors.textColors.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20, flexDirection: 'column' }}>
          {loader ? (
            <ActivityIndicator />
          ) : (
            videos.map((item, id) => {
              return (
                <TouchableOpacity
                  // onPress={}
                  onPress={() => {
                    console.log(UserProfileReducer.isPaid);
                    console.log(state.selectedTab);
                    if (
                      !UserProfileReducer.isPaid &&
                      state.selectedTab === 'premium'
                    ) {
                      props.navigation.replace('Homes', {
                        screen: 'membership',
                      });
                    }
                  }}
                  key={id}
                >
                  <View
                    style={{
                      width: '100%',
                      flex: 1,
                      marginVertical: 15,
                      zIndex: 999,
                    }}
                  >
                    {VideoComponent({
                      paid:
                        UserProfileReducer.isPaid ||
                        state.selectedTab !== 'premium',
                      renderToPayment:
                        !UserProfileReducer.isPaid &&
                        state.selectedTab === 'premium',
                      uri: item.uri || item.location,
                      navigation: props.navigation,
                      selectedURI: isPlaying,
                      playingURL: isPlaying,
                      giveURlBack: (uri) => setIsPlaying(uri.toString()),
                      isPlaying,
                      setIsPlaying: (uri) => handleOnPlay(uri),
                      keys: id,
                    })}
                  </View>
                  <View
                    style={{
                      height: 5,
                      width: '90%',
                      backgroundColor: colors.borderColors.grey,
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              );
            })
          )}
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
    paddingBottom: 50,
  },
  tabContainer: {
    width: '90%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    height: 50,
    alignSelf: 'center',
  },
  tabComponent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 8,
    borderColor: 'transparent',
    borderBottomWidth: 4,
  },
  backgroundVideo: {
    // backgroundColor:'red'
    borderRadius: 8,
    height: 300,
    // backgroundColor:"rgba(0,0,0,0.4)"
    // position: 'relative',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
});
export default VideoScreen;

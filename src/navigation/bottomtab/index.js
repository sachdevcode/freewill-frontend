import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { AppText } from '../../components';
import { Icon } from 'react-native-elements';
import { colors } from '../../constant/theme';
import { SvgXml } from 'react-native-svg';
import Sound from 'react-native-sound';
import { useDispatch } from 'react-redux';
import { ActionWithoutPayload, ActionWithPayload } from '../../redux/actions';
import { SIGN_OUT } from '../../redux/actionTypes';
const VideoSVG = `<svg width="24" height="23" viewBox="0 0 24 23"  xmlns="http://www.w3.org/2000/svg">
<path d="M22.0894 0H1.91062C0.871512 0 0 0.848082 0 1.93363V21.0664C0 22.118 0.837992 23 1.91062 23H22.0894C23.1285 23 24 22.1519 24 21.0664V1.93363C24 0.848082 23.1285 0 22.0894 0ZM18.2681 1.35693V11.059H5.69832V1.35693H18.2681ZM4.52514 20.0487H1.07263V16.5885H4.52514V20.0487ZM4.52514 13.1283H1.07263V9.63422H4.52514V13.1283ZM4.52514 6.17404H1.07263V2.67994H4.52514V6.17404ZM5.69832 21.6431V11.941H18.2681V21.6431H5.69832ZM22.8603 20.0487H19.4078V16.5885H22.8603V20.0487ZM22.8603 13.1283H19.4078V9.63422H22.8603V13.1283ZM22.8603 6.17404H19.4078V2.67994H22.8603V6.17404Z" fill="#C4C4C4"/>
</svg>
`;
const ContactSVG = `<svg width="23" height="24" viewBox="0 0 23 24"  xmlns="http://www.w3.org/2000/svg">
<path d="M7.25002 10.0736L7.93909 9.28609C8.52972 8.66265 8.82503 7.80953 8.75941 6.9564C8.72659 6.10328 8.33284 5.31577 7.7094 4.72515L6.52814 3.64233C5.93751 3.11733 5.18283 2.82202 4.36252 2.82202C3.44377 2.82202 2.59065 3.21577 1.96721 3.87202L1.27813 4.65953C1.1797 4.75796 1.11407 4.8564 1.01564 4.98765L0.982833 5.02046C0.326582 5.57827 -0.231235 6.9564 0.0968906 8.66265C1.60627 16.5048 8.20158 22.4767 16.175 23.1986C17.225 23.297 18.2094 23.0674 18.9313 22.608C19.2266 22.4439 19.4891 22.2142 19.7188 21.9845L20.4079 21.197C21.5891 19.8845 21.4907 17.8502 20.1782 16.6361L18.9969 15.5533C18.4063 15.0283 17.6516 14.733 16.8313 14.733C15.9125 14.733 15.0594 15.1267 14.436 15.783L13.7469 16.5705C13.4516 16.8986 13.2219 17.2923 13.0906 17.7189L13.025 17.9158L12.8281 17.8502C9.71096 16.6033 7.15159 14.2736 5.64222 11.2548L5.54376 11.058L5.77345 10.9923C6.36408 10.8283 6.85627 10.5002 7.25002 10.0736Z" fill="#C4C4C4"/>
<path d="M11.1875 0.754684C11.1875 1.18125 11.5156 1.50937 11.9422 1.50937C17.1922 1.50937 21.4906 5.80782 21.4906 11.0578C21.4906 11.4844 21.8188 11.8125 22.2453 11.8125C22.6719 11.8125 23 11.4844 23 11.0578C23 4.95469 18.0453 0 11.9422 0C11.5156 0 11.1875 0.360934 11.1875 0.754684Z" fill="#C4C4C4"/>
<path d="M11.089 4.42977C11.089 4.85633 11.4171 5.18445 11.8437 5.18445C15.1577 5.18445 17.8484 7.87508 17.8484 11.1891C17.8484 11.6157 18.1765 11.9438 18.6031 11.9438C19.0296 11.9438 19.3578 11.6157 19.3578 11.1891C19.3578 7.05477 16.0109 3.70789 11.8765 3.70789C11.4171 3.67508 11.089 4.03602 11.089 4.42977Z" fill="#C4C4C4"/>
</svg>
`;
const ConnectSVG = `<svg width="21" height="25" viewBox="0 0 21 25"  xmlns="http://www.w3.org/2000/svg">
<path d="M14.493 7.36926C15.169 7.76545 15.9296 8.00317 16.7746 8.00317C19.0986 8.00317 21 6.22029 21 4.00159C21 1.78289 19.0986 0 16.7746 0C14.4507 0 12.5493 1.78289 12.5493 4.00159C12.5493 4.35816 12.5916 4.71474 12.7183 5.07132L10.1831 6.73534L6.21126 9.38986C5.61971 9.0729 4.94366 8.91442 4.22535 8.91442C1.90141 8.91442 0 10.6973 0 12.916C0 15.1347 1.90141 16.9176 4.22535 16.9176C5.23944 16.9176 6.16901 16.6006 6.88732 16.046L10.1831 18.2647L12.7183 19.9287C12.6338 20.2853 12.5493 20.6418 12.5493 20.9984C12.5493 23.2171 14.4507 25 16.7746 25C19.0986 25 21 23.2171 21 20.9984C21 18.7797 19.0986 16.9968 16.7746 16.9968C15.9296 16.9968 15.1268 17.2345 14.493 17.6307L10.9014 15.2139L8.40845 13.5499C8.4507 13.3518 8.45071 13.1141 8.45071 12.916C8.45071 12.4406 8.3662 11.9651 8.19718 11.5293L10.9014 9.70681L14.493 7.36926ZM8.19718 14.2235L10.5211 15.7686L13.9437 18.0666C13.5211 18.4231 13.1831 18.859 12.9296 19.374L10.5211 17.7892L7.35211 15.6498C7.73239 15.2139 8.02817 14.7385 8.19718 14.2235ZM7.9014 11.0143C7.60563 10.5388 7.22535 10.103 6.76057 9.78606L10.5211 7.29002L12.9296 5.70523C13.1831 6.22029 13.5211 6.65611 13.9437 7.01268L10.5211 9.31062L7.9014 11.0143Z" fill="#C4C4C4"/>
</svg>`;
const CustomBottomTab = (props) => {
  let { state } = props;
  const [canBeClicked, setCanBeClicked] = useState(true);
  const [isState, setState] = useState({
    selected: 'myprofile',

    bottomTab: [
      {
        text: 'Contact',
        nav: 'contact',
        iconName: 'phone',
        iconType: 'font-awesome',
        svg: ContactSVG,
      },
      {
        text: 'Videos',
        nav: 'videos',
        iconName: 'image',
        svg: VideoSVG,
        iconType: 'entypo',
      },

      {
        text: 'Connect',
        nav: 'social',
        iconName: 'share-social-outline',
        svg: ConnectSVG,
        iconType: 'IonIcons',
      },
      {
        text: 'Logout',
        nav: 'logout',
        iconName: 'logout',
        iconType: 'ant-design',
      },
    ],
  });
  let isFocused = 'home';
  useEffect(() => {
    if (isFocused === 'waiting') {
      setCanBeClicked(false);
      var whoosh = new Sound(
        'videoplayback.wav',
        Sound.MAIN_BUNDLE,
        (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          whoosh.play((success) => {});
          whoosh.setVolume(1);
          whoosh.setPan(1);
          whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));
        }
      );
      setTimeout(() => {
        whoosh.stop();
        setCanBeClicked(true);
      }, 8000);
    }
  }, [isFocused]);
  state.routes.map((index, i) => {
    if (i == state.index) {
      isFocused = index.name;
    }
  });
  const dispatch = useDispatch();
  return (
    <View
      style={{
        overflow: 'hidden',
        backgroundColor: colors.backgroundColors.primaryBg,
      }}
    >
      <View
        style={{
          height: 60,
          width: '100%',
          flexDirection: 'row',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          overflow: 'hidden',
          borderColor: 'rgba(0,0,0,0.6)',
        }}
      >
        {isState.bottomTab.map((item, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                i === 3 && canBeClicked
                  ? dispatch(
                      ActionWithPayload(SIGN_OUT, {
                        navigation: props.navigation,
                      })
                    )
                  : item.nav &&
                    canBeClicked &&
                    props.navigation.navigate('BottomTab', {
                      screen: item.nav,
                    });
                setState({ ...isState, selected: i });
              }}
              activeOpacity={0.7}
              key={i}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '20%',
              }}
            >
              <View
                style={{
                  height: 30,
                  width: 45,
                  borderRadius: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: null,
                }}
              >
                {item.svg ? (
                  <SvgXml
                    color="red"
                    fill="red"
                    xml={item.svg}
                    width={16}
                    height={16}
                  />
                ) : (
                  <Icon
                    name={item.iconName || 'search'}
                    type={item.iconType || 'Entypo'}
                    size={16}
                    color={
                      isFocused === item.nav
                        ? colors.selectedRed
                        : colors.borderColors.grey
                    }
                  />
                )}
              </View>
              <AppText
                size={10}
                fontColor={
                  isFocused === item.nav ? 'black' : colors.borderColors.grey
                }
                text={item.text}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default CustomBottomTab;

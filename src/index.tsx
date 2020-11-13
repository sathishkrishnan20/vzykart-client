// @ts-nocheck
import React from 'react';
import {AppRegistry, Platform, View, StyleSheet} from 'react-native';
import {ThemeProvider, Text} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {Routes} from './routes';
import AntDesign from 'react-native-vector-icons/Fonts/AntDesign.ttf';
import Entypo from 'react-native-vector-icons/Fonts/Entypo.ttf';
import EvilIcons from 'react-native-vector-icons/Fonts/EvilIcons.ttf';
import Feather from 'react-native-vector-icons/Fonts/Feather.ttf';
import FontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import Ionicons from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import Foundation from 'react-native-vector-icons/Fonts/Foundation.ttf';
import MaterialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import MaterialCommunityIcons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import SimpleLineIcons from 'react-native-vector-icons/Fonts/SimpleLineIcons.ttf';
import Octicons from 'react-native-vector-icons/Fonts/Octicons.ttf';
import Zocial from 'react-native-vector-icons/Fonts/Zocial.ttf';
import Fontisto from 'react-native-vector-icons/Fonts/Fontisto.ttf';

const fonts = [
  {url: AntDesign, fontFamilyName: 'AntDesign'},
  {url: Entypo, fontFamilyName: 'Entypo'},
  {url: EvilIcons, fontFamilyName: 'EvilIcons'},
  {url: Feather, fontFamilyName: 'Feather'},
  {url: FontAwesome, fontFamilyName: 'FontAwesome'},
  {url: Foundation, fontFamilyName: 'Foundation'},
  {url: Ionicons, fontFamilyName: 'Ionicons'},
  {url: MaterialIcons, fontFamilyName: 'MaterialIcons'},
  {url: MaterialCommunityIcons, fontFamilyName: 'MaterialCommunityIcons'},
  {url: SimpleLineIcons, fontFamilyName: 'SimpleLineIcons'},
  {url: Octicons, fontFamilyName: 'Octicons'},
  {url: Zocial, fontFamilyName: 'Zocial'},
  {url: Fontisto, fontFamilyName: 'Fontisto'},
];
const antDesignIconFontStyles = [];
const commonTheme = {
  Text: {
    style: {
      fontFamily: 'Helvetica-Light',
    },
  },
  Button: {
    buttonStyle: {
      fontFamily: 'Helvetica-Light',
      backgroundColor: '#F34742',
      borderWidth: 1,
      borderRadius: 10,
    },
    containerStyle: {
      margin: 4,
    },
  },
};
const colors = {
  white: '#FFF',
  blazeOrange: '#FE6301',
  mantis: '#69C779',
  alto: '#D8D8D8',
  dustyGray: '#979797',
  lightSkyBlue: '#87CEFA',
};
const HEIGHT = 60;
const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    height: HEIGHT,
    width: '90%',
    borderRadius: 6,
    backgroundColor: colors.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  borderLeft: {
    borderLeftWidth: 5,
    borderLeftColor: colors.alto,
  },
  iconContainer: {
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  closeButtonContainer: {
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 9,
    height: 9,
  },
  text1: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    color: colors.white,
  },
  text2: {
    fontSize: 10,
    color: colors.dustyGray,
  },
});

export function App() {
  return (
    <ThemeProvider theme={commonTheme}>
      <Routes />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ThemeProvider>
  );
}

AppRegistry.registerComponent('example', () => App);
if (Platform.OS === 'web') {
  for (var i = 0; i < fonts.length; i++) {
    const iconFontStyles = `@font-face {
    src: url(${fonts[i].url}) format('truetype');
    font-family: ${fonts[i].fontFamilyName};
  }`;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(iconFontStyles));
    document.head.appendChild(style);
  }
  var head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'style.css';
  head.appendChild(link);

  // const style = document.createElement('style');
  // style.type = 'text/css';
  // style.appendChild(document.createTextNode(antDesignIconFontStyles));
  // document.head.appendChild(style);

  AppRegistry.runApplication('example', {
    rootTag: document.getElementById('root'),
  });
}

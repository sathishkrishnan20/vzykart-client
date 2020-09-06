// @ts-nocheck
import React from 'react';
import {AppRegistry, Platform} from 'react-native';

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

export function App() {
  return <Routes />;
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
  // const style = document.createElement('style');
  // style.type = 'text/css';
  // style.appendChild(document.createTextNode(antDesignIconFontStyles));
  // document.head.appendChild(style);

  AppRegistry.runApplication('example', {
    rootTag: document.getElementById('root'),
  });
}

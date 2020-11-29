// @ts-nocheck
import React from 'react';
import {
  AppRegistry,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './routes/store';
import {ThemeProvider} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {Routes} from './routes';
import {WHATSAPP_NUMBER} from './config';
import {Icon} from 'react-native-elements';

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
import Helvetica from './assets/fonts/Helvetica-Light.ttf';
import {MenuProvider} from 'react-native-popup-menu';
import {ToastContainer} from 'react-toastify';
import {IS_WEB} from './config';
import colors from './colors';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings([
  'scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.',
]);
console.disableYellowBox = true;

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
  {url: Helvetica, fontFamilyName: 'Helvetica'},
];

const commonTheme = {
  colors: {
    primary: colors.primary,
  },
  Text: {
    style: {
      fontFamily: 'Helvetica-Light',
      color: colors.textGray,
    },
  },
  Button: {
    buttonStyle: {
      fontFamily: 'Helvetica-Light',
      backgroundColor: colors.buttonColor,
      borderColor: colors.themeGradient[1],
      borderWidth: 1,
      borderRadius: 10,
    },
    containerStyle: {
      margin: 4,
    },
  },
};

export function App() {
  const message = `Please Fill the Below Details and Send it with us, \n\nProducts: \nQuantity: \nSellerName if Specific `;
  const openWhatsApp = () => {
    Linking.openURL(`whatsapp://send?text=${message}&phone=${WHATSAPP_NUMBER}`);
  };
  return (
    <Provider store={store} key="provider">
      <MenuProvider>
        <ThemeProvider theme={commonTheme}>
          <Routes />
          {IS_WEB ? (
            <div
              style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                bottom: 20,
                right: 20,
                width: 80,
                height: 80,
                backgroundColor: 'transparent',
                borderRadius: 100,
              }}>
              <a
                style={{textDecoration: 'none'}}
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${message}`}>
                <Icon
                  raised
                  size={35}
                  style={{alignSelf: 'center', justifyContent: 'center'}}
                  reverse
                  name="logo-whatsapp"
                  type="ionicon"
                  color="#23D755"
                />
              </a>
            </div>
          ) : (
            <TouchableOpacity
              onPress={() => openWhatsApp()}
              style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                width: 65,
                position: 'absolute',
                bottom: 60,
                right: 10,
                height: 65,
                backgroundColor: '#fff',
                borderRadius: 100,
              }}>
              <Icon
                raised
                reverse
                name="logo-whatsapp"
                type="ionicon"
                color="#23D755"
              />
            </TouchableOpacity>
          )}

          {IS_WEB ? (
            <ToastContainer containerId="toastId" />
          ) : (
            <Toast ref={(ref) => Toast.setRef(ref)} />
          )}
        </ThemeProvider>
      </MenuProvider>
    </Provider>
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
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.type = 'text/javascript';
  var code = '';
  script.appendChild(document.createTextNode(code));
  document.body.appendChild(script);

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

const styles = StyleSheet.create({
  fabWhatsApp: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 60,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

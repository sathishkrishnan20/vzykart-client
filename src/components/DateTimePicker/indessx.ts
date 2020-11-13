import {Platform, StyleSheet} from 'react-native';
const Component = Platform.select({
  ios: () => require('./picker.android'),
  android: () => require('./picker.android'),
  web: () => require('./picker.web'),
});

// const Component = Platform.select({
//   ios: () => require('./picker.android'),
//   android: () => require('./picker.android'),
//   web: () => require('./picker.web')
// })();

export default Component;

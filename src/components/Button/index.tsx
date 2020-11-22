import React from 'react';
import {View, StyleProp, TextStyle} from 'react-native';
import colors from '../../colors';
import {IS_WEB} from '../../config';
import {Button as RNButton, ButtonProps} from 'react-native-elements';
import {TouchableHighlight} from 'react-native-gesture-handler';
class Touchable extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <TouchableHighlight
        {...this.props}
        underlayColor="rgba(73,182,77,1,0.9)"
      />
    );
  }
}
export const Button = (props: ButtonProps) => {
  return <RNButton {...props} TouchableComponent={Touchable} />;
};

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IS_WEB, IS_IOS} from '../../config';
import {Button as RNButton, ButtonProps} from 'react-native-elements';
import {TouchableHighlight} from 'react-native-gesture-handler';
import colors from '../../colors';
class Touchable extends React.Component {
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
  return (
    <RNButton
      {...props}
      TouchableComponent={IS_WEB || IS_IOS ? TouchableOpacity : Touchable}
    />
  );
};

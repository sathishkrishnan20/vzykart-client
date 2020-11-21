import React, {ReactNode, CSSProperties} from 'react';
import {View, RegisteredStyle, ViewStyle, StyleProp} from 'react-native';
import {styles} from './styles';

type Props = {
  children: ReactNode | ReactNode[];
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

export function Container({children, testID, style = {}}: Props) {
  return (
    <View style={[styles.center, style]} testID={testID}>
      {children}
    </View>
  );
}

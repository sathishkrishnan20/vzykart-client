import React from 'react';
import {View, StyleProp, TextStyle} from 'react-native';
import colors from '../../colors';
import {IS_WEB} from '../../config';
import {Text} from 'react-native-elements';

export const SectionTitle = ({
  title,
  textStyle = {},
}: {
  title: string;
  textStyle?: StyleProp<TextStyle>;
}) => {
  return (
    <View
      style={{
        backgroundColor: colors.themePrimary,
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        margin: IS_WEB ? 8 : 4,
        marginBottom: IS_WEB ? 0 : -2,
      }}>
      <Text
        style={[
          textStyle,
          {
            fontSize: IS_WEB ? 18 : 14,
            color: colors.white,
            justifyContent: 'center',
            alignSelf: 'center',
            fontWeight: 'bold',
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

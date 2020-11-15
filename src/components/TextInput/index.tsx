import React, {useState, useContext} from 'react';
import {
  Input as RNEInput,
  ThemeContext,
  InputProps,
} from 'react-native-elements';
import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';
interface InputCustomProps extends InputProps {
  password: boolean;
  borderBottomColor?: string;
}

export function Input(props: InputCustomProps) {
  const [focused, setFocused] = useState(false);
  const [showPasswordText, togglePasswordText] = useState(false);
  const {theme} = useContext(ThemeContext);

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  const primaryColor = props.borderBottomColor || theme.colors?.primary;

  const inputContainerStyle = {
    ...(props.inputContainerStyle as Object),
    ...(focused
      ? {borderColor: primaryColor}
      : {borderBottomColor: props.borderBottomColor}),
  };

  const labelStyle = {
    ...(props.labelStyle as Object),
    ...(focused ? {color: primaryColor} : {}),
  };

  const leftIcon = {
    ...(props.leftIcon as Object),
    ...(focused ? {color: primaryColor} : {}),
  };

  let rightIcon = {
    ...(props.rightIcon as Object),
    ...(focused ? {color: primaryColor} : {}),
  };

  if (props.password) {
    let passwordToggler = {
      type: 'ionicon',
      name: showPasswordText ? 'ios-eye' : 'ios-eye-off',
      onPress: () => togglePasswordText(!showPasswordText),
      containerStyle: {marginRight: 10},
      underlayColor: 'transparent',
    };

    rightIcon = {
      ...rightIcon,
      ...passwordToggler,
    };
  }

  return (
    <RNEInput
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      style={[{padding: 4}, props.style]}
      inputContainerStyle={inputContainerStyle}
      labelStyle={labelStyle}
    />
  );
}

Input.defaultProps = {
  onFocus: () => null,
  onBlur: () => null,
  leftIcon: {},
  rightIcon: {},
  labelStyle: {},
  password: false,
  borderBottomColor: '#E0E1E4',
};

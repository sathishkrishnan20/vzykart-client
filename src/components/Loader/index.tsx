import React from 'react';
import {ActivityIndicator} from 'react-native';

export const Loader = ({visible}: {visible: boolean}) => {
  return visible ? <ActivityIndicator /> : null;
};

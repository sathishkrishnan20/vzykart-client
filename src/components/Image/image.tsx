import React from 'react';
import {Image as ImageRN, ImageProps} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';

const Image = (props: ImageProps) => {
  return <ImageRN {...props} PlaceholderContent={<ActivityIndicator />} />;
};

export default Image;

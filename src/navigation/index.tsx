// import {StackParams} from '../index';
import {useNavigation as useNavigationR} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {useHistory} from 'react-router-dom';
import {ComponentProp} from '../interfaces';
// type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

const useNavigation = Platform.OS === 'web' ? useHistory : useNavigationR;
const navigate = (navigation: any, routeName: string, params: any = {}) => {
  Platform.OS === 'web'
    ? navigation.push(routeName)
    : navigation.navigate(routeName, params);
};
const navigateByProp = (
  props: ComponentProp,
  routeName: string,
  params: any = {},
  customRouteMobile?: string,
) => {
  Platform.OS === 'web'
    ? props.history.replace(routeName)
    : props.navigation.navigate(customRouteMobile || routeName, params);
};

const getParamsByProp = (props: ComponentProp): any => {
  if (Platform.OS === 'web') {
    const {
      match: {params},
    } = props;
    return params || {};
  } else {
    return (props.route && props.route.params) || {};
  }
};

export {useNavigation, navigate, navigateByProp, getParamsByProp};

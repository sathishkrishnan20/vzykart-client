// import {StackParams} from '../index';
import {useNavigation as useNavigationR} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {useHistory} from 'react-router-dom';
// type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

const useNavigation = Platform.OS === 'web' ? useHistory : useNavigationR;
const navigate = (navigation: any, routeName: string, params: any = {}) => {
  Platform.OS === 'web'
    ? navigation.push(routeName)
    : navigation.navigate(routeName, params);
};
const navigateByProp = (
  props: any,
  routeName: string,
  params: any = {},
  customRouteMobile?: string,
) => {
  Platform.OS === 'web'
    ? props.history.push(routeName)
    : props.navigation.navigate(customRouteMobile || routeName, params);
};

const getParamsByProp = (props: any) => {
  if (Platform.OS === 'web') {
    const {
      match: {params},
    } = props;
    return params;
  } else {
    return props.navigation.state && props.navigation.state.params;
  }
};

export {useNavigation, navigate, navigateByProp, getParamsByProp};

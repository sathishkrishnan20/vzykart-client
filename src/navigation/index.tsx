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

export {useNavigation, navigate};

import {RouteComponentProps} from 'react-router-dom';
import {StackScreenProps} from '@react-navigation/stack';
export interface ComponentProp
  extends RouteComponentProps,
    StackScreenProps<any, any> {}

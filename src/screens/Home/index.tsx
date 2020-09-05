import React from 'react';
import {Text, Button} from 'react-native';
import {StackParams} from '../../navigation';
import {Container} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/AntDesign';
type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

export function Home() {
  const {navigate} = useNavigation<NavigationProps>();
  return (
    <Container>
      <Text>Home Screen</Text>
      {/* @ts-ignore */}
      {/* <Icon style={{fontSize: 56}} name="closecircle"></Icon> */}
      <Button
        testID="details"
        title="Go to Details"
        onPress={() => navigate('Details', {data: '🤪'})}
      />
    </Container>
  );
}

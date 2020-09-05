import React from 'react';
import {Text, Button} from 'react-native';
import {Container} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, navigate} from '../../navigation';

export function Home() {
  // @ts-ignore
  const navigation = useNavigation();
  return (
    <Container>
      <Text>Home Screen</Text>
      {/* @ts-ignore */}
      <Icon style={{fontSize: 56}} name="closecircle"></Icon>
      <FontAwesome style={{fontSize: 56}} name="clock-o"></FontAwesome>
      <Button
        testID="details"
        title="Go to Details"
        onPress={() => {
          navigate(navigation, 'Details');
        }}
      />
    </Container>
  );
}

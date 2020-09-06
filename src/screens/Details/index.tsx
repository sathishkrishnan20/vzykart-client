import React from 'react';
import {Text, Button} from 'react-native';
import {Container} from '../../components';
import {useNavigation, navigate} from '../../navigation';

export function Details() {
  // @ts-ignore
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Details Screen</Text>
      {/* <Text>Data passed: {params?.data}</Text> */}
      <Button
        testID="again"
        title="Go to Details... again"
        onPress={() => navigate(navigation, 'DetailsScreen')}
      />
      <Button
        testID="home"
        title="Go to Home"
        onPress={() => navigate(navigation, 'Home')}
      />
      <Button testID="back" title="Go back" onPress={() => {}} />
      <Button
        testID="first"
        title="Go back to first screen in stack"
        onPress={() => {}}
      />
    </Container>
  );
}

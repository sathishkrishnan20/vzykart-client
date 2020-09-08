import React, {useEffect} from 'react';
import {Container} from '../../components';
import {useNavigation} from '../../navigation';

import {ShopHeader} from './shop-header';
import {Product} from './product';
import {FlatList} from 'react-native-gesture-handler';
import {keyExtractor} from '../../helpers/render-helpers';
import {Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';
export function ShopDetails() {
  // @ts-ignore
  const navigation = useNavigation();
  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return (
    <Container>
      <ShopHeader />
      <FlatList
        data={[1, 2, 3]}
        ListHeaderComponent={() => (
          <Text style={styles.headerText}> Products </Text>
        )}
        keyExtractor={keyExtractor}
        renderItem={({item}) => <Product data={item} />}
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  headerText: {
    margin: 4,
    fontSize: 24,
  },
});

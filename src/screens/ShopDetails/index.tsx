import React, {useEffect} from 'react';
import {Container} from '../../components';
import {useNavigation} from '../../navigation';

import {ShopHeader} from './shop-header';
import {Product} from '../Products/product';
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
      {/* <FlatList
        data={[
          {
            productName: 'Hamam Soap',
            productDescription: 'the Bathroom Soap',
            price: 100,
            rupeeSymbol: 'RS',
            catagories: ['Soap', 'Bathroom Soap'],
            reviews: [],
            ratings: 5,
            imageUrl:
              'https://images-na.ssl-images-amazon.com/images/I/41eCbvCrlPL._SX425_.jpg',
          },
          {
            productName: 'Nan Pro3',
            productDescription: 'for babies',
            price: 600,
            rupeeSymbol: 'RS',
            catagories: ['Children', 'Health Care products'],
            reviews: [],
            ratings: 4,
            imageUrl:
              'https://cdn.fcglcdn.com/brainbees/images/products/720x720/2322763a.jpg',
          },
        ]}
        ListHeaderComponent={() => (
          <Text style={styles.headerText}> Products </Text>
        )}
        keyExtractor={keyExtractor}
        renderItem={({item}) => <Product navigation={navigation} data={item} />}
      /> */}
    </Container>
  );
}
const styles = StyleSheet.create({
  headerText: {
    margin: 4,
    fontSize: 24,
  },
});

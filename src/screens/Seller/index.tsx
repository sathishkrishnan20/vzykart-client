import React, {useEffect} from 'react';
import {Container} from '../../components';

import {SellerHeader} from './shop-header';

export function SellerDetails() {
  // @ts-ignore
  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return (
    <Container>
      <SellerHeader />
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

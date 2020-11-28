import React, {useEffect, useState} from 'react';
import {Card, Text, withBadge} from 'react-native-elements';
import {Button} from '../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlatList, View, Dimensions, StyleSheet} from 'react-native';
import {keyExtractor} from '../../../helpers/render-helpers';
import {
  getImageLink,
  updateCartOnStorageByProductId,
  getCartItemCountByProductId,
} from '../../../helpers';
import colors from '../../../colors';
import {SectionTitle} from '../../../components/Section-Title';
import Image from '../../../components/Image/image';
import {IS_BIG_SCREEN} from '../../../config';
import {Row} from 'react-native-easy-grid';
import ProductAction from '../../../actions/products';
import {IProduct} from '../../../interfaces/products';
import {ProductCard} from './product-card';

const productAction = new ProductAction();

export function TopProducts() {
  const [products, setProducts] = useState([] as IProduct[]);
  const [refreshCount, setRefreshCount] = useState(0);
  useEffect(() => {
    getTopProductList();
  }, []);
  const getTopProductList = async () => {
    const productData = await productAction.getProductsByFilters({});
    if (productData.success) {
      setProducts(productData.data);
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const marginWidth = 12;
  const rowCount = Math.floor(Dimensions.get('window').width / 250);
  const cardSize = Math.ceil(
    (screenWidth - (rowCount * marginWidth + marginWidth)) / rowCount,
  );

  return (
    <View style={{margin: 12}}>
      <SectionTitle
        backgroundStyle={{backgroundColor: colors.white}}
        textStyle={{color: colors.black}}
        title={'Shop by Top Products'}
      />
      <FlatList
        data={products}
        extraData={[refreshCount]}
        numColumns={rowCount}
        keyExtractor={keyExtractor}
        renderItem={({item}) => (
          <ProductCard
            refreshCount={refreshCount}
            onClickAddToCart={async (productId: string) => {
              console.log('Updating Product Cart');
              await updateCartOnStorageByProductId(productId);
              setRefreshCount(refreshCount + 1);
            }}
            item={item}
            cardSize={cardSize}
          />
        )}
      />
    </View>
  );
}

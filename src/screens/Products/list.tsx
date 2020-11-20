import React, {useState, useEffect} from 'react';
import {Container} from '../../components';
import {FlatList} from 'react-native-gesture-handler';
import {keyExtractor} from '../../helpers/render-helpers';
import {Product} from './product';
import {IS_WEB} from '../../config';
import {IProduct} from '../../interfaces/products';
import {useNavigation, navigate, getParamsByProp} from '../../navigation';
import ROUTE_NAMES from '../../routes/name';
import ProductAction from '../../actions/products';
import {ComponentProp} from '../../interfaces';
import {getCartItem} from '../../services/storage-service';
import {ICartItem} from '../../interfaces/classes/cart';
export function ProductList(props: ComponentProp) {
  const [productData, setProductData] = useState([] as IProduct[]);
  const [cartProducts, setCartProducts] = useState([] as ICartItem[]);

  const [isLoading, setIsLoading] = useState(false);
  const productAction = new ProductAction();
  // @ts-ignore
  const navigation = useNavigation();
  useEffect(() => {
    const params = getParamsByProp(props);
    getProductDataBySellerId(params.sellerId);
    getCartItem().then((cartData) => setCartProducts(cartData));
  }, []);

  const getProductDataBySellerId = async (sellerId: string) => {
    setIsLoading(true);

    const productResponse = await productAction.getProductsBySellerId(sellerId);
    setIsLoading(true);
    if (productResponse.success) {
      setProductData(productResponse.data);
    }
    setIsLoading(false);
  };
  const navigateToProductDetailPage = (productId: string) => {
    navigate(
      navigation,
      ROUTE_NAMES.productListBySellerId.replace(':productId', productId),
      {sellerId: productId},
    );
  };
  return (
    <Container>
      <FlatList
        data={productData}
        //   ListHeaderComponent={() => (
        //     <Text style={styles.headerText}> Products </Text>
        //   )}
        numColumns={IS_WEB ? 2 : 1}
        keyExtractor={keyExtractor}
        renderItem={({item}) => (
          <Product
            cartProducts={cartProducts}
            onClickProduct={(productId: string) =>
              navigateToProductDetailPage(productId)
            }
            productInfo={item}
          />
        )}
      />
    </Container>
  );
}

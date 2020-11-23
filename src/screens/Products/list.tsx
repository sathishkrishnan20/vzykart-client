import React, {useState, useEffect} from 'react';
import {Container} from '../../components';
import {FlatList} from 'react-native-gesture-handler';
import {keyExtractor} from '../../helpers/render-helpers';
import {updateCartDataOnStorage} from '../../helpers';
import {Product} from './product';
import {IS_BIG_SCREEN} from '../../config';
import {IProduct} from '../../interfaces/products';
import {
  useNavigation,
  navigate,
  getParamsByProp,
  navigateToCheckoutPage,
} from '../../navigation';
import ROUTE_NAMES from '../../routes/name';
import ProductAction from '../../actions/products';
import {ComponentProp} from '../../interfaces';
import {getCartItem} from '../../services/storage-service';
import {ICartItem, ProductAndCart} from '../../interfaces/classes/cart';
import {Loader} from '../../components/Loader';
export function ProductList(props: ComponentProp) {
  const [productData, setProductData] = useState([] as IProduct[]);
  const [cartProducts, setCartProducts] = useState([] as ICartItem[]);
  const [cartQtyRefreshCount, setCartQtyRefreshCount] = useState(1);

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

  const updateCartProducts = (productId: string) => {
    const index = cartProducts.findIndex(
      (item) => item.productId === productId,
    );
    if (index === -1) {
      cartProducts.push({
        productId,
        quantity: 1,
        checked: 1,
      });
    }
    setCartProducts(cartProducts);
    setCartQtyRefreshCount(cartQtyRefreshCount + 1);
    return cartProducts;
  };
  const onClickBuy = (productInfo: IProduct, productId: string) => {
    const cartItems = updateCartProducts(productId);
    const productAndCartData: ProductAndCart = {
      ...productInfo,
      ...(cartItems.find((item) => item.productId === productId) as ICartItem),
    };
    navigateToCheckoutPage(props, [productAndCartData]);
  };
  return (
    <Container>
      <Loader visible={isLoading} />

      <FlatList
        data={productData}
        //   ListHeaderComponent={() => (
        //     <Text style={styles.headerText}> Products </Text>
        //   )}
        numColumns={IS_BIG_SCREEN ? 2 : 1}
        keyExtractor={keyExtractor}
        renderItem={({item}) => (
          <Product
            cartQtyRefreshCount={cartQtyRefreshCount}
            cartProducts={cartProducts}
            onClickProduct={(productId: string) =>
              navigateToProductDetailPage(productId)
            }
            onUpdateCartProducts={(cartProducts: ICartItem[]) =>
              setCartProducts(cartProducts)
            }
            onClickBuy={onClickBuy}
            onClickAddToCart={(productId: string) => {
              updateCartProducts(productId);
              updateCartDataOnStorage(cartProducts);
            }}
            productInfo={item}
          />
        )}
      />
    </Container>
  );
}

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, StyleSheet, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, Button, withBadge} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {IProduct} from '../../interfaces/products';
import {CardQtyIncDec} from '../../components/cart-qty-inc-dec';
import {IS_WEB, IS_BIG_SCREEN} from '../../config';
import {ICartItem} from '../../interfaces/classes/cart';
import colors from '../../colors';
import {getImageLink, getCartItemCountByProductId} from '../../helpers';

interface IProductInfo {
  cartProducts: ICartItem[];
  productInfo: IProduct;
  cartQtyRefreshCount: number;
  onClickProduct: (productId: string) => void;
  onUpdateCartProducts: (cartItems: ICartItem[]) => void;
}
interface IRenderBuyCart {
  productInfo: IProduct;
  onClickAddToCart: (productId: string) => void;
  onClickBuy: (productInfo: IProduct, productId: string) => void;
  productCountOnCart?: number;
}
interface IProductCard extends IProductInfo, IRenderBuyCart {}

export const Product = ({
  productInfo,
  onClickProduct,
  cartProducts,
  onUpdateCartProducts,
  onClickAddToCart,
  cartQtyRefreshCount,
  onClickBuy,
}: IProductCard) => {
  const leftSideSize = 5;
  const cartItemLength =
    cartProducts.find((item) => item.productId === productInfo._id)?.quantity ||
    0;
  return (
    <>
      <View
        style={[
          IS_BIG_SCREEN ? styles.viewContainerWeb : styles.viewContainerMob,
          styles.container,
        ]}>
        {IS_BIG_SCREEN ? (
          <Grid>
            <Col size={leftSideSize}>
              {renderImage(
                productInfo.images &&
                  productInfo.images[0]?.optimizedDestinationPath,
              )}
            </Col>
            <Col
              size={12 - leftSideSize}
              style={{justifyContent: 'flex-start'}}>
              {renderProductInfo({
                productInfo,
                onClickProduct,
                cartProducts,
                onUpdateCartProducts,
                cartQtyRefreshCount,
              })}
              <RenderCartBuyButtons
                productCountOnCart={cartItemLength}
                productInfo={productInfo}
                onClickAddToCart={onClickAddToCart}
                onClickBuy={onClickBuy}
              />
            </Col>
          </Grid>
        ) : (
          <Grid>
            <Row size={9}>
              <Col size={leftSideSize}>
                {renderImage(
                  productInfo.images &&
                    productInfo.images[0]?.optimizedDestinationPath,
                )}
              </Col>
              <Col
                size={12 - leftSideSize}
                style={{justifyContent: 'flex-start'}}>
                {renderProductInfo({
                  productInfo,
                  onClickProduct,
                  cartProducts,
                  onUpdateCartProducts,
                  cartQtyRefreshCount,
                })}
              </Col>
            </Row>
            <Row size={3}>
              <RenderCartBuyButtons
                productCountOnCart={cartItemLength}
                productInfo={productInfo}
                onClickAddToCart={onClickAddToCart}
                onClickBuy={onClickBuy}
              />
            </Row>
          </Grid>
        )}
      </View>
    </>
  );
};

const renderImage = (
  imageUrl = 'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png',
) => {
  return (
    <Image
      resizeMode="cover"
      style={styles.image}
      source={{
        uri: getImageLink(imageUrl),
      }}
      PlaceholderContent={<ActivityIndicator />}
    />
  );
};
const renderProductInfo = ({
  productInfo,
  onClickProduct,
  cartProducts,
  onUpdateCartProducts,
  cartQtyRefreshCount,
}: IProductInfo) => {
  return (
    <View onMagicTap={() => onClickProduct(productInfo.productId)}>
      <Text style={styles.textName}>{productInfo.productName}</Text>
      <Text numberOfLines={1} style={[styles.textNameLight]}>
        {'Seller: ' + productInfo.sellerInfo?.sellerName}
      </Text>
      <Row>
        <Text style={[styles.textName, {textDecorationLine: 'line-through'}]}>
          MRP: ₹{productInfo.mrp}
        </Text>
        <Text
          style={[
            styles.textName,
            {textDecorationLine: 'line-through', marginTop: 0},
          ]}>
          +
        </Text>
        <Text
          style={[styles.textNameGray, {textDecorationLine: 'line-through'}]}>
          ₹{productInfo.gst} (GST)
        </Text>
      </Row>

      <Row>
        <Text style={styles.textName}>
          Offer: ₹{productInfo.sellingPrice} +{' '}
        </Text>
        <Text style={styles.textNameGray}>₹{productInfo.gst} (GST)</Text>
      </Row>

      <Text numberOfLines={1} style={styles.textName}>
        {productInfo.unit + ' ' + productInfo.uom}
      </Text>
      <Text numberOfLines={1} style={styles.textName}>
        {productInfo.categories &&
          productInfo.categories[0] &&
          productInfo.categories[0].category}
      </Text>
      <CardQtyIncDec
        updateQuantity={(qty) => console.debug(qty)}
        refreshCount={cartQtyRefreshCount}
        cartProducts={cartProducts}
        productId={productInfo._id}
        onUpdateCartProducts={onUpdateCartProducts}
      />
    </View>
  );
};

function RenderCartBuyButtons({
  productInfo,
  onClickAddToCart,
  onClickBuy,
  productCountOnCart,
}: IRenderBuyCart) {
  const [count, setCount] = useState(productCountOnCart);
  useEffect(() => {
    async function getItemSize() {
      const itemSize = await getCartItemCountByProductId(productInfo._id);
      setCount(itemSize);
    }
    getItemSize();
  }, [productCountOnCart]);
  const CartIcon: any = withBadge(count)(Icon);

  return (
    <Row>
      <Col>
        <Button
          icon={{
            name: 'flash-on',
            size: 15,
            color: 'white',
          }}
          onPress={() => onClickBuy(productInfo, productInfo._id)}
          title={'Buy Now'}></Button>
      </Col>
      <Col>
        <Button
          icon={
            productCountOnCart ? (
              <CartIcon size={15} name="cart" color={colors.white} />
            ) : (
              {
                name: 'shopping-cart',
                size: 15,
                color: colors.white,
              }
            )
          }
          titleStyle={{
            marginLeft: productCountOnCart ? 16 : 0,
          }}
          onPress={() => onClickAddToCart(productInfo._id)}
          buttonStyle={styles.add2CartButton}
          title="Cart"></Button>
      </Col>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainerWeb: {
    height: IS_WEB ? 300 : 240,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 8,
  },
  viewContainerMob: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  image: {
    height: IS_BIG_SCREEN ? 300 : 180,
    width: '100%',
  },
  textName: {
    fontSize: IS_BIG_SCREEN ? 18 : 14,
    color: colors.textGray,
    fontWeight: '600',
    marginLeft: IS_BIG_SCREEN ? 8 : 4,
    marginBottom: IS_BIG_SCREEN ? 8 : 4,
  },
  textNameLight: {
    fontSize: IS_BIG_SCREEN ? 14 : 12,
    color: colors.gray,
    fontWeight: '400',
    marginLeft: IS_BIG_SCREEN ? 8 : 4,
    marginBottom: IS_BIG_SCREEN ? 8 : 4,
  },
  textNameGray: {
    fontSize: IS_BIG_SCREEN ? 14 : 12,
    color: colors.gray,
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: IS_BIG_SCREEN ? -2 : 0,
    marginLeft: IS_BIG_SCREEN ? 4 : 2,
  },
  add2CartButton: {
    backgroundColor: '#FA8B41',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FA8B41',
  },
  text: {
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 20,
  },
});

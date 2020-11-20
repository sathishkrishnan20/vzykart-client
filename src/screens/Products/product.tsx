import React from 'react';
import {ActivityIndicator, Text, StyleSheet, View} from 'react-native';

import {Image, Button} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {IProduct} from '../../interfaces/products';
import {CardQtyIncDec} from '../../components/cart-qty-inc-dec';
import {IS_WEB} from '../../config';
import {ICartItem} from '../../interfaces/classes/cart';

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
}
interface IProductCard extends IProductInfo, IRenderBuyCart {}

export const Product = ({
  productInfo,
  onClickProduct,
  cartProducts,
  onUpdateCartProducts,
  onClickAddToCart,
  cartQtyRefreshCount,
}: IProductCard) => {
  const leftSideSize = 5;
  return (
    <>
      <View
        style={[
          IS_WEB ? styles.viewContainerWeb : styles.viewContainerMob,
          styles.container,
        ]}>
        {IS_WEB ? (
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
              {renderCartBuyButtons({productInfo, onClickAddToCart})}
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
              {renderCartBuyButtons({productInfo, onClickAddToCart})}
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
        uri: imageUrl,
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
      <Text style={[styles.textName, {textDecorationLine: 'line-through'}]}>
        MRP: Rs: {productInfo.mrp}
      </Text>
      <Text style={styles.textName}>Offer:Rs: {productInfo.sellingPrice}</Text>
      <Text style={styles.textName}>
        {'Seller Name' || productInfo.sellerId}
      </Text>
      <Text style={styles.textName}>
        {productInfo.unit + ' ' + productInfo.uom}
      </Text>
      <Text style={styles.textName}>
        {productInfo.categories && productInfo.categories[0]}
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

const renderCartBuyButtons = ({
  productInfo,
  onClickAddToCart,
}: IRenderBuyCart) => {
  return (
    <Row>
      <Col>
        <Button
          icon={{
            name: 'flash-on',
            size: 15,
            color: 'white',
          }}
          onPress={() => console.log(productInfo)}
          title="Buy Now"></Button>
      </Col>
      <Col>
        <Button
          icon={{
            name: 'shopping-cart',
            size: 15,
            color: 'white',
          }}
          onPress={() => onClickAddToCart(productInfo._id)}
          buttonStyle={styles.add2CartButton}
          title="Cart"></Button>
      </Col>
    </Row>
  );
};

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
    height: IS_WEB ? 300 : 180,
    width: '100%',
  },
  textName: {
    fontSize: IS_WEB ? 18 : 14,
    color: '#4B5164',
    fontWeight: '600',
    marginLeft: IS_WEB ? 8 : 4,
    marginBottom: IS_WEB ? 8 : 4,
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

import React from 'react';
import {ActivityIndicator, Text, StyleSheet, View} from 'react-native';

import {Image, Button} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {IProduct} from '../../interfaces/products';
import {CardQtyIncDec} from '../../components/cart-qty-inc-dec';
import {navigateByProp} from '../../navigation';
import {IS_WEB} from '../../config';
export const Product = ({
  data,
  navigationProp,
}: {
  data: IProduct;
  navigationProp: any;
}) => {
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
                data.images && data.images[0]?.optimizedDestinationPath,
              )}
            </Col>
            <Col
              size={12 - leftSideSize}
              style={{justifyContent: 'flex-start'}}>
              {renderProductInfo(data, navigationProp)}
              {renderCartBuyButtons()}
            </Col>
          </Grid>
        ) : (
          <Grid>
            <Row size={9}>
              <Col size={leftSideSize}>
                {renderImage(
                  data.images && data.images[0]?.optimizedDestinationPath,
                )}
              </Col>
              <Col
                size={12 - leftSideSize}
                style={{justifyContent: 'flex-start'}}>
                {renderProductInfo(data, navigationProp)}
              </Col>
            </Row>
            <Row size={3}>{renderCartBuyButtons()}</Row>
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
const renderProductInfo = (productInfo: IProduct, navigationProp: any) => {
  return (
    <View onMagicTap={() => navigateByProp(navigationProp, 'ProductDetails')}>
      <Text style={styles.textName}>{productInfo.productName}</Text>
      <Text style={[styles.textName, {textDecorationLine: 'line-through'}]}>
        MRP: Rs: {productInfo.mrp}
      </Text>
      <Text style={styles.textName}>Offer:Rs: {productInfo.sellingPrice}</Text>
      <Text style={styles.textName}>
        {'Seller Name' || productInfo.sellerId}
      </Text>
      <Text style={styles.textName}>
        {productInfo.unit + ' ' + productInfo.unit}
      </Text>
      <Text style={styles.textName}>{productInfo.categories[0]}</Text>
      <CardQtyIncDec
        qty={2}
        quantityHandler={(incOrDec: string) => {
          return incOrDec;
        }}
      />
    </View>
  );
};

const renderCartBuyButtons = () => {
  return (
    <Row>
      <Col>
        <Button
          icon={{
            name: 'flash-on',
            size: 15,
            color: 'white',
          }}
          title="Buy Now"></Button>
      </Col>
      <Col>
        <Button
          icon={{
            name: 'shopping-cart',
            size: 15,
            color: 'white',
          }}
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

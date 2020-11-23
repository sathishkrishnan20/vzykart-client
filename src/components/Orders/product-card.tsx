import React from 'react';
import {IOrderProducts} from '../../interfaces/orders';
import {Text, View, StyleSheet} from 'react-native';
import {IS_BIG_SCREEN, IS_ANDROID, IS_IOS} from '../../config';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {Card} from 'react-native-elements';
import Image from '../Image/image';
import {getImageLink} from '../../helpers';

const leftSideSize = IS_BIG_SCREEN ? 2 : 4;
interface ProductCardOrderedState {
  productInfo: IOrderProducts;
}
export const ProductCardsOrdered = ({productInfo}: ProductCardOrderedState) => {
  // @ts-ignore
  return <ProductSummary productInfo={productInfo} />;
};

const ProductSummary = ({productInfo}: ProductCardOrderedState) => {
  return (
    <View
      style={[
        IS_BIG_SCREEN ? styles.viewContainerWeb : styles.viewContainerMob,
        styles.container,
      ]}>
      {IS_BIG_SCREEN ? (
        <Grid>
          <Col size={leftSideSize}>
            {renderImage(
              productInfo.image && productInfo.image.optimizedDestinationPath,
            )}
          </Col>
          <Col size={12 - leftSideSize} style={{justifyContent: 'flex-start'}}>
            {renderProductInfo({
              productInfo,
            })}
          </Col>
        </Grid>
      ) : (
        <Card
          containerStyle={{
            padding: 1,
            margin: 3,
          }}
          wrapperStyle={{padding: 0}}>
          <Row size={12}>
            <Col size={leftSideSize}>
              {renderImage(
                productInfo.image &&
                  productInfo.image?.optimizedDestinationPath,
              )}
            </Col>
            <Col
              size={12 - leftSideSize}
              style={{justifyContent: 'flex-start'}}>
              {renderProductInfo({
                productInfo,
              })}
            </Col>
          </Row>
        </Card>
      )}
    </View>
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
    />
  );
};

const renderProductInfo = ({productInfo}: ProductCardOrderedState) => {
  return (
    <View>
      <Text style={styles.textName}>{productInfo.productName}</Text>
      <Text style={styles.textNameLight}>
        {productInfo.unit + ' ' + productInfo.uom}
      </Text>
      <Text style={styles.textNameLight}>
        {'Seller: ' + productInfo.sellerInfo?.sellerName}
      </Text>

      <Text style={styles.textNameLight}>
        {'Quantity: ' + productInfo.quantity}
      </Text>
      <Text style={styles.textNameLight}>
        {'Price: ₹' + productInfo.amount}
      </Text>
      <Text style={styles.textNameLight}>
        {'GST Price: ₹' + productInfo.gstAmount}
      </Text>
      <Text style={styles.textNameLight}>
        {'Total Price: ₹' +
          productInfo.quantity * (productInfo.amount + productInfo.gstAmount)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainerWeb: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginBottom: 8,
    marginLeft: 8,
    marginTop: 2,
  },
  viewContainerMob: {
    marginTop: 0,
  },
  image: {
    height: IS_ANDROID || IS_IOS ? '100%' : IS_BIG_SCREEN ? 180 : 140,
    width: '100%',
  },
  textName: {
    fontSize: IS_BIG_SCREEN ? 18 : 14,
    color: '#4B5164',
    fontWeight: '600',
    marginLeft: IS_BIG_SCREEN ? 8 : 4,
    marginBottom: IS_BIG_SCREEN ? 8 : 4,
  },
  textNameLight: {
    fontSize: IS_BIG_SCREEN ? 14 : 12,
    color: 'gray',
    fontWeight: '600',
    marginLeft: IS_BIG_SCREEN ? 8 : 4,
    marginBottom: IS_BIG_SCREEN ? 8 : 4,
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
  bold: {
    fontWeight: 'bold',
  },
  marginTopSmall: {
    marginTop: IS_BIG_SCREEN ? 4 : 2,
  },
  marginTopModerate: {
    marginTop: IS_BIG_SCREEN ? 8 : 4,
  },
  marginLarge: {
    marginTop: IS_BIG_SCREEN ? 10 : 5,
  },
  strikeThrough: {textDecorationLine: 'line-through'},
});

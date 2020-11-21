import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {Card} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {IS_WEB} from '../../config';
import {ProductAndCart} from '../../interfaces/classes/cart';
import Image from '../../components/Image/image';
import {
  calculateTotalSellingAmountWithGST,
  calculateTotalMRPAmountWithGST,
} from '../../helpers';
const leftSideSize = IS_WEB ? 2 : 4;

interface IProductSummary {
  productInfo: ProductAndCart;
}
interface ISubTotalComponent {
  sellingPrice: number;
  discountPrice: number;
  totalMRPPrice: number;
  deliveryCharge: number;
  totalGstPrice: number;
}
export const ProductSummary = ({productInfo}: IProductSummary) => {
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
                  productInfo.images &&
                    productInfo.images[0]?.optimizedDestinationPath,
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
    />
  );
};

export const SubTotalComponent = ({
  sellingPrice,
  deliveryCharge,
  totalMRPPrice,
  totalGstPrice,
}: ISubTotalComponent) => {
  return (
    <Card containerStyle={{margin: 4}}>
      <Card.Title> Price Details </Card.Title>
      <Card.Divider></Card.Divider>
      <Row>
        <Col>
          <Text> Price </Text>
        </Col>
        <Col style={{alignItems: 'flex-end'}}>
          <Row>
            <Text style={[styles.textName]}>
              {' '}
              ₹{sellingPrice - totalGstPrice}{' '}
            </Text>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text> GST </Text>
        </Col>
        <Col style={{alignItems: 'flex-end'}}>
          <Row>
            <Text style={[styles.textName]}> ₹{totalGstPrice} </Text>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col>
          <Text> Price + GST</Text>
        </Col>
        <Col style={{alignItems: 'flex-end'}}>
          <Row>
            <Text style={[styles.textName]}> ₹{sellingPrice} </Text>
            {/* <Text
              style={[
                styles.strikeThrough,
                styles.textNameLight,
                styles.marginTopSmall,
              ]}>
              ₹{totalMRPPrice}{' '}
            </Text> */}
          </Row>
        </Col>
      </Row>

      <Row style={{marginTop: 4}}>
        <Col>
          <Text style={{color: 'gray'}}> Discount Price </Text>
        </Col>
        <Col style={{alignItems: 'flex-end'}}>
          <Text style={{textDecorationLine: 'line-through', color: 'gray'}}>
            ₹{totalMRPPrice - sellingPrice}
          </Text>
        </Col>
      </Row>
      <Row style={{marginTop: 10}}>
        <Col>
          <Text> Delivery Charges </Text>
        </Col>
        <Col style={{alignItems: 'flex-end'}}>
          <Text>₹{deliveryCharge} </Text>
        </Col>
      </Row>
      <Card.Divider style={{marginTop: 10}}></Card.Divider>
      <Row>
        <Row style={{marginTop: IS_WEB ? 8 : 4}}>
          <Col>
            <Text style={styles.bold}> Total Payable </Text>
          </Col>
          <Col style={{alignItems: 'flex-end'}}>
            <Text style={styles.bold}> {sellingPrice + deliveryCharge} </Text>
          </Col>
        </Row>
      </Row>
    </Card>
  );
};

const renderProductInfo = ({productInfo}: {productInfo: ProductAndCart}) => {
  return (
    <View>
      <Text style={styles.textName}>{productInfo.productName}</Text>
      <Text style={styles.textNameLight}>
        {productInfo.unit + ' ' + productInfo.uom}
      </Text>
      <Text style={styles.textNameLight}>
        {'Seller: ' + productInfo.sellerInfo?.sellerName}
      </Text>
      <Row>
        <Text style={[styles.textNameLight]}>Price:</Text>
        <Text style={[styles.textNameLight, styles.strikeThrough]}>
          {productInfo.quantity} * ( ₹{productInfo.mrp}
        </Text>
        <Text style={[styles.textNameLight, styles.strikeThrough]}>
          + ₹{productInfo.gst}
        </Text>
        <Text style={[styles.textNameLight, styles.strikeThrough]}>
          ) = ₹
          {calculateTotalMRPAmountWithGST(productInfo, productInfo.quantity)}
        </Text>
      </Row>
      <Row>
        <Text style={[styles.textName]}>Offer:</Text>
        <Text style={[styles.textName]}>
          {productInfo.quantity} * ( ₹{productInfo.sellingPrice}
        </Text>
        <Text style={[styles.textName]}>+ ₹{productInfo.gst}</Text>
        <Text style={[styles.textName]}>
          ) = ₹
          {calculateTotalSellingAmountWithGST(
            productInfo,
            productInfo.quantity,
          )}
        </Text>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainerWeb: {
    height: IS_WEB ? 140 : 140,
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
    height: IS_WEB ? 140 : 110,
    width: '100%',
  },
  textName: {
    fontSize: IS_WEB ? 18 : 14,
    color: '#4B5164',
    fontWeight: '600',
    marginLeft: IS_WEB ? 8 : 4,
    marginBottom: IS_WEB ? 8 : 4,
  },
  textNameLight: {
    fontSize: IS_WEB ? 14 : 12,
    color: 'gray',
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
  bold: {
    fontWeight: 'bold',
  },
  marginTopSmall: {
    marginTop: IS_WEB ? 4 : 2,
  },
  marginTopModerate: {
    marginTop: IS_WEB ? 8 : 4,
  },
  marginLarge: {
    marginTop: IS_WEB ? 10 : 5,
  },
  strikeThrough: {textDecorationLine: 'line-through'},
});

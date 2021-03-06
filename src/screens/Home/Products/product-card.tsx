import React, {useEffect, useState} from 'react';
import {Card, Text, withBadge} from 'react-native-elements';
import {Button} from '../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import {
  getImageLink,
  getCartItemCountByProductId,
  calculateTotalMRPAmountWithGST,
  calculateTotalSellingAmountWithGST,
} from '../../../helpers';
import colors from '../../../colors';
import {IS_BIG_SCREEN} from '../../../config';
import {Row} from 'react-native-easy-grid';
import {IProduct} from '../../../interfaces/products';
interface IState {
  item: IProduct;
  cardSize: number;
  onClickAddToCart: (productId: string) => void;
  refreshCount: number;
}
export function ProductCard({
  item,
  cardSize,
  onClickAddToCart,
  refreshCount,
}: IState) {
  const [productCountOnCart, setProductCountOnCart] = useState(0);
  useEffect(() => {
    async function getItemSize() {
      const itemSize = await getCartItemCountByProductId(item._id);
      setProductCountOnCart(itemSize);
    }
    getItemSize();
  }, [refreshCount]);
  const CartIcon: any = withBadge(productCountOnCart, {
    badgeStyle: {
      backgroundColor: colors.cartBadgeColor,
      marginTop: -5,
    },
  })(Icon);

  return (
    <Card containerStyle={{margin: 4, width: cardSize}}>
      <Card.Title>{item.productName}</Card.Title>
      <Card.Divider />
      <Card.Image
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        source={{
          uri: getImageLink(
            item.images &&
              item.images[0] &&
              (item.images[0].optimizedDestinationPath as string),
          ),
        }}
      />
      <Text
        numberOfLines={1}
        style={{
          marginTop: 8,
          marginBottom: 8,
          color: colors.textGray,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        {item.productDescription}
      </Text>

      <Text style={[styles.textNameLight]}>{item.sellerInfo?.sellerName}</Text>

      <Text style={[styles.textName]}>{`Unit: ${item.unit} ${item.uom}`}</Text>
      <Row>
        <Text style={[styles.textName]}>
          MRP: ₹{calculateTotalMRPAmountWithGST(item, 1)}
        </Text>
        <Text
          style={[
            styles.textName,
            {textDecorationLine: 'line-through', marginBottom: 4},
          ]}>
          ₹{calculateTotalSellingAmountWithGST(item, 1)}
        </Text>
      </Row>

      <Button
        onPress={() => onClickAddToCart(item._id)}
        icon={
          productCountOnCart ? (
            <CartIcon size={20} name="cart" color={colors.white} />
          ) : (
            {
              name: 'shopping-cart',
              size: 15,
              color: colors.white,
            }
          )
        }
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        titleStyle={{
          marginLeft: productCountOnCart ? 20 : 0,
        }}
        title="Add to Cart"
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  textName: {
    fontSize: IS_BIG_SCREEN ? 18 : 16,
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
});

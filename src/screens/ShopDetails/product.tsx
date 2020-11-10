import React from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Image, Card, Button} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {IProduct} from '../../interfaces/products';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CardQtyIncDec} from '../../components/cart-qty-inc-dec';
import {navigate} from '../../navigation';
const {width} = Dimensions.get('window');
// import {IS_WEB} from '../../config';
export const Product = ({
  data,
  navigation,
}: {
  data: IProduct;
  navigation: any;
}) => {
  console.log(data);
  return (
    <>
      <Card>
        <Grid>
          <Col size={getImageColSize()}>
            <Image
              source={{
                uri: data.imageUrl,
              }}
              style={{height: 150}}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Col>
          <Col
            size={9}
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              alignContent: 'flex-start',
            }}>
            <Text style={styles.text}>{data.productName}</Text>
            <Text style={styles.price}>$ {data.price}</Text>
            <CardQtyIncDec
              qty={2}
              quantityHandler={(incOrDec: string) => {
                return incOrDec;
              }}
            />
            <Text style={styles.description}> Product Description </Text>
            <Button
              type="clear"
              title="Buy now"
              onPress={() => navigate(navigation, 'product-details')}
            />
          </Col>
        </Grid>
      </Card>
      {/* <div>
        <h1> Hello </h1>
      </div> */}
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 20,
  },
  name: {
    color: '#5a647d',
    fontWeight: 'bold',
    fontSize: 30,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 10,
    color: '#c1c4cd',
  },
});

const getImageColSize = () => {
  if (width > 0 && width <= 300) {
    return 3;
  } else if (width > 300 && width <= 600) {
    return 3;
  } else if (width > 600 && width <= 900) {
    return 3;
  } else if (width > 900 && width <= 1600) {
    return 3;
  } else if (width > 1600 && width <= 2000) {
    return 3;
  } else if (width < 2000) {
    return 3;
  }
  return 3;
};

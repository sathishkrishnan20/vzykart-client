import React from 'react';
import {ActivityIndicator, Text, StyleSheet, Dimensions} from 'react-native';

import {Image, Card} from 'react-native-elements';
import {Col, Grid} from 'react-native-easy-grid';
const {width} = Dimensions.get('window');
// import {IS_WEB} from '../../config';
export const Product = ({data}: {data: number}) => {
  console.log(data);
  return (
    <Card>
      <Grid>
        <Col size={getImageColSize()}>
          <Image
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/1/13/Supermarkt.jpg',
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
          <Text style={styles.text}> Product Name </Text>
        </Col>
      </Grid>
    </Card>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
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

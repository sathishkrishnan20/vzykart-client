import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Card, Rating, Button} from 'react-native-elements';
import styles from './style';
import {IProduct} from '../../interfaces/products';
interface IState {
  visibleDialog: boolean;
  content: string;
  product: IProduct;
}
class ProductDetail extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visibleDialog: false,
      content: '',
      product: {
        productName: 'Hamam',
        productDescription: 'Hamam Ayurvedic Soap',
        price: 200,
        rupeeSymbol: 'Rs',
        imageUrl: '',
        catagories: ['Soap', 'Bathroom Soap'],
        imageUrls: [
          'https://images-na.ssl-images-amazon.com/images/I/61a7gMkFx2L._SL1000_.jpg',
          'https://images-na.ssl-images-amazon.com/images/I/61t58Wcya6L._SL1000_.jpg',
          'https://images-na.ssl-images-amazon.com/images/I/61okxRIYtsL._SL1000_.jpg',
          'https://images-na.ssl-images-amazon.com/images/I/61GAvR5vBgL._SL1000_.jpg',
        ],
        shop: {
          name: 'Selvaraj Stores, KoodanKulam',
          location: 'Koodankulam',
        },
      },
    };
  }
  render() {
    const {product} = this.state;
    return (
      <ScrollView>
        <Swiper
          style={styles.wrapper}
          containerStyle={{
            width: Dimensions.get('window').width,
            height: 200,
          }}
          autoplay>
          {product.imageUrls?.map((item, index) => (
            <ImageBackground
              key={index}
              source={{uri: item}}
              style={styles.slide}
            />
          ))}
        </Swiper>

        <View style={styles.container}>
          <Card containerStyle={[styles.cardMargin, styles.marginBottom]}>
            <Text style={styles.text}>{product.price} đ/kg</Text>
            <Text style={styles.productName}>{product.productName}</Text>
            <View>
              {/* <Rating
                style={styles.rating}
                imageSize={10}
                startingValue={product.ratings.avg}
                fractions={1}
                readonly
              /> */}
              <Button
                title="Buy Now"
                style={{
                  borderRadius: 20,
                  backgroundColor: '#e01a2e',
                  marginTop: 10,
                }}
                onPress={() => {}}
              />
            </View>
          </Card>
          <Card containerStyle={[styles.cardMargin, styles.marginBottom]}>
            <Text>Location: {product.shop?.location}</Text>
            <Text>Shop Name: {product.shop && product.shop.name}</Text>
          </Card>
          {/* <Card
            containerStyle={[styles.cardMargin, styles.marginBottom]}
            title="Đánh giá">
            {product.ratings.list.length ? (
              <Ratings ratings={product.ratings.list} />
            ) : (
              <Text style={styles.aligncenter}>
                Hiện chưa có đánh giá nào cho sản phẩm
              </Text>
            )}
          </Card> */}
          <Card
            containerStyle={[styles.cardMargin, styles.marginBottom]}
            title="Commends">
            {/* {product.comments.length ? (
              <Comment comments={product.comments} />
            ) : (
              <Text style={styles.aligncenter}>
                Hiện chưa có bình luận nào cho sản phẩm
              </Text>
            )} */}
          </Card>
        </View>
      </ScrollView>
    );
  }
}
const style = StyleSheet.create({
  textAreaContainer: {
    borderColor: 'red',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  closeBtn: {
    marginTop: 10,
  },
});
export default ProductDetail;

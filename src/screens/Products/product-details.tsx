import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Card, Button} from 'react-native-elements';
import styles from './style';
interface IState {
  visibleDialog: boolean;
  content: string;
  product: any;
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
        seller: {
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
          {product.imageUrls?.map((item: any, index: number) => (
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
            <Text>Location: {product.seller?.location}</Text>
            <Text>Seller Name: {product.seller && product.seller.name}</Text>
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
export default ProductDetail;

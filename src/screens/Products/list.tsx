import React, {Component} from 'react';
import {Container} from '../../components';
import {FlatList} from 'react-native-gesture-handler';
import {keyExtractor} from '../../helpers/render-helpers';
import {Product} from './product';
import {IS_WEB} from '../../config';
import {IProduct, IProductListState} from '../../interfaces/products';
export default class ProductList extends Component<any, IProductListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      productData: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    const data: IProduct[] = [
      {
        productId: '12',
        productName: 'Hamam Soap',
        productDescription: 'the Bathroom Soap',
        mrp: 100,
        sellingPrice: 100,
        tradePrice: 120,
        rupeeSymbol: 'RS',
        reviews: [],
        ratings: 5,
        sellerId: '123',
        discount: 12,
        categories: [],
        gst: 1,
        uom: 'Kg',
        unit: '4',
        images: [
          {
            destinationPath:
              'https://images-na.ssl-images-amazon.com/images/I/41eCbvCrlPL._SX425_.jpg',
            optimizedDestinationPath:
              'https://images-na.ssl-images-amazon.com/images/I/41eCbvCrlPL._SX425_.jpg',
            active: true,
          },
        ],
      },
      {
        productId: '12',
        productName: 'Hamam Soap',
        productDescription: 'the Bathroom Soap',
        mrp: 100,
        sellingPrice: 100,
        tradePrice: 120,
        rupeeSymbol: 'RS',
        reviews: [],
        ratings: 5,
        sellerId: '123',
        discount: 12,
        categories: [],
        gst: 1,
        uom: 'Kg',
        unit: '4',
        images: [
          {
            destinationPath:
              'https://images-na.ssl-images-amazon.com/images/I/41eCbvCrlPL._SX425_.jpg',
            optimizedDestinationPath:
              'https://images-na.ssl-images-amazon.com/images/I/41eCbvCrlPL._SX425_.jpg',
            active: true,
          },
        ],
      },
    ];
    this.setState({productData: data});
  }

  render() {
    const {productData} = this.state;
    return (
      <Container>
        <FlatList
          data={productData}
          //   ListHeaderComponent={() => (
          //     <Text style={styles.headerText}> Products </Text>
          //   )}
          numColumns={IS_WEB ? 2 : 1}
          keyExtractor={keyExtractor}
          renderItem={({item}) => (
            <Product navigationProp={this.props} data={item} />
          )}
        />
      </Container>
    );
  }
}

import React, {Component} from 'react';

import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

import {SellerViewProductsState} from '../../../interfaces/classes/seller-add-products';
import ProductAction from '../../../actions/products';
import {getShopId} from '../../../services/storage-service';
import {ScrollView} from 'react-native-gesture-handler';
import TableComponent from '../../../components/Table/view';
import {TableHeader} from '../../../interfaces/table-component';
import {CRUD} from '../../../interfaces/enums';
import {withRouter} from 'react-router-dom';
import {navigateByProp} from '../../../navigation';
class SellerViewProducts extends Component<any, SellerViewProductsState> {
  productAction: ProductAction;
  headerData: TableHeader[] = [
    {
      label: 'Product Name',
      node: 'productName',
    },
    {
      label: 'Product Desc',
      node: 'productDescription',
    },
    {
      label: 'MRP',
      node: 'mrp',
    },
    {
      label: 'Trading Price',
      node: 'tradePrice',
    },
    {
      label: 'Selling Price',
      node: 'sellingPrice',
    },
    {
      label: 'Discount',
      node: 'discount',
    },
    {
      label: 'GST',
      node: 'gst',
    },
    {
      label: 'Unit of Measurement',
      node: 'uom',
    },
    {
      label: 'Available Units',
      node: 'unit',
    },
    {
      label: 'GST',
      node: 'gst',
    },
  ];
  constructor(props: any) {
    super(props);

    this.state = {
      productData: [],
      isLoading: false,
    };
    this.productAction = new ProductAction();
  }
  componentDidMount() {
    console.log(this.props);
    this.getProducts();
  }

  async getProducts() {
    try {
      this.setState({isLoading: true});
      const shopId = await getShopId();
      const result = await this.productAction.getProductsByShopId(shopId);
      if (result.success) {
        console.log(result.data);
        this.setState({isLoading: false, productData: result.data});
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  }

  render() {
    const {productData} = this.state;

    return (
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <Text
            h4
            style={{fontWeight: 'bold', color: '#FC7E40', marginBottom: 8}}>
            View Product
          </Text>
          <ScrollView style={styles.dataWrapper}>
            <TableComponent
              headerData={this.headerData}
              valueData={productData}
              showActions={true}
              uniqueIdKeyName={'_id'}
              actionButtons={[CRUD.VIEW, CRUD.UPDATE, CRUD.DELETE]}
              viewAction={(id: string) => {
                navigateByProp(
                  this.props,
                  '/seller/product/view/' + id,
                  {
                    crudType: 'view',
                    productId: id,
                  },
                  '/seller/product/add',
                );
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    fontFamily: 'OpenSans',
    backgroundColor: '#fff',
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  dataWrapper: {marginTop: -1},
});
export default SellerViewProducts;

import React, {Component} from 'react';

import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

import {SellerViewProductsState} from '../../../interfaces/classes/seller-add-products';
import ProductAction from '../../../actions/products';
import {getSellerId} from '../../../services/storage-service';
import {ScrollView} from 'react-native-gesture-handler';
import TableComponent from '../../../components/Table/view';
import {TableHeader} from '../../../interfaces/table-component';
import {CRUD} from '../../../interfaces/enums';
import {navigateByProp} from '../../../navigation';
import {ComponentProp} from '../../../interfaces';
import {Button, Loader} from '../../../components/index';
import ROUTE_NAMES from '../../../routes/name';
class SellerViewProducts extends Component<
  ComponentProp,
  SellerViewProductsState
> {
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
      label: 'Units',
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
    this.getProducts();
  }

  async getProducts() {
    try {
      this.setState({isLoading: true});
      const sellerId = await getSellerId();
      const result = await this.productAction.getProductsBySellerId(sellerId);
      if (result.success) {
        console.log(result.data);
        this.setState({isLoading: false, productData: result.data});
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  }

  render() {
    const {productData, isLoading} = this.state;

    return (
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <Text
            h4
            style={{fontWeight: 'bold', color: '#FC7E40', marginBottom: 8}}>
            View Product
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              onPress={() =>
                navigateByProp(
                  this.props,
                  ROUTE_NAMES.sellerProductAdd.replace(':crudType', 'add'),
                  {crudType: 'add'},
                )
              }
              title="Add Product"></Button>
          </View>

          <Loader visible={isLoading} />

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
                  ROUTE_NAMES.sellerProductCrudById
                    .replace(':crudType', 'view')
                    .replace(':productId', id),
                  {
                    crudType: 'view',
                    productId: id,
                  },
                );
              }}
              editAction={(id: string) =>
                navigateByProp(
                  this.props,
                  ROUTE_NAMES.sellerProductCrudById
                    .replace(':crudType', 'edit')
                    .replace(':productId', id),
                  {
                    crudType: 'edit',
                    productId: id,
                  },
                )
              }
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

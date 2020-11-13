import React, {useEffect, Component} from 'react';

import {StyleSheet, View} from 'react-native';
import {Text, Button, Overlay} from 'react-native-elements';

import TableWriteComponent from '../../../components/Table/add-update';
import {IAddUpdate} from '../../../interfaces/table-component';
import {INPUT_COMPONENT} from '../../../interfaces/enums';
import {SellerAddProductsState} from '../../../interfaces/classes/seller-add-products';
import {ICreateProduct} from '../../../interfaces/products';
import ProductAction from '../../../actions/products';
import {getShopId} from '../../../services/storage-service';
import {IResponse} from '../../../interfaces/request-response';
import {Item} from 'react-native-picker-select';
class SellerAddProducts extends Component<any, SellerAddProductsState> {
  multiSelect: any;
  productAction: ProductAction;
  constructor(props: any) {
    super(props);
    this.state = {
      productPrefix: '',
      productName: '',
      productDescription: '',
      mrp: 0,
      tradePrice: 0,
      sellingPrice: 0,
      discount: 0,
      gst: 0,
      shopId: '',
      uom: '',
      unit: '',
      categories: [],
      selectedItems: [],
      date: new Date(),
      showDatePicker: false,
      isLoading: false,
      alertVisible: false,
    };
    this.productAction = new ProductAction();
  }
  changeState(key: string, value: string | Date | boolean | string[] | Item[]) {
    // @ts-ignore
    this.setState({[key]: value});
  }
  onSelectedItemsChange = (selectedItems: any) => {
    this.setState({selectedItems});
  };
  async createProduct() {
    try {
      this.setState({isLoading: true});
      const {
        productDescription,
        productName,
        mrp,
        tradePrice,
        sellingPrice,
        uom,
        gst,
        unit,
        categories,
        discount,
      } = this.state;
      const createProductRequest: ICreateProduct = {
        shopId: '5fa90fa1207f370732e06674', //await getShopId(),
        productName,
        productDescription,
        mrp: Number(mrp),
        tradePrice: Number(tradePrice),
        sellingPrice: Number(sellingPrice),
        discount: Number(discount),
        gst,
        uom,
        unit,
        categories: categories.map((item) => item.label),
      };
      const response: IResponse = await this.productAction.createProduct(
        createProductRequest,
      );
      console.log(response);
      if (response.success) {
        this.toggleOverlay();
        this.resetState();

        alert(response.message);
      } else {
        alert(response.message);
      }
      this.setState({isLoading: false});
    } catch (error) {
      this.setState({isLoading: false});
    }
  }
  resetState() {
    this.setState({
      productName: '',
      productDescription: '',
      mrp: 0,
      tradePrice: 0,
      sellingPrice: 0,
      discount: 0,
      gst: 0,
      shopId: '',
      uom: '',
      unit: '',
      categories: [],
      selectedItems: [],
    });
  }
  toggleOverlay = () => {
    this.setState({alertVisible: !this.state.alertVisible});
  };

  render() {
    const {
      productDescription,
      productName,
      mrp,
      tradePrice,
      sellingPrice,
      unit,
      uom,
      categories,

      selectedItems,
      date,
      showDatePicker,
      alertVisible,
    } = this.state;
    const items = [
      {
        value: '92iijs7yta',
        label: 'Ondo',
      },
      {
        value: 'a0s0a8ssbsd',
        label: 'Ogun',
      },
      {
        value: '16hbajsabsd',
        label: 'Calabar',
      },
      {
        value: 'nahs75a5sg',
        label: 'Lagos',
      },
      {
        value: '667atsas',
        label: 'Maiduguri',
      },
      {
        value: 'hsyasajs',
        label: 'Anambra',
      },
      {
        value: 'djsjudksjd',
        label: 'Benue',
      },
      {
        value: 'sdhyaysdj',
        label: 'Kaduna',
      },
      {
        value: 'suudydjsjd',
        label: 'Abuja',
      },
    ];

    const data: IAddUpdate[][] = [
      [
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'Product Name',
          stateKey: 'productName',
          value: productName,
        },
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'Product Description',
          stateKey: 'productDescription',
          value: productDescription,
        },
      ],
      [
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'MRP',
          stateKey: 'mrp',
          value: mrp,
        },
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'Trading Price',
          stateKey: 'tradePrice',
          value: tradePrice,
        },
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'Selling Price',
          stateKey: 'sellingPrice',
          value: sellingPrice,
        },
      ],
      [
        {
          component: INPUT_COMPONENT.MULTI_SELECT,
          label: 'Select the Categories of Product',
          stateKey: 'categories',
          value: categories,
          selectionItems: items,
          onSelectedItemsChange: this.onSelectedItemsChange.bind(this),
        },
        {
          component: INPUT_COMPONENT.SINGLE_SELECT,
          label: 'Select Unit of Measurement',
          stateKey: 'uom',
          value: uom,
          selectionItems: items,
        },
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'Available Quantity',
          stateKey: 'unit',
          value: unit,
        },
      ],
    ];
    return (
      <View style={styles.container}>
        <Text
          h4
          style={{fontWeight: 'bold', color: '#FC7E40', marginBottom: 8}}>
          Add Product
        </Text>
        <TableWriteComponent
          changeState={(
            key: string,
            value: string | Date | boolean | string[] | Item[],
          ) => this.changeState(key, value)}
          componentData={data}
        />
        <Button
          title="Submit"
          onPress={() => this.createProduct()}
          loading={false}
        />
        <Overlay isVisible={alertVisible} onBackdropPress={this.toggleOverlay}>
          <Text>Hello from Overlay!</Text>
        </Overlay>
      </View>
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
});
export default SellerAddProducts;

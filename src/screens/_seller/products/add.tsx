import React, {Component} from 'react';

import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Text, Button} from 'react-native-elements';

import TableWriteComponent from '../../../components/Table/add-update';
import {IAddUpdate} from '../../../interfaces/table-component';
import {INPUT_COMPONENT} from '../../../interfaces/enums';
import {
  SellerAddProductsState,
  IProductChangeStateTypes,
} from '../../../interfaces/classes/seller-add-products';
import {ICreateProduct} from '../../../interfaces/products';
import ProductAction from '../../../actions/products';
import {getSellerId} from '../../../services/storage-service';
import {IResponse} from '../../../interfaces/request-response';
import {SuccessToast, WarningToast} from '../../../components/Toast';
import {IS_WEB, IS_BIG_SCREEN} from '../../../config';
import {ScrollView} from 'react-native-gesture-handler';
import {getMultiSelectValues} from '../../../helpers';

class SellerAddProducts extends Component<any, SellerAddProductsState> {
  multiSelect: any;
  productAction: ProductAction;
  constructor(props: any) {
    super(props);
    this.state = {
      productPrefix: '',
      productName: '',
      productDescription: '',
      mrp: '',
      tradePrice: '',
      sellingPrice: '',
      discount: '',
      gst: '',
      sellerId: '',
      uom: '',
      unit: '',
      categories: [],
      images: [],
      selectedItems: [],
      date: new Date(),
      showDatePicker: false,
      isLoading: false,
      alertVisible: false,
    };
    this.productAction = new ProductAction();
    console.log(this.props);
  }
  componentDidMount() {}
  changeState(key: string, value: IProductChangeStateTypes) {
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
        images,
      } = this.state;
      const createProductRequest: ICreateProduct = {
        sellerId: await getSellerId(),
        productName,
        productDescription,
        mrp: Number(mrp),
        tradePrice: Number(tradePrice),
        sellingPrice: Number(sellingPrice),
        discount: Number(discount),
        gst: Number(gst),
        uom,
        unit,
        categories: getMultiSelectValues(categories),
        images,
      };

      const response: IResponse = await this.productAction.createProduct(
        createProductRequest,
      );
      console.log(response);
      if (response.success) {
        SuccessToast({
          title: 'Success',
          message: 'Product Created Successfully',
        });
        this.resetState();
      } else {
        WarningToast({
          title: 'Warning',
          message: response.message,
        });
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
      mrp: '',
      tradePrice: '',
      sellingPrice: '',
      discount: '',
      gst: '',
      sellerId: '',
      uom: '',
      unit: '',
      categories: [],
      selectedItems: [],
      images: [],
    });
  }
  convertObjectToArray = (array: IAddUpdate[][]) => {
    const finalArray = [];
    for (let index = 0; index < array.length; index++) {
      const rowElement = array[index];
      for (let index = 0; index < rowElement.length; index++) {
        const colElement = rowElement[index];
        finalArray.push([colElement]);
      }
    }
    return finalArray;
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
      images,

      isLoading,
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
      [
        {
          component: INPUT_COMPONENT.FILE_UPLOAD,
          label: 'image',
          stateKey: 'images',
          value: images,
        },
      ],
    ];
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            <Text
              h4
              style={{fontWeight: 'bold', color: '#FC7E40', marginBottom: 8}}>
              Add Product
            </Text>

            <TableWriteComponent
              changeState={(key: string, value: IProductChangeStateTypes) =>
                this.changeState(key, value)
              }
              componentData={
                IS_BIG_SCREEN ? data : this.convertObjectToArray(data)
              }
            />

            <Button
              title="Submit"
              onPress={() => this.createProduct()}
              loading={isLoading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 30,
    fontFamily: 'OpenSans',
    backgroundColor: '#fff',
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
export default SellerAddProducts;

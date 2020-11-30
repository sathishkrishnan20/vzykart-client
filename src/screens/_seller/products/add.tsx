import React, {Component} from 'react';

import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';

import TableWriteComponent from '../../../components/Table/add-update';
import {IAddUpdate} from '../../../interfaces/table-component';
import {
  INPUT_COMPONENT,
  CRUD,
  INPUT_DATA_TYPE,
} from '../../../interfaces/enums';
import {
  SellerAddProductsState,
  IProductChangeStateTypes,
} from '../../../interfaces/classes/seller-add-products';
import {ICreateProduct, IProduct} from '../../../interfaces/products';
import ProductAction from '../../../actions/products';
import {getSellerId} from '../../../services/storage-service';
import {IResponse} from '../../../interfaces/request-response';
import {showToastByResponse} from '../../../components/Toast';
import {IS_BIG_SCREEN} from '../../../config';
import {ScrollView} from 'react-native-gesture-handler';
import {
  getMultiSelectCategoryValues,
  getCategoryValues,
} from '../../../helpers';
import {getParamsByProp} from '../../../navigation';
import {ComponentProp} from '../../../interfaces';
import {Button} from '../../../components';
import MasterAction from '../../../actions/master';
import {IUOM, ICategory} from '../../../interfaces/master';
const RU = {
  VIEW: 'view',
  UPDATE: 'edit',
};
const RUParams = [RU.VIEW, RU.UPDATE];

class SellerAddProducts extends Component<
  ComponentProp,
  SellerAddProductsState
> {
  multiSelect: any;
  productAction: ProductAction;
  masterAction: MasterAction;
  constructor(props: any) {
    super(props);
    this.state = {
      productId: '',
      productPrefix: '',
      productName: '',
      productDescription: '',
      mrp: '',
      sellingPrice: '',
      discount: '',
      gstPercentage: '',
      sellerId: '',
      uom: '',
      unit: '',
      selectedCategories: [],
      images: [],
      date: new Date(),
      showDatePicker: false,
      isLoading: false,
      alertVisible: false,
      disableInputs: false,
      crudType: CRUD.CREATE,
      uomData: [],
      categoryData: [],
    };
    this.productAction = new ProductAction();
    this.masterAction = new MasterAction();
  }

  componentDidMount() {
    const params = getParamsByProp(this.props);
    const crudType = params.crudType;
    this.getUOM();
    this.getCategories();
    if (RUParams.includes(crudType) && params.productId) {
      this.getProductById(params.productId, crudType);
    }
    if (crudType && crudType === RU.UPDATE) {
      this.setState({crudType: CRUD.UPDATE});
    } else if (crudType && crudType === RU.VIEW) {
      this.setState({crudType: CRUD.VIEW});
    }
  }
  async getUOM() {
    const masterResponse = await this.masterAction.getUOM();
    if (masterResponse.success) {
      const uomData = masterResponse.data.map((item: IUOM) => {
        return {
          value: item.uom,
          label: item.uom,
        };
      });
      this.setState({uomData});
    }
  }
  async getCategories() {
    const masterResponse = await this.masterAction.getCategories();
    if (masterResponse.success) {
      const categoryData = masterResponse.data.map((item: ICategory) => {
        return {
          value: item._id,
          label: item.category,
        };
      });
      this.setState({categoryData});
    }
  }
  async getProductById(productId: string, crudType: string) {
    const productResponse = await this.productAction.getProductByProductId(
      productId,
    );
    if (productResponse.success) {
      const productData: IProduct = productResponse.data;
      this.setState({
        productId: productData._id,
        productName: productData.productName,
        productDescription: productData.productDescription,
        mrp: String(productData.mrp),
        sellingPrice: String(productData.sellingPrice),
        discount: String(productData.discount),
        gstPercentage: String(productData.gstPercentage),
        sellerId: productData.sellerId,
        uom: productData.uom,
        unit: productData.unit,
        selectedCategories: getMultiSelectCategoryValues(
          productData.categories || [],
        ),
        images: productData.images || [],
        disableInputs: crudType === RU.VIEW,
      });
    }
    showToastByResponse(productResponse);
  }

  changeState(key: string, value: IProductChangeStateTypes) {
    // @ts-ignore
    this.setState({[key]: value});
  }

  onCategoriesChange = (selectedCategories: any) => {
    this.setState({selectedCategories});
  };

  async createProduct() {
    try {
      this.setState({isLoading: true});
      const createProductRequest = await this.getProductRequestData();
      const response: IResponse = await this.productAction.createProduct(
        createProductRequest,
      );
      if (response.success) {
        this.resetState();
      }
      showToastByResponse(response);
      this.setState({isLoading: false});
    } catch (error) {
      this.setState({isLoading: false});
    }
  }

  async updateProduct() {
    try {
      this.setState({isLoading: true});
      const productRequest = await this.getProductRequestData();
      const response: IResponse = await this.productAction.updateProduct(
        this.state.productId,
        productRequest,
      );
      showToastByResponse(response);
      this.setState({isLoading: false});
    } catch (error) {
      this.setState({isLoading: false});
    }
  }
  async getProductRequestData() {
    const {
      productDescription,
      productName,
      mrp,
      sellingPrice,
      uom,
      gstPercentage,
      unit,
      selectedCategories,
      discount,
      images,
    } = this.state;

    const productRequest: ICreateProduct = {
      sellerId: await getSellerId(),
      productName,
      productDescription,
      mrp: Number(mrp),
      sellingPrice: Number(sellingPrice),
      discount: Number(mrp) - Number(sellingPrice),
      gstPercentage: Number(gstPercentage),
      uom,
      unit,
      categories: getCategoryValues(selectedCategories),
      images,
    };
    return productRequest;
  }

  resetState() {
    this.setState({
      productName: '',
      productDescription: '',
      mrp: '',
      sellingPrice: '',
      discount: '',
      gstPercentage: '',
      sellerId: '',
      uom: '',
      unit: '',
      selectedCategories: [],
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

  submitHandler() {
    const {crudType} = this.state;
    if (crudType === CRUD.CREATE) {
      this.createProduct();
    } else if (crudType === CRUD.UPDATE) {
      this.updateProduct();
    }
  }

  render() {
    const {
      productDescription,
      productName,
      mrp,
      sellingPrice,
      unit,
      uom,
      gstPercentage,
      selectedCategories,
      images,
      uomData,
      isLoading,
      disableInputs,
      categoryData,
    } = this.state;

    const data: IAddUpdate[][] = [
      [
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'Product Name',
          stateKey: 'productName',
          value: productName,
          disabled: disableInputs,
        },
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'Product Description',
          stateKey: 'productDescription',
          value: productDescription,
          disabled: disableInputs,
        },
      ],
      [
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'MRP/Original Price',
          stateKey: 'mrp',
          value: mrp,
          inputDataType: INPUT_DATA_TYPE.NUMBER,
          disabled: disableInputs,
        },

        {
          component: INPUT_COMPONENT.TEXT,
          label: 'Selling Price',
          stateKey: 'sellingPrice',
          value: sellingPrice,
          inputDataType: INPUT_DATA_TYPE.NUMBER,
          disabled: disableInputs,
        },
      ],

      [
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'GST Percentage',
          stateKey: 'gst',
          value: gstPercentage,
          inputDataType: INPUT_DATA_TYPE.NUMBER,
          disabled: disableInputs,
        },

        {
          component: INPUT_COMPONENT.TEXT,
          label: 'Discount Price',
          stateKey: 'sellingPrice',
          inputDataType: INPUT_DATA_TYPE.NUMBER,
          value: String(Number(mrp) - Number(sellingPrice)),
          disabled: true,
        },
      ],

      [
        {
          component: INPUT_COMPONENT.MULTI_SELECT,
          label: 'Select the Categories of Product',
          stateKey: 'selectedCategories',
          value: selectedCategories,
          selectionItems: categoryData,
          onSelectedItemsChange: this.onCategoriesChange.bind(this),
          disabled: disableInputs,
        },
        {
          component: INPUT_COMPONENT.SINGLE_SELECT,
          label: 'Select Unit of Measurement',
          stateKey: 'uom',
          value: uom,
          selectionItems: uomData,
          disabled: disableInputs,
        },
        {
          component: INPUT_COMPONENT.TEXT,
          label: 'Unit' + (uom ? ' in ' + uom : ''),
          stateKey: 'unit',
          value: unit,
          disabled: disableInputs,
        },
      ],
      [
        {
          component: INPUT_COMPONENT.FILE_UPLOAD,
          label: 'image',
          stateKey: 'images',
          value: images,
          disabled: disableInputs,
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
              disabled={disableInputs}
              title="Submit"
              onPress={() => this.submitHandler()}
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

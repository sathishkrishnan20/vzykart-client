import {IS_WEB} from '../config';

const ROUTE_NAMES = {
  // Seller
  sellerProductAdd: '/seller/product/add',
  sellerProductView: '/seller/product/view',
  sellerProductCrudById: '/seller/product/:crudType/:productId',

  // Auth
  login: '/login',
  dynamicLogin: '/:userType/login',
  register: '/register',

  // Public
  home: '/home',
  productListBySellerId: IS_WEB
    ? '/product-list/seller/:sellerId'
    : '/product-list',
  productDetails: '/product-details',

  // User Authenticated
  userCart: '/cart',
  userCheckout: '/checkout',
};
export default ROUTE_NAMES;

import {IS_WEB} from '../config';

const ROUTE_NAMES = {
  // Seller
  sellerProductAdd: '/seller/product/add',
  sellerProductView: '/seller/product/view',
  sellerProductCrudById: '/seller/product/:crudType/:productId',

  // Auth
  login: IS_WEB ? '/login' : 'Login',
  dynamicLogin: '/:userType/login',
  register: '/register',

  // Public
  home: IS_WEB ? '/home' : 'Home',
  productListBySellerId: IS_WEB
    ? '/product-list/seller/:sellerId'
    : '/product-list',
  productDetails: '/product-details',

  // User Authenticated
  userCart: '/cart',
  userCheckout: '/checkout',
  userProfile: '/profile',
  userOrders: '/orders',
  userOrderDetails: IS_WEB ? '/orders/:orderId' : 'Order Details',
};
export default ROUTE_NAMES;

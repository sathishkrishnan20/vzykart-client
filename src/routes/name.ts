import {IS_WEB} from '../config';

const ROUTE_NAMES = {
  // Seller
  sellerProductAdd: IS_WEB ? '/seller/product/add' : 'Add Product',
  sellerProductView: IS_WEB ? '/seller/product/view' : 'View Products',
  sellerProductCrudById: IS_WEB
    ? '/seller/product/:crudType/:productId'
    : 'Seller Product Details',

  // Auth
  login: IS_WEB ? '/login' : 'Login',
  dynamicLogin: '/:userType/login',
  register: IS_WEB ? '/register' : 'Register',

  // Public
  home: IS_WEB ? '/home' : 'Home',
  productListBySellerId: IS_WEB
    ? '/product-list/seller/:sellerId'
    : 'Product List',
  productDetails: IS_WEB ? '/product-details' : 'Product Details',

  // User Authenticated
  userCart: IS_WEB ? '/cart' : 'Cart',
  userCheckout: IS_WEB ? '/checkout' : 'Checkout',
  userProfile: IS_WEB ? '/profile' : 'My Profile',
  userOrders: IS_WEB ? '/orders' : 'My Orders',
  userOrderDetails: IS_WEB ? '/orders/:orderId' : 'Order Details',
};
export default ROUTE_NAMES;

import {IS_WEB} from '../config';

const ROUTE_NAMES = {
  // admin

  adminOrders: IS_WEB ? '/admin/orders' : 'Admin-Orders',
  adminOrdersDetails: IS_WEB ? '/admin/orders/:orderId' : 'Admin-Orders View',
  adminViewSellers: IS_WEB ? '/admin/sellers/view' : 'Admin-Sellers View',

  // Seller
  sellerProductAdd: IS_WEB ? '/seller/product/add' : 'Add Product',
  sellerProductView: IS_WEB ? '/seller/product/view' : 'View Products',
  sellerProductCrudById: IS_WEB
    ? '/seller/product/:crudType/:productId'
    : 'Seller Product Details',
  sellerOrders: IS_WEB ? '/seller/orders' : 'Orders',
  sellerOrdersDetails: IS_WEB ? '/seller/orders/:orderId' : 'Orders View',

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

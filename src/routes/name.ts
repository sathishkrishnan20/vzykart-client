import {IS_WEB} from '../config';

const ROUTE_NAMES = {
  // admin

  adminOrders: IS_WEB ? '/admin/orders' : 'Admin-Orders',
  adminOrdersDetails: IS_WEB ? '/admin/orders/:orderId' : 'Admin-Orders View',
  adminViewSellers: IS_WEB ? '/admin/sellers/view' : 'Admin-Sellers View',
  adminAddSellers: IS_WEB ? '/admin/sellers/add' : 'Admin-Sellers Add',
  adminViewSalesUsers: IS_WEB
    ? '/admin/sellers/sales-user/view'
    : 'Admin-Sales Users View',
  adminAddSalesUsers: IS_WEB
    ? '/admin/sellers/sales-user/add'
    : 'Admin-Sales Users Add',

  adminViewDeliveryPerson: IS_WEB
    ? '/admin/delivery-persons/view'
    : 'Admin Delivery Person View',
  adminAddDeliveryPersons: IS_WEB
    ? '/admin/delivery-persons/add'
    : 'Admin-Delivery Persons Add',

  // Seller
  sellerProductAdd: IS_WEB ? '/seller/product/add' : 'Add Product',
  sellerProductView: IS_WEB ? '/seller/product/view' : 'View Products',
  sellerProductCrudById: IS_WEB
    ? '/seller/product/:crudType/:productId'
    : 'Seller Product Details',
  sellerOrders: IS_WEB ? '/seller/orders' : 'Orders',
  sellerOrdersDetails: IS_WEB ? '/seller/orders/:orderId' : 'Orders View',

  sellerSalesUsersView: IS_WEB
    ? '/seller/sales-users'
    : 'Seller SalesUsers View',
  sellerSalesUsersAdd: IS_WEB
    ? '/seller/sales-users/add'
    : 'Seller SalesUsers Add',

  // Auth
  login: IS_WEB ? '/login' : 'Login',
  dynamicLogin: '/:userType/login',
  register: IS_WEB ? '/register' : 'Register',

  // Public
  home: IS_WEB ? '/home' : 'Home',
  productListBySellerId: IS_WEB
    ? '/product-list/seller/:sellerId'
    : 'Product List',

  productListFilters: IS_WEB ? '/product-list/:filters' : 'Product List',
  productDetails: IS_WEB ? '/product-details' : 'Product Details',

  // User Authenticated
  userCart: IS_WEB ? '/cart' : 'Cart',
  userCheckout: IS_WEB ? '/checkout' : 'Checkout',
  userProfile: IS_WEB ? '/profile' : 'My Profile',
  userOrders: IS_WEB ? '/orders' : 'My Orders',
  userOrderDetails: IS_WEB ? '/orders/:orderId' : 'Order Details',

  deliveryPersonOrders: IS_WEB ? '/delivery-person/orders' : 'Delivery Orders',
};
export default ROUTE_NAMES;

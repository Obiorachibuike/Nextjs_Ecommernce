import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api';

const ApiService = {
  // 1. Function to get all products
  getAllProducts: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET All Products Error: ', error);
      throw error;
    }
  },

  // 2. Function to get product by ID
  getProductById: async (productId, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`GET Product ${productId} Error: `, error);
      throw error;
    }
  },

  // 3. Function to register a user
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      console.error('User Registration Error: ', error);
      throw error;
    }
  },

  // 4. Function to log in a user
  loginUser: async (loginData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, loginData);
      return response.data;
    } catch (error) {
      console.error('User Login Error: ', error);
      throw error;
    }
  },

  // 5. Function to get user profile
  getUserProfile: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET User Profile Error: ', error);
      throw error;
    }
  },

  // 6. Function to update user profile
//   updateUserProfile: async (userData, token) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/users/profile`, userData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Update User Profile Error: ', error);
//       throw error;
//     }
//   },

  // 7. Function to add item to cart
  addToCart: async (productId, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/cart`, { productId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Add to Cart ${productId} Error: `, error);
      throw error;
    }
  },

  // 8. Function to get cart items
  getCartItems: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET Cart Items Error: ', error);
      throw error;
    }
  },

  // 9. Function to delete cart item
  deleteCartItem: async (productId, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Delete Cart Item ${productId} Error: `, error);
      throw error;
    }
  },

  // 10. Function to create an order
  createOrder: async (orderData, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Create Order Error: ', error);
      throw error;
    }
  },

  // 11. Function to get user orders
  getUserOrders: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET User Orders Error: ', error);
      throw error;
    }
  },

  // 12. Function to get order by ID
  getOrderById: async (orderId, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`GET Order ${orderId} Error: `, error);
      throw error;
    }
  },

  // 13. Function to update order status
  updateOrderStatus: async (orderId, status, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${orderId}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Update Order Status ${orderId} Error: `, error);
      throw error;
    }
  },

  // 14. Function to get product categories
  getProductCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('GET Product Categories Error: ', error);
      throw error;
    }
  },

  // 15. Function to add product review
  addProductReview: async (productId, reviewData, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products/${productId}/reviews`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Add Product Review ${productId} Error: `, error);
      throw error;
    }
  },

  // 16. Function to get product reviews
  getProductReviews: async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}/reviews`);
      return response.data;
    } catch (error) {
      console.error(`GET Product Reviews ${productId} Error: `, error);
      throw error;
    }
  },

  // 17. Function to search products
  searchProducts: async (query, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Search Products Error: ', error);
      throw error;
    }
  },

  // 18. Function to get user addresses
  getUserAddresses: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET User Addresses Error: ', error);
      throw error;
    }
  },

  // 19. Function to add user address
  addUserAddress: async (addressData, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/addresses`, addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Add User Address Error: ', error);
      throw error;
    }
  },

  // 20. Function to update user address
  updateUserAddress: async (addressId, addressData, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/addresses/${addressId}`, addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Update User Address ${addressId} Error: `, error);
      throw error;
    }
  },

  // 21. Function to delete user address
  deleteUserAddress: async (addressId, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Delete User Address ${addressId} Error: `, error);
      throw error;
    }
  },

  // 22. Function to get user payment methods
  getUserPaymentMethods: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/payment-methods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET User Payment Methods Error: ', error);
      throw error;
    }
  },

  // 23. Function to add user payment method
  addUserPaymentMethod: async (paymentData, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/payment-methods`, paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Add User Payment Method Error: ', error);
      throw error;
    }
  },

  // 24. Function to update user payment method
  updateUserPaymentMethod: async (paymentId, paymentData, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/payment-methods/${paymentId}`, paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Update User Payment Method ${paymentId} Error: `, error);
      throw error;
    }
  },

  // 25. Function to delete user payment method
  deleteUserPaymentMethod: async (paymentId, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/payment-methods/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Delete User Payment Method ${paymentId} Error: `, error);
      throw error;
    }
  },

  // 26. Function to get order summary
  getOrderSummary: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET Order Summary Error: ', error);
      throw error;
    }
  },

  // 27. Function to initiate payment
  initiatePayment: async (paymentData, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payments/initiate`, paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Initiate Payment Error: ', error);
      throw error;
    }
  },

  // 28. Function to get payment status
  getPaymentStatus: async (paymentId, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments/${paymentId}/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`GET Payment Status ${paymentId} Error: `, error);
      throw error;
    }
  },

  // 29. Function to apply discount code
  applyDiscountCode: async (code, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/discounts/apply`, { code }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Apply Discount Code Error: ', error);
      throw error;
    }
  },

  // 30. Function to remove discount code
  removeDiscountCode: async (token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/discounts/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Remove Discount Code Error: ', error);
      throw error;
    }
  },

  // 31. Function to get wish list items
  getWishList: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET Wish List Error: ', error);
      throw error;
    }
  },

  // 32. Function to add item to wish list
  addToWishList: async (productId, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/wishlist`, { productId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Add to Wish List ${productId} Error: `, error);
      throw error;
    }
  },

  // 33. Function to remove item from wish list
  removeFromWishList: async (productId, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Remove from Wish List ${productId} Error: `, error);
      throw error;
    }
  },

  // 34. Function to get notifications
  getUserNotifications: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET Notifications Error: ', error);
      throw error;
    }
  },

  // 35. Function to mark notification as read
  markNotificationAsRead: async (notificationId, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/notifications/${notificationId}`, { read: true }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Mark Notification ${notificationId} as Read Error: `, error);
      throw error;
    }
  },

  // 36. Function to delete notification
  deleteNotification: async (notificationId, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/notifications/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Delete Notification ${notificationId} Error: `, error);
      throw error;
    }
  },

  // 37. Function to report a product
  reportProduct: async (productId, reportData, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products/${productId}/report`, reportData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Report Product ${productId} Error: `, error);
      throw error;
    }
  },

  // 38. Function to get shipping options
  getShippingOptions: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shipping/options`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET Shipping Options Error: ', error);
      throw error;
    }
  },

  // 39. Function to create a return
  createReturn: async (orderId, returnData, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/returns`, { orderId, ...returnData }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Create Return Error: ', error);
      throw error;
    }
  },

  // 40. Function to get return status
  getReturnStatus: async (returnId, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/returns/${returnId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`GET Return Status ${returnId} Error: `, error);
      throw error;
    }
  },

  // 41. Function to get best-selling products
  getBestSellingProducts: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/best-selling`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET Best Selling Products Error: ', error);
      throw error;
    }
  },

  // 42. Function to get recently viewed products
  getRecentlyViewedProducts: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/recently-viewed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET Recently Viewed Products Error: ', error);
      throw error;
    }
  },

  // 43. Function to reset user password
  resetPassword: async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/reset-password`, { email });
      return response.data;
    } catch (error) {
      console.error('Reset Password Error: ', error);
      throw error;
    }
  },

  // 44. Function to update user profile
  updateUserProfile: async (profileData, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Update User Profile Error: ', error);
      throw error;
    }
  },

  // 45. Function to get user order history
  getUserOrderHistory: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET User Order History Error: ', error);
      throw error;
    }
  },

  // 46. Function to get user reviews
  getUserReviews: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET User Reviews Error: ', error);
      throw error;
    }
  },

  // 47. Function to get user favorites
  getUserFavorites: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET User Favorites Error: ', error);
      throw error;
    }
  },

  // 48. Function to get user alerts
  getUserAlerts: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/alerts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('GET User Alerts Error: ', error);
      throw error;
    }
  },

  // 49. Function to search for products
  searchProducts: async (query, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search`, {
        params: { query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Search Products Error: `, error);
      throw error;
    }
  },

  // 50. Function to get product details
  getProductDetails: async (productId, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`GET Product Details ${productId} Error: `, error);
      throw error;
    }
  },
};

export default ApiService
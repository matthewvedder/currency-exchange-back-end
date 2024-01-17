const axios = require('axios');
const db = require('../../services/firestore');
const { getOrderById } = require('../../models/order');

const getOrderStatusAndUpdateFirestore = async (order_id) => {
  try {
    // Fetch the order status from the API
    const response = await axios.get(`${process.env.API_BASE_URL}/orders/${order_id}`, {
      headers: { 'X-Api-Key': process.env.API_KEY }
    });

    const orderData = response.data.data;

    // Update the order status in Firestore
    if (orderData && orderData.status !== 'pending') {
      const orderDoc = await getOrderById(order_id)
      if (!orderDoc) {
        console.error(`Order not found in Firestore: ${order_id}`);
        return;
      }
      
      const orderRef = orderDoc.ref;
      await orderRef.update({ status: orderData.status });

      return 'completed';
    }

  } catch (error) {
    console.error('Error fetching order status or updating Firestore:', error);
  }
};

module.exports = getOrderStatusAndUpdateFirestore

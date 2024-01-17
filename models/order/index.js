const db = require('../../services/firestore');

const getOrderById = async (orderId) => {
  try {
    const ordersRef = db.collection('orders');
    const snapshot = await ordersRef.where('id', '==', orderId).limit(1).get()

    if (snapshot.empty) {
      return null;
    }

    // Assuming order_id is unique, there should be only one document
    const doc = snapshot.docs[0]
    return doc
  } catch (error) {
    console.error('Error getting document:', error);
  }
};

module.exports = { getOrderById };
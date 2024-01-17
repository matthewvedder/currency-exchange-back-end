jest.mock('axios');
jest.mock('../../services/firestore');
const axios = require('axios');
const db = require('../../services/firestore');
const pollOrderStatus = require('./get-order-status');

// Mock Firestore document reference
// Mock firebase-admin and Firestore
jest.mock('firebase-admin', () => ({
  credential: {
      cert: jest.fn().mockReturnValue({}),
  },
  initializeApp: jest.fn(),
  firestore: jest.fn().mockReturnValue({
      // Mock other Firestore methods as needed
      collection: jest.fn().mockReturnThis(),
      doc: jest.fn().mockReturnThis(),
      set: jest.fn().mockResolvedValue(true),
  }),
}));

// Mock data
const mockOrderId = 'order123';
const mockOrderData = {
  data: {
    data: {
      order_id: mockOrderId,
      status: 'completed',
      // ...other order data
    }
  }
};

describe('pollOrderStatus', () => {
  it('fetches order status and updates Firestore', async () => {
    axios.get.mockResolvedValue(mockOrderData);
    
    await pollOrderStatus(mockOrderId);

    expect(db.collection().doc).toHaveBeenCalledWith(mockOrderId);
    expect(mockDocRef.set).toHaveBeenCalledWith(mockOrderData.data.data);
  });

  // Additional test cases...
});
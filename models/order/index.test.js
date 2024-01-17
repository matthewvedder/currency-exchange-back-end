// Mock firebase-admin and Firestore
jest.mock('firebase-admin', () => ({
  credential: {
    cert: jest.fn().mockReturnValue({}),
  },
  initializeApp: jest.fn(),
  firestore: jest.fn().mockReturnValue({
      // Mock other Firestore methods as needed
      collection: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValue({
        empty: false,
        docs: [
          {
            id: 'mockDocId',
            data: () => ({
              order_id: '123',
              // ... other document data
            }),
          },
        ],
      }),
  }),
}));

const admin = require('firebase-admin');
const db = admin.firestore();
const { getOrderById } = require('./index.js'); // Update the path

describe('getOrderById', () => {
  it('should retrieve a document by order_id', async () => {
    const orderId = '123';
    const order = await getOrderById(orderId);

    expect(admin.firestore().collection).toHaveBeenCalledWith('orders');
    expect(admin.firestore().where).toHaveBeenCalledWith('id', '==', orderId);
    expect(admin.firestore().limit).toHaveBeenCalledWith(1);
    expect(order.data()).toEqual({
      order_id: orderId
    });
  });

  // Add more test cases as needed
});

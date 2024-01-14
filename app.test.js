const request = require('supertest');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const app = require('./app'); // Import your Express app

// Mocking Axios
const mock = new MockAdapter(axios);

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
const mockQuote = {
  data: {
    id: "mock-quote-id",
    rate: "54.42",
    from_currency: "usd",
    to_currency: "php"
  }
};

const mockOrder = {
  data: {
    id: "mock-order-id",
    status: "pending",
    quote_id: "mock-quote-id",
    user_id: "user-id",
    from_amount: "1"
  }
};

describe('Currency Exchange API', () => {
  let server;
  
  beforeAll(() => {
    const randomPort = Math.floor(Math.random());
    server = app.listen(randomPort);
  })
 
  afterAll(() => {
    server.close()
  })

  beforeEach(() => {
    mock.reset();
  });

  test('It should get a quote', async () => {
    mock.onPost('https://plx-hiring-api.fly.dev/api/quotes').reply(200, mockQuote);

    const response = await request(app).post('/api/quote');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockQuote);
  });

  test('It should execute an order', async () => {
    mock.onPost('https://plx-hiring-api.fly.dev/api/orders').reply(200, mockOrder);

    const response = await request(app).post('/api/orders').send({
      quote_id: "mock-quote-id",
      user_id: "user-id",
      from_amount: "1"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockOrder);
  });

  // Add more tests for other endpoints and scenarios
});


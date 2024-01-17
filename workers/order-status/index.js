const { parentPort } = require('worker_threads');
const getOrderStatusAndUpdateFirestore = require('./get-order-status');

let retryCount = 0;
const maxRetries = 10; // Maximum number of retries
const maxDelay = 300000; // Maximum delay in milliseconds (5 minutes)

const retry = (order_id) => {
  retryCount++;
  if (retryCount <= maxRetries) {
    exponentialBackoffPoll(order_id); // Pass order_id to the next poll
  }
}

const exponentialBackoffPoll = (order_id) => {
  // Exponential backoff formula
  const baseDelay = Math.pow(2, retryCount) * 1000;
  const jitter = Math.random() * 1000; // Randomness up to 1000 milliseconds (1 second)

  // The total delay is a combination of the base delay and the jitter
  const totalDelay = Math.min(baseDelay + jitter, maxDelay);

  setTimeout(async () => {
    try {
      const poll = await getOrderStatusAndUpdateFirestore(order_id);
      if (poll === 'completed') {
        retryCount = 0; // Reset retryCount if successful
      } else {
        retry(order_id);
      }
    } catch (error) {
      console.error('Polling failed, retrying...', error);
      retry(order_id);
    }
  }, totalDelay)
};

parentPort.on('message', (order_id) => {
  exponentialBackoffPoll(order_id);
});

# Currency Exchange Web App Backend

This project serves as the backend for a currency exchange web application, enabling users to quote, execute, and examine historical USD to PHP currency exchange orders. It interfaces with the `plx-hiring-api` to perform these operations.

## Features
- **Quoting**: Fetches the current exchange rate from USD to PHP.
- **Order Execution**: Enables users to execute currency exchanges based on the quoted rates.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (Version 21)
- npm (usually comes with Node.js)
- Git (for cloning the repository)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/matthewvedder/currency-exchange-back-end
   cd currency-exchange-back-end
   ```

1. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and include the following:

   ```
   API_KEY=[Your_API_Key]
   API_BASE_URL=[]
   FRONT_END_URL=[]
   ```

   Get service-account-key.json from author and place in services/firestore directory

### Running the server

To start the server, run:

```bash
npm start
```

The server will start on `http://localhost:[PORT]`, where `[PORT]` is the port number specified in the server configuration.

## API Usage

1. **Create a Quote**

   POST `/api/quotes`

2. **Create an Order**

   POST `/api/orders`
   
## Testing

To run the test suite, execute:

```bash
npm test
```

## Deployment

Add additional notes about how to deploy this on a live system.

## License

This project is licensed under the [MIT License](LICENSE.md) - see the file for details.

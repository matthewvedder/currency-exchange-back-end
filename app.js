const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const API_KEY = process.env.API_KEY;
const API_BASE_URL = 'https://plx-hiring-api.fly.dev/api';
const db = require('./services/firestore');

// Endpoint to get a quote
app.post('/api/quote', async (req, res) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/quotes`, {}, {
            headers: { "X-Api-Key": API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Endpoint to execute an order
app.post('/api/orders', async (req, res) => {
    try {
        const { quote_id, user_id, from_amount } = req.body;
        const response = await axios.post(`${API_BASE_URL}/orders`, {
            quote_id, user_id, from_amount
        }, {
            headers: { "X-Api-Key": API_KEY, "Content-Type": "application/json" }
        });

        if (!response.data) {
          res.status(500).send('No data returned from API');
          return;
        }

        // Save the order to Firestore
        const orderData = response.data;
        const orderRef = db.collection('orders').doc();
        await orderRef.set(orderData);

        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Endpoint to get historical orders for a user
app.get('/api/users/:userId/orders', async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/orders`, {
            headers: { "X-Api-Key": API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = app;
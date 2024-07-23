require('dotenv').config();

const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const priceRoutes = require('./routes/price');
const axios = require('axios');
// const WebSocket = require('ws');
const Price = require('./models/price');
const app = express();
app.use(cors());

const port = process.env.PORT || 8080;
// const server = require('http').createServer(app);
// const wss = new WebSocket.Server({ server });
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/prices',priceRoutes)
// wss.on('connection', (ws) => {
//     console.log('Client connected');
  
//     ws.on('close', () => {
//       console.log('Client disconnected');
//     });
//   });
  const fetchData = async () => {
    const symbols = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin', 'ripple'];
    for (const symbol of symbols) {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: {
              ids: symbol,
              vs_currencies: 'usd',
            },
            headers: {
              'x-cg-demo-api-key': `${process.env.API_KEY}`
            }
          });
      const price = response.data[symbol].usd;
      const priceData = { symbol, price };
      console.log('------',priceData)
      await Price.create(priceData);
      // wss.clients.forEach((client) => {
      //   if (client.readyState === WebSocket.OPEN) {
      //     client.send(JSON.stringify(priceData));
      //   }
      // });
    }
  };
  
  setInterval(fetchData, 10000);
  app.get('/prices', async (req, res) => {
    const { symbol, page = 1, limit = 20 } = req.query;
  
    try {
      let query = {};
      if (symbol) {
        query.symbol = symbol;
      }
  
      const prices = await Price.find(query)
        .sort({ timestamp: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();
  
      const total = await Price.countDocuments(query).exec();
  
      res.json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        prices,
      });
    } catch (error) {
      console.error('Error fetching prices:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
mongoose.connect(process.env.ATLAS_URI)
    .then(() => {
        
        app.listen(port, () => {
            console.log("connected to database && Server running on port: ", port);
        });
    })
    .catch((error) => {
        console.log(error);
    })
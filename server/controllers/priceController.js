const Price = require('../models/price')
const PriceList =  async (req, res) => {
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
  }

module.exports = {PriceList}
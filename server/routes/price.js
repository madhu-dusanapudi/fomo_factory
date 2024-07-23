const express = require('express')
const { PriceList} = require('../controllers/priceController')
// const requireAuth = require('../middleware/requireAuth');

const router = express.Router()
router.get('/', PriceList)

module.exports = router
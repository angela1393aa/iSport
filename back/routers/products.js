const express = require('express');
const router = express.Router();

const connection = require('../utils/db');

const productController = require('../controller/productController')

router.get('/', (req, res, next) => {
    res.send('hello');
});

router.get('/all',productController.listAllProduct)

router.get('/item/:productId',productController.productItem)



module.exports = router;
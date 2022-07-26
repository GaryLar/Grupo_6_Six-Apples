const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/apis/apiProductsController');

router.get('/', apiProductsController.listAll);
router.get('/detail/:id', apiProductsController.productDetail);
router.get('/some', apiProductsController.getSome);

module.exports = router;
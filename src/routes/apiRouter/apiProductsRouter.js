const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/apis/apiProductsController');
const carritoController = require('../../controllers/apis/carritoController')

router.get('/', apiProductsController.listAll);
router.get('/detail/:id', apiProductsController.productDetail);
router.get('/some', apiProductsController.getSome);

/* CARRITO */
router.post('/carrito/:product/:quantity/:user', carritoController.addToCart)
router.get('/cart/:user', )
router.delete('/cart/removeOne/:item/:user', )
router.delete('/cart/removeAll/:item/:user', )
router.delete('/cart/clearCart/:user', )

module.exports = router;
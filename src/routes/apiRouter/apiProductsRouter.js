const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/apis/apiProductsController');
const carritoController = require('../../controllers/apis/carritoController')

router.get('/', apiProductsController.listAll);
router.get('/detail/:id', apiProductsController.productDetail);
router.get('/some', apiProductsController.getSome);

/* CARRITO */
router.post('/carrito/:product/:quantity/:user', carritoController.addToCart)
router.get('/carrito/:user', carritoController.productsInCart);
router.delete('/carrito/removeOne/:item/:user', carritoController.removeOneFromCart);
router.delete('/carrito/removeAll/:item/:user', carritoController.removeAllFromCart);
router.delete('/carrito/clearCart/:user', carritoController.clearCart);

module.exports = router;
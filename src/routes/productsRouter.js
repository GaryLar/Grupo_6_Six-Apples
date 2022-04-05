const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/* Ruta para mostrar los productos */
router.get('/', productController.products);
router.get('/carrito', productController.productCart);
router.get('/ofertas', productController.offers);
router.get('/detalle', productController.detail);

module.exports = router;
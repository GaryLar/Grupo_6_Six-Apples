const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/* Ruta para mostrar los productos */
router.get('/', productController.products);
router.get('/carrito', productController.productCart);

module.exports = router;
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/* Ruta para listar los productos */
router.get('/', productController.products);
/* Ruta parametrizada de detalle de producto */
router.get('/detalle/:id', productController.detail); 

router.get('/carrito', productController.productCart);
router.get('/ofertas', productController.offers);

module.exports = router;
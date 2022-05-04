const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const checkUserSession = require("../middlewares/checkUserSession")

/* Ruta para listar los productos */
router.get('/', productController.products);
/* Ruta parametrizada de detalle de producto */
router.get('/detalle/:id', productController.detail); 

router.get('/carrito', checkUserSession, productController.productCart);
router.get('/ofertas', productController.offers);
router.get('/ofertas/:id', productController.offersDetail);

module.exports = router;
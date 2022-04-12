/* roteador para los CRUD DE PRODUCTOS */
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController')
const adminProductsController = require('../controllers/admin/adminProductsController');
const { route } = require('./productsRouter');

/* GET mostrará index */
router.get('/', adminController.index) /* pagina de inicio */

/* CRUD PRODUCTOS */
router.get('/productos', adminProductsController.list);
router.get('/productos/agregar', adminProductsController.productAdd)

/* router.get('/productos', adminProductsController.list);
router.get('/productos/agregar', adminProductsController.productAdd); */


module.exports = router;
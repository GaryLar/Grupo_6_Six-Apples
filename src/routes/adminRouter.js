/* roteador para los CRUD DE PRODUCTOS */
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController')
const adminProductsController = require('../controllers/admin/adminProductsController');
const { route } = require('./productsRouter');

/* GET mostrará index */
router.get('/', adminController.index) /* pagina de inicio */


/* ============== */
/* CRUD PRODUCTOS */
/* ============== */
/* GET - Lista de productos */
router.get('/productos', adminProductsController.list);
/* GET - Agregar producto */
router.get('/productos/agregar', adminProductsController.productAdd);
/* POST - Crea un producto en la DB */
router.post('/productos/',adminProductsController.productCreate);


/* GET - Editar producto */
router.get('/productos/editar/:id', adminProductsController.productEdit)
/* PUT - Actualiza producto en la DB */
router.put('/productos/:id', adminProductsController.productUpdate);
/* DELETE - Elimina un producto */
router.delete('/productos/eliminar/:id', adminProductsController.productDelete);


module.exports = router;
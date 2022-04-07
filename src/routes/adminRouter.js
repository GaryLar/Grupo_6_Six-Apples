/* roteador para los CRUD DE PRODUCTOS */
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController')

/* GET mostrará index */
router.get('/', adminController.index) /* pagina de inicio */

/* router.get('/productos', adminProductsController.list);
router.get('/productos/agregar', adminProductsController.productAdd); */


module.exports = router;
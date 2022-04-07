/* roteador para los CRUD DE PRODUCTOS */
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController')

/* GET mostrará index */
router.get('/', adminController.index) /* pagina de inicio */

module.exports = router;
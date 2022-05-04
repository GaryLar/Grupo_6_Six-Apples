/* roteador para los CRUD DE PRODUCTOS */
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController')
const adminProductsController = require('../controllers/admin/adminProductsController');
const adminCategoryController = require('../controllers/admin/adminCategoryController');
const uploadFile = require('../middlewares/uploadProductsImg');
const checkUserSession = require('../middlewares/checkUserSession')

/*const { route } = require('./productsRouter');*/

/* GET mostrará index */
router.get('/', checkUserSession, adminController.index) /* pagina de inicio */


/* ============== */
/* CRUD PRODUCTOS */
/* ============== */
/* GET - Lista de productos */
router.get('/productos', checkUserSession, adminProductsController.list);
/* GET - Agregar producto */
router.get('/productos/agregar', checkUserSession, adminProductsController.productAdd);
/* POST - Crea un producto en la DB */
router.post('/productos/',uploadFile.single("image"),adminProductsController.productCreate); // uploadFile.single("image") - Despues del single ponemos el name del input


/* GET - Editar producto */
router.get('/productos/editar/:id', checkUserSession, adminProductsController.productEdit)
/* PUT - Actualiza producto en la DB */
router.put('/productos/:id', uploadFile.single("image"),adminProductsController.productUpdate);
/* DELETE - Elimina un producto */
router.delete('/productos/eliminar/:id', adminProductsController.productDelete);


/* ============== */
/* CRUD CATEGORIAS */
/* ============== */
/* GET - Lista de categorias */
router.get('/categorias', checkUserSession, adminCategoryController.list);
/* GET - Agregar categorias */
router.get('/categorias/agregar', checkUserSession, adminCategoryController.categoryAdd);
/* POST - Crea una categoria en la DB */
router.post('/categorias/',adminCategoryController.categoryCreate);


/* GET - Editar Categorias */
router.get('/categorias/editar/:id',checkUserSession, adminCategoryController.categoryEdit)
/* PUT - Actualiza categoria en la DB */
router.put('/categorias/:id', adminCategoryController.categoryUpdate);
/* DELETE - Elimina una categoria */
router.delete('/categorias/eliminar/:id', adminCategoryController.categoryDelete);

module.exports = router;
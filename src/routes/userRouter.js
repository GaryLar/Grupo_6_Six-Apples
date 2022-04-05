const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const productController = require("../controllers/userController");

/* Ruta para mostrar los productos */
router.get('/', userController.login);
router.get('/perfil', userController.profile);
router.get('/registro', userController.register);

module.exports = router;
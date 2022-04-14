const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const productController = require("../controllers/userController");

/* Ruta para mostrar los productos */
router.get('/login', userController.login);
router.get('/perfil', userController.profile);
router.get('/registro', userController.register);
/* post-crea un nuevo usuario */
router.post('/registro', userController.processRegister);

module.exports = router;
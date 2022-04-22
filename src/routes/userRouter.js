const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const productController = require("../controllers/userController");
const uploadFile = require ('../middlewares/uploadAvatar'); 


/* Ruta para mostrar los productos */
router.get('/login', userController.login);
router.get('/perfil', userController.profile);
router.get('/registro', userController.register);
/* post-crea un nuevo usuario */
router.post('/registro',uploadFile.single('image'), userController.processRegister);
/* Color Put(actualizar) */

module.exports = router;
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const productController = require("../controllers/userController");
const uploadFile = require ('../middlewares/uploadAvatar');
const registerValidator = require('../validations/register-valid')


/* Ruta para mostrar los productos */
router.get('/login', userController.login);
router.get('/perfil', userController.profile);
router.get('/registro', userController.register);
/* post-crea un nuevo usuario */
router.post('/registro',uploadFile.single('image'), registerValidator, userController.processRegister);
/* Colocar Put(actualizar) */



module.exports = router;